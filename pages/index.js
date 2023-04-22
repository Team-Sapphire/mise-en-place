import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import MainPage from "./main.jsx";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      style={{ gridTemplate: "10% 90% / 20% 50% 30%" }}
      className="relative grid block w-full h-full"
    >
      <div className="">Header/logo</div>
    </main>
  );
}
