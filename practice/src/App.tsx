interface Fruit {
  name: string;
  price: number;
}

const array: readonly Fruit[] = [
  { name: "사과", price: 30000 },
  { name: "바나나", price: 20000 },
  { name: "배", price: 15000 },
];

function App() {
  function handleClick(
    item: Fruit,
    index: number,
    event: React.MouseEvent<HTMLLIElement>,
  ) {
    console.log(item.name);
    console.log(index);
    console.log("SyntheticEvent 객체:", event);
  }

  return (
    <ul>
      {array.map((item, index) => (
        <li
          key={item.name}
          onClick={(event) => handleClick(item, index, event)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
}

export default App;
