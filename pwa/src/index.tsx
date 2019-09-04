import { h, render } from 'preact';
import Router from 'preact-router';
import { BalancesScene } from './frontend/scenes/BalancesScene';
import { HomeScene } from './frontend/scenes/HomeScene';
import { TransactionsScene } from './frontend/scenes/TransactionsScene';

// tslint:disable-next-line: no-var-requires
require('./frontend/assets/styles/index.scss');

render((
	<Router>
		<BalancesScene path='/balances' />
		<TransactionsScene path='/balances/:id/transactions' />
		<HomeScene path='/' default />
	</Router>
), document.body);
