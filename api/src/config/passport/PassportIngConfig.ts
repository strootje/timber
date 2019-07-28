import { Request } from 'express-serve-static-core';
import { readFileSync } from 'fs';
import { PassportStatic } from 'passport';
import * as PouchDb from 'pouchdb';
import { ApiDir } from '../../../../util/Paths';
import { User } from '../../domain/User';
import { IngStrategy, IngStrategyOptions } from '../../strategies/IngStrategy';
import { PouchDbConfig } from '../PouchDbConfig';

export const PassportIngConfig = (passport: PassportStatic) => {
	const opts: IngStrategyOptions = {
		clientId: '5ca1ab1e-c0ca-c01a-cafe-154deadbea75',
		clientKey: 'SN=499602D2,CA=C=NL,ST=Amsterdam,L=Amsterdam,O=ING,OU=ING,CN=AppCertificateMeansAPI',
		callbackUrl: 'http://localhost:3010/authorize/ing/callback',
		tlsCertificate: readFileSync(ApiDir('certs', 'example_eidas_client_tls.cer'), { encoding: 'utf-8' }),
		tlsCertificateKey: readFileSync(ApiDir('certs', 'example_eidas_client_tls.key'), { encoding: 'utf-8' }),
		signingCertificate: readFileSync(ApiDir('certs', 'example_eidas_client_signing.cer'), { encoding: 'utf-8' }),
		signingCertificateKey: readFileSync(ApiDir('certs', 'example_eidas_client_signing.key'), { encoding: 'utf-8' }),
		signingCertificateKeyPassphrase: 'pass:changeit',
		useSandbox: true
	};

	passport.use('bank:ing', new IngStrategy(opts, async (req: Request, accessToken: string) => {
		const pouch = new PouchDb(PouchDbConfig.uri);
		const user = await pouch.get<User>(req.user.username);

		user.services['bank:ing'] = {
			refreshToken: '',
			accessToken
		};

		await pouch.post(user);
	}));
};
