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

  return null;
}

export default BulkUpdate;
