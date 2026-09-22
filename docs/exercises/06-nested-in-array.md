# 06. 배열 안의 객체 안의 객체 업데이트

코드: `src/exercises/06-nested-in-array.tsx`

## 목표
- `posts[i].author.name` 처럼 "배열 → 객체 → 객체" 세 겹을 불변성 지키며 바꾼다.
- 03(배열 안 객체) + 04(객체 안 객체).
- 스프레드는 한 겹만 복사. 바뀌는 경로의 모든 단계에서 새로 만든다.
  - 배열: `prev.map(...)` / post: `{ ...post, author: ... }` / author: `{ ...post.author, name: "민수" }`

## 데이터
```ts
interface Author { name: string; email: string }
interface Post { id: number; title: string; author: Author }
첫 번째 글/철수/chul@example.com, 두 번째 글/영희/young@example.com
```

## 화면
1. 목록 (li당 post, key는 id): `{title} — {author.name} ({author.email})`, [작성자 이름 바꾸기] → 그 post의 author.name만 "민수"
2. [초기화]

## 출력 예시
```
# 초기
첫 번째 글 — 철수 (chul@example.com)
두 번째 글 — 영희 (young@example.com)

# [작성자 이름 바꾸기] 클릭
첫 번째 글 — 민수 (chul@example.com)
두 번째 글 — 영희 (young@example.com)
```

## 일부러 틀려보기
- A. `prev.map((p) => { if (p.id === id) p.author.name = "민수"; return p; })` → map은 새 배열이라 화면 바뀜. [초기화] 눌러보면 민수 그대로 (initialPosts 오염).
- B. post는 새 객체, author는 같은 참조 → 화면은? 초기화는?

## 확인할 것
- 첫 번째만 민수, 두 번째 영희 그대로 / email 그대로 / [초기화] 후 철수

## 옵션
- 이름을 input으로 받기 → li마다 input이면 state를 자식(PostItem)으로 내려서 각자 갖게.
- `updateAuthor(id, patch: Partial<Author>)`

## 배운 것
- `[...initialPosts]`는 타입(readonly → mutable) 때문. 한 겹만 복사라 안의 객체는 공유. 진짜 방어는 setter에서 새 객체.
- "화면이 바뀐다"와 "불변성을 지켰다"는 다르다. 초기화가 그걸 드러냄.
- li마다 input state → 자식 컴포넌트로 분리 (state는 필요한 곳에 가장 가깝게). key는 map 자리 `<PostItem key>`에.
- 입력 중 값 이름: `nameInput` / `draft` / `newName`. 여러 개면 `nameInput`, `emailInput` 또는 객체 하나.

## 헷갈렸던 것
- 한 줄에 몰아 쓰다 `}` 하나 빠짐. 줄 나누면 보임.
- key를 자식 안 `<li>`에 붙임. 효과 없음.
