// 05. 배열 state: 추가 / 삭제 / 토글
//
// 목표
// - 배열 state를 push/splice 없이 [...spread], filter, map 으로만 바꾼다.
// - 03에서 한 것과 같은 패턴. 이번엔 "완료 토글"이 들어감.
//
// 데이터
// interface Todo { id: number; text: string; done: boolean }
// 초기값: 공부하기(미완료), 운동하기(미완료)  → 아래 initialTodos
// state: Todo[]
//
// 화면
// 1. 목록: li 하나당 todo 하나, key는 id
//    - 체크박스 <input type="checkbox">: checked는 todo.done, onChange로 토글
//    - 텍스트: done이면 "공부하기 (✅)", 아니면 "공부하기"
//    - [삭제] 버튼
// 2. 목록 아래: 입력창 + [할 일 추가] 버튼
//    - 입력값은 state (controlled)
//    - 빈 문자열이면 추가 안 함
//    - 추가 후 입력창 비우기
//    - id는 Date.now(), done은 false
//
// 구현 규칙
// - setTodos는 항상 함수형 (prev) => ...
// - 추가: [...prev, 새것]
// - 삭제: prev.filter((t) => t.id !== id)
// - 토글: prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
//
// 확인할 것
// - 체크 후 다른 항목 삭제해도 체크 상태가 유지되는가
// - 같은 텍스트를 두 번 추가해도 각각 따로 삭제/토글되는가 (key가 id라서)
// - 빈 입력으로 [할 일 추가] 눌렀을 때 아무 일도 없는가
//
// 더 해보기 (옵션)
// - Enter 키로도 추가되게: input의 onKeyDown에서 e.key === "Enter"
// - 남은 개수 표시: todos.filter((t) => !t.done).length
// - 완료 항목은 텍스트에 line-through class

import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

const initialTodos: readonly Todo[] = [
  { id: 1, text: "공부하기", done: false },
  { id: 2, text: "운동하기", done: false },
];

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([...initialTodos]);
  const [text, setText] = useState("");

  function handleAddTodo() {
    if (text === "") return;

    setTodos((prev) => [...prev, { id: Date.now(), text, done: false }]);
    setText("");
  }

  function handleRemove(id: number) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function handleCheck(id: number) {
    setTodos((prev) =>
      prev.map((t) => (t.id !== id ? t : { ...t, done: !t.done })),
    );
  }

  return (
    <>
      <ul>
        {todos.map((item) => (
          <li key={item.id}>
            <input
              id={`item-${item.id}`}
              type="checkbox"
              checked={item.done}
              onChange={() => handleCheck(item.id)}
            />
            <label htmlFor={`item-${item.id}`}>
              {item.text}
              {item.done && "체크"}
            </label>
            <button onClick={() => handleRemove(item.id)}>삭제하기</button>
          </li>
        ))}
      </ul>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddTodo();
        }}
      >
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button type="submit">할 일 추가</button>
      </form>
    </>
  );
}

export default TodoList;
