import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function BeAPartner() {
  const router = useRouter();

  return (
    <div className="w-full bg-becomePartner h-96 bg-center lg:bg-current bg-cover">
      <div className="w-full h-96 bg-gradient-to-l flex items-center justify-center from-transparent via-gray4 via-80% to-black">
        <div className="w-[90%] lg:w-[80%] flex flex-col gap-4 lg:gap-5 text-left">
          <h1 className="text-2xl lg:text-3xl font-ppMonument text-gray1 leading-s50 lg:leading-s56">
            Join Neves Jr <br /> and become our <br /> partner!
          </h1>
          <div className="w-full">
            <Button
              onClick={() => router.push("/pages/Contact/BecomeAPartner")}
              className="lg:w-auto w-full rounded-full px-8 lg:mt-0 mt-5 lg:py-0 py-5 bg-gray2 lg:px-10 hover:bg-gray1 hover:text-black"
            >
              See more
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
