import React from "react";
import { useState } from "react";
import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import handleOnChange from "../../../assets/Tools/Functions/HandleOnChange";
import axios from "axios";
function Login(props) {
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");

  const handleOnClick = () => {
    props.setAdminToken("");
    Cookies.remove("adminToken", {
      secure: true,
      expires: 7,
      sameSite: "strict",
    });
    props.success("Vous êtes déconnecté...Si Si !");
  };
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    if (password && mail) {
      const response = await axios.post(`${props.server}admin/login`, {
        password,
        mail,
      });

      Cookies.set("adminToken", response.data.token, {
        secure: true,
        expires: 7,
        sameSite: "strict",
      });

      props.setAdminToken(response.data.token);
      props.success("Vous êtes connecté...BIATCH!");
    } else {
      props.error("veuillez remplir tous les champs.");
    }
  };
  return (
    <section
      className="login-modal"
      onClick={() => {
        props.setLoginModal(false);
      }}
    >
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <button
          className="exit-button"
          onClick={() => {
            props.setLoginModal(false);
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
        {props.adminToken ? (
          <>
            <h2>Session admin</h2>
            <div className="modal-admin">
              <Link to={"/admin/edit"}>Aller à la page administrateur.</Link>
              <button
                onClick={() => {
                  handleOnClick();
                }}
              >
                Se déconnecter
              </button>
            </div>
          </>
        ) : (
          <>
            <h2>Se connecter</h2>
            <form
              onSubmit={(event) => {
                handleOnSubmit(event);
              }}
            >
              <input
                type="email"
                name="email"
                id="email"
                placeholder="E-mail"
                value={mail}
                onChange={(event) => {
                  handleOnChange(event.target.value, setMail);
                }}
              />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(event) => {
                  handleOnChange(event.target.value, setPassword);
                }}
              />
              <input type="submit" value="valider" />
            </form>
          </>
        )}
      </div>
    </section>
  );
}

export default React.memo(Login);
