import "./nav.scss";

import "./lit/nav-lit";

function Nav({ children }) {
  return (
    <div className={"header__container"}>
      <p className={"title"}>astro-solid</p>

      {children}
    </div>
  );
}

export default Nav;
