import { Currency } from '@/common/Currency';
import { InteractionRegisterFormState } from '@/controls/interactions/InteractionDataForm';
import { InterventionType } from '@/models/InterventionType';
import { OptionOnSelectData, SelectionEvents } from '@fluentui/react-combobox';
import { InputOnChangeData } from '@fluentui/react-input';
import { RadioGroupOnChangeData } from '@fluentui/react-radio';

export interface useInteractionFormProps {
	interventionTypesList: InterventionType[];
	formState: InteractionRegisterFormState;
	setFormState: (arg0: InteractionRegisterFormState) => void;
}

export const useInteractionForm = (props: useInteractionFormProps) => {
	const { interventionTypesList, formState, setFormState } = props;

	const handleInputChanges = (ev: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData): void => {
		if (!ev.target.getAttribute('name')) {
			return;
		}

		const name = ev.target.getAttribute('name');

		setFormState({ ...formState, [name!!]: data });
	};

	const handleDropdownChanges = (event: SelectionEvents, data: OptionOnSelectData): void => {
		setFormState({
			...formState,
			interventionType:
				interventionTypesList.find(
					(interventionType) =>
						interventionType.Id === (data.optionValue ? Number.parseInt(data.optionValue) : -1),
				) || undefined,
		});
	};

	const handleRadioChanges = (ev: React.FormEvent<HTMLDivElement>, data: RadioGroupOnChangeData): void => {
		setFormState({
			...formState,
			costCurrency: data.value as Currency,
		});
	};

	return { handleInputChanges, handleDropdownChanges, handleRadioChanges };
};
