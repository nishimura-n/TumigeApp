import type { NextPage } from "next";
import { Layout } from "../components/Layout";
import Sidebar from "@/components/Sidebar";
import MainPage from "@/components/MainPage";

const Priority: NextPage = () => {
  return (
    <Layout title="積みゲー保管庫">
      <div className="content">
        <Sidebar />
        <MainPage />
      </div>
    </Layout>
  );
};

export default Priority;
