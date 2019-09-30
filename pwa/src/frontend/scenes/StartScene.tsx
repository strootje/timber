import { Component, h } from 'preact';
import { Box } from 'preact-bulma-components/dist/Elements/Box';
import { Button } from 'preact-bulma-components/dist/Elements/Button';
import { Control } from 'preact-bulma-components/dist/Form/Control';
import { Field } from 'preact-bulma-components/dist/Form/Field';
import { Label } from 'preact-bulma-components/dist/Form/Label';
import { TextInput } from 'preact-bulma-components/dist/Form/TextInput';
import { BasicLayout } from '../comps/BasicLayout';

export class StartScene extends Component {
	public render() {
		return (
			<BasicLayout>
				<Box>
					<form>
						<Field>
							<Control>
								<Label>__Household Name:</Label>
								<TextInput />
							</Control>
						</Field>

						<Field>
							<Control clearfix>
								<Button type='submit' pulled='right'>__Save</Button>
							</Control>
						</Field>
					</form>
				</Box>
			</BasicLayout>
		);
	}
}
