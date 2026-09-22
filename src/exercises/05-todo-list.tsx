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
