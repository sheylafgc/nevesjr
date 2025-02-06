import Discover from "@/components/Discover/Discover";
import Image from "next/image";
import AboutImage from "../../../../../public/WallMockup.svg";
import MenInACar from "../../../../../public/personalTravel.svg";
import { whatPeopleSays } from "@/app/constants/WhatPeopleSays";

export default function About() {
  return (
    <div className="flex justify-center items-center w-full flex-col">
      <div className="w-full flex justify-center items-center lg:py-0 py-20 lg:h-[540px] bg-gradient-to-r from-gray4 to-black">
        <div className="lg:w-[80%] w-[90%] flex flex-col lg:flex-row items-center justify-around mt-20">
          <div className="flex flex-col items-start justify-between gap-2">
            <h1 className="text-3xl font-ppMonument text-gray1">About us</h1>
            <p className="font-light text-gray1 text-sm">
              Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit,
              sed do eiusmod tempor <br /> incididunt ut labore et dolore magna
              aliqua. Ut <br /> enim ad minim veniam, quis nostrud <br />{" "}
              exercitation ullamco laboris nisi ut aliquip ex <br /> ea commodo
              consequat.
            </p>
          </div>
          <Image
            unoptimized
            priority
            width={660}
            height={440}
            src={AboutImage}
            alt="NevesJr about video"
            className="rounded-3xl mt-10 lg:mt-52"
          />
        </div>
      </div>

      <div className="lg:w-[80%] w-[90%] flex flex-col lg:flex-row justify-between items-center lg:h-[600px] lg:py-0 py-20">
        <div className="w-full flex flex-col lg:flex-row justify-between items-end lg:gap-0 gap-3">
          <h1 className="font-ppMonument text-3xl text-black leading-s50">
            Lorem ipsum dolor sit <br /> amet, consectetur <br /> adipiscing
            elit, sed do <br /> eiusmod tempor <br /> incididunt{" "}
          </h1>
          <p className="text-sm text-gray2 font-light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do{" "}
            <br /> eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut <br /> enim ad minim veniam, quis nostrud exercitation ullamco
            laboris <br /> nisi ut aliquip ex ea commodo consequat. Duis aute
            irure dolor in <br /> reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla <br /> pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in <br /> culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
        </div>
      </div>
      <div className="w-full flex flex-row justify-center items-center lg:h-[700px] lg:py-0 py-20 bg-black">
        <div className="lg:w-[80%] w-[90%] flex flex-col lg:flex-row justify-around items-start lg:gap-0 gap-8">
          <Image
            unoptimized
            priority
            width={600}
            src={MenInACar}
            alt="men in a car"
            className="rounded-xl"
          />
          <div className="flex flex-col ">
            <h1 className="font-ppMonument leading-s50 text-3xl text-gray1">
              OUR <br /> COMMITMENT
            </h1>
            <p className="text-gray1 text-sm font-light">
              Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit,
              sed do eiusmod tempor incididunt <br /> ut labore et dolore magna
              aliqua. Ut enim ad <br /> minim veniam, quis nostrud exercitation
              ullamco <br /> laboris nisi ut aliquip ex ea commodo consequat.{" "}
              <br /> Duis aute irure dolor in reprehenderit in voluptate <br />{" "}
              velit esse cillum dolore eu fugiat nulla pariatur. <br />{" "}
              Excepteur sint occaecat cupidatat non proident, <br />
              sunt in culpa qui officia deserunt mollit anim id est <br />{" "}
              laborum.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col lg:flex-row justify-center items-center lg:h-[600px] my-20 lg:my-16">
        <div className="lg:w-[80%] w-[90%] flex flex-col lg:flex-row justify-between items-center rounded-xl shadow-sm bg-gray1">
          <div className="flex flex-col items-start pt-16 p-5 lg:p-10">
            <h1 className="leading-s50 font-ppMonument text-black text-3xl mb-3 lg:mb-10">
              Lorem ipsum dolor sit <br /> amet, consectetur <br /> adipiscing
              elit
            </h1>
            <p className="text-gray2 text-sm font-light">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod <br /> tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim <br /> veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea <br /> commodo consequat. Duis aute
              irure dolor in reprehenderit in voluptate <br /> velit esse cillum
              dolore eu fugiat nulla pariatur. Excepteur sint occaecat <br />{" "}
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est <br /> laborum.
            </p>
          </div>
          <div className="lg:w-[450px] w-full h-[300px] lg:h-[450px] bg-travelImage bg-cover object-cover rounded-b-xl lg:rounded-none lg:rounded-r-xl shadow-sm" />
        </div>
      </div>

      <div className="w-full bg-gray1 lg:h-screen lg:py-0 py-20 flex flex-col justify-center items-center">
        <div className="lg:w-[80%] w-[90%] flex flex-col justify-center items-center">
          <div className="flex flex-col items-center justify-between gap-8">
            <h1 className="text-black font-ppMonument text-3xl">
              MEET OUR TEAM
            </h1>
            <p className="text-gray2 text-sm font-light">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do{" "}
              <br /> eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
            </p>
          </div>

          <div className="w-full flex flex-col lg:flex-row lg:gap-0 gap-10 justify-around items-center mt-20">
            {whatPeopleSays.map((person, index) => (
              <div
                key={index}
                className="flex flex-col justify-between items-center"
              >
                <Image
                  unoptimized
                  priority
                  width={250}
                  height={250}
                  src={person.imageUrl}
                  alt={person.name}
                  className="rounded-full mb-5"
                />
                <h1 className="text-gray2">{person.name}</h1>
                <span className="text-gray2 text-sm font-light">
                  {person.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Discover />
    </div>
  );
}
