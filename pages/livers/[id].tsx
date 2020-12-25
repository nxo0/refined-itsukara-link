import { NextPage } from 'next';
import Head from 'next/head';
import { Layout } from '../../components/Layout';

const Tags: NextPage = () => {
  return (
    <Layout variant="article">
      <Head>
        <title>ライバー別の配信一覧 | Refined Itsukara.link</title>
      </Head>

      <article>
        <h3 className="text-3xl text-coolGray-700 font-medium my-8">
          ライバー別の配信一覧
        </h3>

        <p>このページは現在実装中です。</p>
      </article>
    </Layout>
  );
};

export default Tags;