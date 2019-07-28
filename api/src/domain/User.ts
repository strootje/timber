import { LoginMethod } from './LoginMethod';
import { Service } from './Service';

type MethodTypes = 'local';
type ServiceTypes = 'bank:ing';

export interface User {
	username: string;
	logins: { [Key in MethodTypes]?: LoginMethod };
	services: { [key in ServiceTypes]?: Service };
}
