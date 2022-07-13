import Link from "next/link";
import FormNewAlias from "../../components/formNewAlias";

const NewAlias = () => {
  return (
    <div
      className="absolute
      w-full h-full
    bg-neutral-100
    flex justify-center items-center"
    >
      <FormNewAlias />
      <Link href="/dashboard">
        <a className="absolute top-0 right-0">Back</a>
      </Link>
    </div>
  );
};

export default NewAlias;
