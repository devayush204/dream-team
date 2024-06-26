import { Boxes } from "@/components/ui/background-boxes";
import Vortex from "@/components/ui/vortex";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex justify-center items-center flex-col h-[100vh]">
      <div className="h-[100vh] relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
        {/* <div className=" absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" /> */}

        {/* <Boxes /> */}
        <Vortex
          backgroundColor="black"
          rangeY={800}
          particleCount={500}
          baseHue={120}
          className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full pointer-events-none"
        />
        <div className="absolute">
          <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 z-50">Dream Team</span> .</h1>
            <Link href="/questions" className="z-50 mt-8 cursor-pointer inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg ml-[80px] ">
            Start the Game
            <svg className="w-10 ml-3 fill-white" viewBox="0 0 24 24" ><path d="M18.54,9,8.88,3.46a3.42,3.42,0,0,0-5.13,3V17.58A3.42,3.42,0,0,0,7.17,21a3.43,3.43,0,0,0,1.71-.46L18.54,15a3.42,3.42,0,0,0,0-5.92Zm-1,4.19L7.88,18.81a1.44,1.44,0,0,1-1.42,0,1.42,1.42,0,0,1-.71-1.23V6.42a1.42,1.42,0,0,1,.71-1.23A1.51,1.51,0,0,1,7.17,5a1.54,1.54,0,0,1,.71.19l9.66,5.58a1.42,1.42,0,0,1,0,2.46Z" /></svg>
          </Link>
        </div>



      </div>
    </section>
  );
}
