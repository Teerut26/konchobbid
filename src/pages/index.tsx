
import RankCard from "../components/home/RankCard";
import AddKonBid from "../components/home/AddKonBid";
import useFirestore from "@/hooks/useFirestore";
import _ from "lodash";
import NavbarLayouts from "@/layouts/NavbarLayouts";

export default function Home() {
  const { biders } = useFirestore();

  return (
    <NavbarLayouts>
      <div className="mx-auto flex w-full max-w-md flex-col gap-1">
        {_.orderBy(biders,"bid","desc")?.map((user, i) => (
          <RankCard user={user} index={i} key={i} />
        ))}
        <AddKonBid />
      </div>
    </NavbarLayouts>
  );
}
