import { columns, TripDataProps } from "@/components/Columns/Columns";
import DataTable from "@/components/DataTable/DataTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

async function getData(): Promise<TripDataProps[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      from: "São Paulo",
      to: "Rio de Janeiro",
      dateTime: {
        date: "2023-10-15",
        time: "08:00",
      },
      price: 250.0,
      paymentType: "credit_card",
      paymentStatus: "success",
      invoice: "INV-001",
      rideClassData: {
        id: 1,
        className: "Standard",
        carName: "Toyota Corolla",
        carImage: "/mercedesBenz.svg",
        maxLugage: 2,
        maxPassengers: 4,
        value: 250.0,
      },
    },
    {
      id: "2",
      from: "Belo Horizonte",
      to: "Curitiba",
      dateTime: {
        date: "2023-10-20",
        time: "14:30",
      },
      price: 300.0,
      paymentType: "debit_card",
      paymentStatus: "pending",
      invoice: "INV-002",
      rideClassData: {
        id: 2,
        className: "Premium",
        carName: "BMW X5",
        carImage: "/mercedesBenz.svg",
        maxLugage: 3,
        maxPassengers: 5,
        value: 300.0,
      },
    },
    {
      id: "3",
      from: "Porto Alegre",
      to: "Florianópolis",
      dateTime: {
        date: "2023-10-25",
        time: "10:00",
      },
      price: 150.0,
      paymentType: "pix",
      paymentStatus: "processing",
      invoice: "INV-003",
      rideClassData: {
        id: 3,
        className: "Economy",
        carName: "Fiat Uno",
        carImage: "/mercedesBenz.svg",
        maxLugage: 1,
        maxPassengers: 3,
        value: 150.0,
      },
    },
    {
      id: "4",
      from: "Recife",
      to: "Salvador",
      dateTime: {
        date: "2023-11-01",
        time: "12:00",
      },
      price: 200.0,
      paymentType: "credit_card",
      paymentStatus: "failed",
      invoice: "INV-004",
      rideClassData: {
        id: 4,
        className: "Standard",
        carName: "Honda Civic",
        carImage: "/mercedesBenz.svg",
        maxLugage: 2,
        maxPassengers: 4,
        value: 200.0,
      },
    },
    {
      id: "5",
      from: "Fortaleza",
      to: "Natal",
      dateTime: {
        date: "2023-11-05",
        time: "09:00",
      },
      price: 180.0,
      paymentType: "debit_card",
      paymentStatus: "success",
      invoice: "INV-005",
      rideClassData: {
        id: 5,
        className: "Economy",
        carName: "Chevrolet Onix",
        carImage: "/mercedesBenz.svg",
        maxLugage: 1,
        maxPassengers: 3,
        value: 180.0,
      },
    },
    {
      id: "6",
      from: "Manaus",
      to: "Belém",
      dateTime: {
        date: "2023-11-10",
        time: "16:00",
      },
      price: 220.0,
      paymentType: "pix",
      paymentStatus: "pending",
      invoice: "INV-006",
      rideClassData: {
        id: 6,
        className: "Standard",
        carName: "Volkswagen Gol",
        carImage: "/mercedesBenz.svg",
        maxLugage: 2,
        maxPassengers: 4,
        value: 220.0,
      },
    },
    {
      id: "7",
      from: "Brasília",
      to: "Goiânia",
      dateTime: {
        date: "2023-11-15",
        time: "07:30",
      },
      price: 120.0,
      paymentType: "credit_card",
      paymentStatus: "success",
      invoice: "INV-007",
      rideClassData: {
        id: 7,
        className: "Economy",
        carName: "Renault Kwid",
        carImage: "/mercedesBenz.svg",
        maxLugage: 1,
        maxPassengers: 3,
        value: 120.0,
      },
    },
    {
      id: "8",
      from: "Campinas",
      to: "Santos",
      dateTime: {
        date: "2023-11-20",
        time: "11:00",
      },
      price: 90.0,
      paymentType: "debit_card",
      paymentStatus: "processing",
      invoice: "INV-008",
      rideClassData: {
        id: 8,
        className: "Standard",
        carName: "Hyundai HB20",
        carImage: "/mercedesBenz.svg",
        maxLugage: 2,
        maxPassengers: 4,
        value: 90.0,
      },
    },
    {
      id: "9",
      from: "Vitória",
      to: "Cabo Frio",
      dateTime: {
        date: "2023-11-25",
        time: "13:00",
      },
      price: 280.0,
      paymentType: "pix",
      paymentStatus: "success",
      invoice: "INV-009",
      rideClassData: {
        id: 9,
        className: "Premium",
        carName: "Audi A4",
        carImage: "/mercedesBenz.svg",
        maxLugage: 3,
        maxPassengers: 5,
        value: 280.0,
      },
    },
    {
      id: "10",
      from: "Curitiba",
      to: "São Paulo",
      dateTime: {
        date: "2023-12-01",
        time: "17:00",
      },
      price: 210.0,
      paymentType: "credit_card",
      paymentStatus: "failed",
      invoice: "INV-010",
      rideClassData: {
        id: 10,
        className: "Standard",
        carName: "Ford Ka",
        carImage: "/mercedesBenz.svg",
        maxLugage: 2,
        maxPassengers: 4,
        value: 210.0,
      },
    },
  ];
}

export default async function Internal() {
  const data = await getData();

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="lg:w-[80%] w-[90%] flex flex-col justify-center items-center py-32">
        <Tabs defaultValue="Upcoming" className="w-full ">
          <TabsList className="my-4 border-b">
            <TabsTrigger value="Upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="Past">Past</TabsTrigger>
            <TabsTrigger value="Canceled">Canceled</TabsTrigger>
          </TabsList>
          <TabsContent value="Upcoming">
            <div className="container mx-auto">
              <DataTable columns={columns} data={data} />
            </div>
          </TabsContent>
          <TabsContent value="Past">
            <div className="container mx-auto">
              <DataTable columns={columns} data={data} />
            </div>
          </TabsContent>
          <TabsContent value="Canceled">Canceled</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
