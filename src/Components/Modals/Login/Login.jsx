import { useState } from "react";
import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import handleOnChange from "../../../assets/Tools/Functions/HandleOnChange";
import axios from "axios";
export default function Login(props) {
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleOnClick = () => {
    props.setAdminToken("");
    Cookies.remove("adminToken", { secure: true, expires: 7, sameSite: true });
  };
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post(`${props.server}admin/login`, {
      password,
      mail,
    });
    console.log(response);
    Cookies.set("adminToken", response.data.token, {
      secure: true,
      expires: 7,
    });
    props.setAdminToken(response.data.token);
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
            <p>{errorMessage}</p>
          </>
        )}
      </div>
    </section>
  );
}
