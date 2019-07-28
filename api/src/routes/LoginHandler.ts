import Debug from 'debug';
import { Router } from 'express';
import { NextFunction, Request, Response } from 'express-serve-static-core';
import { sign } from 'jsonwebtoken';
import * as Passport from 'passport';
import * as PouchDb from 'pouchdb';
import { JwtConfig } from '../config/JwtConfig';
import { PouchDbConfig } from '../config/PouchDbConfig';
import { User } from '../domain/User';

const logger = Debug('timber:api:routes:LoginHandler');
export const LoginHandler = Router();

LoginHandler.post('/login', Passport.authenticate(['local']), (req: Request, res: Response, next: NextFunction) => {
	logger('request %s', req.path);

	sign({ username: req.user.username }, JwtConfig.secret, (err: Error, token: string) => {
		if (err) { return next(err); }

		const pouch = new PouchDb(PouchDbConfig.uri);
		pouch.get<User>(req.user.username).then(async () => {
			res.status(200).json({ token });
		});
	});
});
