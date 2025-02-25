import { VehicleProps } from "@/domain/Vehicles/Vehicles";
import { ReactNode } from "react";
import { createContext } from "vm";

type Node = {
  children: ReactNode;
};

type BookATripContextData = {
  vehicles: VehicleProps[] | null;
  setVehicles: React.Dispatch<React.SetStateAction<VehicleProps | null>>;
};

export const BlogContext = createContext({} as BookATripContextData);

export function BookATripProvider({ children }: Node) {
  return <BlogContext.Provider value={{}}>{children}</BlogContext.Provider>;
}
