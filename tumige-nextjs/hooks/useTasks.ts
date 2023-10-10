import { useRouter } from "next/router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Favorite } from "@prisma/client";

export const useTasks = () => {
  const router = useRouter();
  const getTasks = async () => {
    const { data } = await axios.get<Favorite[]>(`http://localhost:3005/todo`);
    return data;
  };
  return useQuery<Favorite[], Error>({
    queryKey: ["tasks"],
    queryFn: getTasks,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403)
        router.push("/");
    },
  });
};
