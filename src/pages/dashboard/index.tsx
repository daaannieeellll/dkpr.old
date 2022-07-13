import { useEffect, useState } from "react";
import { ProtectRoute } from "../../contexts/auth";
import { onValue, ref } from "firebase/database";
import { db } from "../../../firebase";
import AliasListItem from "../../components/aliasListItem";
import Link from "next/link";

const Dashboard = () => {
  // register database subscription
  const [shortUrls, setShortUrls] = useState({});
  useEffect(() => {
    setShortUrls({});
    onValue(ref(db), (snapshot) => {
      if (snapshot.val()) setShortUrls(snapshot.val());
    });
  }, []);

  return (
    <ProtectRoute>
      <div className="">
        <Link href="dashboard/new">
          <a
            className="inline-block px-4 py-2
            fixed right-0 z-10
            shadow-neutral-300 shadow-xl
            bg-orange-500 hover:bg-orange-400 active:bg-orange-600
          text-white font-medium
            rounded"
          >
            New Alias
          </a>
        </Link>
        <div className="divide-y divide-gray-300">
          {Object.entries<ShortUrl>(shortUrls)
            .sort(([, sa], [, sb]) => sb.createdAt - sa.createdAt)
            .map(([alias, shortUrl]) => (
              <AliasListItem key={alias} alias={alias} shortUrl={shortUrl} />
            ))}
        </div>
      </div>
    </ProtectRoute>
  );
};

export default Dashboard;
