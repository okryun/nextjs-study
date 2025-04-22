import { ReactNode } from "react";

interface FormInputProps {
  type: string;
  placeholder: string;
  required: boolean;
  errors: string[];
  name: string;
  icon?: ReactNode;
}

export default function FormInput({
  type,
  placeholder,
  required,
  errors,
  icon,
  name,
}: FormInputProps) {
  return (
    <div className="flex flex-col items-center mb-4">
      <div className="flex items-center w-[520px] px-3.5 py-2 rounded-4xl ring-1 ring-neutral-200 focus-within:ring-2 transition">
        {icon && <div className="mr-3 text-gray-500">{icon}</div>}
        <input
          className="flex-1 h-10 bg-transparent outline-none placeholder:text-neutral-400 text-neutral-800"
          type={type}
          placeholder={placeholder}
          required={required}
          name={name}
        />
      </div>
      {errors?.map((error, index) => (
        <span key={index} className="text-red-400 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}
