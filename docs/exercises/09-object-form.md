# 09. 회원가입 Form — 여러 input을 객체 state 하나로

코드: `src/exercises/09-object-form.tsx`

## 목표
- input 여러 개를 `useState` 여러 개가 아니라 객체 state 하나로 관리한다.
- 각 input에 `name` 속성을 주고, `e.target.name`으로 어느 필드가 바뀌었는지 안다.
- `{ ...prev, [name]: value }` 로 그 필드만 덮어쓴 새 객체를 만든다 (computed property).
- 08의 단일 input이 필드 셋으로 늘어난 것. 핸들러는 하나.

## 데이터
```ts
interface UserForm {
  name: string;
  email: string;
  age: string;   // input 값은 문자열. 제출할 때 Number()로 (03에서 한 것)
}

const initialForm: UserForm = { name: "", email: "", age: "" };
```

## 화면
1. `<form onSubmit>` 안에 input 3개. 각각 `<label>` 붙이기.
   - 이름: `name="name"`, type text
   - 이메일: `name="email"`, type email
   - 나이: `name="age"`, type text + `inputMode="numeric"`, 숫자만 (03의 정규식)
   - 모든 input의 `value`는 `user.xxx`, `onChange`는 **같은** `handleChange` 하나
2. input 아래 `<p>`: 현재 값 미리보기 `이름: {name} / 이메일: {email} / 나이: {age}`
3. [가입] 버튼 `type="submit"`: `preventDefault` 후 `alert(JSON.stringify(user))`, 제출 후 `initialForm`으로 초기화
4. [초기화] 버튼 `type="button"`: initialForm으로

## 출력 예시
```
# 초기
이름:  [        ]
이메일: [        ]
나이:  [        ]
이름:  / 이메일:  / 나이:

# 입력 후
이름:  [영희]
이메일: [young@example.com]
나이:  [25]
이름: 영희 / 이메일: young@example.com / 나이: 25

# [가입] 클릭
📢 alert: {"name":"영희","email":"young@example.com","age":"25"}
→ 모든 input 비워짐
```

## 구현 규칙
- `handleChange` 하나로 세 input 처리. input마다 핸들러 만들지 않기.
  ```ts
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  }
  ```
- setUser는 함수형 `(prev) => ...`. 명세 원문의 `setUser({ ...user, [name]: value })`는 값 방식인데, 여기선 prev로.
- `[name]: value` 는 computed property. 대괄호 안이 변수라 실행 시점에 key가 정해짐.
- 직접 수정 금지: `user.name = value` X

## 확인할 것
- 이름 칸에 치면 이름만 바뀌고 이메일·나이는 그대로인가
- 세 input이 진짜 같은 `handleChange`를 쓰고 있는가 (함수가 하나뿐인지)
- input에서 `name` 속성을 빼면 어떻게 되는가 → `e.target.name`이 `""`라 `{ ...prev, "": value }`. 화면 안 바뀜. 왜?
- [가입] 후 세 칸 다 비워지는가
- 나이에 한글 치면 안 들어가는가

## 더 해보기 (옵션)
- 타입 좁히기: `e.target.name`은 `string`이라 `[name]: value`가 느슨함. `const name = e.target.name as keyof UserForm` 으로 좁히면 오타 필드가 막히는지 확인.
- 필드별 검증 메시지: 이메일에 `@` 없으면 아래 빨간 글씨. 나이 비었거나 0 이하면 빨간 글씨. 하나라도 문제면 [가입] disabled.
- 제출 시 age를 `Number()`로 바꾼 객체를 alert. `{ ...user, age: Number(user.age) }`
- 필드가 5개, 10개로 늘면 `handleChange`는 그대로인 것 확인. 이게 이 패턴을 쓰는 이유.

## 배운 것
- input 여러 개를 객체 state 하나로. `name` 속성 + `e.target.name`으로 어느 칸인지 식별. `{ ...prev, [name]: value }` computed property.
- `handleChange` 하나로 세 input. 필드별 다듬기는 삼항 한 줄 (`name === "age" ? replace : value`). 늘어나면 sanitizers 객체로 분리.
- 폼 state(`UserForm`, 값 전부 string)와 제출 데이터(`User`, age는 number)를 타입으로 나눔. 제출 시 `payload = { ...user, age: Number(user.age) }`. state를 number로 바꾸려 하면 타입이 막음 + alert엔 스냅샷이 찍힘.
- `handleXxx`는 이벤트에서만, 동사 함수(`resetForm`)는 어디서든. handle이 동사 함수를 부르는 건 정상.
- `id`/`htmlFor`는 DOM 전체(현재 렌더링된 것)에서 유일. `signup-email`처럼 접두사. `name`은 폼 안에서만 유일하면 됨.
- React의 `type` 속성 타입은 `HTMLInputTypeAttribute = "text" | "email" | ... | (string & {})`. 마지막 때문에 오타도 통과. `Exclude`로 못 뗌(전부 never). 좁히려면 직접 나열.

### 제네릭 Field (심화)
- `name: keyof UserForm` → 오타 컴파일 에러. 하지만 UserForm 전용.
- `Field<T>`로 일반화. `FieldProps<T>`의 T와 `function Field<T>`의 T는 별개 변수라 둘 다 선언.
- `keyof T`는 `string | number | symbol`. `Extract<keyof T, string>`으로 string만 (`keyof T & string`과 동일).
- `value: string` 대신 `values: T` + `value={values[name]}`. name과 value 불일치 자체가 불가능. `values={user}`로 T 추론되니 꺾쇠 불필요.
- `values[name]`이 string이려면 T 제약 필요. `T extends Record<string, string>`은 `interface`를 거부(인덱스 시그니처 없음). lint가 interface 강제라 `type StringValues<T> = { [K in keyof T]: string }` + `T extends StringValues<T>`로. "T를 string 값 버전으로 만들었을 때 원본과 같은가" 검사.
- `form`이라는 prop 이름은 `<input>`의 HTML 속성과 충돌. `values`로.
- 현업: TextInput(모양) + FormField(연결) 두 층. FormField 역할은 react-hook-form `register("email")`이 대신. 직접 만드는 건 공용 컴포넌트 팀 수준. 읽을 수 있으면 충분.

## 헷갈렸던 것
- `const [name, value] = e.target` — 객체 구조 분해는 `{}`. 배열은 `[]`.
- `value = value.replace("/\D/g", "")` — const 재대입 + 정규식을 따옴표로 감쌈.
- `type="signup-email" id="email"` — 두 속성 값이 서로 바뀜. tsc 못 잡음.
- `values: {user}` — JSX 속성은 `=`. 콜론은 객체 리터럴.
- `setUser((prev) => ({ ...prev, age: Number(prev.age) }))` 로 제출 직전 state를 number로 — 타입 에러 + alert엔 반영 안 됨. payload 따로.
- `(item: Item)` 매개변수에 타입 붙여도 오타 안 잡힘 (07 재발). 반환 타입 자리.
- Field로 바꾸면서 `id`, `type`을 input에 안 넘김. `inputMode`도 빠짐.
