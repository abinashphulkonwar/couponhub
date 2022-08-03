import { atom } from "nanostores";
type User = {
  email: string;
  id: string;
};
export const users = atom<User[]>([]);

export function addUser(user: User) {
  users.set([...users.get(), user]);
}
