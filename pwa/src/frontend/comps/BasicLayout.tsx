import { Component, h, RenderableProps } from 'preact';
import { Navbar } from 'preact-bulma-components/dist/Components/Navbar';

export class BasicLayout extends Component {
	public render(props: RenderableProps<{}>) {
		return (
			<div className='layout'>
				<Navbar color='primary'>
					<Navbar.Brand>
						<Navbar.Item href='/'>
							__Timber
						</Navbar.Item>

						<Navbar.Burger />
					</Navbar.Brand>

					<Navbar.Menu>
						<Navbar.Start>
							<Navbar.Item href='/budget'>__Budget</Navbar.Item>
							<Navbar.Item href='/balances'>__Balances</Navbar.Item>
						</Navbar.Start>

						<Navbar.End>
							<Navbar.Item href='/settings'>__Settings</Navbar.Item>
						</Navbar.End>
					</Navbar.Menu>
				</Navbar>

				<div style={{ padding: '.4rem' }}>{props.children}</div>
			</div>
		);
	}
}
