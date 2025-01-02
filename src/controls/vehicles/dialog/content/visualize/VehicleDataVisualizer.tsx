import * as React from 'react';

import { Currency } from '@/common/Currency';
import { useDataContext } from '@/hooks/useDataContext';
import { useInterventionList } from '@/hooks/useInterventionList';
import { FleetCard } from '@/models/FleetCard';
import { Vehicle } from '@/models/Vehicle';
import { Body1, Divider, Spinner, Title3 } from '@fluentui/react-components';
import { VehicleDataFields } from './VehicleDataFields';
import { VehicleDataInteractions } from './VehicleDataInteractions';

export interface VehicleDataFormProps {
	vehicle?: Vehicle;
}

export interface FormState {
	plate: string;
	brand: string;
	model: string;
	modelYear: number;
	adquisitionDate: Date;
	adquisitionCost: number;
	costCurrency: Currency;
	user: string;
	fleetCard: FleetCard;
}

export const VehicleDataVisualizer: React.FC<VehicleDataFormProps> = (props) => {
	const { vehicle } = props;

	const { interventionsService } = useDataContext();

	const { isLoading, interventionList } = useInterventionList(interventionsService, vehicle?.Id);
    const hasInterventions = interventionList.length > 0;
    const noInterventions = !isLoading && !hasInterventions;

    return (
        <>
            <VehicleDataFields vehicle={vehicle} />

            <Divider className="tw-mt-5" title="Intervenciones" alignContent="start" />

            {isLoading && (
                <Spinner label="Leyendo Interacciones del Vehículo" size="tiny" />
            )}

            {hasInterventions && (
                <>
                    <Title3 className="tw-flex tw-justify-center mt-5">Intervenciones del Vehículo</Title3>
                    <VehicleDataInteractions interactions={interventionList} />
                </>
            )}

            {noInterventions && (
                <Body1 className="tw-flex tw-justify-center mt-5 tw-text-gray-400">
                    Este vehículo aún no tiene intervenciones realizadas
                </Body1>
            )}
        </>
	);
};
