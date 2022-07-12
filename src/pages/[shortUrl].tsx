import { GetServerSideProps, NextPageContext } from "next";
import { db } from "../../firebase-admin";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const shortUrl = String(context.params?.shortUrl);

  const data: ShortUrl | null = await (
    await db.ref(shortUrl).once("value")
  ).val();

  const longUrl = data?.longUrl;
  return !longUrl
    ? { notFound: true }
    : {
        redirect: {
          destination: longUrl,
          permanent: false,
        },
      };
};

export default function Redirect() {}
