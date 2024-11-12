import { Currency, Vehicle } from "@vehiclesList/types";
import * as React from "react";

//TODO: Agregar queries a DB

//Data temp para pruebas
const vehiclesList:Vehicle[] = [
    {
        Id: 1,
        Plate: "ABC 123",
        Brand: "Chevrolet",
        BuyDate: new Date("04/01/2024"), 
        Cost: 36000,
        CostCurrency: Currency.Dolar,
        FleetCard: {
            Id: 1,
            CardNumber: '1597538426',
            AsignedValue: '3000000'
        },
        Model: "S 10 C/D",
        ModelYear: "2024",
        User: "Central"
    },
    {
        Id: 2,
        Plate: "DEF 456",
        Brand: "KIA",
        BuyDate: new Date("15/03/2018"), 
        Cost: 20000,
        CostCurrency: Currency.Dolar,
        FleetCard: {
            Id: 1,
            CardNumber: '147258369',
            AsignedValue: '6000000'
        },
        Model: "SORENTO",
        ModelYear: "2019",
        User: "Central"
    },
    {
        Id: 3,
        Plate: "XYZ 789",
        Brand: "Chevrolet",
        BuyDate: new Date("20/04/2021"), 
        Cost: 36000,
        CostCurrency: Currency.Dolar,
        FleetCard: {
            Id: 1,
            CardNumber: '1597538427',
            AsignedValue: '8000000'
        },
        Model: "S 10 C/S",
        ModelYear: "2021",
        User: "Central"
    },
]

export App:React.FC = ()=>{
    return (
        <>
            
        </>
    )
}