import "./header.css";
import Hero from "../../assets/Images/hero.jpg";
import Logo from "../../assets/Images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { gsap } from "gsap";
import React from "react";
import { HashLink } from "react-router-hash-link";
import { useState, useRef, useLayoutEffect } from "react";
function Header(props) {
  const [ModalMenu, setModalMenu] = useState(false);
  const effectHeader = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap
        .timeline()
        .fromTo(
          ".letter",
          { x: -200, scale: 5, opacity: 0 },
          {
            x: 0,
            scale: 1,
            opacity: 1,
            delay: 0.3,
            stagger: { each: 0.2, from: "start" },
          }
        )
        .fromTo(
          ".title",
          { y: 30, x: -30, scale: 2 },
          { y: 0, x: 0, scale: 1, delay: -0.4, ease: "expo.inOut", duration: 1 }
        )
        .fromTo(
          ".hero-logo",
          { opacity: 0, scale: 5, skewY: "30deg", rotateX: "360deg" },
          {
            rotateX: "0deg",

            skewY: "0deg",
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: "expo.inOut",
            delay: -1.3,
          }
        );
    });
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    let ctx = gsap.context((self) => {
      const displayToLeft = self.selector(".display-left");
      displayToLeft.forEach((item) => {
        gsap.timeline().fromTo(
          item,
          { opacity: 0, x: -200, skewX: "10deg" },
          {
            opacity: 1,
            delay: 2.7,
            duration: 1,
            skewX: "0deg",
            x: 0,
            ease: "expo.inOut",
          }
        );
      });
    }, effectHeader);
    return () => ctx.revert();
  }, []);
  useLayoutEffect(() => {
    let ctx = gsap.context((self) => {
      const displayToright = self.selector(".display-right");
      displayToright.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: 200, skewX: "-10deg" },
          {
            opacity: 1,
            delay: 2.7,
            duration: 1,
            skewX: "0deg",
            x: 0,
            ease: "expo.inOut",
          }
        );
      });
    }, effectHeader);
    return () => ctx.revert();
  }, []);
  return (
    <>
      {!ModalMenu && (
        <>
          <header className="header-home">
            <div>
              <h1 className="title">
                <span className="letter">W</span>
                <span className="letter">h</span>
                <span className="letter">i</span>
                <span className="letter">t</span>
                <span className="letter">e</span>
                <span className="letter">&nbsp;</span>
                <span className="letter">F</span>
                <span className="letter">o</span>
                <span className="letter">x </span> <br />
                <span className="letter">I</span>
                <span className="letter">n</span>
                <span className="letter">k</span>
              </h1>
              <img
                src={Logo}
                alt="logo de wild fox ink"
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

          <nav className="large-screen-menu  navBarShadow" ref={effectHeader}>
            <ul>
              <li className="display-left">
                <HashLink smooth to={"/#about-me-section"}>
                  A propos de moi
                </HashLink>
              </li>
              <li className="display-left">
                <HashLink smooth to={"/#flashs-section"}>
                  Les Flashs dispo
                </HashLink>
              </li>
              <li className="display-right">
                <HashLink smooth to={"/#contact-section"}>
                  Contact
                </HashLink>
              </li>
              <li className="display-right">
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

export default React.memo(Header);
