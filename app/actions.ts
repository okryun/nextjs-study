"use server";

export async function handleForm(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 2000)); //2초 대기

  const password = formData.get("password");
  console.log(password);

  if (password !== "12345") {
    console.log("no");
    return {
      errors: ["wrong password!!!!!!!!!!"],
    };
  } else {
    return { errors: [], success: true };
  }
}
