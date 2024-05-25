import {FuelType, Vehicle, VehicleType} from '@carRental/models';

const initVehicles = [{
    db: 1,
    brandName: 'Ford',
    modelName: 'Kuga',
    modelYear: 2024,
    transmissionType: 'auto',
    type: VehicleType.car,
    color: 'black',
    fuelType: FuelType.diesel,
    people: 5,
    imgPath: 'assets/images/rentimg.png',
},
{
    db: 1,
    brandName: 'Peugeot',
    modelName: '408',
    modelYear: 2024,
    transmissionType: 'auto',
    type: VehicleType.car,
    color: 'blue',
    fuelType: FuelType.petrol,
    people: 5,
    imgPath: 'assets/images/rentimg2.png',
},
{
    db: 1,
    brandName: 'BMW',
    modelName: 'X1',
    modelYear: 2024,
    transmissionType: 'auto',
    type: VehicleType.car,
    color: 'white',
    fuelType: FuelType.diesel,
    people: 5,
    imgPath: 'assets/images/rentimg3.png',
}];

export class VehicleMockData {
    public static defaultVehicles: Vehicle[] = initVehicles.concat(initVehicles).concat(initVehicles) as Vehicle[];
}
