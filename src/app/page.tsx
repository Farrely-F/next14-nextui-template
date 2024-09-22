import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <Image
        className="dark:invert"
        src={"/next.svg"}
        alt="Next.js Logo"
        width={180}
        height={37}
      />
      <div className="text-center">
        <h1 className="font-bold text-xl">NEXT 14 Starter</h1>
        <p>v14.2.5</p>
      </div>
      <ul className="overflow-x-hidden w-full">
        <p className="text-center">Stacks:</p>
        <div className="marquee mt-4">
          {[...techStacks, ...techStacks, ...techStacks].map((stack) => (
            <li className="bg-white/10 p-4 rounded-md" key={stack.title}>
              {stack.title}
            </li>
          ))}
        </div>
      </ul>
    </main>
  );
}

const techStacks = [
  {
    title: "Next.js ⚡️",
  },
  {
    title: "React 18 ⚛️",
  },
  {
    title: "Tailwind CSS + NextUI 🎨",
  },
  {
    title: "Typescript 💪",
  },
  {
    title: "Zuustand 📦",
  },
];
