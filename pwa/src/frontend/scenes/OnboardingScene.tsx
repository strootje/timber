import { Component, h } from 'preact';
import { BasicLayout } from '../comps/BasicLayout';

export class HomeScene extends Component {
	public render() {
		return (
			<BasicLayout>
				onboarding
			</BasicLayout>
		);
	}
}
