import { api } from "@/api/api";

type FeedbackProps = {
  id: number;
  name: string;
  occupation: string;
  user_image: string;
  opinion: string;
};

export async function getFeedback() {
  try {
    const { data } = await api.get<FeedbackProps[]>("/feedback");
    return data;
  } catch (error) {
    console.error(error);
  }
}
