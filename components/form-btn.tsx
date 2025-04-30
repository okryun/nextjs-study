"use client";

import { useFormStatus } from "react-dom";
interface FormButtonProps {
  text: string;
}

export default function FormButton({ text }: FormButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className=" font-bold text-sm rounded-4xl text-neutral-600 h-10 w-130 gap-3.5 bg-neutral-200 disabled:bg-neutral-400  disabled:text-neutral-300 disabled:cursor-not-allowed"
    >
      {pending ? "Loading" : text}
    </button>
  );
}
