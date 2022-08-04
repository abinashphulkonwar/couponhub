import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./nav-lit.css";

export interface ErrorInterface {
  message: string;
}

@customElement("nav-lit")
export class NavLit extends LitElement {
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  @property({ type: Boolean }) isMouseEnter: boolean = false;
  isMouseEnterManu: boolean = false;
  @property({ type: String, attribute: "email" }) email: String;
  @property({ type: Array }) errorData: ErrorInterface[];
  constructor() {
    super();
    console.log(this.email);
  }

  private onMouseEnter(): void {
    this.isMouseEnter = true;
  }

  private onMouseEnterManu(): void {
    this.isMouseEnterManu = true;
  }

  private onMouseLeave(): void {
    const timeoutId = setTimeout(() => {
      if (!this.isMouseEnterManu) {
        this.isMouseEnter = false;
      }

      clearTimeout(timeoutId);
    }, 1000);
  }
  private onMouseLeaveManu(): void {
    this.isMouseEnterManu = false;
    this.onMouseLeave();
  }

  private async onPressHandler(): Promise<void> {
    try {
      this.errorData = [];
      const fetchData = await fetch("/api/users/logout");

      const res = await fetchData.json();
      console.log(res);
      if (fetchData.ok) {
      } else {
        this.errorData = res;
      }
    } catch (err) {
      console.log(err.message);
      this.errorData = [{ message: err.message }];
    }
  }

  render() {
    if (this.errorData?.length > 0) {
      return html`
        ${this.errorData.map((val) => {
          return html`<span>${val.message} </span>`;
        })}
      `;
    }
    if (this.email?.length) {
      return html`
        <div class="container">
          <a class="account">Account</a>
          <button class="btn" @click="${this.onPressHandler}">Logout</button>
        </div>
      `;
    }

    return html`<div
      class="container"
      @mouseover="${this.onMouseEnter}"
      @mouseout="${this.onMouseLeave}"
    >
      <p @click="${this.onMouseEnter}" class="header">auth</p>
      <div
        @mouseover="${this.onMouseEnterManu}"
        @mouseout="${this.onMouseLeaveManu}"
        class="manu__container ${this.isMouseEnter ? "display" : ""}"
      >
        <a class="route" href="/auth/sign-up">create account</a>
        <a class="route" href="/auth/login">log in</a>
      </div>
    </div>`;
  }
}
