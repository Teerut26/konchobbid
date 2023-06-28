import useFirestore from "@/hooks/useFirestore";
import { NextPage } from "next";
import { useState } from "react";

interface Props {}

const AddKonBid: NextPage<Props> = () => {
  const [IsToggleAdd, setIsToggleAdd] = useState(false);
  const handleToggleAdd = () => setIsToggleAdd((pre) => !pre);
  const [konBidName, setKonBidName] = useState("");
  const { addKonBid, user, signInWithGoogle } = useFirestore();

  return (
    <div className="mx-4 flex flex-col gap-2">
      {IsToggleAdd ? (
        <div className="flex gap-2">
          <input
            onChange={(e) => setKonBidName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addKonBid(konBidName);
                handleToggleAdd();
              }
            }}
            type="text"
            className="w-full rounded border p-2 focus:outline-none"
          />
          <div
            onClick={handleToggleAdd}
            className="btn bg-red-500 text-white hover:bg-red-600"
          >
            ยกเลิก
          </div>
          <div
            onClick={() => {
              if (user) {
                addKonBid(konBidName);
                handleToggleAdd();
              } else {
                signInWithGoogle();
              }
            }}
            className="btn btn bg-green-500 text-white hover:bg-green-600 whitespace-nowrap"
          >
            {user ? "เพิ่ม" : "login ก่อน"}
          </div>
        </div>
      ) : (
        <div onClick={handleToggleAdd} className="btn">
          <div>เพิ่มคนบิด</div>
        </div>
      )}
    </div>
  );
};

export default AddKonBid;
