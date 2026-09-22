# 07. 배열 state 일괄 수정 (조건부 map)

코드: `src/exercises/07-bulk-update.tsx`

## 목표
- 버튼 하나로 여러 항목을 한 번에 바꾼다. 03~06은 "id 하나"였고, 이번엔 "조건에 맞는 전부".
- 조건에 안 맞는 항목은 그대로(같은 참조) 돌려주고, 맞는 항목만 새 객체.
- 없던 필드(gift)를 스프레드로 안전하게 추가한다.

## 데이터
```ts
interface Item {
  id: number;
  name: string;
  price: number;
  category: "electronics" | "fashion"; // union. 두 값만 허용
  gift?: boolean;                       // optional. 처음엔 없다가 버튼으로 생김
}

const initialItems: readonly Item[] = [
  { id: 1, name: "노트북", price: 1200000, category: "electronics" },
  { id: 2, name: "키보드", price: 50000, category: "electronics" },
  { id: 3, name: "에코백", price: 19000, category: "fashion" },
];
```

## 화면
1. 목록: li 하나당 item 하나, key는 id
   - `{name} — {price}원 ({category})`
   - gift가 true면 뒤에 ` (🎁 gift)`
2. 버튼 4개
   - [전체 10% 할인]: 모든 price를 `Math.floor(price * 0.9)`
   - [전자제품만 +5% 추가할인]: `category === "electronics"` 만 `Math.floor(price * 0.95)`
   - [2만원 미만 무료증정]: `price < 20000` 인 항목에 `gift: true`
   - [초기화]: initialItems로
3. 목록 아래: 합계 (price 전부 더한 값)

## 출력 예시
```
# 초기
노트북 — 1200000원 (electronics)
키보드 — 50000원 (electronics)
에코백 — 19000원 (fashion)

# [전체 10% 할인] 클릭
노트북 — 1080000원
키보드 — 45000원
에코백 — 17100원

# [전자제품만 +5% 추가할인] 클릭
노트북 — 1026000원
키보드 — 42750원
에코백 — 17100원  # 그대로

# [2만원 미만 무료증정] 클릭
에코백 — 17100원 (🎁 gift)
```

## 구현 규칙
- setItems는 항상 함수형 `(prev) => ...`
- 세 버튼 모두 `prev.map((it) => 조건 ? { ...it, 바뀐필드 } : it)` 한 줄 틀
- 직접 수정 금지: `it.price = ...` X, `it.gift = true` X

## 확인할 것
- [전체 10%] 두 번 누르면 또 10% 깎이는가 (누적 맞음. 이전 값 기반이니 prev)
- [전자제품 +5%] 후 에코백 가격이 그대로인가
- [무료증정] 후 에코백에만 🎁, 다른 건 없음
- [무료증정] 두 번 눌러도 gift가 true 그대로 (toggle 아님)
- [초기화] 후 gift가 사라지는가 (initialItems에 gift가 없으니 사라져야 정상)

## 더 해보기 (옵션)
- 세 버튼의 공통 부분 빼기:
  ```ts
  function updateWhere(
    cond: (it: Item) => boolean,
    patch: (it: Item) => Partial<Item>,
  ) { ... }
  updateWhere((it) => it.category === "electronics", (it) => ({ price: Math.floor(it.price * 0.95) }));
  ```
- gift 항목 개수 표시: `items.filter((it) => it.gift).length`
- price를 `toLocaleString()`으로 1,200,000 형식 출력

## 배운 것
- 조건부 일괄 수정은 `prev.map((it) => 조건 ? { ...it, 바뀐필드 } : it)` 한 틀. 03~06의 `it.id === id` 자리에 조건만 바뀜.
- 없던 필드(`gift?`)도 `{ ...it, gift: true }`로 추가 가능. optional 타입이라 통과.
- map 콜백에 반환 타입 `(item): Item =>` 붙이면 `gitf` 같은 오타 필드를 tsc가 잡음. 안 붙이면 조용히 통과.
- 매개변수 타입 `(item: Item)`과 반환 타입 `(item): Item`은 자리가 다름. 괄호 안은 들어오는 것, 괄호 뒤는 나가는 것.
- `Todo["id"]` indexed access type으로 핸들러 인자 타입을 원본에서 파생 가능. `Post["author"]["name"]`은 중첩 경로.

## 헷갈렸던 것
- `prev.map((item) => item.price * 0.9)` — 숫자 배열이 나옴. map은 "각 항목을 뭘로 바꿀까"라 결과도 Item이어야 함.
- 오타 방어하려고 `(item: Item)`을 붙였는데 안 잡힘. 반환 타입 자리에 붙여야 함.
- `handleOfferForFree`는 "무료로 준다"로 읽혀 가격 0으로 만드는 함수처럼 보임. 하는 일(태그 붙이기)이 이름에 보이게 `handleMarkGift`.
- `<li>` key 세 번 빠뜨림. tsc/lint가 안 잡아서 콘솔 경고로만 보임.
