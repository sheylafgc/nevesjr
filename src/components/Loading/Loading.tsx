import { ClipLoader } from "react-spinners";

interface LoadingProps {
  variant?: "dark" | "light";
}

export default function Loading({ variant = "dark" }: LoadingProps) {
  return (
    <div className="w-full h-auto py-40 flex justify-center items-center gap-10">
      <ClipLoader size={40} color={variant === "dark" ? "#2B313C" : "white"} />
      <h1
        className={`text-2xl ${
          variant === "dark" ? "text-gray4" : "text-white"
        }`}
      >
        Loading ...
      </h1>
    </div>
  );
}
