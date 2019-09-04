import Debug from 'debug';
import { Router } from 'express';
import { Request, Response } from 'express-serve-static-core';
import * as Passport from 'passport';
import { Names } from '../config/BankNames';

const logger = Debug('timber:api:routes:ApiHandler');
export const ApiHandler = Router();
ApiHandler.use(Passport.authenticate('jwt'));

Names.forEach((bankId) => {
	ApiHandler.use(`/${bankId}`, Passport.authorize(`bank:${bankId}`, { authInfo: true }));

	ApiHandler.get(`/${bankId}/balances`, (req: Request, res: Response) => {
		logger('request %s: authenticating %s', req.path, bankId);

		res.status(200).json({
			data: 'testing this endpoint'
		});
	});
});


// ApiHandler.get('/:bankId/*', (req: Request, res: Response) => {
// 	logger('request %s', req.path);
// 	res.status(200).json({ message: 'nothing here yet' });
// });
