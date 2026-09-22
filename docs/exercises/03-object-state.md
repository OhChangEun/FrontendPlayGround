# 03. 객체/배열 state와 함수형 업데이트

코드: `src/exercises/03-object-state.tsx`

## 목표
- state가 객체/배열이면 "새 객체/배열"을 만들어서 setter에 넘겨야 화면이 바뀜.
- 이전 값 기반으로 바꿀 땐 `setState((prev) => ...)` 함수형.
- 스프레드(...)로 복사 + 바꿀 필드만 덮어쓰기.

## 데이터
```ts
interface Fruit { id: number; name: string; price: number; stock: number }
사과 30000 재고 3, 바나나 20000 재고 0, 배 15000 재고 5
state는 Fruit[] 하나
```

## 화면
1. 목록 (li당 과일 하나, key는 id)
   - "이름 가격원 (재고 n)"
   - [+] stock +1 / [-] stock -1 (0 아래 X) / [삭제] 제거
   - 재고 0이면 이름에 `line-through`
2. 추가 폼: 이름 input(text), 가격 input, [추가]
   - controlled input, id는 Date.now(), stock은 1
   - 이름 빈 문자열이면 추가 안 함, 추가 후 input 비우기
3. 합계: price * stock 합

## 구현 규칙
- setFruits에는 항상 함수형 `(prev) => ...`
- 배열 변경은 map / filter / `[...prev, 새것]` 만. push/splice 금지
- 객체 필드 변경은 `{ ...fruit, stock: fruit.stock + 1 }` 처럼 복사해서
- 잘못된 방법도 한 번: `fruit.stock += 1; setFruits(prev => prev);` → 화면 안 바뀜 확인

## 확인할 것
- [+]를 빠르게 두 번 눌렀을 때 +2가 되는가
- 삭제 후 합계가 바로 바뀌는가
- 빈 이름으로 [추가] 눌렀을 때 아무 일도 없는가

## 배운 것
- 숫자 input: state는 string, `type="text" inputMode="numeric"`, 정규식 `/\D/g`로 숫자만, 저장 직전에 `Number()`. DB엔 number.
- `updateFruit(id, patch)` 공통 함수로 중복 제거.
- reduce는 배열을 값 하나로 접는 것. 시작값 0 필수.

## 헷갈렸던 것
- `setFruits((prev) => ({ ...prev, stock: ... }))` — prev는 배열인데 객체처럼 펼침. 두 겹 필요: `prev.map((f) => f.id === id ? { ...f, stock } : f)`.
- `onClick={handleAddStock(item.id)}` — 즉시 실행. `() =>`로 감싸야 함.
- 문자열 state에 `[...prev, e.target.value]` — input 값은 이미 전체라 그냥 `setText(e.target.value)`.
- if 블록으로 통일하다 `Math.max(0, ...)` 빠뜨림. 리팩토링 후 동작 확인 습관.
