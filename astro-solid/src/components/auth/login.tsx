import "./sign-up.scss";

import { createSignal, createEffect, useTransition } from "solid-js";
import { addUser } from "src/store/user";

function Login() {
  const [isRequestProcessing, setIsrequestProcessing] = createSignal(false);
  const [error, setError] = createSignal([]);
  const onCreateAccountHandler = async (e: Event) => {
    try {
      e.preventDefault();
      if (isRequestProcessing()) return;

      setIsrequestProcessing(true);

      const email = e.target.email?.value;
      const password = e.target?.password?.value;
      console.log(email, password);

      const fetchData = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const res = await fetchData.json();

      if (fetchData.ok) {
        addUser(res);
        const router = document.createElement("a");
        router.href = "/";
        router.click();
        document.removeChild(router);
        setIsrequestProcessing(false);
      } else {
        setError(res);
        setIsrequestProcessing(false);
      }
    } catch (err) {
      console.log(err.message);
      setIsrequestProcessing(false);
    }
  };

  createEffect(async () => {
    const fetchData = await fetch("/api/users/currentuser");

    const res = await fetchData.json();
    console.log(res);
  }, []);
  return (
    <div class="input__container">
      <p>Create Your Account</p>
      <form method="post" onSubmit={onCreateAccountHandler}>
        <label for="email">Email</label>
        <input type="email" name="email" id="email" required />
        <label for="password">Password</label>

        <input type="password" name="password" id="password" required />
        {error().map((val, i) => {
          return (
            <p className="error" key={i}>
              {val.message}
            </p>
          );
        })}
        <button type="submit">
          {isRequestProcessing() ? "Processing..." : "Log in"}
        </button>
      </form>
    </div>
  );
}

export default Login;
