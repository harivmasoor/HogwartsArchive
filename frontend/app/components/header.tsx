import Image from "next/image";

export default function Header() {
  return (
    <div className="z-10 max-w-5xl w-full items-center justify-between font-serif text-lg font-bold lg:flex">
      <p className="fixed left-0 top-0 flex w-full justify-center text-black lg:static lg:w-auto lg:rounded-xl lg:p-4">
        Hogwarts Archive
      </p>
      <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-gray-700 via-gray-900 to-transparent dark:from-gray-800 dark:via-gray-900 lg:static lg:h-auto lg:w-auto lg:bg-none">
        <a
          href="https://www.wizardingworld.com/"
          className="flex items-center justify-center gap-2 text-black"
        >
          <span>Built by the Ministry of Magic</span>
          <Image
            className="rounded-xl"
            src="/Hogwarts-Crest.png" // Make sure to replace with the actual path to your image
            alt="Hogwarts Badge"
            width={40}
            height={40}
            priority
          />
        </a>
      </div>
    </div>
  );
}

