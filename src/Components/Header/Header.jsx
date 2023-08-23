import "./header.css";
import Hero from "../../assets/Images/hero.jpg";
import Logo from "../../assets/Images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

import { HashLink } from "react-router-hash-link";
import { useState } from "react";
export default function Header(props) {
  const [ModalMenu, setModalMenu] = useState(false);
  console.log(props.adminToken);
  return (
    <>
      {!ModalMenu && (
        <>
          <header>
            <div>
              <h1>
                White Fox <br />
                Ink
              </h1>
              <img
                src={Logo}
                alt="logo de white fox ink"
                className="hero-logo"
              />
            </div>

            <button
              className="login-button"
              onClick={() => {
                props.setLoginModal(true);
              }}
            >
              {props.adminToken ? "Session admin" : " Se connecter"}
            </button>
          </header>

          <nav className="large-screen-menu">
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
      )}

      <button
        className="small-screen-btn-menu"
        onClick={() => {
          setModalMenu(!ModalMenu);
        }}
      >
        {!ModalMenu ? (
          <FontAwesomeIcon icon={faBars} />
        ) : (
          <FontAwesomeIcon icon={faXmark} />
        )}
      </button>
      {ModalMenu && (
        <nav className="small-screen-menu">
          <ul>
            <li>
              <HashLink
                smooth
                to={"/#about-me-section"}
                onClick={() => {
                  setModalMenu(!ModalMenu);
                }}
              >
                A propos de moi
              </HashLink>
            </li>
            <li>
              <HashLink
                smooth
                to={"/#flashs-section"}
                onClick={() => {
                  setModalMenu(!ModalMenu);
                }}
              >
                Les Flashs dispo
              </HashLink>
            </li>
            <li>
              <HashLink
                smooth
                to={"/#contact-section"}
                onClick={() => {
                  setModalMenu(!ModalMenu);
                }}
              >
                Contact
              </HashLink>
            </li>
            <li>
              <button
                onClick={() => {
                  props.setProjectModal(true);
                  setModalMenu(!ModalMenu);
                }}
              >
                Proposer un Projet
              </button>
            </li>
            <li>
              <button
                className="login-btn-small-screen"
                onClick={() => {
                  props.setLoginModal(true);
                  setModalMenu(!ModalMenu);
                }}
              >
                {props.adminToken ? "Session admin" : " Se connecter"}
              </button>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}
