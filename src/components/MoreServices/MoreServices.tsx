import { getOurServices } from "@/domain/OurServices.ts/OurServices";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

export default function MoreServices() {
  const ourServices = useQuery({
    queryKey: ["getOurServices"],
    queryFn: getOurServices,
  });

  return (
    <div className="w-full bg-gray1 flex flex-col justify-center items-center h-[800px]">
      <div className="lg:w-[80%] w-[90%] flex flex-col justify-between items-center ">
        <div className="w-full flex flex-row justify-between items-center mb-16">
          <h1 className="text-black text-3xl font-ppMonument">More services</h1>
          <Link
            href={"/OurServices"}
            className="hidden lg:flex justify-center items-center px-4 py-2 font-light text-sm bg-black hover:opacity-80 text-gray1 rounded-full"
          >
            See All Services
          </Link>
        </div>

        <div className="w-full flex flex-col justify-center items-center divide-y divide-gray2/50">
          {ourServices.data?.map((service, index) => (
            <div
              key={index}
              className="w-full flex flex-row justify-between items-center"
            >
              <h1 className="text-2xl font-bold text-black my-8">
                {service.title}
              </h1>
              <Link href={`/OurServices/ServicePage/${service.id}`}>
                <FaArrowRight className="w-10 h-10 text-gray2 p-2 border border-black rounded-full hover:bg-black hover:text-gray1" />
              </Link>
            </div>
          ))}
        </div>
        <Link
          href={"/OurServices"}
          className="lg:hidden flex justify-center items-center px-4 py-3 font-light text-sm bg-black hover:opacity-80 text-gray1 rounded-full"
        >
          See All Services
        </Link>
      </div>
    </div>
  );
}
