# 02. state vs props

코드: `src/exercises/02-state-props.tsx`

## 목표
- state: 컴포넌트 "자기 것". 바뀌면 그 컴포넌트가 다시 그려짐.
- props: 부모가 "내려주는 것". 자식은 읽기만, 못 바꿈.
- 자식이 부모 state를 바꾸려면 부모가 함수를 props로 내려줌.

## 데이터
```ts
interface Fruit { name: string; price: number }
사과 30000, 바나나 20000, 배 15000 (readonly 배열, 컴포넌트 밖)
```

## 컴포넌트 3개
1. **FruitItem** (자식, props만 받음)
   - props: `fruit: Fruit`, `selected: boolean`, `onSelect: (fruit: Fruit) => void`
   - li 하나 반환, 내용은 fruit.name
   - 클릭하면 `onSelect(fruit)` 호출 (`onClick={onSelect}`로 직접 넘기면 안 되는 이유 확인)
   - selected가 true면 Tailwind `font-bold`
   - `fruit.price = 0` 을 시도해보고 에러 메시지 읽기
2. **Counter** (자식, 자기 state만 가짐)
   - useState로 count (초기값 0), 버튼 클릭마다 +1
   - 부모가 다시 그려져도 count가 유지되는지 확인
3. **StateVsProps** (부모, default export)
   - state: `selected: Fruit | null`, `maxPrice: number` (초기 40000)
   - `filtered`: price <= maxPrice (return 위에서 계산)
   - 화면: `<input type="number">` (value=maxPrice, Number() 변환) → ul (FruitItem map, key=name, selected는 "이 과일이 선택된 과일인가") → `<p>` 선택된 과일 "이름 가격원" / "선택 없음" → `<Counter />`

## 확인할 것
- 과일 선택 후 Counter 눌러도 선택이 안 풀리는가
- Counter 올린 후 과일 바꿔도 count가 안 날아가는가
- maxPrice를 20000으로 바꾸면 사과만 사라지는가

## 배운 것
- 재렌더링(함수 재호출, state 유지)과 재마운트(자리 사라졌다 생김, state 초기화)는 다르다.
- state는 React가 fiber에 hook 순서대로 저장. 클로저가 아님.
- `{show && <Counter />}`로 unmount하면 0으로 돌아옴.

## 헷갈렸던 것
- `onClick={() => onSelect}` — 호출 안 하고 함수만 반환.
- `onClick={(prev) => setShow(!prev)}` — prev 자리에 이벤트가 들어옴. 이전 값은 setter 안 `(prev) => !prev`.
- `selected`만 쓰면 항상 true.
