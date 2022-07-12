import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { ProtectRoute } from "../contexts/auth";

import { onValue, ref, set } from "firebase/database";
import { db } from "../../firebase";
import { makeAbsolute } from "../utils/urls";
import Alias from "../components/alias";

const Dashboard = () => {
  const [newShortUrl, setNewShortUrl] = useState("");
  const [newLongUrl, setNewLongUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const created = new Date().getTime();
    const destination = makeAbsolute(newLongUrl);
    const lastVisited = -1;

    //
    setLoading(true);
    set(ref(db, newShortUrl), { destination, created, lastVisited })
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

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
      <Link href="auth/logout">Logout</Link>
      <form onSubmit={handleSubmit} className="bg-slate-200">
        <div>
          <label>Alias</label>
          <input
            type="text"
            onChange={(e) => {
              setNewShortUrl(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Destination</label>
          <input
            type="text"
            onChange={(e) => {
              setNewLongUrl(e.target.value);
            }}
          />
        </div>
        <button type="submit">Add</button>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
      </form>
      <div className="bg-slate-300">
        {Object.entries<ShortUrl>(shortUrls).map(([alias, shortUrl]) => (
          <Alias key={alias} alias={alias} shortUrl={shortUrl} />
        ))}
      </div>
    </ProtectRoute>
  );
};

export default Dashboard;
