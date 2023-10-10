import { FC, ReactNode } from "react"; //React関連の型定義
import Head from "next/head"; //Next.jsアプリケーションでヘッダー情報を管理するためのコンポーネント

//Props型はLayoutコンポーネントのプロパティの型を定義
type Props = {
  title: string;
  children: ReactNode;
};

//受け取ったプロパティを使用してコンテンツをラップするためのレイアウトを定義
export const Layout: FC<Props> = ({ children, title = "Nextjs" }) => {
  return (
    <div className="Layout">
      <Head>
        {/* Layoutのpropsに入っているタイトルをページのタイトルに設定 */}
        <title>{title}</title>
      </Head>
      {/* Layoutのpropsに入っているコンポーネントをページ内容に設定 */}
      <main>{children}</main>
    </div>
  );
};
