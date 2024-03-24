"use client";

import Image from "next/image";
import { Message } from "./chat-messages";

export default function ChatAvatar(message: Message) {
  if (message.role === "user") {
    return (
      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow bg-background">
        <Image
          className="rounded-md"
          src="/harry-potter-image.png"
          alt="Harry Potter"
          width={32}
          height={32}
          priority
        />
      </div>
    );
  }

  return (
    <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-black text-white">
      {/* Replace "/path/to/owl-emoji.png" with the actual path to your Owl emoji image */}
      <Image
        className="rounded-md"
        src="/hedwig.png"
        alt="Owl Emoji"
        width={32}
        height={32}
        priority
      />
    </div>
  );
}
