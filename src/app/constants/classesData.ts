export type CarClassesProps = {
  id: number;
  className: string;
  carName: string;
  carImage: string;
  maxLugage: number;
  maxPassengers: number;
  value: number;
};

export const carsClasses: CarClassesProps[] = [
  {
    id: 1,
    className: "Business Class",
    carName: "Toyota RAV4",
    carImage: "/mercedesBenz.svg",
    maxLugage: 5, // em litros
    maxPassengers: 5,
    value: 300, // em dólares
  },
  {
    id: 2,
    className: "First Class",
    carName: "Honda Accord",
    carImage: "/mercedesBenz.svg",
    maxLugage: 4, // em litros
    maxPassengers: 5,
    value: 250, // em dólares
  },
  {
    id: 3,
    className: "Eletric Class",
    carName: "Ford Fiesta",
    carImage: "/mercedesBenz.svg",
    maxLugage: 3, // em litros
    maxPassengers: 5,
    value: 200, // em dólares
  },
];
