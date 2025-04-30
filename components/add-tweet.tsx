"use client";

import { useFormState } from "react-dom";
import { uploadTweet } from "../service/tweetService";
import Button from "./button";

export default function AddTweet() {
  const [state, action] = useFormState(uploadTweet, null);
  return (
    <form action={action} className="p-5 flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <textarea
          name="tweet"
          required
          placeholder="Write a tweet"
          className="w-full p-6 rounded-md resize-none"
        />
        {!state?.isSuccess && (
          <span className="text-red-500">{state?.error.fieldErrors.tweet}</span>
        )}
      </div>
      <Button text="Add a tweet" />
    </form>
  );
}
