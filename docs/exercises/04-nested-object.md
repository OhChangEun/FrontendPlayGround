# 04. 중첩 객체 state 업데이트

코드: `src/exercises/04-nested-object.tsx`

## 목표
- `user.address.city` 같은 중첩 경로를 직접 고치지 않고, 경로의 각 단계마다 새 객체를 만들어 교체한다.
- React는 객체 "내용"이 아니라 참조가 바뀌었는지만 본다 (얕은 비교).

## 데이터
```ts
interface Address { city: string; zipcode: string }
interface User { name: string; age: number; address: Address }
initialUser = { name: "영희", age: 25, address: { city: "서울", zipcode: "12345" } }
```

## 화면
1. `<p>`: `{name} — {city} ({zipcode})` 예) 영희 — 서울 (12345)
2. [부산으로 이사하기]: city만 "부산"
3. [우편번호 54321로 변경]: zipcode만
4. [초기화]: initialUser로

## 구현 규칙
- setUser에는 함수형 `(prev) => ...`
- 바깥 객체와 address 객체를 둘 다 새로: `{ ...prev, address: { ...prev.address, city: "부산" } }`
- 직접 수정 금지

## 일부러 틀려보기
- A. 바깥만 새로 만들고 address는 직접 수정 → 화면은 바뀜. 왜 안 되는 코드인지 ([초기화] 눌러보기)
- B. setUser 없이 `user.address.city = "부산"` → 화면 안 바뀜

## 확인할 것
- [부산] 후 zipcode 12345 그대로
- [우편번호] 후 city 부산 그대로 (서울로 돌아가면 prev 대신 initialUser를 쓴 것)
- [초기화] 후 두 버튼 정상 동작

## 배운 것
- `=>` 뒤 `{`는 블록. 객체 돌려주려면 `({ ... })`.
- `updateAddress(patch: Partial<Address>)` 로 공통 추출. `Partial<T>`는 모든 필드 optional.
- 세 겹 이상이면 정규화 / state 쪼개기 / Immer.
- 값 방식 `setX({...x})`도 되지만 이전 값에 기대면 항상 prev. 배치·await·더블클릭에서 갈림.
