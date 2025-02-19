import { api } from "@/api/api";
import { Bounce, toast } from "react-toastify";

type ContactProps = {
  name: string;
  email: string;
  message: string;
};

export async function addContact(contact: ContactProps) {
  try {
    await api.post("/contact/create", contact);
    toast.success("Your feedback has been submitted", {
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
