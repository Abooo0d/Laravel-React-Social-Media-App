import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";

export default function Edit({ auth, mustVerifyEmail, status }) {
  return (
    <div className="py-0">
      <div className="max-w-7xl mx-auto sm:px-2 lg:px-4 space-y-2">
        <div className="p-4 sm:p-8 bg-white dark:bg-gray-900 shadow sm:rounded-lg">
          <UpdateProfileInformationForm
            mustVerifyEmail={mustVerifyEmail}
            status={status}
            className="max-w-xl"
          />
        </div>

        <div className="p-4 sm:p-8 bg-white dark:bg-gray-900 shadow sm:rounded-lg">
          <UpdatePasswordForm className="max-w-xl" />
        </div>

        <div className="p-4 sm:p-8 bg-white dark:bg-gray-900 shadow sm:rounded-lg">
          <DeleteUserForm className="max-w-xl" />
        </div>
      </div>
    </div>
  );
}
