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

## 배운 것 / 헷갈렸던 것
(실습 끝나고 채우기)
