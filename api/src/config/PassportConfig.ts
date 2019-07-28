import { PassportStatic } from 'passport';
import { PassportIngConfig } from './passport/PassportIngConfig';
import { PassportJwtConfig } from './passport/PassportJwtConfig';
import { PassportLocalConfig } from './passport/PassportLocalConfig';

interface User {
	username: string;
}

export const PassportConfig = (passport: PassportStatic) => {
	// authentications
	PassportLocalConfig(passport);
	PassportJwtConfig(passport);

	// authorizations
	PassportIngConfig(passport);

	// user serialization
	passport.serializeUser<User, string>((user, done) => {
		done(null, user.username);
	});

	// user deserialization
	passport.deserializeUser<User, string>((id, done) => {
		done(null, { username: id });
	});
};
