import Head from "next/head";
import Link from "next/link";

const Home = () => (
  <div className="flex min-h-screen flex-col items-center justify-center py-2">
    <Head>
      <title>Dkpr</title>
    </Head>

    <main className="flex w-full flex-1 flex-col items-center justify-evenly px-20 text-center h-150">
      <h1 className="text-6xl font-bold">
        Welcome to <Link href="/">dkpr.nl</Link>
      </h1>
      <Link href="/auth/login" className="text-6xl">
        Log in!
      </Link>
    </main>
  </div>
);

export default Home;
