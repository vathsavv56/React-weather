import Loader from "./components/Loader"
import Main from "./components/Main"
import { Suspense } from "react"
import { FaCloudSun } from "react-icons/fa";
const App = () => {
  return (
    <div className="flex items-center justify-center flex-col p-10 border h-screen w-full font-jetMono bg-gray-100">
      <h1 className="underline underline-offset-4 text-2xl mb-10 flex items-center gap-2"><FaCloudSun/> Simple weather app</h1>
      <Suspense fallback={<Loader/>}>
        <Main/>
        {/* <Loader/> */}
      </Suspense>   
    </div>
  )
}

export default App