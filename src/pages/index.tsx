import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "@utils/trpc";
import Stats from "@/components/Stats";

// import * as Components from "umbrella-design";

const Home: NextPage = () => {
  const { data, isLoading, error } = trpc.useQuery(["lytic.getAll"]);

  if (isLoading) return <div>Loading...</div>;
  if (error || typeof data == "undefined") return <div>Error...</div>;

  return (
    <>
      <Head>
        <title>Lytic</title>
        <meta name="description" content="Lytic by cuvar" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-teal-200 flex justify-center items-center text-xl w-screen h-screen">
        <div className="p-4 mx-auto max-w-screen-md">
          <h1 className="font-bold text-2xl">Total clicks per site</h1>
          <Stats data={data} />
        </div>
      </div>
    </>
  );
};

export default Home;
