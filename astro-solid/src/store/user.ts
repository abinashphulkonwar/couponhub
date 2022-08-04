import { map, onMount } from "nanostores";
export interface User {
  email?: string;
  id?: string;
  iat?: number;
}
export const currentUser = map<User>();

export function addUser(user: User) {
  currentUser.setKey("email", user?.email);
  currentUser.setKey("id", user?.id);
}
export function getUser() {
  return currentUser;
}

onMount(currentUser, () => {
  (async () => {
    try {
      const fetchData = await fetch("/api/users/currentuser");

      const res = await fetchData.json();

      if (fetchData.ok) {
        currentUser.setKey("email", res?.currentUser?.email);
        currentUser.setKey("id", res?.currentUser?.id);
        currentUser.setKey("iat", res?.currentUser?.iat);
      }
    } catch (err) {
      console.log(err.message);
    }
  })();
});
