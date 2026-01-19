import Loader from "./components/Loader";
import Main from "./components/Main";
import { Suspense } from "react";
import { FaCloudSun, FaReact } from "react-icons/fa";
import { IoMdArrowDropright } from "react-icons/io";
import { BiLogoTailwindCss } from "react-icons/bi";
import { CiAt } from "react-icons/ci";

const App = () => {
  return (
    <div className="flex items-center justify-center flex-col p-15 h-screen w-full font-jetMono relative">
      <div className="text-2xl mb-10 flex items-center gap-2 relative">
        <h1 className=" before:content-[''] before:w-0 before:h-1 before:bg-red-500 before:absolute before:bottom-0 before:left-0 before:transition-all before:duration-300 hover:before:w-full before:opacity-0 hover:before:opacity-100 cursor-pointer rounded-3xl px-4 py-2 flex items-center gap-2">
          <FaCloudSun /> Weather App
        </h1>
      </div>

      <p className="absolute top-10 right-10 p-4 flex items-center gap-3 rounded-2xl border">
        Built with
        <span className="relative group">
          <FaReact className="text-blue-500 animate-spin cursor-pointer text-2xl" />

          <span
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                 rounded bg-black px-2 py-1 text-xs text-white
                 opacity-0 group-hover:opacity-100
                 transition-opacity duration-200"
          >
            React
          </span>
        </span>
        <span className="relative group">
          <BiLogoTailwindCss className="text-blue-400 cursor-pointer text-2xl" />

          <span
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                 rounded bg-black px-2 py-1 text-xs text-white
                 opacity-0 group-hover:opacity-100
                 transition-opacity duration-200"
          >
            Tailwind 
          </span>
        </span>
      </p>

      <p className="text-xl flex items-center absolute left-10 bottom-10 border px-4 py-2 rounded-2xl gap-2 ">
        Github <IoMdArrowDropright />{" "}
        <a
          href="https://github.com/vathsavv56/React-weather"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:underline hover:underline-offset-2 "
        >
          <CiAt /> vathsavv56
        </a>
      </p>
      <Suspense fallback={<Loader />}>
        <Main />
        {/* <Loader/> */}
      </Suspense>
    </div>
  );
};

export default App;
