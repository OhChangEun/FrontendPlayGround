import { useState } from "react";

interface Author {
  name: string;
  email: string;
}

interface Post {
  id: number;
  title: string;
  author: Author;
}

const initialPosts: readonly Post[] = [
  {
    id: 1,
    title: "첫 번째 글",
    author: { name: "철수", email: "chul@example.com" },
  },
  {
    id: 2,
    title: "두 번째 글",
    author: { name: "영희", email: "young@example.com" },
  },
];

interface PostItemProps {
  item: Post;
  onChangeName: (id: number, name: string) => void;
}

function PostItem({ item, onChangeName }: PostItemProps) {
  const [nameInput, setNameInput] = useState("");

  function handleClick() {
    if (nameInput === "") return;

    onChangeName(item.id, nameInput);
    setNameInput("");
  }

  return (
    <li>
      <span>
        {item.title} - {item.author.name}({item.author.email})
      </span>
      <input value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
      <button onClick={handleClick}>이름 바꾸기</button>
    </li>
  );
}

function NestedInArray() {
  const [posts, setPosts] = useState<Post[]>([...initialPosts]);

  function handleChangeName(id: number, name: string) {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, author: { ...post.author, name } } : post,
      ),
    );
  }

  function handleInitialize() {
    setPosts([...initialPosts]);
  }
  return (
    <>
      <ul>
        {posts.map((post) => (
          <PostItem key={post.id} item={post} onChangeName={handleChangeName} />
        ))}
      </ul>
      <button onClick={handleInitialize}>초기화 버튼</button>
    </>
  );
}

export default NestedInArray;
