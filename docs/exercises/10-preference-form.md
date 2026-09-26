# 10. 취향 설정 Form — select · checkbox · radio 제어 컴포넌트

코드: `src/exercises/10-preference-form.tsx`

## 목표
- text input 말고 다른 세 종류 입력을 제어 컴포넌트로 만든다.
  - `select`: `value` + `e.target.value`
  - `checkbox`: `checked` + `e.target.checked` (value가 아님)
  - `radio`: 같은 `name`으로 묶고, 각 input에 `value` + `checked={state === value}`
- 세 값을 객체 state 하나에 담고, 제출하면 요약 문장을 화면에 렌더링한다.
- 08·09는 문자열만 다뤘다. 여기선 boolean과 union 타입이 섞인다.

## 데이터
```ts
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
```

## 화면
1. `<form onSubmit>` 안에 세 묶음. 각각 `<label>` 붙이기.
   - 과일: `<select value={preference.fruit}>` 안에 `FRUITS.map`으로 `<option>` 3개
   - 뉴스레터: `<input type="checkbox" checked={preference.newsletter}>`
   - 알림 채널: `CHANNELS.map`으로 `<input type="radio" name="channel" value={ch} checked={preference.channel === ch}>` 3개
2. [제출] 버튼 `type="submit"`: `preventDefault` 후 현재 state의 스냅샷을 `submitted` state에 저장
3. `submitted`가 있으면 form 아래 `<p>`에 요약 문장:
   `과일은 banana, 뉴스레터는 구독, 알림은 sms로 받습니다.`
   (newsletter가 false면 "구독 안 함")
4. [초기화] 버튼 `type="button"`: preference와 submitted 둘 다 초기값으로

## 출력 예시
```
# 초기
과일:      [apple ▼]
뉴스레터:  [ ] 구독
알림 채널: (•) email ( ) sms ( ) push
[제출] [초기화]

# 바꾸고 제출
과일:      [banana ▼]
뉴스레터:  [v] 구독
알림 채널: ( ) email (•) sms ( ) push
[제출] [초기화]
과일은 banana, 뉴스레터는 구독, 알림은 sms로 받습니다.

# 제출 후 select만 cherry로 바꿈 (제출 안 함)
과일:      [cherry ▼]
...
과일은 banana, 뉴스레터는 구독, 알림은 sms로 받습니다.   ← 요약은 그대로. 스냅샷이니까
```

## 구현 규칙
- 핸들러는 입력 종류별로 셋. 합치는 건 "더 해보기"에서.
  ```ts
  function handleFruitChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const fruit = e.target.value as Fruit;
    setPreference((prev) => ({ ...prev, fruit }));
  }
  function handleNewsletterChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newsletter = e.target.checked;
    setPreference((prev) => ({ ...prev, newsletter }));
  }
  function handleChannelChange(e: React.ChangeEvent<HTMLInputElement>) { ... }
  ```
- select의 이벤트 타입은 `HTMLSelectElement`. input과 다르다.
- `e.target.value`는 항상 `string`. `Fruit`에 넣으려면 `as Fruit`로 좁혀야 한다. (왜 안전한지 "확인할 것" 참고)
- checkbox는 `e.target.value`가 아니라 `e.target.checked`. value는 `"on"`이라는 문자열이 들어온다.
- radio는 `value`와 `checked` 둘 다 써야 제어 컴포넌트. `checked`를 빼면 브라우저가 알아서 고르는 비제어 상태.
- setPreference는 함수형 `(prev) => ...`. 직접 수정 금지: `preference.fruit = ...` X
- 요약은 `submitted` 기준으로 그린다. `preference`로 그리면 제출 전에 바뀐다.

## 확인할 것
- select를 바꾸면 fruit만 바뀌고 나머지는 그대로인가
- checkbox 클릭할 때 `console.log(e.target.value, e.target.checked)` → `"on" true`. 왜 value가 아니라 checked인지
- radio 3개 중 하나에서 `name="channel"`을 빼면 어떻게 되는가 → 그 하나가 다른 그룹이 되어 둘 다 선택됨
- radio에서 `checked={...}`를 빼면 어떻게 되는가 → 클릭은 되지만 [초기화] 눌러도 안 돌아옴
- `as Fruit`가 안전한 이유: option의 value가 `FRUITS`에서 나왔으니 다른 값이 올 수 없음. 다만 tsc가 보장하는 건 아니고 사람이 보장하는 것
- 제출 후 값을 바꿔도 요약이 안 바뀌는가. 왜 `preference`가 아니라 `submitted`로 그리는지
- [초기화] 후 select·checkbox·radio 전부 초기 모양으로 돌아오는가

## 더 해보기 (옵션)
- 핸들러 하나로 합치기. `name` 속성 + computed key (09 패턴).
  ```ts
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    const next = e.target.type === "checkbox" ? e.target.checked : value;
    setPreference((prev) => ({ ...prev, [name]: next }));
  }
  ```
  `e.target.checked`에서 에러가 나는지 확인. `HTMLSelectElement`에는 `checked`가 없어서 union에서 못 꺼낸다. `e.target instanceof HTMLInputElement`로 좁히거나 `e.target.type === "checkbox" && e.target.checked`가 되는지 시도.
- `as Fruit` 없애기: `FRUITS.includes(value)`로 검사하는 type guard 함수 `isFruit(v: string): v is Fruit` 만들기.
- `submitted`를 `Preference | null` 대신 요약 문장 `string | null`로 바꿔보고, 어느 쪽이 나은지 생각. (데이터를 들고 있으면 나중에 다르게 그릴 수 있다)
- radio 3개를 `RadioGroup` 컴포넌트로 분리. props: `name`, `options`, `value`, `onChange`.

## 배운 것
(실습 후 채우기)

## 헷갈렸던 것
(실습 후 채우기)
