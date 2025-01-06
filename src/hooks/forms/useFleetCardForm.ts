import { FleetCardRegisterFormState } from '@/controls/fleetCards/dialog/content/register/FleetCardRegisterForm';
import { InputOnChangeData } from '@fluentui/react-input';
import * as React from 'react';

export interface useFleetCardFormProps {
    formState: FleetCardRegisterFormState;
    setFormState: (arg0: FleetCardRegisterFormState) => void;
}

export const useFleetCardForm = (props:useFleetCardFormProps) => {
    const { formState, setFormState} = props;
    
        const handleInputChanges = (ev: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData): void => {
            if (!ev.target.getAttribute('name')) {
                return;
            }
            
            const name = ev.target.getAttribute('name');
            setFormState({ ...formState, [name!!]: data.value });
        };
    
        return { handleInputChanges };
}