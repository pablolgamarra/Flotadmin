import * as React from 'react';

import {
	InputOnChangeData,
	OptionOnSelectData,
	RadioGroupOnChangeData,
	SelectionEvents,
} from '@fluentui/react-components';

import { Currency } from '@/common/Currency';
import { VehicleRegisterFormState } from '@/controls/vehicles/dialog/content/register/VehicleRegisterForm';
import { FleetCard } from '@/models/FleetCard';

export interface useVehicleFormProps {
	fleetCardList: FleetCard[];
	formState: VehicleRegisterFormState;
	setFormState: (arg0: VehicleRegisterFormState) => void;
}

export const useVehicleForm = (props: useVehicleFormProps) => {
	const { formState, setFormState, fleetCardList } = props;

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
			fleetCard:
				fleetCardList.find((card) => card.Id === (data.optionValue ? Number.parseInt(data.optionValue) : -1)) ||
				undefined,
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
