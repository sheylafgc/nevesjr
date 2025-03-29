import { api } from "@/src/api/api";

type AskedQuestionProps = {
  id: string;
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
