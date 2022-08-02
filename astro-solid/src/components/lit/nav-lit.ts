import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./nav-lit.css";

@customElement("nav-lit")
export class NavLit extends LitElement {
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  @property({ type: Boolean }) isMouseEnter: boolean = false;
  isMouseEnterManu: boolean = false;

  constructor() {
    super();
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

  render() {
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
