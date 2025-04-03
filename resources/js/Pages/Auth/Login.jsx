import { useEffect, useState } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { useUserContext } from "@/Contexts/UserContext";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Switch } from "@headlessui/react";
import { PrimaryButton } from "@/Components/Shared/Buttons";
export default function Login({ status, canResetPassword }) {
  const { setUser } = useUserContext();
  const [hidePassword, setHidePassword] = useState(true);
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: true,
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    setUser({});
    return () => {
      reset("password");
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();
    post(route("login"));
  };

  useEffect(() => {
    data.email = email;
    data.password = password;
  }, [email, password]);
  return (
    <GuestLayout>
      <Head title="Log in" />

      {status && (
        <div className="mb-4 font-medium text-sm text-green-600">{status}</div>
      )}

      <form onSubmit={submit}>
        <div>
          <InputLabel htmlFor="email" value="Email" />

          <TextInput
            id="email"
            type="email"
            name="email"
            value={email}
            setValue={setEmail}
            classes="mt-1 block w-full"
            autoComplete="username"
            isFocused={true}
            onChange={(e) => setData("email", e.target.value)}
          />
          <InputError message={errors.email} className="mt-2" />
        </div>
        <div className="mt-4">
          <InputLabel htmlFor="password" value="Password" />
          <div className="relative w-full">
            <TextInput
              id="password"
              type="password"
              name="password"
              value={password}
              setValue={setPassword}
              classes="mt-1 block w-full"
              autoComplete="current-password"
              hidePassword={hidePassword}
              onChange={(e) => setData("password", e.target.value)}
            />
            <span
              className="absolute top-[6px] right-[6px] px-2 py-2 z-[10] w-[30px] h-[30px] flex justify-center items-center bg-gray-800 hover:bg-gray-800 text-gray-200 font-thin duration-200 border-[1px] border-solid border-gray-700 rounded-md cursor-pointer"
              onClick={() => {
                setHidePassword((prev) => {
                  return !prev;
                });
              }}
            >
              <FaRegEye
                className={`absolute duration-200 ${
                  hidePassword ? "opacity-0 invisible" : "opacity-100 visible"
                }`}
              />
              <FaRegEyeSlash
                className={`absolute duration-200 ${
                  !hidePassword ? "opacity-0 invisible" : "opacity-100 visible"
                }`}
              />
            </span>
          </div>
          <InputError message={errors.password} className="mt-2" />
        </div>
        <div className="block mt-4">
          <label className="flex items-center cursor-pointer">
            <Switch
              checked={data.remember}
              onChange={(e) => setData("remember", e)}
              className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-700/50 transition data-[checked]:bg-gray-600 duration-200"
            >
              <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
            </Switch>
            <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
              Remember me
            </span>
          </label>
        </div>
        <div className="flex items-center justify-end mt-4">
          {canResetPassword && (
            <Link
              href={route("password.request")}
              className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
            >
              Forgot your password?
            </Link>
          )}
          <Link
            href={route("register")}
            className={`ms-4 inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-md font-semibold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none disabled:opacity-25 transition ease-in-out duration-150 `}
          >
            SignUp
          </Link>
          <PrimaryButton classes=" ms-4 px-4 py-2 text-xs font-semibold uppercase">
            Login
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
}
