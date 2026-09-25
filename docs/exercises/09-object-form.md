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

## 배운 것 / 헷갈렸던 것
(실습 끝나고 채우기)
