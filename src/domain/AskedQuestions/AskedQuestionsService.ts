import { api } from "@/api/api";

type AskedQuestionProps = {
  question: string;
  answer: string;
};

export async function getAskedQuestions() {
  try {
    const { data } = await api.get<AskedQuestionProps[]>(
      "/frequently-questions"
    );
    return data;
  } catch (error) {
    console.error(error);
  }
}
