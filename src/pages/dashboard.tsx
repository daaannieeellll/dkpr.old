import Link from "next/link";
import { FormEvent, useState } from "react";
import { ProtectRoute } from "../contexts/auth";

import { ref, set } from "firebase/database";
import { db } from "../../firebase";

const Dashboard = () => {
  const [shortUrl, setShortUrl] = useState("");
  const [longUrl, setLongUrl] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const created = new Date().getTime() / 1000;
    const lastVisited = -1;
    set(ref(db, shortUrl), { longUrl, created, lastVisited }).then(() => {
      console.log("success!");
    });
  };

  return (
    <ProtectRoute>
      <Link href="auth/logout">Logout</Link>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Short url</label>
          <input
            type="text"
            onChange={(e) => {
              setShortUrl(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Long url</label>
          <input
            type="text"
            onChange={(e) => {
              setLongUrl(e.target.value);
            }}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </ProtectRoute>
  );
};

export default Dashboard;
