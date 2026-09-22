import { useState } from "react";

interface Address {
  city: string;
  zipcode: string;
}

interface User {
  name: string;
  age: number;
  address: Address;
}

const initialUser: User = {
  name: "영희",
  age: 25,
  address: {
    city: "서울",
    zipcode: "12345",
  },
};

function NestedObject() {
  const [user, setUser] = useState(initialUser);

  function handleMoveToBusan() {
    setUser((prev) => ({
      ...prev,
      address: { ...prev.address, city: "부산" },
    }));
  }

  function handleChangeZipcode() {
    setUser((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        zipcode: "54321",
      },
    }));
  }

  function initialize() {
    setUser(initialUser);
  }

  return (
    <>
      <p>{`${user.name} - ${user.address.city} (${user.address.zipcode})`}</p>
      <button onClick={handleMoveToBusan}>부산으로 이사하기</button>
      <button onClick={handleChangeZipcode}>우편번호 54321로 변경</button>
      <button onClick={initialize}>초기화</button>
    </>
  );
}

export default NestedObject;
