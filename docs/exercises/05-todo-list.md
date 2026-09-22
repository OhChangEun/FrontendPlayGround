# 05. 배열 state: 추가 / 삭제 / 토글

코드: `src/exercises/05-todo-list.tsx`

## 목표
- 배열 state를 push/splice 없이 `[...spread]`, filter, map 으로만 바꾼다.
- 03과 같은 패턴. 이번엔 "완료 토글"이 들어감.

## 데이터
```ts
interface Todo { id: number; text: string; done: boolean }
공부하기, 운동하기 (둘 다 미완료)
```

## 화면
1. 목록 (li당 todo, key는 id)
   - 체크박스 `<input type="checkbox">`: `checked={todo.done}`, onChange로 토글
   - 텍스트: done이면 "공부하기 (✅)"
   - [삭제]
2. 입력창 + [할 일 추가]: controlled, 빈 값 막기, 추가 후 비우기, id는 Date.now()

## 출력 예시
```
# 초기
공부하기
운동하기

# [할 일 추가] 클릭 후
공부하기
운동하기
청소하기

# [삭제] 클릭 후
운동하기
청소하기

# 체크박스 클릭 시
공부하기 (✅)
운동하기 (✅)
```

## 구현 규칙
- 추가: `[...prev, 새것]` / 삭제: `prev.filter((t) => t.id !== id)` / 토글: `prev.map((t) => t.id === id ? { ...t, done: !t.done } : t)`

## 확인할 것
- 체크 후 다른 항목 삭제해도 체크 유지
- 같은 텍스트 두 번 추가해도 각각 따로 삭제/토글 (key가 id)
- 빈 입력으로 [추가] 눌렀을 때 아무 일도 없음

## 옵션
- Enter로 추가 / 남은 개수 / 완료 항목 line-through

## 배운 것
- 체크박스 id는 이벤트가 아니라 map 클로저의 `item.id`. `e.target.value`는 "on".
- `checked` + `onChange` 세트. 없으면 브라우저가 따로 관리.
- DOM id는 `todo-${id}` 접두사. 데이터 id는 number 유지.
- 한글 IME: onKeyDown Enter가 두 번 옴. `!e.nativeEvent.isComposing` 또는 `<form onSubmit>`.
- form 안 button은 기본 submit. onClick까지 달면 두 번 실행. `type="submit"` 명시, 제출 아닌 버튼은 `type="button"`.

## 헷갈렸던 것
- `onChange={(e) => handleCheck(e.target.value)}` — 이벤트에서 id 찾으려 함.
- `(item) => {...item, done: !prev.done}` — 블록으로 읽힘 + prev는 배열 + id 비교 없음.
