import { GetServerSideProps, NextPageContext } from "next";
import { db } from "../../firebase-admin";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const shortUrl = String(context.params?.shortUrl);

  const data: ShortUrl | null = await (
    await db.ref(shortUrl).once("value")
  ).val();
  const destination = data?.destination;

  if (!destination) return { notFound: true };

  const lastVisited = new Date().getTime();

  return {
    redirect: {
      destination,
      permanent: false,
    },
  };
};

export default function Redirect() {}
