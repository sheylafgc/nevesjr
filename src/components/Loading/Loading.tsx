import { ClipLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="w-full h-screen flex justify-center items-center gap-10">
      <ClipLoader size={40} />
      <h1 className="text-2xl text-black ">Loading ...</h1>
    </div>
  );
}
