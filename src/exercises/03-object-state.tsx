import { useState } from "react";

interface Fruit {
  id: number;
  name: string;
  price: number;
  stock: number;
}

const initialFruits: readonly Fruit[] = [
  { id: 1, name: "사과", price: 30000, stock: 3 },
  { id: 2, name: "바나나", price: 20000, stock: 0 },
  { id: 3, name: "배", price: 15000, stock: 5 },
];

function ObjectState() {
  const [fruits, setFruits] = useState<Fruit[]>([...initialFruits]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const total = fruits.reduce((sum, f) => sum + f.price * f.stock, 0);

  function handleIncrease(id: number) {
    setFruits((prev) =>
      prev.map((f) => {
        if (f.id !== id) return f;
        return { ...f, stock: f.stock + 1 };
      }),
    );
  }

  function handleDecrease(id: number) {
    setFruits((prev) =>
      prev.map((f) => {
        if (f.id !== id) return f;
        return { ...f, stock: f.stock - 1 };
      }),
    );
  }

  function handleRemove(id: number) {
    setFruits((prev) => prev.filter((f) => f.id !== id));
  }

  function handleAdd() {
    if (name === "" || price === "") return;

    setFruits((prev) => [
      ...prev,
      { id: Date.now(), name, price: Number(price), stock: 1 },
    ]);
    setName("");
    setPrice("");
  }

  return (
    <div className="flex flex-col">
      <ul>
        {fruits.map((item) => {
          return (
            <li key={item.id}>
              <span className={item.stock === 0 ? "line-through" : ""}>
                {item.name} {item.price}원 (재고 {item.stock})
              </span>
              <button onClick={() => handleIncrease(item.id)}>+</button>
              <button onClick={() => handleDecrease(item.id)}>-</button>
              <button onClick={() => handleRemove(item.id)}>삭제</button>
            </li>
          );
        })}
      </ul>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="과일 이름"
        />
        <input
          type="text"
          inputMode="numeric"
          value={price}
          onChange={(e) => setPrice(e.target.value.replace(/\D/g, ""))}
          placeholder="가격"
        />
        <button onClick={handleAdd}>추가</button>
      </div>
      <div>총합: {total}</div>
    </div>
  );
}

export default ObjectState;
