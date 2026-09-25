import { useState } from "react";

interface UserForm {
  name: string;
  email: string;
  age: string;
}

const initialForm: UserForm = { name: "", email: "", age: "" };

function ObjectForm() {
  const [user, setUser] = useState<UserForm>(initialForm);

  return null;
}

export default ObjectForm;
