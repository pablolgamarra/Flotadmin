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

		setFormState({ ...formState, [name!!]: data.value });
	};

	const handleDropdownChanges = (event: SelectionEvents, data: OptionOnSelectData): void => {
		setFormState({
			...formState,
			interventionType:
				interventionTypesList.find(
					(interventionType) =>
						interventionType.Description === (data.optionText),
				) || ({} as InterventionType),
		});
	};

	const handleRadioChanges = (ev: React.FormEvent<HTMLDivElement>, data: RadioGroupOnChangeData): void => {
		setFormState({
			...formState,
			costCurrency: data.value as Currency,
		});
	};

    const handleFilePickerChanges = (ev: React.ChangeEvent<HTMLInputElement>): void => {
            if (ev.target.files && ev.target.files.length > 0) {
                const file = ev.target.files[0];
                switch(ev.target.name){
                    case 'budget': {
                        setFormState({
                            ...formState,
                            budget: file
                        });
                        break;
                    }
                    case 'invoice': {
                        setFormState({
                            ...formState,
                            invoice: file,
                        });
                        break;
                }
        
                }
            }
    };

    const handleDatePickerChanges = (date: Date | undefined | null):void => {        
        setFormState({
			...formState,
			realizationDate: date ? new Date(date) : new Date(),
		});
    }

	return { handleInputChanges, handleDropdownChanges, handleRadioChanges, handleFilePickerChanges, handleDatePickerChanges};
};
