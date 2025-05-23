"use client";

import Button from "@/components/button";
import { useActionState } from "react";

import { smsVerification } from "./actions";
import Input from "@/components/input";
export default function SMSLogin() {
  const [state, dispatch] = useActionState(smsVerification, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Log in</h1>
        <h2 className="text-xl">Verify your phone number.</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input
          name="phone"
          type="number"
          placeholder="Phone number"
          required
          icon
        />
        <Input
          name="token"
          type="number"
          placeholder="Verification code"
          required
          icon
        />
        <Button text="Verify" />
      </form>
    </div>
  );
}
