import { useState } from "react";

interface Item {
  id: number;
  name: string;
  price: number;
  category: "electronics" | "fashion";
  gift?: boolean;
}

const initialItems: readonly Item[] = [
  { id: 1, name: "노트북", price: 1200000, category: "electronics" },
  { id: 2, name: "키보드", price: 50000, category: "electronics" },
  { id: 3, name: "에코백", price: 19000, category: "fashion" },
];

function BulkUpdate() {
  const [items, setItems] = useState<Item[]>([...initialItems]);

  function handleDiscountTotal() {
    setItems((prev) =>
      prev.map(
        (item): Item => ({ ...item, price: Math.floor(item.price * 0.9) }),
      ),
    );
  }

  function handleDiscountOnlyElectronics() {
    setItems((prev) =>
      prev.map(
        (item): Item =>
          item.category === "electronics"
            ? { ...item, price: Math.floor(item.price * 0.95) }
            : item,
      ),
    );
  }

  function handleMarkGift() {
    setItems((prev) =>
      prev.map(
        (item): Item => (item.price < 20000 ? { ...item, gift: true } : item),
      ),
    );
  }

  return (
    <>
      <ul className="flex flex-col">
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.price}원 ({item.category})
            {item.gift && <span>선물</span>}
          </li>
        ))}
      </ul>
      <button onClick={handleDiscountTotal}>전체 10% 할인</button>
      <button onClick={handleDiscountOnlyElectronics}>
        전자제품만 +5% 추가할인
      </button>
      <button onClick={handleMarkGift}>2만원 미만 무료증정</button>
    </>
  );
}

export default BulkUpdate;
