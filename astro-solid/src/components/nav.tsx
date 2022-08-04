import "./nav.scss";

import "./lit/nav-lit";
import { useStore } from "@nanostores/solid";
import { currentUser, User as UserInterface } from "src/store/user";
import { createSignal, onMount, createEffect } from "solid-js";

function Nav({ children }) {
  const User = useStore<UserInterface>(currentUser);

  return (
    <div className={"header__container"}>
      <p className={"title"}>astro-solid</p>

      <nav-lit email={User().email} id={User().id}></nav-lit>
    </div>
  );
}

export default Nav;
