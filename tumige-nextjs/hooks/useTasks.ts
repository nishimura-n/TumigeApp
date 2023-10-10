import { useRouter } from "next/router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Tumige } from "@prisma/client";

export const useTasks = () => {
  const router = useRouter();
  const getTasks = async () => {
    const { data } = await axios.get<Tumige[]>(`http://localhost:3005/todo`);
    return data;
  };
  return useQuery<Tumige[], Error>({
    queryKey: ["tasks"],
    queryFn: getTasks,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403)
        router.push("/");
    },
  });
};
