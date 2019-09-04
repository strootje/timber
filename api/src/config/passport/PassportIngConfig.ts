import { Request } from 'express-serve-static-core';
import { readFileSync } from 'fs';
import { PassportStatic } from 'passport';
import * as PouchDb from 'pouchdb';
import { ApiDir } from '../../../../util/Paths';
import { User } from '../../domain/User';
import { IngAccessTokenResponse, IngStrategy } from '../../strategies/IngStrategy';
import { PouchDbConfig } from '../PouchDbConfig';

export const PassportIngConfig = (passport: PassportStatic) => {
	passport.use('bank:ing', new IngStrategy(
		// options
		{
			clientId: '5ca1ab1e-c0ca-c01a-cafe-154deadbea75',
			clientKey: 'SN=499602D2,CA=C=NL,ST=Amsterdam,L=Amsterdam,O=ING,OU=ING,CN=AppCertificateMeansAPI',
			callbackUrl: 'http://localhost:3010/authorize/ing/callback',
			tlsCertificate: readFileSync(ApiDir('certs', 'example_eidas_client_tls.cer'), { encoding: 'utf-8' }),
			tlsCertificateKey: readFileSync(ApiDir('certs', 'example_eidas_client_tls.key'), { encoding: 'utf-8' }),
			signingCertificate: readFileSync(ApiDir('certs', 'example_eidas_client_signing.cer'), { encoding: 'utf-8' }),
			signingCertificateKey: readFileSync(ApiDir('certs', 'example_eidas_client_signing.key'), { encoding: 'utf-8' }),
			signingCertificateKeyPassphrase: 'pass:changeit',
			useSandbox: true
		},

		// checkReqForTokens
		async (req: Request) => {
			if (!req.user) {
				throw new Error('req.user not found');
			}

			const user = req.user as User;
			const service = user.services['bank:ing'];
			if (service == null) {
				return null;
			}

			return {
				scope: service.scope,
				token_type: 'Bearer',
				refresh_token: service.refreshToken,
				refresh_token_expires_in: Math.abs(new Date().getTime() - new Date(service.refreshTokenExpiresAt).getTime()),
				access_token: service.accessToken,
				expires_in: Math.abs(new Date().getTime() - new Date(service.accessTokenExpiresAt).getTime())
			};
		},

		// verify
		async (req: Request, data: IngAccessTokenResponse) => {
			const pouch = new PouchDb(PouchDbConfig.uri);
			const user = await pouch.get<User>(req.user.username);

			const refreshTokenExpiresAt = new Date();
			refreshTokenExpiresAt.setSeconds(refreshTokenExpiresAt.getSeconds() + data.refresh_token_expires_in);
			const accessTokenExpiresAt = new Date();
			accessTokenExpiresAt.setSeconds(accessTokenExpiresAt.getSeconds() + data.expires_in);

			user.services['bank:ing'] = {
				scope: data.scope,
				refreshToken: data.refresh_token,
				refreshTokenExpiresAt,
				accessToken: data.access_token,
				accessTokenExpiresAt
			};

			await pouch.post(user);
		}
	));
};
