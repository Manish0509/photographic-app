"use client";
import { useAppSelector } from "@/lib/hooks";
import Image from "next/image";

const Page = () => {
  const { individualData } = useAppSelector((state) => state.particularData);
  console.log("individualData", individualData);

  if (!individualData) {
    return (
      <div className="h-screen w-full p-6 flex items-center justify-center">
        <p className="text-lg text-red-500">Error: Data not found</p>
      </div>
    );
  }

  return (
    <div className="p-6 mt-20">
      <div className="flex md:flex-row flex-col gap-4">
        <div className="md:w-2/5 w-full rounded-lg overflow-hidden">
          <div className="w-[300px] h-[200px]">
            <Image
              src={"/next.svg"}
              width={500}
              height={760}
              alt={"work-image"}
              className="w-full "
            />
          </div>
        </div>
        <div className="md:w-3/5 w-full px-4 py-2.5">
          <div className="flex flex-col mb-10">
            <p className="font-bold text-3xl">
              {individualData?.author?.name} {individualData?.author?.surnames}
            </p>
            <p className="font-medium text-lg center">{individualData.name}</p>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1">
            <div className="border-l border-l-black">
              <div className="pl-4 pb-4">
                <p className="text-lg">Title</p>
                <p className="text-base">{individualData.name}</p>
              </div>
              <div className="pl-4 pb-4">
                <p className="text-lg">Date</p>
                <p className="text-base">{individualData.date}</p>
              </div>
              <div className="pl-4">
                <p className="text-lg">Institution</p>
                <p className="text-base">{individualData.institution.name}</p>
              </div>
            </div>
            <div className="border-l border-l-black">
              <div className="pl-4 pb-4">
                <p className="text-lg">Decades</p>
                <p className="text-base">{individualData.decades}</p>
              </div>
              <div className="pl-4 pb-4">
                <p className="text-lg">Date</p>
                <p className="text-base">{individualData.date}</p>
              </div>
              <div className="pl-4">
                <p className="text-lg">Institution</p>
                <p className="text-base">{individualData.institution.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
