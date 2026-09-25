# 08. 제어 컴포넌트로 단일 입력 제어하기

코드: `src/exercises/08-controlled-input.tsx`

## 목표
- HTML에서는 `<input>` 값을 DOM이 관리하지만, React에서는 state가 값의 주인이다.
- 사용자 입력 → onChange → setState → 새 value → UI 반영. 이 순환이 Controlled Component.
- form 제출 시 `e.preventDefault()`로 새로고침을 막고 JS로 처리한다.

## 화면
1. 이름 입력창 `<input>`: `value={name}`, `onChange`로 state 갱신
2. 입력창 아래 `<p>`: `현재 입력값: {name}` (타이핑할 때마다 즉시 바뀜)
3. `<form onSubmit>` + [제출] 버튼: `preventDefault()` 후 `alert("제출된 이름: " + name)`

## 출력 예시
```
# 초기 상태
[    ]  ← 이름 입력창 (비어 있음)
현재 입력값:

# "영희" 입력 후
[영희]
현재 입력값: 영희

# 제출 버튼 클릭 시
📢 alert: "제출된 이름: 영희"
```

## 구현 규칙
- state 하나: `const [name, setName] = useState("")`
- input에 `value`와 `onChange` 둘 다. 하나만 있으면 React 경고.
- 버튼은 `type="submit"`, onClick 달지 않기 (05에서 두 번 실행됐던 그 문제).
- alert는 `handleSubmit` 안에서. 05처럼 한글 IME 문제 없는지 확인.

## 확인할 것
- 타이핑할 때마다 `현재 입력값`이 같이 바뀌는가
- Enter와 [제출] 클릭 둘 다 alert가 한 번만 뜨는가
- 제출 후 새로고침이 안 되는가 (preventDefault 빼보면 어떻게 되는지도 확인)
- `value`만 두고 `onChange`를 지우면? → 콘솔 경고 + 입력이 안 됨. 왜 그런지 생각해보기
- `onChange`만 두고 `value`를 지우면? → 입력은 되는데 state와 무관. uncontrolled

## 더 해보기 (옵션)
- 글자 수 제한: 10자 넘으면 `setName` 안 하기 (또는 `slice(0, 10)`). 남은 글자 수 표시.
- 빈 값이면 [제출] 버튼 `disabled`
- 실시간 검증: 2자 미만이면 입력창 아래 빨간 글씨로 "2자 이상 입력하세요"
- 제출 후 input 비우기

## 배운 것
- `React.FormEvent`는 @types/react 19.2.10부터 deprecated. DOM에 form 이벤트가 따로 없어서. 제출은 `React.SubmitEvent<HTMLFormElement>`, 입력은 `React.ChangeEvent<HTMLInputElement>`.
- 이벤트 타입 꺾쇠 안은 "핸들러를 단 요소". form이면 HTMLFormElement, input이면 HTMLInputElement.
- 핸들러가 이벤트 하나만 받으면 `onSubmit={handleSubmit}`으로 바로. 내가 정한 값을 넘길 때만 `() => fn(id)`로 감쌈.
- 입력 단계(onChange)는 다 받고 다듬기(`slice`, `replace`). 제출 단계(onSubmit, disabled)에서 거르기. 입력에서 막으면 화면이 멈춤.
- `if (len <= 10)`은 붙여넣기 시 통째로 무시. `slice(0, 10)`은 앞 10자만 받음. 실무는 `maxLength` + `slice` 둘 다.
- `disabled`는 동작(클릭·Enter 차단)이지 모양이 아님. 보이게 하려면 `disabled:opacity-50` 같은 CSS 따로.

## 헷갈렸던 것
- `handleInputName(e: HTMLInputElement)` — e는 요소가 아니라 이벤트. `ChangeEvent<HTMLInputElement>`.
- `React.FormEvent<HTMLInputElement>` — form 이벤트인데 input 요소로 적음. 그리고 FormEvent 자체가 deprecated.
- `type="submit"` 버튼에 onClick까지 달아서 두 번 실행 (05 재발).
- onChange에서 `if (value === "") return` — 마지막 글자가 안 지워짐.
- `name.length < 2`만 쓰면 0자일 때도 경고. `length > 0 &&` 필요.
- JSX 텍스트에 따옴표를 쓰면 따옴표가 그대로 화면에 찍힘.
- `slice(10)`은 10번째부터 끝까지. 앞 10자는 `slice(0, 10)`.
