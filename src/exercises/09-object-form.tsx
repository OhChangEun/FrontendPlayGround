import { useState, type HTMLInputTypeAttribute } from "react";

interface UserForm {
  name: string;
  email: string;
  age: string;
}

interface User {
  name: string;
  email: string;
  age: number;
}

const initialForm: UserForm = { name: "", email: "", age: "" };

function ObjectForm() {
  const [user, setUser] = useState<UserForm>(initialForm);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    const newValue = name === "age" ? value.replace(/\D/g, "") : value;

    setUser((prev) => ({ ...prev, [name]: newValue }));
  }

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload: User = {
      ...user,
      name: user.name.trim(),
      age: Number(user.age),
    };
    alert(JSON.stringify(payload));
    // alert(JSON.stringify(user));
    resetForm();
    // setUser();
  }

  function resetForm() {
    setUser(initialForm);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Field
        label="이메일"
        name="email"
        values={user}
        onChange={handleChange}
        type="email"
      />
      <Field label="이름" name="name" values={user} onChange={handleChange} />
      <Field label="나이" name="age" values={user} onChange={handleChange} />
      <button type="submit">가입</button>
      <button type="button" onClick={resetForm}>
        초기화
      </button>
    </form>
  );
}

// T의 모든 값이 string인지 검사. interface도 통과함 (Record<string,string>은 interface를 거부)
type StringValues<T> = { [K in keyof T]: string };

interface FieldProps<T extends StringValues<T>> {
  label: string;
  name: Extract<keyof T, string>;
  values: T;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: HTMLInputTypeAttribute;
}
function Field<T extends StringValues<T>>({
  label,
  name,
  values,
  onChange,
  required = true,
  type = "text",
}: FieldProps<T>) {
  const id = `signup-${name}`;

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        value={values[name]}
        onChange={onChange}
        required={required}
        type={type}
      />
    </div>
  );
}

export default ObjectForm;
