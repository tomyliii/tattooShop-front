import "./contact.css";
import Img from "../../assets/Images/image2.jpg";
import { useState } from "react";
import handleOnChange from "../../assets/Tools/Functions/HandleOnChange";
import axios from "axios";
export default function Contact(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [ValidationMessage, setValidationMessage] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [mail, setMail] = useState("");
  const [number, setNumber] = useState("");
  const [message, setmessage] = useState("");
  const [conditions, setCondition] = useState(false);
  const [newsLetter, setNewsLetter] = useState(false);
  console.log(
    firstname,
    lastname,
    mail,
    number,
    message,
    conditions,
    newsLetter
  );
  const handleOnSubmit = async (event) => {
    console.log(
      firstname,
      lastname,
      mail,
      number,
      message,
      conditions,
      newsLetter
    );

    event.preventDefault();
    if (firstname && lastname && mail && number && conditions) {
      try {
        const response = await axios.post(`${props.server}customer/message`, {
          firstname,
          lastname,
          mail,
          number,
          newsLetter,
          message,
        });

        setValidationMessage(
          "Votre message à été envoyée. Vous aurez une réponse trés prochainement. Merci de votre confiance. A trés bientôt."
        );
      } catch (error) {
        console.log(error.message);
        setErrorMessage("Une erreur est survenue.");
      }
    } else {
      setErrorMessage("Certains champs obligatoires n'ont pas été complétés. ");
    }
  };
  return (
    <section id="contact-section">
      <h2>Contact</h2>
      <div>
        {ValidationMessage ? (
          <div className="message-validation-contac">
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
              placeholder="Prénom"
              required
            />
            <input
              type="text"
              value={lastname}
              onChange={(event) => {
                handleOnChange(event.target.value, setLastname);
              }}
              placeholder="Nom"
              required
            />
            <input
              type="email"
              value={mail}
              onChange={(event) => {
                handleOnChange(event.target.value, setMail);
              }}
              placeholder="E-mail"
              required
            />
            <input
              type="number"
              value={number}
              onChange={(event) => {
                handleOnChange(event.target.value, setNumber);
              }}
              placeholder="Numéro de téléphone"
              required
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
              placeholder="Entrez une description de vos attentes(emplacement, taille, modification...)"
            ></textarea>
            <div className="checkbox">
              <input
                type="checkbox"
                name="condition"
                id="condition"
                onChange={(event) => {
                  setCondition(!conditions);
                }}
                checked={conditions}
                required
              />
              <p>En cochant cette case,vous acceptez d'être recontacté(e).</p>
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
            {errorMessage && (
              <div>
                <p>{errorMessage}</p>
              </div>
            )}
            <input type="submit" value="Valider" />
          </form>
        )}
        <div>
          <img src={Img} alt="image d'une ensaigne à néon Tattoo" />
        </div>
      </div>
    </section>
  );
}
