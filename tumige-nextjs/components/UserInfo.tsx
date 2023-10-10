import { useQueryUser } from "../hooks/useQueryUser";

export const UserInfo = () => {
  const { data: user, status } = useQueryUser();
  if (status === "loading") return <>ローディング中</>;
  return <p>{user?.email}</p>;
};
