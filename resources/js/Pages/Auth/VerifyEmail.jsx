import GuestLayout from "@/Layouts/GuestLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link, useForm } from "@inertiajs/react";

export default function VerifyEmail({ status }) {
  const { post, processing } = useForm({});

  const submit = (e) => {
    e.preventDefault();

    post(route("verification.send"));
  };

  return (
    <GuestLayout>
      <Head title="Email Verification" />
      <div className=" w-full flex flex-col justify-center items-start md:items-center min-h-[200px] flex-1">
        <div className="mb-4 text-lg text-center md:text-left text-gray-600 dark:text-gray-400">
          Thanks for signing up! Before getting started, could you verify your
          email address by clicking on the link we just emailed to you? If you
          didn't receive the email, we will gladly send you another.
        </div>

        {status === "verification-link-sent" && (
          <div className="mb-4 font-medium text-green-600 dark:text-green-400">
            A new verification link has been sent to the email address you
            provided during registration.
          </div>
        )}

        <form onSubmit={submit} className=" w-full pt-8 md:pt-0 relative px-4">
          <div className="mt-4 flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between">
            <PrimaryButton disabled={processing}>
              Resend Verification Email
            </PrimaryButton>

            <Link
              href={route("logout")}
              method="post"
              as="button"
              className="underline text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
            >
              Log Out
            </Link>
          </div>
        </form>
      </div>
    </GuestLayout>
  );
}
