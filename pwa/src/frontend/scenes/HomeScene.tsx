import Axios from 'axios';
import { bind } from 'decko';
import { Component, h } from 'preact';
import { Button } from 'preact-bulma-components/dist/Elements/Button';
import { BasicLayout } from '../comps/BasicLayout';

import PromiseWindow = require('promise-window');

// tslint:disable: no-console
export class HomeScene extends Component<{}, { token?: string }> {
	public render() {
		return (
			<BasicLayout>
				<Button onClick={this._login}>login</Button>
				<Button onClick={this._authorize}>ing:authorize</Button>
				<Button onClick={this._apistuff}>fetch api stuff</Button>
			</BasicLayout>
		);
	}

	@bind
	private async _login() {
		if (this.state.token) {
			alert('already have token');
			return;
		}

		const response = await Axios.post<{ token: string }>('http://0.0.0.0:3010/me/login', { username: 'strootje', password: 'test' });
		console.log(response);
		this.setState({ token: response.data.token });
	}

	@bind
	private async _authorize() {
		try {
			if (!this.state.token) {
				alert('no token');
				return;
			}

			const window = new PromiseWindow('http://0.0.0.0:3010/authorize/ing?token=' + this.state.token, {
				windowName: 'authorize ING'
			});

			const result = await window.open();
			console.log(`result: ${result}`);
		} catch (e) {
			console.log(`error: ${e}`);
		}
	}

	@bind
	// tslint:disable-next-line: no-empty
	private async _apistuff() {
		try {
			if (!this.state.token) {
				alert('no token');
				return;
			}

			const response = await Axios.get<any>('http://0.0.0.0:3010/api/ing/balances', {
				headers: {
					Authorization: `JWT ${this.state.token}`
				}
			});

			console.log(response);
		} catch (e) {
			console.log(`error: ${e}`);
		}
	}
}
