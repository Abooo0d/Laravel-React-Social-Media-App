import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { useState } from "react";
import { PrimaryButton } from "@/Components/Shared/Buttons";

export default function UpdateProfileInformation({
  mustVerifyEmail,
  status,
  className = "",
}) {
  console.log(mustVerifyEmail);

  const user = usePage().props.auth.user;
  console.log(user);

  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const { data, setData, patch, errors, processing, recentlySuccessful } =
    useForm({
      name: name,
      username: username,
      email: email,
    });

  const submit = (e) => {
    e.preventDefault();

    patch(route("profile.update"));
  };

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Profile Information
        </h2>

        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Update your account's profile information and email address.
        </p>
      </header>

      <form onSubmit={submit} className="mt-6 space-y-6">
        <div>
          <InputLabel htmlFor="name" value="Name" />

          <TextInput
            placeholder={"Name"}
            setValue={setName}
            id="name"
            classes="mt-1 block w-full"
            value={name}
            required
            isFocused
            autoComplete="name"
          />

          <InputError className="mt-2" message={errors.name} />
        </div>
        <div>
          <InputLabel htmlFor="username" value="Username" />

          <TextInput
            placeholder={"Username"}
            id="username"
            classes="mt-1 block w-full"
            value={username}
            setValue={setUsername}
            required
            autoComplete="name"
          />

          <InputError className="mt-2" message={errors.username} />
        </div>

        <div>
          <InputLabel htmlFor="email" value="Email" />

          <TextInput
            placeholder={"Email"}
            id="email"
            type="email"
            classes="mt-1 block w-full"
            value={email}
            setValue={setEmail}
            required
            autoComplete="username"
          />

          <InputError className="mt-2" message={errors.email} />
        </div>

        {mustVerifyEmail && user.email_verified_at === null && (
          <div>
            <p className="text-sm mt-2 text-gray-800 dark:text-gray-200">
              Your email address is unverified.
              <Link
                href={route("verification.send")}
                method="post"
                as="button"
                className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
              >
                Click here to re-send the verification email.
              </Link>
            </p>

            {status === "verification-link-sent" && (
              <div className="mt-2 font-medium text-sm text-green-600 dark:text-green-400">
                A new verification link has been sent to your email address.
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-4">
          <PrimaryButton classes="px-4 py-2">Save</PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
          </Transition>
        </div>
      </form>
    </section>
  );
}
