import { FormEvent, useState } from "react";

import { set, ref } from "firebase/database";
import { db } from "../../firebase";

import { makeAbsolute } from "../utils/urls";

const FormNewAlias = () => {
  const [newShortUrl, setNewShortUrl] = useState("");
  const [newLongUrl, setNewLongUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const createdAt = new Date().getTime();
    const destination = makeAbsolute(newLongUrl);
    const clicks = 0;

    // save to database
    setLoading(true);
    set(ref(db, newShortUrl), { destination, createdAt, clicks })
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label className="form-label inline-block mb-2 text-gray-700">
          Alias
        </label>
        <input
          type="text"
          className="form-control px-3 py-1.5
          text-base font-normal text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300 rounded
          transition ease-in-out
          m-0
        focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none
"
          onChange={(e) => {
            setNewShortUrl(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col">
        <label className="form-label inline-block mb-2 text-gray-700">
          Destination
        </label>
        <input
          type="text"
          className="form-control px-3 py-1.5
          text-base font-normal text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300 rounded
          transition ease-in-out
          m-0
        focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
          onChange={(e) => {
            setNewLongUrl(e.target.value);
          }}
        />
      </div>
      <button type="submit">Add</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </form>
  );
};
export default FormNewAlias;
