import React from "react";
import "./contact.css";
import Img from "../../assets/Images/image2.jpg";
import { useState, useLayoutEffect } from "react";
import handleOnChange from "../../assets/Tools/Functions/HandleOnChange";
import axios from "axios";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

const Contact = (props) => {
  const [ValidationMessage, setValidationMessage] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [mail, setMail] = useState("");
  const [number, setNumber] = useState("");
  const [message, setmessage] = useState("");
  const [conditions, setCondition] = useState(false);
  const [newsLetter, setNewsLetter] = useState(false);
  // console.log(
  //   firstname,
  //   lastname,
  //   mail,
  //   number,
  //   message,
  //   conditions,
  //   newsLetter
  // );
  const handleOnSubmit = async (event) => {
    // console.log(
    //   firstname,
    //   lastname,
    //   mail,
    //   number,
    //   message,
    //   conditions,
    //   newsLetter
    // );

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
        setFirstname("");
        setLastname("");
        setMail("");
        setNumber("");
        setCondition(false);
        setNewsLetter(false);
        props.success("Votre message à bien été envoyée. A trés bientôt.");
        // setValidationMessage(
        //   "Votre message à été envoyée. Vous aurez une réponse trés prochainement. Merci de votre confiance. A trés bientôt."
        // );
      } catch (error) {
        // console.log(error.message);
        props.error("Une erreur est survenue.");
        // setErrorMessage("Une erreur est survenue.");
      }
    } else {
      props.error("Veuillez remplir tous les champs obligatoire.");
      // setErrorMessage("Certains champs obligatoires n'ont pas été complétés. ");
    }
  };

  // gsap.registerEffect({
  //   name: "slideToLeft",
  //   effect: (targets, config) => {
  //     return gsap.fromTo(
  //       targets,
  //       { x: 200, opacity: 0 },
  //       {
  //         x: 0,
  //         opacity: 1,

  //         scrollTrigger: {
  //           trigger: targets,
  //           start: "top bottom",
  //           scrub: true,
  //           end: "top center",
  //         },
  //       }
  //     );
  //   },
  // });
  // gsap.registerEffect({
  //   name: "slideToRight",
  //   effect: (targets, config) => {
  //     return gsap.fromTo(
  //       targets,
  //       { x: -200, opacity: 0 },
  //       {
  //         x: 0,
  //         opacity: 1,

  //         scrollTrigger: {
  //           trigger: targets,
  //           start: "top bottom",
  //           scrub: true,
  //           end: "top center",
  //         },
  //       }
  //     );
  //   },
  // });

  // useLayoutEffect(() => {
  //   let ctx = gsap.context(() => {
  //     gsap.effects.slideToLeft(".img-contact");
  //   });
  //   return () => ctx.revert();
  // }, []);

  // useLayoutEffect(() => {
  //   let ctx = gsap.context(() => {
  //     gsap.effects.slideToRight(".form-contact");
  //   });
  //   return () => {
  //     ctx.revert();
  //   };
  // }, []);

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
            className="form-contact"
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
              <p>En cochant cette case,vous acceptez d'être recontacté(e). *</p>
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
            <p style={{ color: "red", fontWeight: "bold" }}>
              Les champs avec un (*) sont obligatoires.
            </p>
            <input type="submit" value="Valider" />
          </form>
        )}
        <div>
          <img
            className="img-contact"
            src={Img}
            alt="image d'une ensaigne à néon Tattoo"
          />
        </div>
      </div>
    </section>
  );
};

export default React.memo(Contact);
