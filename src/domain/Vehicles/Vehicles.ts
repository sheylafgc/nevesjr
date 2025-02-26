import { api } from "@/api/api";

export type VehicleProps = {
  id: number;
  car_name: string;
  car_type: string;
  quantity_seats: string;
  quantity_luggage: string;
  car_image: string;
  price_km: string;
  price_hour: string;
  car_overview: string;
  car_amenities: string;
  car_best_for_services: string;
};

export async function getVehicles() {
  try {
    const { data } = await api.get<VehicleProps[]>("/vehicle");
    return data;
  } catch (error) {
    console.error(error);
  }
}
