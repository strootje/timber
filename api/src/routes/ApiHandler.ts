import Debug from 'debug';
import { Router } from 'express';
import { Request, Response } from 'express-serve-static-core';
import * as Passport from 'passport';

const logger = Debug('timber:api:routes:ApiHandler');
export const ApiHandler = Router();
ApiHandler.use(Passport.authenticate('jwt'));

ApiHandler.get('*', (req: Request, res: Response) => {
	logger('request %s', req.path);
	res.status(200).json({ message: 'nothing here yet' });
});
