import {IconGitHub } from "../assets/icons";
import "../styles/navBar.css";

export default function NavBar() {
  return (
    <header className="navbar-header">
      <span className="navbar-title"># N O T E S</span>
      <span className="navbar-anchor">
        <a
          className="anchor"
          href="https://github.com/EricIllanes"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconGitHub width={50} height={50} />
        </a>
      </span>
    </header>
  );
}
