import { useState } from "react";

function ControlledInput() {
  const [name, setName] = useState("");

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    alert(name);

    setName("");
  }

  function handleInputName(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setName(value.slice(0, 10));
    // if (value.length <= 10) {
    //   setName(value);
    // }
  }

  const isTooShort = name.length > 0 && name.length < 2;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <label htmlFor="name">이름</label>
      <input id="name" value={name} onChange={handleInputName} />

      {isTooShort && <span className="text-red-400">2자 이상 입력하세요</span>}

      <button disabled={name.length === 0 || isTooShort} type="submit">
        제출
      </button>
    </form>
  );
}

export default ControlledInput;
