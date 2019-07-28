import Axios from 'axios';
import { h, render } from 'preact';
import PromiseWindow = require('promise-window');

// tslint:disable: no-console
const authorize = async () => {
	try {
		const response = await Axios.post<{ token: string }>('http://0.0.0.0:3010/me/login', { username: 'strootje', password: 'test' });
		await Axios.get('http://0.0.0.0:3010/api/test', {
			headers: {
				Authorization: `JWT ${response.data.token}`
			}
		});

		const window = new PromiseWindow('http://0.0.0.0:3010/authorize/ing?token=' + response.data.token, {
			windowName: 'authorize ING'
		});

		const result = await window.open();
		console.log(`result: ${result}`);
	} catch (e) {
		console.log(`error: ${e}`);
	}
};

render((
	<button onClick={authorize}>authorize:ing</button>
), document.body);
