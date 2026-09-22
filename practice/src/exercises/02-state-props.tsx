import { useState } from "react";

interface Fruit {
  name: string;
  price: number;
}

const initialFruit: Fruit[] = [
  {
    name: "바나나",
    price: 10000,
  },
  {
    name: "사과",
    price: 20000,
  },
  {
    name: "배",
    price: 30000,
  },
];

interface FruitItemProps {
  fruit: Fruit;
  selected: boolean;
  onSelect: (fruit: Fruit) => void;
}

function FruitItem({ fruit, selected, onSelect }: FruitItemProps) {
  return (
    <li
      onClick={() => onSelect(fruit)}
      className={selected ? "font-bold" : "font-normal"}
    >
      {fruit.name}
    </li>
  );
}

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount((prev) => prev + 1)}>{count}</button>;
}

function StateVsProps() {
  const [selected, setSelected] = useState<Fruit | null>(null);
  const [maxPrice, setMaxPrice] = useState(30000);
  const [show, setShow] = useState(true);

  const filtered = initialFruit.filter((fruit) => fruit.price <= maxPrice);

  return (
    <div className="flex flex-col">
      <input
        type="number"
        value={maxPrice}
        onChange={(e) => setMaxPrice(Number(e.target.value))}
      />
      <ul>
        {filtered.map((item) => (
          <FruitItem
            key={item.name}
            fruit={item}
            selected={selected?.name === item.name}
            onSelect={setSelected}
          />
        ))}
      </ul>

      <button onClick={() => setShow((prev) => !prev)}>
        {show ? "없애기" : "보이기"}
      </button>
      {show && <Counter />}

      <p>{selected ? `${selected.name}-${selected.price}원` : "선택없음"}</p>
    </div>
  );
}

export default StateVsProps;
