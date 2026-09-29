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
- select는 `value` + `e.target.value`, checkbox는 `checked` + `e.target.checked`, radio는 같은 `name` + 각자 `value` + `checked={state === value}`. radio에서 `checked`를 빼면 비제어라 [초기화]가 안 먹음.
- `e.target.value`는 항상 `string`. `as Fruit` 대신 type guard `isFruit(v: string): v is Fruit`로 좁힘. runtime에 실제로 목록에 있는지 확인하니 DevTools로 value를 바꿔도 안 들어감.
- type guard 안은 `some`(boolean). `includes`는 `Fruit[]`에 `string`을 못 넣어서 결국 `as`가 필요. `find`는 값을 꺼내 쓸 때(`Fruit | undefined`). JS `some`/`every` = 다른 언어 `any`/`all`, 첫 true에서 멈춤.
- narrowing은 `const`라서 `setPreference((prev) => ...)` callback 안까지 유지. `let`이면 callback 안에서 다시 `string`.
- state·props 안 쓰는 함수(`isFruit`, `isChannel`)는 component 밖에. render마다 새로 안 만듦.
- 조건부 렌더링은 `&&`. `??`는 null일 때 뒤쪽을 쓰는 거라 정반대.
- JSX 안에서는 template literal 대신 `{}`로 끼움. 글자와 `{}` 사이 줄바꿈 공백은 지워지니 `{" "}`로 살림(`{""}`는 빈 문자열이라 효과 없음). Prettier가 80자 넘으면 알아서 `{" "}` 넣고 줄 나눔.
- `<input>`은 void element라 글자를 못 가짐. `value`는 화면에 안 보임. radio 옆 글자는 label로 따로.
- label은 input 하나, `fieldset` + `legend`는 입력 묶음 하나에 이름을 붙임. screen reader가 그룹 이름까지 읽음. `<fieldset disabled>`로 한 번에 잠금 가능.
- label을 밖에 빼는 구조(`htmlFor` + `id`)는 `input:checked + label`, Tailwind `peer-checked:` 같은 형제 selector를 쓸 수 있음. 대신 id를 유일하게 관리해야 함.
- `useId()`: instance마다 다르고 re-render해도 유지. SSR hydration에서도 값이 같음. 맨 위에서 한 번 부르고 `${id}-fruit`처럼 suffix. component를 입력 하나 단위로 쪼개면 suffix도 필요 없음. `key`나 CSS selector용으로는 안 씀.
- 이름 길이는 범위에 비례. 한 줄 callback은 `c`도 OK, 여러 줄이면 풀어 씀. 바깥 변수와 이름이 겹치면(shadowing) 다른 이름으로.

### Radio 분리, updatePreference (더 해보기)
- handler 하나로 합치기는 안 함. 09는 text input 3개가 하는 일이 같았지만, 10은 값 꺼내는 법(`value`/`checked`)과 검사(`isFruit`)가 달라서 합치면 안에서 다시 분기. `[name]: next`는 key가 `string`이라 타입 검사도 잃음.
- 공통 부분만 `updatePreference<K extends keyof Preference>(key: K, value: Preference[K])`로. `[key]`는 computed property name(변수 값을 key로), value 자리는 원래 식이라 안 감쌈.
- `submitted`는 제출 순간의 스냅샷. `preference`로 그리면 제출 안 한 값이 요약에 나옴. `null`로 제출 여부도 겸함.
- radio는 closure로 값 전달 가능. `map`마다 만든 `() => updatePreference("channel", channel)`이 자기 `channel`을 기억 → `e.target.value`, `isChannel` 불필요. select·text input은 handler가 하나거나 값을 미리 몰라서 여전히 이벤트에서 읽음.
- radio의 `value`는 체크 때 생기는 값이 아니라 고정 이름표. `e.target.value`와 FormData 제출용. 바뀌는 건 `checked`.
- `Channel` → `string`은 넓히기라 그냥 됨. `string` → `Channel`만 좁히기 필요. `Radio`가 `onChange: () => void`라 값을 돌려주지 않으니 좁힐 일이 없음.
- 쪼개는 기준: 자기 로직·state가 있나(`useId`), 바뀌는 이유가 다른가(스타일 vs 배치), 재사용하나. `legend`처럼 태그 하나에 로직 없으면 안 쪼갬. `Radio`만 만들고 부모에서 조합.

## 헷갈렸던 것
- `setPreference((prev) => ({ ...prev, fruit: e.target.value }))` — `string`이라 `Fruit`에 안 들어감.
- 초기화 버튼에 `onChange={resetForm}` — button은 change event가 없음. `onClick`.
- `map`으로 만든 `<option>`에 `key` 빠짐 (radio에서도 한 번 더).
- 요약을 `submitted?.newsletter ? ... : ""`로 — false면 아무것도 안 나옴. 그리고 `true`가 그대로 찍힘.
- `` {submitted ?? `...${submitted.fruit}`} `` — null이면 null.fruit, 있으면 객체를 렌더링하려 해서 둘 다 에러.
- `<p>` 안에 backtick을 그대로 둬서 `` ` ``와 `$`가 화면에 찍힘. formatter가 `${`를 `$` + 줄바꿈 + `{`로 쪼갬.
- radio 3개에 `id="channel"`을 똑같이 줌 — id 중복, label은 첫 번째만 연결. 그룹 이름은 `legend` 몫.
- radio 옆에 글자가 안 나와서 `value`가 보일 줄 알았음.
- `isChannel`의 callback 인자를 `f`로 복사해 옴. 동작은 같지만 fruit로 읽힘.
- `==` 비교, `handelCheck` 오타.
- `RadioGroupProps<T>`만 쓰고 `function RadioGroup<T>`에 T 선언 안 함 (09 재발).
- 공통 component로 빼면서 `name` 빠짐, label이 안쪽은 비고 바깥은 없는 id를 가리킴.
- `Radio` label에 `htmlFor`/`id` 없음 → 글자 클릭으로 선택 안 됨. `Radio` 안에서 `useId`.
