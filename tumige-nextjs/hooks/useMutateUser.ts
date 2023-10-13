import axios from "axios";
import { useMutation } from "@tanstack/react-query";

export const useMutateUser = () => {
  const updateUserName = useMutation(async (NewName: string) => {
    console.log(NewName);
    const data = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/user`,
      NewName
    );
    return data;
  });

  return { updateUserName };
};
