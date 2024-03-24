"use client";

export interface ChatInputProps {
  /** The current value of the input */
  input?: string;
  /** An input/textarea-ready onChange handler to control the value of the input */
  handleInputChange?: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  /** Form submission handler to automatically reset input and append a user message  */
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  multiModal?: boolean;
}

export default function ChatInput(props: ChatInputProps) {
  return (
    <>
      <form
        onSubmit={props.handleSubmit}
        className="flex items-start justify-between w-full max-w-5xl p-4 rounded-xl gap-4"
      >
        <input
          autoFocus
          name="message"
          placeholder="Inquire of the Archive of Hogwarts..."
          className="w-full p-4 rounded-xl flex-1 bg-transparent border-2 border-gray-300 placeholder-gray-500 text-gray-700"
          value={props.input}
          onChange={props.handleInputChange}
        />
        <button
          disabled={props.isLoading}
          type="submit"
          className="px-6 py-4 font-bold rounded-xl shadow hover:shadow-lg bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out text-gray-800"
        >
          Conjure Response
        </button>
      </form>
    </>
  );
}
