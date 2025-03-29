import { api } from "@/src/api/api";
import { getTranslations } from "next-intl/server";
import { Bounce, toast } from "react-toastify";

type ContactProps = {
  name: string;
  email: string;
  message: string;
};

export async function addContact(contact: ContactProps, locale: string) {
  try {
    const tToast = await getTranslations({ locale, namespace: "Toasts" });
    await api.post("/contact/create", contact);
    toast.success(tToast("feedback_submitted"), {
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
