import { Request } from 'express-serve-static-core';
import { PassportStatic } from 'passport';
import { ExtractJwt, JwtFromRequestFunction, Strategy, StrategyOptions } from 'passport-jwt';
import * as PouchDb from 'pouchdb';
import { User } from '../../domain/User';
import { JwtConfig } from '../JwtConfig';
import { PouchDbConfig } from '../PouchDbConfig';

const ExtractJwtFromStateParam: JwtFromRequestFunction = (req: Request) => {
	if (!req.query || !req.query.state) {
		return '';
	}

	const state = JSON.parse(Buffer.from(req.query.state, 'base64').toString()) as { token: string };
	return state.token;
};

export const PassportJwtConfig = (passport: PassportStatic) => {
	const opts: StrategyOptions = {
		secretOrKey: JwtConfig.secret,
		jwtFromRequest: ExtractJwt.fromExtractors([
			ExtractJwt.fromAuthHeaderWithScheme('JWT'),
			ExtractJwt.fromUrlQueryParameter('token'),
			ExtractJwtFromStateParam
		])
	};

	passport.use(new Strategy(opts, (payload: User, done) => {
		const pouch = new PouchDb(PouchDbConfig.uri);

		pouch.get<User>(payload.username)
			.then(async (user: User) => done(null, user))
			.catch((err: Error) => done(err, null));
	}));
};
