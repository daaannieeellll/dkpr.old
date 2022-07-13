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
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xs h-fit
      px-6 py-8
      bg-white
      rounded
      shadow-xl shadow-neutral-300"
    >
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Alias
        </label>
        <input
          type="text"
          className="form-control
          px-3 py-1.5 w-full
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300 rounded
          transition ease-in-out
        focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
          onChange={(e) => {
            setNewShortUrl(e.target.value);
          }}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Destination
        </label>
        <input
          type="text"
          className="form-control
          px-3 py-1.5 w-full
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300 rounded
          transition ease-in-out
        focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
          onChange={(e) => {
            setNewLongUrl(e.target.value);
          }}
        />
      </div>
      <div>
        <button
          type="submit"
          className="inline-block px-4 py-2
          bg-orange-500 hover:bg-orange-400 active:bg-orange-600 outline-none
          text-white font-medium
          rounded"
          // className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </form>
  );
};
export default FormNewAlias;
