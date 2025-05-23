"use client";

import React from "react";

import { CheckBadgeIcon } from "@heroicons/react/16/solid";
import { useActionState } from "react";
import { Login } from "./actions";

import Input from "../../components/input";
import FormButton from "../../components/form-btn";

export default function LogIn() {
  const [state, dispatch] = useActionState(Login, null);

  return (
    <div className="h-[100vh] flex flex-col justify-center items-center gap-5 py-8 px-6">
      <div className="flex flex-col text-4xl">🔥</div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.fieldErrors.email}
        />
        <Input
          name="username"
          type="text"
          placeholder="Username"
          required
          errors={state?.fieldErrors.username}
          minLength={3}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={state?.fieldErrors.password}
          minLength={10}
        />
        <FormButton text="Login" />

        {state?.success && (
          <div className="bg-green-500 flex p-2.5 border-none rounded-xl">
            <div className="px-3 py-1.5">
              <CheckBadgeIcon className="w-5 h-5" />
            </div>
            <div className="py-1.5">Welcome back!</div>
          </div>
        )}
      </form>
    </div>
  );
}
