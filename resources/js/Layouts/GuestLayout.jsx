import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center pt-6 sm:pt-0 text-gray-300 bg-gray-100 dark:bg-gray-900">
      <div>
        <Link href="/">
          <img src="/Logo_dark.png" className="block w-16 h-16" />
        </Link>
      </div>
      <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
        {children}
      </div>
    </div>
  );
}
