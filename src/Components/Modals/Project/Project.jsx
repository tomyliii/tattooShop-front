import React from "react";
import DragAndDrop from "../../DragAndDrop/DragAndDrop";
import "./project.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import handleOnChange from "../../../assets/Tools/Functions/HandleOnChange";
import axios from "axios";
function Project(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [ValidationMessage, setValidationMessage] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [mail, setMail] = useState("");
  const [number, setNumber] = useState("");
  const [message, setmessage] = useState("");
  const [conditions, setCondition] = useState(false);
  const [newsLetter, setNewsLetter] = useState(false);
  const [files, setFiles] = useState([]);
  const maxPictures = 3;

  const handleOnSubmit = async (event) => {
    try {
      event.preventDefault();
      if (
        firstname &&
        lastname &&
        mail &&
        number &&
        conditions &&
        files.length !== 0
      ) {
        const formData = new FormData();

        files.forEach((picture) => {
          formData.append("images", picture);
        });
        formData.append("firstname", firstname);
        formData.append("lastname", lastname);
        formData.append("mail", mail);
        formData.append("number", number);
        formData.append("newsLetter", newsLetter);
        formData.append("description", message);
        const response = await axios.post(
          `${props.server}customer/projectEdit`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        props.success("Votre message à bien été envoyée. A trés bientôt.");
        setValidationMessage(
          "Votre projet à été envoyé. Vous aurez une réponse trés prochainement. Merci de votre confiance. A trés bientôt."
        );
      } else {
        props.error("Certains champs obligatoires n'ont pas été complétés. ");
        // setErrorMessage(
        //   "Certains champs obligatoires n'ont pas été complétés. "
        // );
      }
    } catch (error) {
      props.error("Une erreur est survenue.");
      // console.log(error);
      // setErrorMessage("Une erreur est survenue.");
    }
  };

  return (
    <section
      className="project-modal"
      onClick={() => {
        props.setProjectModal(false);
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
            props.setProjectModal(false);
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <h2>Vous avez une idée...</h2>
        {ValidationMessage ? (
          <div className="message-validation-project">
            <p>{ValidationMessage}</p>
          </div>
        ) : (
          <form
            onSubmit={(event) => {
              handleOnSubmit(event);
            }}
          >
            <input
              type="text"
              value={firstname}
              onChange={(event) => {
                handleOnChange(event.target.value, setFirstname);
              }}
              placeholder="Prénom *"
            />
            <input
              type="text"
              value={lastname}
              onChange={(event) => {
                handleOnChange(event.target.value, setLastname);
              }}
              placeholder="Nom *"
            />
            <input
              type="email"
              value={mail}
              onChange={(event) => {
                handleOnChange(event.target.value, setMail);
              }}
              placeholder="E-mail *"
            />
            <input
              type="number"
              value={number}
              onChange={(event) => {
                handleOnChange(event.target.value, setNumber);
              }}
              placeholder="Numéro de téléphone *"
            />
            <textarea
              name="message"
              id="message"
              cols="30"
              rows="10"
              value={message}
              onChange={(event) => {
                handleOnChange(event.target.value, setmessage);
              }}
              placeholder="Entrez une description de vos attentes(emplacement, taille, modification...) *"
            ></textarea>
            <DragAndDrop
              setFlashPictures={setFiles}
              maxFilesAuthorized={maxPictures}
              flashPictures={files}
              setErrorMessage={setErrorMessage}
            />
            <div className="checkbox">
              <input
                type="checkbox"
                name="condition"
                id="condition"
                onChange={(event) => {
                  setCondition(!conditions);
                }}
                checked={conditions}
              />
              <p>En cochant cette case,vous acceptez d'être recontacté(e) *.</p>
            </div>
            <div className="checkbox">
              <input
                type="checkbox"
                name="condition"
                id="condition"
                onChange={(event) => {
                  setNewsLetter(!newsLetter);
                }}
                checked={newsLetter}
              />
              <p>
                En cochant cette case, ouvrez-vous à des offres exceptionnelles
                et soyez parmi les premiers à découvrir mes dernières créations
                artistiques.
              </p>
            </div>
            <p
              style={{ color: "red", fontWeight: "bold", textAlign: "center" }}
            >
              Les champs avec un (*) sont obligatoires.
            </p>
            <input type="submit" value="Valider" />
          </form>
        )}
      </div>
    </section>
  );
}

export default React.memo(Project);
