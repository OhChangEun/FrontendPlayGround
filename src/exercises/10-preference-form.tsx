import { useId, useState } from "react";

type Fruit = "apple" | "banana" | "cherry";
type Channel = "email" | "sms" | "push";

interface Preference {
  fruit: Fruit;
  newsletter: boolean;
  channel: Channel;
}

const initialPreference: Preference = {
  fruit: "apple",
  newsletter: false,
  channel: "email",
};

const FRUITS: Fruit[] = ["apple", "banana", "cherry"];
const CHANNELS: Channel[] = ["email", "sms", "push"];

function isFruit(v: string): v is Fruit {
  return FRUITS.some((f) => f === v);
}

function isChannel(v: string): v is Channel {
  return CHANNELS.some((c) => c === v);
}

function PreferenceForm() {
  const [preference, setPreference] = useState<Preference>(initialPreference);
  const [submitted, setSubmitted] = useState<Preference | null>(null);

  const id = useId();

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(preference);
  }

  function resetForm() {
    setPreference(initialPreference);
    setSubmitted(null);
  }

  function handleFruitChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const inputValue = e.target.value;

    // const fruit = FRUITS.find((f) => f === inputValue);
    // if (!fruit) return;
    if (isFruit(inputValue)) {
      setPreference((prev) => ({ ...prev, fruit: inputValue }));
    }
  }

  function handleNewsletterChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPreference((prev) => ({ ...prev, newsletter: e.target.checked }));
  }

  function handleChannelChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputRadioValue = e.target.value;

    if (isChannel(inputRadioValue))
      setPreference((prev) => ({ ...prev, channel: inputRadioValue }));
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div>
        <label htmlFor={`${id}-fruit`}>과일</label>
        <select
          id={`${id}-fruit`}
          value={preference.fruit}
          onChange={handleFruitChange}
        >
          {FRUITS.map((fruit) => (
            <option key={fruit} value={fruit}>
              {fruit}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={`${id}-news`}>뉴스레터</label>
        <input
          id={`${id}-news`}
          type="checkbox"
          checked={preference.newsletter}
          onChange={handleNewsletterChange}
        />
      </div>

      <fieldset>
        <legend>알림채널</legend>
        {CHANNELS.map((channel) => (
          <div key={channel}>
            <input
              id={`${id}-${channel}`}
              type="radio"
              name="channel"
              value={channel}
              checked={preference.channel === channel}
              onChange={handleChannelChange}
            />
            <label htmlFor={`${id}-${channel}`}>{channel}</label>
          </div>
        ))}
      </fieldset>

      <button type="submit">제출</button>
      <button type="button" onClick={resetForm}>
        초기화
      </button>

      {submitted && (
        <p>
          과일은 {submitted.fruit}, 뉴스레터는
          {submitted.newsletter ? "구독" : "구독 안함"}, 알림은
          {submitted.channel}로 받습니다.
        </p>
      )}
    </form>
  );
}

export default PreferenceForm;
