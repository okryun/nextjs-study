"use client";

import React from "react";
import FormButton from "./components/form-btn";
import FormInput from "./components/form-inputs";
import {
  EnvelopeIcon,
  UserIcon,
  KeyIcon,
  CheckBadgeIcon,
} from "@heroicons/react/16/solid";
import { handleForm } from "./actions";

export default function LogIn() {
  const [state, formAction] = React.useActionState(handleForm, {
    errors: [],
    success: false,
  });

  return (
    <div className="h-[100vh] flex flex-col justify-center items-center gap-5 py-8 px-6">
      <div className="flex flex-col text-4xl">🔥</div>
      <form action={formAction} className="flex flex-col gap-3">
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={[]}
          icon={<EnvelopeIcon className="w-5 h-5" />}
        />
        <FormInput
          name="username"
          type="text"
          placeholder="Username"
          required
          errors={[]}
          icon={<UserIcon className="w-5 h-5" />}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={state.errors ?? []}
          icon={<KeyIcon className="w-5 h-5" />}
        />
        <FormButton text="Login" />

        {state.success && (
          <div className="bg-green-600 flex p-2.5 border-none rounded-xl">
            <div className="px-3 py-1.5">
              {<CheckBadgeIcon className="w-5 h-5" />}{" "}
            </div>
            <div className="py-1.5"> Welcome back!</div>
          </div>
        )}
      </form>
    </div>
  );
}
