import Loader from "./components/Loader";
import Main from "./components/Main";
import { Suspense } from "react";
import { FaCloudSun, FaReact } from "react-icons/fa";
import { IoMdArrowDropright } from "react-icons/io";
import { BiLogoTailwindCss } from "react-icons/bi";
import { CiAt } from "react-icons/ci";

const App = () => {
  return (
    <div className="flex items-center justify-center flex-col px-4 py-8 min-h-screen w-full font-jetMono relative bg-linear-to-br from-blue-50 to-indigo-100">
      {/* App Title */}
      <div className="text-xl sm:text-2xl lg:text-3xl mb-6 sm:mb-8 lg:mb-10 flex items-center gap-2 relative z-10">
        <h1 className="before:content-[''] before:w-0 before:h-1 before:bg-red-500 before:absolute before:bottom-0 before:left-0 before:transition-all before:duration-300 hover:before:w-full before:opacity-0 hover:before:opacity-100 cursor-pointer rounded-3xl px-3 py-2 sm:px-4 sm:py-2 flex items-center gap-2">
          <FaCloudSun className="text-lg sm:text-xl lg:text-2xl" />
          <span className="text-base sm:text-xl lg:text-2xl">Weather App</span>
        </h1>
      </div>

      {/* Tech Stack Badge */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-10 lg:right-10">
        <p className="p-2 sm:p-3 lg:p-4 flex items-center gap-2 sm:gap-3 rounded-2xl border bg-white/80 backdrop-blur-sm text-xs sm:text-sm lg:text-base">
          <span className="hidden sm:inline">Built with</span>
          <span className="sm:hidden">Built w/</span>
          <span className="relative group">
            <FaReact className="text-blue-500 animate-spin cursor-pointer text-lg sm:text-xl lg:text-2xl" />
            <span
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                   rounded bg-black px-2 py-1 text-xs text-white
                   opacity-0 group-hover:opacity-100
                   transition-opacity duration-200 whitespace-nowrap"
            >
              React
            </span>
          </span>
          <span className="relative group">
            <BiLogoTailwindCss className="text-blue-400 cursor-pointer text-lg sm:text-xl lg:text-2xl" />
            <span
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                   rounded bg-black px-2 py-1 text-xs text-white
                   opacity-0 group-hover:opacity-100
                   transition-opacity duration-200 whitespace-nowrap"
            >
              Tailwind
            </span>
          </span>
        </p>
      </div>

      {/* GitHub Link */}
      <div className="absolute left-4 bottom-4 sm:left-6 sm:bottom-6 lg:left-10 lg:bottom-10">
        <p className="text-xs sm:text-sm lg:text-base xl:text-lg flex items-center border px-3 py-2 sm:px-4 sm:py-2 rounded-2xl gap-1 sm:gap-2 bg-white/80 backdrop-blur-sm">
          <span className="hidden sm:inline">Github</span>
          <span className="sm:hidden">GH</span>
          <IoMdArrowDropright className="text-sm sm:text-base" />
          <a
            href="https://github.com/vathsavv56/React-weather"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:underline hover:underline-offset-2"
          >
            <CiAt className="text-sm sm:text-base" />
            <span className="text-xs sm:text-sm lg:text-base">vathsavv56</span>
          </a>
        </p>
      </div>
      <Suspense fallback={<Loader />}>
        <Main />
        {/* <Loader/> */}
      </Suspense>
    </div>
  );
};

export default App;
