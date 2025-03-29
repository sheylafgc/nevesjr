import { api } from "@/src/api/api";
import { getTranslations } from "next-intl/server";
import { Bounce, toast } from "react-toastify";

type PartnerProps = {
  name: string;
  email: string;
  phone: string;
  car_model: string;
};

export async function addPartner(partner: PartnerProps, locale: string) {
  try {
    const tToast = await getTranslations({ locale, namespace: "Toasts" });

    await api.post("/be-partner/create", partner);
    toast.success(tToast("your_data_was_sent"), {
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
    const tToast = await getTranslations({ locale, namespace: "Toasts" });
    console.error(error);
    toast.error(tToast("an_error_occurred"), {
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
