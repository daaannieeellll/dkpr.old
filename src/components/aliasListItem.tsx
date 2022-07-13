import { ChartBarIcon } from "@heroicons/react/solid";
import Link from "next/link";

interface IListItem {
  alias: string;
  shortUrl: ShortUrl;
}

const toDateString = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
  };
  return date.toLocaleDateString(undefined, options);
};

const AliasListItem = ({ alias, shortUrl }: IListItem) => {
  const { destination, clicks, createdAt } = shortUrl;
  const host = `${window.location.host}/`;
  const creationDate = toDateString(new Date(createdAt));

  return (
    <div
      className="relative flex-col p-5
    text-sm text-gray-500"
    >
      <p className="font-light">{creationDate}</p>
      <Link href={destination} className="">
        <a className="inline-block w-full overflow-hidden whitespace-nowrap text-ellipsis">
          {destination}
        </a>
      </Link>
      <div className="flex flex-row justify-between">
        <Link href={alias}>
          <a className="text-orange-500">
            {host}
            <span className="font-bold">{alias}</span>
          </a>
        </Link>
        <div className="relative inline-flex items-center px-2 text-gray-500 :">
          <span>{clicks}</span>
          <ChartBarIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};

export default AliasListItem;
