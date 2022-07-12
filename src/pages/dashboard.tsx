import { useEffect, useState } from "react";
import { ProtectRoute } from "../contexts/auth";

import { onValue, ref } from "firebase/database";
import { db } from "../../firebase";
import AliasListItem from "../components/aliasListItem";
import FormNewAlias from "../components/formNewAlias";

const Dashboard = () => {
  // register database subscription
  const [shortUrls, setShortUrls] = useState({});
  useEffect(() => {
    setShortUrls({});
    onValue(ref(db), (snapshot) => {
      if (snapshot.val()) {
        setShortUrls(snapshot.val());
      }
    });
  }, []);

  return (
    <ProtectRoute>
      <div className="bg-neutral-100">
        {/* <Link href="auth/logout">Logout</Link> */}
        <FormNewAlias />
        <div>
          {Object.entries<ShortUrl>(shortUrls).map(([alias, shortUrl]) => (
            <AliasListItem key={alias} alias={alias} shortUrl={shortUrl} />
          ))}
        </div>
      </div>
    </ProtectRoute>
  );
};

export default Dashboard;
