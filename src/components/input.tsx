import { useState } from "react";

interface InputProps {
  id: string;
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  value = "",
  onChange,
  type = "text",
  placeholder = "",
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full my-4">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={`
          peer
          w-full
          border-b-2 border-gray-300
          focus:border-blue-500
          outline-none
          py-2
          text-gray-900
          placeholder-transparent
          transition-all duration-200
        `}
      />
      <label
        htmlFor={id}
        className={`
          absolute left-0 top-2 text-gray-400 text-sm
          transition-all duration-200
          pointer-events-none
          ${isFocused || value ? "-top-4 text-blue-500 text-xs" : ""}
          peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
