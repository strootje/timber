import { AxiosInstance, default as Axios, Method } from 'axios';
import { createHash, createSign } from 'crypto';
import * as Debug from 'debug';
import { Request } from 'express-serve-static-core';
import { OutgoingHttpHeaders } from 'http';
import { Agent } from 'https';
import { AuthenticateOptions } from 'passport';
import { Strategy } from 'passport-strategy';
import { stringify } from 'querystring';
import { format, parse } from 'url';

export type IngScope =
	| 'greetings:view'
	| 'granting'
	| 'payment-accounts:transactions:view'
	| 'payment-accounts:balances:view'
	| 'payment-accounts:funds-availability:confirm'
	| 'payment-accounts:orders:create'
	| 'payment-requests:view'
	| 'payment-requests:create'
	| 'payment-requests:close'
	| 'virtual-ledger-accounts:fund-reservation:create'
	| 'virtual-ledger-accounts:fund-reservation:delete'
	| 'virtual-ledger-accounts:balance:view';

export interface IngAccessTokenResponse {
	scope: string;
	token_type: 'Bearer';
	access_token: string;
	expires_in: number;
	refresh_token: string;
	refresh_token_expires_in: number;
}

export type CheckReqForTokensFunction = (req: Request) => Promise<IngAccessTokenResponse | null>;
export type VerifyFunction = (req: Request, accessToken: IngAccessTokenResponse) => Promise<void>;
export interface IngStrategyOptions {
	clientId: string;
	clientKey?: string;
	callbackUrl: string;
	tlsCertificate: string;
	tlsCertificateKey: string;
	useSandbox?: boolean;
	signingCertificate?: string;
	signingCertificateKey: string;
	signingCertificateKeyPassphrase: string;
	scope?: IngScope | IngScope[];
}

const logger = Debug('timber:api:banks:ing:IngStrategy');
export class IngStrategy extends Strategy {
	private static readonly authorizePath = '/oauth2/authorization-server-url';
	private static readonly tokenPath = '/oauth2/token';

	private readonly useSandbox: boolean;
	private readonly callbackUrl: string;
	private readonly signingCertificate?: string;
	private readonly signingCertificateKey: string;
	private readonly signingCertificateKeyPassphrase: string;
	private readonly checkReqForTokens: CheckReqForTokensFunction;
	private readonly verify: VerifyFunction;
	private readonly clientId: string;
	private readonly clientKey?: string;
	private readonly client: AxiosInstance;

	constructor(opts: IngStrategyOptions, checkReqForTokens: CheckReqForTokensFunction, verify: VerifyFunction) {
		super();

		this.useSandbox = !!opts.useSandbox;
		this.callbackUrl = opts.callbackUrl;
		this.signingCertificate = opts.signingCertificate;
		this.signingCertificateKey = opts.signingCertificateKey;
		this.signingCertificateKeyPassphrase = opts.signingCertificateKeyPassphrase;
		this.checkReqForTokens = checkReqForTokens;
		this.verify = verify;
		this.clientId = opts.clientId;
		this.clientKey = opts.clientKey;
		this.client = Axios.create({
			baseURL: !opts.useSandbox ? 'https://api.ing.com' : 'https://api.sandbox.ing.com',
			httpsAgent: new Agent({
				cert: opts.tlsCertificate,
				key: opts.tlsCertificateKey,
				rejectUnauthorized: false
			})
		});
	}

	public async authenticate(req: Request, opts?: AuthenticateOptions) {
		if (req.query && req.query.error) {
			if (req.query.error === 'access_denied') {
				return this.fail({ message: req.query.error_description }, 401);
			} else {
				// TODO: make nice custom error
				return this.error(new Error(req.query.error_description));
			}
		}

		try {
			// check for existing tokens
			const tokens = await this.checkReqForTokens(req);
			if (!tokens && opts && opts.authInfo) {
				this.fail('no tokens found', 403);
			} else if (tokens) {
				if (new Date(tokens.expires_in) >= new Date()) {
					const accessToken = await this.getAppAccessToken();
					const data = await this.refreshCustAccessToken(accessToken, tokens.refresh_token);
					await this.verify(req, data);
				}

				this.success({}, {});

			// handle callback
			} else if (req.query && req.query.code) {
				const accessToken = await this.getAppAccessToken();
				const data = await this.getCustAccessToken(accessToken, req.query.code);
				await this.verify(req, data);
				this.success({}, {});

			// handle initial authorize call
			} else {
				const accessToken = await this.getAppAccessToken();
				const authorizeUrl = await this.getAuthorizePath(accessToken, { ...opts, token: req.query.token });
				this.redirect(authorizeUrl);
			}
		} catch (e) {
			this.error(e);
		}
	}

	private async getAppAccessToken(): Promise<string> {
		const params: OutgoingHttpHeaders = {
			grant_type: 'client_credentials'
		};

		const body = stringify(params);
		const digest = `SHA-256=${createHash('sha256').update(body).digest('base64')}`;
		const path = IngStrategy.tokenPath;
		const date = new Date().toUTCString();
		const signature = this.createAppSignature('post', path, date, digest);

		const headers: OutgoingHttpHeaders = {
			'Authorization': `Signature keyId="${this.clientId}",algorithm="rsa-sha256",headers="(request-target) date digest",signature="${signature}"`,
			'Content-Type': 'application/x-www-form-urlencoded',
			'Date': date,
			'Digest': digest
		};

		if (this.clientKey && this.signingCertificate) {
			headers.Authorization = `Signature keyId="${this.clientKey}",algorithm="rsa-sha256",headers="(request-target) date digest",signature="${signature}"`;
			headers['TPP-Signature-Certificate'] = this.signingCertificate.split('\n').join('');
		}

		logger('params in <AccessToken>: %o, %o, %o, %o', params, path, date, headers);
		const response = await this.post<{ access_token: string }>(path, headers, body);
		return response.access_token;
	}

	private async getAuthorizePath(accessToken: string, opts?: any) {
		const params = {
			country_code: opts.countryCode || 'nl',
			state: Buffer.from(JSON.stringify(opts)).toString('base64')
		};

		if (this.useSandbox && this.clientId === '5ca1ab1e-c0ca-c01a-cafe-154deadbea75') {
			const parsedCallbackUrl = parse(this.callbackUrl, true);
			parsedCallbackUrl.query.code = '3a1d7c04-9e87-433d-817c-86dccb77f11f';
			parsedCallbackUrl.query.state = Buffer.from(JSON.stringify(opts)).toString('base64');
			return format(parsedCallbackUrl);
		}

		const parsedAuthorizePath = parse(IngStrategy.authorizePath, true);
		parsedAuthorizePath.query = { ...parsedAuthorizePath.query, ...params };

		const digest = `SHA-256=${createHash('sha256').update(stringify({})).digest('base64')}`;
		const date = new Date().toUTCString();
		const path = format(parsedAuthorizePath);
		const signature = this.createAppSignature('get', path, date, digest);

		const headers = {
			Authorization: `Bearer ${accessToken}`,
			Date: date,
			Digest: digest,
			Signature: `keyId="${this.clientId}",algorithm="rsa-sha256",headers="(request-target) date digest",signature="${signature}"`
		};

		const response = await this.get<{ location: string }>(path, headers);
		return response.location;
	}

	private async getCustAccessToken(accessToken: string, code: string): Promise<IngAccessTokenResponse> {
		const params: OutgoingHttpHeaders = {
			code,
			grant_type: 'authorization_code',
			redirect_uri: this.callbackUrl
		};

		const body = stringify(params);
		const digest = `SHA-256=${createHash('sha256').update(body).digest('base64')}`;
		const path = IngStrategy.tokenPath;
		const date = new Date().toUTCString();
		const signature = this.createAppSignature('post', path, date, digest);

		const headers: OutgoingHttpHeaders = {
			'Authorization': `Bearer ${accessToken}`,
			'Content-Type': 'application/x-www-form-urlencoded',
			'Date': date,
			'Digest': digest,
			'Signature': `keyId="${this.clientId}",algorithm="rsa-sha256",headers="(request-target) date digest",signature="${signature}"`
		};

		logger('params in <AccessToken>: %o, %o, %o, %o', params, path, date, headers);
		const response = await this.post<IngAccessTokenResponse>(path, headers, body);
		return response;
	}

	private async refreshCustAccessToken(appAccessToken: string, refreshToken: string): Promise<IngAccessTokenResponse> {
		const params: OutgoingHttpHeaders = {
			refresh_token: refreshToken,
			grant_type: 'refresh_token'
		};

		const body = stringify(params);
		const digest = `SHA-256=${createHash('sha256').update(body).digest('base64')}`;
		const path = IngStrategy.tokenPath;
		const date = new Date().toUTCString();
		const signature = this.createAppSignature('post', path, date, digest);

		const headers: OutgoingHttpHeaders = {
			'Authorization': `Bearer ${appAccessToken}`,
			'Content-Type': 'application/x-www-form-urlencoded',
			'Date': date,
			'Digest': digest,
			'Signature': `keyId="${this.clientId}",algorithm="rsa-sha256",headers="(request-target) date digest",signature="${signature}"`
		};

		logger('params in <RefreshToken>: %o, %o, %o, %o', params, path, date, headers);
		const response = await this.post<IngAccessTokenResponse>(path, headers, body);
		return response;
	}

	private async get<TResult>(path: string, headers: OutgoingHttpHeaders): Promise<TResult> {
		const results = await this.request<TResult>('get', path, headers);
		return results;
	}

	private async post<TResult>(path: string, headers: OutgoingHttpHeaders, data: any): Promise<TResult> {
		const results = await this.request<TResult>('post', path, headers, data);
		return results;
	}

	private async request<TResult>(method: Method, url: string, headers: OutgoingHttpHeaders, data?: any): Promise<TResult> {
		try {
			const response = await this.client.request<TResult>({
				data, headers, method, url
			});

			return response.data;
		} catch (e) {
			logger('%o', e);
			throw e;
		}
	}

	private createAppSignature(method: string, path: string, date: string, digest: string, reqId?: string): string {
		const url = parse(path);
		let signingString = `(request-target): ${method} ${url.pathname || ''}${url.query ? `?${url.query}` : ''}\ndate: ${date}\ndigest: ${digest}`;

		if (reqId) {
			signingString += `\nx-request-id: ${reqId}`;
		}

		logger('params in <AppSignature>: %o', signingString);
		const hash = createSign('sha256').update(signingString).sign({
			key: this.signingCertificateKey,
			passphrase: this.signingCertificateKeyPassphrase
		}, 'base64');

		return hash;
	}
}
