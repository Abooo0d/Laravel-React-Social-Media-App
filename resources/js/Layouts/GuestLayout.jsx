import ApplicationLogo from "@/Components/ApplicationLogo";
import LoginDivider from "@/Components/Shared/LoginDevider";
import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
  return (
    <div className="min-h-screen max-h-screen flex md:justify-center justify-start md:items-center items-start sm:pt-0 text-gray-300 bg-gray-100 dark:bg-homeFeed">
      <div className="md:border-[1px] md:border-solid border-gray-700 rounded-lg relative w-full md:w-fit md:max-w-[700px] bg-chat-pattern bg-cover overflow-auto md:mt-6 flex flex-col md:flex-row max-md:min-h-[100vh] md:justify-center md:items-center">
        <div className="absolute inset-0 bg-gray-900/60 min-w-[300px]" />
        <Link href="/">
          <div className="flex flex-col justify-center items-center flex-1 h-full max-md:min-h-[230px] mx-16 relative z-10 max-md:pb-8 mt-12 mb-8 md:mt-0 md:mb-0">
            <img
              src="/Logo_dark.png"
              className="block w-32 h-32 object-cover"
            />
            <h3 className="text-gray-500 text-[40px] font-bold m-0 p-0 h-[50px] mt-[-20px] md:mt-0 w-[200px] md:w-[120px] flex justify-center items-center">
              Chatter
            </h3>
          </div>
        </Link>
        <div className="relative md:border-l-[1px] border-solid border-gray-700 flex md:justify-center md:items-center justify-start items-start bg-white dark:bg-homeFeed md:dark:bg-gray-900 flex-1 w-full z-10 sm:rounded-lg px-4 py-4 min-h-[200px] min-w-[400px]">
          <LoginDivider />
          {children}
        </div>
      </div>
    </div>
  );
}
