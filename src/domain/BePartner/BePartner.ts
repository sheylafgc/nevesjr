import { api } from "@/api/api";
import { Bounce, toast } from "react-toastify";

type PartnerProps = {
  name: string;
  email: string;
  phone: string;
  car_model: string;
};

export async function addPartner(partner: PartnerProps) {
  try {
    await api.post("/be-partner/create", partner);
    toast.success("Your data was sent", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  } catch (error) {
    console.error(error);
    toast.error("An error occurred", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }
}
