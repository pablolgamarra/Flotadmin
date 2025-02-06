import * as React from 'react';

import { FleetCardRegisterFormState } from '@/controls/fleetCards/dialog/content/register/FleetCardRegisterForm';
import { Vehicle } from '@/models/Vehicle';
import { OptionOnSelectData, SelectionEvents } from '@fluentui/react-combobox';
import { InputOnChangeData } from '@fluentui/react-input';

export interface useFleetCardFormProps {
    vehicleList:Vehicle[]
    formState: FleetCardRegisterFormState;
    setFormState: (arg0: FleetCardRegisterFormState) => void;
}

export const useFleetCardForm = (props:useFleetCardFormProps) => {
    const { formState, vehicleList, setFormState} = props;
    
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
                    assignedVehicle:
                        vehicleList?.find((vehicle) => vehicle.Id === (data.optionValue ? Number.parseInt(data.optionValue) : -1))
                });
            };
    
        return { handleInputChanges, handleDropdownChanges };
}