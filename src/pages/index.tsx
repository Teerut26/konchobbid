import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "@/utils/api";
import NavbarLayouts from "./layouts/NavbarLayouts";

export default function Home() {
  return (
    <NavbarLayouts>
      <div className="mx-auto flex w-full max-w-sm flex-col">
        <div className="flex items-center gap-3 px-3 py-2 text-lg">
          <div>rank</div>
          <div className="grow">ชื่อ</div>
          <div>
            <span className="text-2xl">18</span>/20
          </div>
        </div>
        {...new Array(100).fill(0).map((_, i) => (
          <div className="flex items-center gap-3 px-3 py-2 text-lg">
            <div>{i+1}</div>
            {}
            <div className="flex-1">หมิง</div>
            <div>
              <span className="text-2xl">18</span>/20
            </div>
          </div>
        ))}
      </div>
    </NavbarLayouts>
  );
}
