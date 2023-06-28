import useFirestore from "@/hooks/useFirestore";
import { NextPage } from "next";

interface Props {}

const Navbar: NextPage<Props> = () => {
  const { signOutAction, user } = useFirestore();
  return (
    <div className="mx-auto flex w-full max-w-md items-center justify-between px-3">
      <div className="py-3 text-2xl">ยอดนักบิด Offcial</div>
      {user && (
        <button
          onClick={signOutAction}
          className="btn-sm bg-red-500 text-white hover:bg-red-600"
        >
          logout
        </button>
      )}
    </div>
  );
};

export default Navbar;
