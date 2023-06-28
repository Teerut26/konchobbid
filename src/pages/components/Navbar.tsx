import { NextPage } from "next";

interface Props {}

const Navbar: NextPage<Props> = () => {
  return (
    <div className="flex justify-center">
      <div className="py-3 text-2xl">ยอดนักบิด Offcial</div>
    </div>
  );
};

export default Navbar;
