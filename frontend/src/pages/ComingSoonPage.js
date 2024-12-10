import { Link } from "react-router-dom";
import Button from "../components/Button";

const ComingSoonPage = () => {
  return (
    <div className="flex flex-col items-center text-nblack4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-12 mb-4 text-nyellow"
      >
        <path
          fillRule="evenodd"
          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
          clipRule="evenodd"
        />
      </svg>

      <h1 className="font-bold text-4xl mb-2">Segera Datang</h1>
      <p className="mb-4 text-sm">
        Halaman yang kamu cari dalam tahap pengerjaan
      </p>
      <Link to="/dashboard">
        <Button text="text-nblack4" bg="bg-nwhite2" hover="hover:bg-nwhite3">
          Kembali
        </Button>
      </Link>
    </div>
  );
};

export default ComingSoonPage;