import * as React from 'react';

import { InterventionTypeRegisterFormState } from '@/controls/interventionTypes/dialog/content/register/InterventionTypeRegisterForm';
import { InputOnChangeData } from '@fluentui/react-input';

export interface useInterventionTypeFormProps {
    formState: InterventionTypeRegisterFormState;
    setFormState: (arg0: InterventionTypeRegisterFormState) => void;
}

export const useInterventionTypeForm = (props: useInterventionTypeFormProps) => {
    const {formState, setFormState} = props;

   const handleInputChanges = (ev: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData): void => {
        if (!ev.target.getAttribute('name')) {
            return;
        }
   
        const name = ev.target.getAttribute('name');
   
        setFormState({ ...formState, [name!!]: data.value });
    };

    return {handleInputChanges}
}