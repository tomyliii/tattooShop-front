import "./header.css";
import Hero from "../../assets/Images/hero.jpg";
import Logo from "../../assets/Images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
export default function Header(props) {
  console.log(props.adminToken);
  return (
    <>
      <header>
        <img src={Logo} alt="logo de white fox ink" className="hero-logo" />
        <button
          className="login-button"
          onClick={() => {
            props.setLoginModal(true);
          }}
        >
          {props.adminToken ? "Session admin" : " Se connecter"}
        </button>
      </header>
      <nav>
        <ul>
          <li>
            <HashLink smooth to={"/#about-me-section"}>
              A propos de moi
            </HashLink>
          </li>
          <li>
            <HashLink smooth to={"/#flashs-section"}>
              Les Flashs dispo
            </HashLink>
          </li>
          <li>
            <HashLink smooth to={"/#contact-section"}>
              Contact
            </HashLink>
          </li>
          <li>
            <button
              onClick={() => {
                props.setProjectModal(true);
              }}
            >
              Proposer un Projet
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
