import * as React from 'react';

import { Vehicle } from '@/models/Vehicle';

import { InputField } from '@/controls/InputField';
import { moneyFormat } from '@/helpers/moneyFormat';
export interface VehicleDataFieldsProps {
	vehicle?: Vehicle;
}

export const VehicleDataFields: React.FC<VehicleDataFieldsProps> = (props) => {
	const { vehicle } = props;

	return (
		<>
			<InputField
				label={'Chapa'}
				value={vehicle?.Plate}
			/>
			<InputField
				label={'Marca'}
				value={vehicle?.Brand}
			/>
			<InputField
				label={'Modelo'}
				value={vehicle?.Model}
			/>
			<InputField
				label={'Año'}
				value={vehicle?.ModelYear}
			/>
			<InputField
				label={'Fecha de Adquisición'}
				value={
					vehicle?.BuyDate
						? new Date(vehicle.BuyDate).toLocaleDateString('es-PY', {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
						})
						: 'Fecha no disponible'
				}
			/>
			<InputField
				label={'Costo de Adquisición'}
				value={vehicle?.Cost.toString()}
			/>
			<InputField
				label={'Moneda de Adquisición'}
				value={vehicle?.CostCurrency}
			/>
			<InputField
				label={'Usuario'}
				value={vehicle?.User}
			/>
			<InputField
				label={'Tarjeta Flota'}
				value={
					vehicle?.FleetCard
						? `Tarjeta ${vehicle.FleetCard?.Id} - ${
								vehicle.FleetCard?.CardNumber
						} - Monto Asignado: ${moneyFormat('es-PY', vehicle.FleetCard?.AssignedValue, 'Gs')}`
						: 'Sin Asignar'
				}
			/>
			<InputField
				label='Fecha de Vencimiento de Habilitacion'
				value={
					vehicle?.VehicleLicenseExpirationDate
						? new Date(vehicle.VehicleLicenseExpirationDate).toLocaleDateString('es-PY', {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
						})
						: 'Fecha no disponible'
				}
			/>
            <InputField
				label='Fecha de Vencimiento del Seguro'
				value={
					vehicle?.InsuranceExpirationDate
						? new Date(vehicle.InsuranceExpirationDate).toLocaleDateString('es-PY', {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
						})
						: 'Fecha no disponible'
				}
			/>
            <InputField 
                label='Valor Asegurado' 
                value={vehicle?.InsuratedValue}/>
            <InputField 
                label='Moneda Valor Asegurado' 
                value={vehicle?.InsuratedValueCurrency}/>
            <InputField 
                label='Fecha de Vencimiento del Extintor' 
                value={
                    vehicle?.FireExtinguisherExpirationDate
						? new Date(vehicle.FireExtinguisherExpirationDate).toLocaleDateString('es-PY', {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
						})
						: 'Fecha no disponible'
                }
            />
            <InputField 
                label='Fecha de Vencimiento Habilitacion Dinatran' 
                value={
                    vehicle?.DinatranExpirationDate
						? new Date(vehicle.DinatranExpirationDate).toLocaleDateString('es-PY', {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
						})
						: 'Fecha no disponible'
                }
            />
		</>
	);
};
