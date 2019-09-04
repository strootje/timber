import { compare, hash } from 'bcrypt';
import * as Debug from 'debug';
import { PassportStatic } from 'passport';
import { IStrategyOptions, Strategy } from 'passport-local';
import * as PouchDb from 'pouchdb';
import { User } from '../../domain/User';
import { PouchDbConfig } from '../PouchDbConfig';

const logger = Debug('timber:api:config:passport:PassportLocalConfig');
export const PassportLocalConfig = (passport: PassportStatic) => {
	const opts: IStrategyOptions = {
	};

	passport.use(new Strategy(opts, async (username, password, done) => {
		const pouch = new PouchDb(PouchDbConfig.uri);

		try {
			const user = await pouch.get<User>(username);
			logger('found user');

			if (!user.logins.local) {
				throw new Error('user does not have a password');
			}

			const same = await compare(password, user.logins.local.hash);

			if (!same) {
				throw new Error('user password does not match');
			}

			logger('passwords match');
			done(null, { username: user.username });
		} catch (err) {
			if (err === 'user.password does not match') {
				return;
			}

			try {
				logger('creating new user');
				const hashed = await hash(password, 10);
				await pouch.put<User>({ _id: username, username, logins: { local: { hash: hashed }}, services: {} });

				done(null, { username });
			} catch (e) {
				done(e);
			}
		}
	}));
};
