import axiosClient from "@/AxiosClient/AxiosClient";
import HomeFeed from "@/Components/Containers/HomeFeed";
import { useMainContext } from "@/Contexts/MainContext";
import { useUserContext } from "@/Contexts/UserContext";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useGetPosts } from "@/TanStackQurey/Querys";
import { Head, router, usePage } from "@inertiajs/react";
import { useEffect } from "react";
const Home = ({ auth }) => {
  const { setUser } = useUserContext();
  const { setSuccessMessage, setErrors } = useMainContext();
  const { data: posts, refetch, isLoading: loadingPosts } = useGetPosts();

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
  let a = [1, 2, 3, 4, 5];
  useEffect(() => {
    if (!!errors || !!flash?.error) {
      let messages = [];
      Object.keys(errors).map((key) => messages.push(errors[key]));
      if (flash?.error) setErrors([flash.error, ...messages]);
    }
  }, [errors, flash?.error]);

  return (
    <>
      <Head>
        <title>Chatter</title>
        <link rel="icon" type="image/svg+xml" href="/Logo_ico.ico" />
      </Head>
      <div className="flex min-h-[calc(100vh-66px)] max-h-[calc(100vh-66px)] overflow-hidden bg-gray-900">
        <HomeFeed loading={loadingPosts} posts={posts} refetch={refetch} />
      </div>
    </>
  );
};
Home.layout = (page) => {
  return <Authenticated children={page}></Authenticated>;
};
export default Home;
