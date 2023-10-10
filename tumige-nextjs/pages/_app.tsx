import "../styles/globals.css";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";

// React Queryライブラリのクライアントで、データの取得とキャッシュを管理
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  //全ての axios リクエストがクッキーを送信するように設定d
  axios.defaults.withCredentials = true;
  //CSRFトークンを取得してaxiosのヘッダーに追加している
  useEffect(() => {
    const getCsrfToken = async () => {
      //APIからCSRFトークンを取得
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/csrf`
      );
      //ヘッダーのcsrf-tokenにCSRFトークンを代入
      axios.defaults.headers.common["csrf-token"] = data.csrfToken;
    };
    getCsrfToken();
  }, []);
  return (
    //アプリケーション内のどのコンポーネントでもReact Queryを使用できるようになる
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
