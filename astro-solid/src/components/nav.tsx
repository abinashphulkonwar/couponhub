import "./nav.scss";

import "./lit/nav-lit";
import { useStore } from "@nanostores/solid";
import { currentUser, User as UserInterface } from "src/store/user";
import { onMount, createEffect } from "solid-js";

function Nav({ children }) {
  const User = useStore<UserInterface>(currentUser);
  let email = "";
  onMount(() => console.log(User(), User().target, "hiiiiiiii"));
  createEffect(() => (email = User().email), [User]);
  return (
    <div className={"header__container"}>
      <p className={"title"}>astro-solid</p>
      <p>{User().email}</p>
      <nav-lit user-email={email} id={User().id}></nav-lit>
    </div>
  );
}

export default Nav;
