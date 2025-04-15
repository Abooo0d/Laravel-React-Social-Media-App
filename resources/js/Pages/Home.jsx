import ChatsBar from "@/Components/Containers/ChatsBar";
import HomeFeed from "@/Components/Containers/HomeFeed";
import { useMainContext } from "@/Contexts/MainContext";
import { useUserContext } from "@/Contexts/UserContext";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { useEffect } from "react";
const Home = ({ auth }) => {
  const { setUser } = useUserContext();
  const { setSuccessMessage, setErrors } = useMainContext();
  const { flash, errors } = usePage().props;
  useEffect(() => {
    if (flash?.success) setSuccessMessage(flash.success);
    if (flash?.error) setErrors([flash.error]);
  }, [flash]);

  useEffect(() => {
    if (!auth?.user) {
      router.get(route("login"));
    } else {
      setUser(auth.user);
    }
  }, [auth]);

  useEffect(() => {
    let messages = [];
    Object.keys(errors).map((key) => messages.push(errors[key]));
    setErrors(messages);
  }, [errors]);

  return (
    <>
      <Head>
        <title>Social media Laravel + React</title>
        <meta
          head-key="description"
          name="description"
          content="This is the default description"
        />
        <link rel="icon" type="image/svg+xml" href="/images.jpeg" />
      </Head>
      <div className="flex min-h-[calc(100vh-66px)] max-h-[calc(100vh-66px)] overflow-hidden bg-gray-900">
        <ChatsBar />
        <HomeFeed />
      </div>
    </>
  );
};
Home.layout = (page) => {
  return <Authenticated children={page}></Authenticated>;
};
export default Home;
