import * as BodyParser from 'body-parser';
import * as CORS from 'cors';
import Debug from 'debug';
import * as Express from 'express';
import * as Passport from 'passport';
import { PassportConfig } from './config/PassportConfig';
import { ApiHandler } from './routes/ApiHandler';
import { AuthHandler } from './routes/AuthHandler';
import { LoginHandler } from './routes/LoginHandler';

(() => {
	const opts = { host: '0.0.0.0', port: 3010 };
	const logger = Debug('timber:api');
	const server = Express();
	PassportConfig(Passport);

	server.use(CORS());
	server.use(BodyParser.json());
	server.use(Passport.initialize());

	server.use('/authorize', AuthHandler);
	server.use('/api', ApiHandler);
	server.use('/me', LoginHandler);

	server.listen(opts.port, opts.host, () => {
		logger('server started at http://%s:%s/', opts.host, opts.port);
	});
})();
