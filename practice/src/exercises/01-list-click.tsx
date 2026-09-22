// 01. 리스트 렌더링 + 클릭 핸들러
// 배운 것
// - JSX {} 안에는 식만. for/if 대신 map. 빈 배열 검사는 map 밖에서 length로.
// - export default 없으면 import 못 함.
// - onClick={handleClick}은 event만 받음. item/index를 넘기려면 화살표로 감싸기.
// - li에는 value 없음. target 말고 currentTarget.
// 헷갈렸던 것
// - map 안에서 if(!item)으로 빈 배열 처리하려 함 → 콜백 자체가 안 불림.
// - 문자열 배열에 item < 20000 비교 → 타입 에러.

interface Fruit {
  name: string;
  price: number;
}

const array: readonly Fruit[] = [
  { name: "사과", price: 30000 },
  { name: "바나나", price: 20000 },
  { name: "배", price: 15000 },
];

function ListClick() {
  function handleClick(
    item: Fruit,
    index: number,
    event: React.MouseEvent<HTMLLIElement>,
  ) {
    console.log("클릭된 항목:", item.name);
    console.log("인덱스:", index);
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

export default ListClick;
