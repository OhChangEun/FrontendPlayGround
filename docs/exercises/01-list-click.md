# 01. 리스트 렌더링 + 클릭 핸들러

코드: `src/exercises/01-list-click.tsx`

## 목표
- 배열을 map으로 li 목록으로 그린다.
- 클릭한 항목과 인덱스, SyntheticEvent를 콘솔에 찍는다.

## 데이터
```ts
interface Fruit { name: string; price: number }
사과 30000, 바나나 20000, 배 15000 (readonly 배열)
```

## 화면
- ul > li, key는 name
- li 클릭 시 콘솔:
  ```
  클릭된 항목: 바나나
  인덱스: 1
  SyntheticEvent 객체: SyntheticBaseEvent {...}
  ```

## 배운 것
- JSX `{}` 안에는 식만. for/if 대신 map. 빈 배열 검사는 map 밖에서 length로.
- export default 없으면 import 못 함.
- `onClick={handleClick}`은 event만 받음. item/index를 넘기려면 화살표로 감싸기.
- li에는 value 없음. target 말고 currentTarget.

## 헷갈렸던 것
- map 안에서 `if (!item)`으로 빈 배열 처리하려 함 → 콜백 자체가 안 불림.
- 문자열 배열에 `item < 20000` 비교 → 타입 에러.
