import { Component, h } from 'preact';
import { Card } from 'preact-bulma-components/dist/Components/Card';
import { BasicLayout } from '../comps/BasicLayout';
// import Axios from 'axios';

export class BalancesScene extends Component {
	public render() {
		return (
			<BasicLayout>
				<Card>
					<Card.Content>
						balanceses here..
					</Card.Content>
				</Card>
			</BasicLayout>
		);
	}
}
