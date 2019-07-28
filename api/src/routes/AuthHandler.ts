import Debug from 'debug';
import { Router } from 'express';
import { Request, Response } from 'express-serve-static-core';
import * as Passport from 'passport';
import { ApiSrcDir } from '../../../util/Paths';

const logger = Debug('timber:api:routes:AuthHandler');
export const AuthHandler = Router();
AuthHandler.use(Passport.authenticate('jwt'));

const banks = [
	'ing'
];

AuthHandler.get('/endpoints', (req: Request, res: Response) => {
	logger('request %s', req.path);
	res.status(200).json({ data: [
		...banks
	]});
});

banks.forEach((bankId) => {
	AuthHandler.get(`/${bankId}`, Passport.authorize(`bank:${bankId}`), (req: Request, res: Response) => {
		logger('request %s: authenticating %s', req.path, bankId);
		res.status(404).send('Oh hi, this is awkward..');
	});

	AuthHandler.get(`/${bankId}/callback`, Passport.authorize(`bank:${bankId}`), (req: Request, res: Response) => {
		logger('request %s: success %s', req.path, bankId);
		res.status(200).sendfile(ApiSrcDir('views', 'callback.html'));
	});
});
