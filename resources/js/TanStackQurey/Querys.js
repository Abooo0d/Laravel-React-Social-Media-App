import axiosClient from "@/AxiosClient/AxiosClient";
import { QUERY_KEYS } from "./QueryKeys";
import { useQuery } from "@tanstack/react-query";
export const useGetPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POSTS],
    queryFn: () =>
      axiosClient.get(route("getPosts")).then(({ data }) => {
        return data;
      }),
  });
};
export const useGetNotifications = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_NOTIFICATIONS],
    queryFn: () =>
      axiosClient.get(route("getNotifications")).then(({ data }) => {
        return data;
      }),
  });
};
export const useGetGroups = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_GROUPS],
    queryFn: () =>
      axiosClient.get(route("getGroups")).then(({ data }) => {
        return data;
      }),
  });
};
export const useGetChatGroups = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CHAT_GROUPS],
    queryFn: () =>
      axiosClient.get(route("getChatGroups")).then(({ data }) => {
        return data;
      }),
  });
};
export const useGetMoreMessages = (messageId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_MORE_MESSAGES],
    queryFn: () =>
      axiosClient.get(route("getMoreMessages", messageId)).then(({ data }) => {
        return data;
      }),
  });
};
export const useGetPostsForGroup = (groupId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POSTS_FOR_GROUP],
    queryFn: () =>
      axiosClient.get(route("postsForGroup", groupId)).then(({ data }) => {
        return data;
      }),
  });
};
export const useGetPostsForUser = (userId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POSTS_FOR_USER],
    queryFn: () =>
      axiosClient.get(route("postsForGroup", userId)).then(({ data }) => {
        return data;
      }),
  });
};
