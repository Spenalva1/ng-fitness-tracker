import { map } from 'rxjs/operators';

export const redirectAuthorizedToWelcome = () => map(user => !user ? true : ['/']);

export const redirectUnauthorizedToLogin = () => map(user => user ? true : ['login']);
