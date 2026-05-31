# Uruchomienie aplikacji

1. Uruchomienie Backendu

```bash
cd backend
npm run dev
```

2. Uruchomienie Frontendu

```bash
cd frontend
npm run dev
```

3. Uruchomienie aplikacji

W przeglądarce internetowej

`http://localhost:5173/`

# Rozwój aplikacji

## `frontend/App.tsx`

Strona główna aplikacji (rdzeń)

### Pobranie listy użytkowników (wykorzystanie api)

```tsx
import { useEffect, useState } from "react";
import { getUsers } from "./api/users";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  return (
    <div>
      Users ({users.length}): {JSON.stringify(users)}
    </div>
  );
}

export default App;
```

## `frontend/api/users.ts`

Fetch frontendu, który pobiera dane z backendu

```ts
export async function getUsers() {
  const res = await fetch("/api/users");
  return res.json();
}
```

(fetch automatycznie (poprzez pliki konfiguracyjne) dopisuje sobie _http://localhost:5173_)

> /api/users fizycznie nie istnieje na dysku. to tylko route expressa

## `backend/index.ts`

Tworzy ścieżki

```ts
import express from "express";
import usersRouter from "./routes/users";

const app = express();

app.use(express.json());

app.use("/api/users", usersRouter); // << ścieżka, odniesienie do Routera (rozsyłającego metody)

app.listen(3000);
```

## `backend/routes/users.ts`

Router metod

```ts
import { Router } from "express";
import { getUsers, createUser } from "../controllers/usersController";

const router = Router();

router.get("/", getUsers); // << funkcja do pobrania z usersController
router.post("/", createUser); // << funkcja do tworzenia z usersController

export default router;
```

## `backend/controllers/usersController.ts`

Prawdziwa mechanika pobierania, dodawania, usuwania itp

```ts
import { Request, Response } from "express";

interface User {
  id: number;
  name: string;
}

const users: User[] = [{ id: 0, name: "Janusz" }];

export const getUsers = (req: Request, res: Response) => {
  res.json(users);
};

export const createUser = (req: Request, res: Response) => {
  const user: User = {
    id: Date.now(),
    name: req.body.name,
  };

  users.push(user);

  res.status(201).json(user);
};
```

## `frontend/components/UserList.tsx`

Frontendowy komponent do renderowania danych

```tsx
type User = {
  id: number;
  name: string;
};

export default function UserList({ users }: { users: User[] }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### Użycie komponentu

```tsx
import { useEffect, useState } from "react";
import { getUsers } from "./api/users";
import UserList from "./components/UserList.tsx";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  return (
    <div>
      <UserList users={users} />
    </div>
  );
}

export default App;
```
