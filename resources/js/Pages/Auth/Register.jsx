import { useEffect, useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { PrimaryButton } from "@/Components/Shared/Buttons";
import { useMainContext } from "@/Contexts/MainContext";

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformation, setConformation] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirm, setHideConfirm] = useState(true);
  const { setErrors } = useMainContext();
  useEffect(() => {
    return () => {
      reset("password", "password_confirmation");
    };
  }, []);
  useEffect(() => {
    setData({
      name: name,
      email: email,
      password: password,
      password_confirmation: conformation,
    });
  }, [name, email, password, conformation]);
  const submit = (e) => {
    e.preventDefault();
    post(route("register"), {
      onError: (error) => {
        setErrors([error?.response?.data?.message || "Some Thing Went Wrong"]);
      },
    });
  };
  return (
    <GuestLayout>
      <Head title="Register" />
      <form onSubmit={submit} className=" w-full relative px-4">
        <h2 className=" w-full flex justify-center items-center text-gray-300 text-[24px] font-bold m-0 p-0">
          Create New Account
        </h2>
        <div>
          <InputLabel htmlFor="name" value="Name" />
          <TextInput
            id="name"
            name="name"
            value={name}
            setValue={setName}
            classes="mt-1 block w-full"
            autoComplete="name"
            isFocused={true}
            onChange={(e) => setData("name", e.target.value)}
            required
          />
          <InputError message={errors.name} className="mt-2" />
        </div>
        <div className="mt-4">
          <InputLabel htmlFor="email" value="Email" />
          <TextInput
            id="email"
            type="email"
            name="email"
            value={email}
            setValue={setEmail}
            classes="mt-1 block w-full"
            autoComplete="username"
            onChange={(e) => setData("email", e.target.value)}
            required
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
              autoComplete="new-password"
              onChange={(e) => setData("password", e.target.value)}
              required
              hidePassword={hidePassword}
            />
            <span
              className="absolute top-[6px] right-[6px] px-2 py-2 z-[10] w-[30px] h-[30px] flex justify-center items-center bg-gray-300 hover:bg-gray-400/50 text-gray-800 border-gray-400 dark:bg-gray-800 dark:hover:bg-gray-800 dark:text-gray-200 font-thin duration-200 border-[1px] border-solid dark:border-gray-700 rounded-md cursor-pointer"
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
        <div className="mt-4">
          <InputLabel
            htmlFor="password_confirmation"
            value="Confirm Password"
          />
          <div className="relative w-full">
            <TextInput
              id="password_confirmation"
              type="password"
              name="password_confirmation"
              value={conformation}
              setValue={setConformation}
              classes="mt-1 block w-full"
              autoComplete="new-password"
              onChange={(e) => setData("password_confirmation", e.target.value)}
              required
              hidePassword={hideConfirm}
            />
            <span
              className="absolute top-[6px] right-[6px] px-2 py-2 z-[10] w-[30px] h-[30px] flex justify-center items-center bg-gray-300 hover:bg-gray-400/50 text-gray-800 border-gray-400 dark:bg-gray-800 dark:hover:bg-gray-800 dark:text-gray-200 font-thin duration-200 border-[1px] border-solid dark:border-gray-700 rounded-md cursor-pointer"
              onClick={() => {
                setHideConfirm((prev) => {
                  return !prev;
                });
              }}
            >
              <FaRegEye
                className={`absolute duration-200 ${
                  hideConfirm ? "opacity-0 invisible" : "opacity-100 visible"
                }`}
              />
              <FaRegEyeSlash
                className={`absolute duration-200 ${
                  !hideConfirm ? "opacity-0 invisible" : "opacity-100 visible"
                }`}
              />
            </span>
          </div>
          <InputError message={errors.password_confirmation} className="mt-2" />
        </div>
        <div className="flex items-center justify-end mt-4">
          <p
            href={route("login")}
            className="underline text-sm text-gray-600 dark:text-gray-400  rounded-md  cursor-default"
          >
            Already registered?
          </p>
          <Link
            href={route("login")}
            className={`ms-4 inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-md font-semibold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none disabled:opacity-25 transition ease-in-out duration-150 `}
          >
            LogIn
          </Link>
          <PrimaryButton classes=" ms-4 px-4 py-2 text-xs font-semibold uppercase">
            SignUp
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
}
