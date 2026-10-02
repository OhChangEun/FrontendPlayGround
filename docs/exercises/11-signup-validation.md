# 11. 회원가입 Form 검증 — 제출 시 유효성 검사와 에러 표시

코드: `src/exercises/11-signup-validation.tsx`

## 목표
- 이름·이메일·약관 동의를 각각 `useState`로 관리한다. (09는 객체 하나, 이번엔 따로)
- `onSubmit`에서 `e.preventDefault()` 후 값을 검사하고, 틀리면 제출을 멈춘다.
- 에러 메시지를 `error` state에 넣고, 있을 때만 빨간 글씨로 그린다 (조건부 렌더링).
- 08~10은 "받아서 보여주기"까지였다. 여기선 "받은 값을 거르기"가 추가된다.

## 데이터
```ts
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [agreed, setAgreed] = useState(false);
const [error, setError] = useState<string | null>(null);
```

## 화면
1. `<form onSubmit>` 안에 세 입력. 각각 label 연결.
   - 이름: `type="text"`
   - 이메일: `type="email"`
   - 약관 동의: `type="checkbox"`, 옆에 "약관에 동의합니다"
2. [제출] 버튼 `type="submit"`
3. `error`가 있으면 버튼 아래 빨간 `<p>`: `❌ {error}`
4. 검사를 통과하면 `alert("{이름}님, 가입이 완료되었습니다!")`

## 출력 예시
```
# 초기
이름 입력:   [          ]
이메일 입력: [          ]
☐ 약관에 동의합니다
[제출]

# 이름 비우고(또는 공백만) 제출
❌ 사용자 이름을 입력하세요.

# 이름은 넣고 이메일에 @ 없이 제출
❌ 올바른 이메일을 입력하세요.

# 이름 "  홍길동 ", 이메일 hong@test.com 제출
📢 alert: "홍길동님, 가입이 완료되었습니다!"
→ 에러 메시지 사라짐
```

## 구현 규칙
- 제출 순서: `preventDefault` → 검사 → 걸리면 `setError(...)` 후 `return` → 통과하면 `setError(null)` 후 alert.
- 검사 순서는 이름 먼저, 이메일 다음. 둘 다 틀려도 에러는 하나만 (먼저 걸린 것).
- 이름은 `name.trim() === ""`로. 공백만 친 것도 빈 값.
- 이메일은 `email.includes("@")`로. 정규식은 "더 해보기"에서.
- alert의 이름도 `trim()`한 값으로.
- `error`는 `string | null`. 빈 문자열 `""`로 "에러 없음"을 표현하지 않기.
- 에러 문구는 코드에서 한 번만 적기. 같은 문자열을 JSX와 handler에 두 번 쓰지 않기.

## 확인할 것
- 공백만 입력한 이름이 걸리는가
- 이메일에 `abc`만 넣고 제출하면 무슨 일이 생기는가. 내 에러 메시지가 뜨는가, 브라우저 말풍선이 뜨는가. 왜 그런지. (`<form noValidate>`를 넣으면 어떻게 달라지는지)
- 이름 에러가 뜬 상태에서 이름을 고치고 이메일만 틀리게 제출하면 에러 문구가 바뀌는가
- 통과했을 때 이전 에러 메시지가 남아 있지 않은가
- 약관 체크 여부는 지금 제출에 영향을 주는가. 요구사항에 검사 조건이 있는지 다시 읽어보기
- Enter로 제출해도 똑같이 동작하는가

## 더 해보기 (옵션)
- 약관 미동의도 에러로: "약관에 동의해 주세요." 또는 미동의면 [제출] `disabled`. 둘 중 어느 쪽이 나은지 생각.
- 입력을 고치기 시작하면 에러 지우기. 어느 handler에서 `setError(null)`을 해야 하는지.
- 에러를 필드별로: `error: string | null` 대신 `errors: { name?: string; email?: string }`. 모든 에러를 한 번에 보여주고, 각 input 바로 아래에 표시.
- 검사를 함수로 빼기: `validate(): string | null`. component 밖으로 뺄 수 있는지 (무엇을 인자로 받아야 하는지).
- 이메일 검사를 정규식으로. `@`만 보는 것과 뭐가 다른지. `type="email"`의 브라우저 검사와는 뭐가 다른지.
- 에러 `<p>`에 `role="alert"` 넣고, input에 `aria-invalid`, `aria-describedby`로 에러 연결.
- 가입 완료 후 form 비우기.

## 배운 것
(실습 후 채우기)

## 헷갈렸던 것
(실습 후 채우기)
