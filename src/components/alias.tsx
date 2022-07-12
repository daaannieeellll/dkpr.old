import Link from "next/link";

interface IAlias {
  alias: string;
  shortUrl: ShortUrl;
}

const Alias = ({ alias, shortUrl }: IAlias) => {
  const { destination, created, lastVisited } = shortUrl;
  const host = `${window.location.protocol}//${window.location.host}/`;
  const createdDate = new Date(created);
  return (
    <div className="">
      <Link href={alias}>{`${host}${alias}`}</Link> <br />
      <Link href={destination}>{destination}</Link>
      <p>{createdDate.toISOString()}</p>
      <p>{lastVisited}</p>
    </div>
  );
};

export default Alias;
