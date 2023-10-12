import { useRouter } from "next/router";
import axios from "axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Tumige } from "@prisma/client";
import useStore from "../store";

export const useMutateGame = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const reset = useStore((state) => state.resetEditedTask);

  const createTaskMutation = useMutation(
    async (formData: FormData) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/todo`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // フォームデータを送信するために必要
          },
        }
      );
      return res.data;
    },
    {
      onSuccess: (res) => {
        const previousTodos = queryClient.getQueryData<Tumige[]>(["tasks"]);
        if (previousTodos) {
          queryClient.setQueryData(["tasks"], [res, ...previousTodos]);
        }
        reset();
      },
      onError: (err: any) => {
        reset();
        if (err.response.status === 401 || err.response.status === 403) {
          router.push("/");
        }
      },
    }
  );
  const updateTaskMutation = useMutation(
    async (formData: FormData) => {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/todo/${formData.get("id")}`,
        formData
      );
      return res.data;
    },
    {
      onSuccess: (res, variables) => {
        const previousTodos = queryClient.getQueryData<Tumige[]>(["tasks"]);
        if (previousTodos) {
          queryClient.setQueryData(
            ["tasks"],
            previousTodos.map((task) => (task.id === res.id ? res : task))
          );
        }
        reset();
      },
      onError: (err: any) => {
        reset();
        if (err.response.status === 401 || err.response.status === 403) {
          router.push("/");
        }
      },
    }
  );
  const deleteTaskMutation = useMutation(
    async (id: number) => {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/todo/${id}`);
    },
    {
      onSuccess: (_, variables) => {
        const previousTodos = queryClient.getQueryData<Tumige[]>(["tasks"]);
        if (previousTodos) {
          queryClient.setQueryData(
            ["tasks"],
            previousTodos.filter((task) => task.id !== variables)
          );
        }
        reset();
      },
      onError: (err: any) => {
        reset();
        if (err.response.status === 401 || err.response.status === 403) {
          router.push("/");
        }
      },
    }
  );

  return { createTaskMutation, updateTaskMutation, deleteTaskMutation };
};
