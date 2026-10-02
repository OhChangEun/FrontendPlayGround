import { useId, useState } from "react";

function isValidEmailFormat(value: string) {
  return value.includes("@");
}

function validate(name: string, email: string, agreed: boolean): string | null {
  if (name === "") return "사용자 이름을 입력하세요.";
  if (!isValidEmailFormat(email)) return "올바른 이메일을 입력하세요.";
  if (!agreed) return "약관에 동의해주세요.";
  return null;
}

function SignupValidation() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    const errorMessage = validate(trimmedName, trimmedEmail, agreed);
    setError(errorMessage);

    if (errorMessage) return;

    alert(`${trimmedName}, 가입이 완료되었습니다!`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="이름 입력:"
        placeholder="이름 입력"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        type="email"
        label="이메일 입력:"
        placeholder="이메일 입력"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <CheckboxField
        label="약관에 동의합니다"
        checked={agreed}
        onChange={(e) => setAgreed(e.target.checked)}
      />
      <button type="submit">제출</button>
      {error && <div>{error}</div>}
    </form>
  );
}

interface CheckboxFieldProps extends Omit<
  React.ComponentProps<"input">,
  "type"
> {
  label: string;
}

function CheckboxField({ label, id, ...rest }: CheckboxFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div>
      <input {...rest} type="checkbox" id={inputId} />
      <label htmlFor={inputId}>{label}</label>
    </div>
  );
}

interface TextFieldProps extends React.ComponentProps<"input"> {
  label: string;
}

function TextField({ label, id, ...rest }: TextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div>
      <label htmlFor={inputId}>{label}</label>
      <input {...rest} id={inputId} />
    </div>
  );
}

export default SignupValidation;
