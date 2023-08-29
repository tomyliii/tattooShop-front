import { useParams } from "react-router-dom";
import "./tattoo.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import handleOnChange from "../../assets/Tools/Functions/HandleOnChange";
import Login from "../../Components/Modals/Login/Login";
import Project from "../../Components/Modals/Project/Project";
import hashtag from "../../assets/Tools/Functions/hashTag";

export default function Tattoo(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageToBook, setErrorMessageToBook] = useState("");
  const [ValidationMessage, setValidationMessage] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [selectedImg, setSelectedImg] = useState({});
  const [showImg, setShowImg] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [mail, setMail] = useState("");
  const [number, setNumber] = useState("");
  const [messageToBook, setmessageToBook] = useState("");
  const [conditions, setCondition] = useState(false);
  const [newsLetter, setNewsLetter] = useState(false);
  const [flashsCardList, setFlashsCardList] = useState([]);
  const [flash, setFlash] = useState("");
  const [projectModal, setProjectModal] = useState(false);
  const [ModalMenu, setModalMenu] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  if (projectModal || showImg) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
  const { id } = useParams();

  useEffect(() => {
    try {
      (async () => {
        const response = await axios.get(`${props.server}tatoo/${id}`);
        const responsetoCard = await axios.get(`${props.server}tatoo`);

        const flashsArrayToCard = [];

        for (let i = 0; i < 4; i++) {
          const random = Math.floor(Math.random() * 20);
          flashsArrayToCard.push(responsetoCard.data.tatoos[random]);
        }
        console.log(flashsArrayToCard, response);
        setFlashsCardList([...flashsArrayToCard]);
        setFlash(response.data);
        setIsReady(true);
      })();
    } catch (error) {
      console.log(error.message);
      setErrorMessage("Une erreur est survenue");
    }
  }, [id]);

  const handleOnClick = (value) => {
    setSelectedImg(value);
    setShowImg(true);
  };

  // const pictures = (value) => {
  //   if (value.images.length === 1) {
  //     return (
  //       <div className="one-picture">
  //         <img
  //           onClick={(event) => {
  //             handleOnClick(value.images[0]);
  //           }}
  //           src={value.images[0].secure_url}
  //           alt={`image de ${value.name}`}
  //         />
  //       </div>
  //     );
  //   } else if (value.images.length === 2) {
  //     return (
  //       <div className="two-pictures">
  //         <img
  //           onClick={(event) => {
  //             handleOnClick(value.images[0]);
  //           }}
  //           src={value.images[0].secure_url}
  //           alt={`image de ${value.name}`}
  //         />
  //         <img
  //           onClick={(event) => {
  //             handleOnClick(value.images[1]);
  //           }}
  //           src={value.images[1].secure_url}
  //           alt={`image de ${value.name}`}
  //         />
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div className="three-pictures">
  //         <img
  //           onClick={(event) => {
  //             handleOnClick(value.images[0]);
  //           }}
  //           src={value.images[0].secure_url}
  //           alt={`image de ${value.name}`}
  //         />
  //         <div className="three-pictures-seconde-part">
  //           <img
  //             onClick={(event) => {
  //               handleOnClick(value.images[1]);
  //             }}
  //             src={value.images[1].secure_url}
  //             alt={`image de ${value.name}`}
  //           />
  //           <img
  //             onClick={(event) => {
  //               handleOnClick(value.images[2]);
  //             }}
  //             src={value.images[2].secure_url}
  //             alt={`image de ${value.name}`}
  //           />
  //         </div>
  //       </div>
  //     );
  //   }
  // };

  const handleOnSubmit = async (event) => {
    try {
      event.preventDefault();
      if (firstname && lastname && mail && number && conditions) {
        const response = await axios.post(`${props.server}book/tatoo`, {
          firstname,
          lastname,
          mail,
          number,
          newsLetter,
          id: flash._id,
          message: messageToBook,
        });

        setValidationMessage(
          "La demande de réservation à été envoyée. Vous aurez une réponse trés prochainement. Merci de votre confiance. A trés bientôt."
        );
      } else {
        setErrorMessageToBook(
          "Certains champs obligatoires n'ont pas été complétés. "
        );
      }
    } catch (error) {
      console.log(error);
      setErrorMessageToBook("Une erreur est survenue.");
    }
  };

  return (
    <main className="tattoo-page">
      <div className="top-page-title">
        <h2>Le Flash </h2>
        {!ModalMenu && (
          <nav className="large-screen-menu">
            <Link to={"/"}>Home</Link>

            <button
              onClick={() => {
                setProjectModal(true);
              }}
            >
              Proposer un Projet
            </button>
            <button
              onClick={() => {
                setLoginModal(true);
              }}
            >
              {props.adminToken ? "Session admin" : " Se connecter"}
            </button>
          </nav>
        )}
      </div>

      {!isReady ? (
        <div>
          <p>Loading, please wait...</p>
        </div>
      ) : (
        <section className="wrapper">
          {errorMessage ? (
            <div>
              <p>{errorMessage}</p>
            </div>
          ) : (
            <div className="flash-bloc">
              <div className="one-picture">
                <img
                  onClick={(event) => {
                    handleOnClick(flash.images[0]);
                  }}
                  src={flash.images[0].secure_url}
                  alt={`image de ${flash.name}`}
                />
              </div>
              <div className="info-flash">
                {" "}
                <h3>{flash.name}</h3>
                <div className="description">
                  <p>{flash.description}</p>
                </div>
                {flash.keywords && (
                  <p className="hashtag">{hashtag(flash.keywords)}</p>
                )}
              </div>
              {showImg && (
                <div
                  className="show-image"
                  onClick={(event) => {
                    setShowImg(false);
                  }}
                >
                  <div>
                    <img
                      src={selectedImg.secure_url}
                      alt={`image de ${flash.name}`}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
          <div>
            <h2>Je le veux !</h2>
            <div>
              {ValidationMessage ? (
                <div className="validation-message-book">
                  <p>{ValidationMessage}</p>
                </div>
              ) : (
                <form
                  onSubmit={(event) => {
                    handleOnSubmit(event);
                  }}
                  className="book-form"
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
                    value={messageToBook}
                    onChange={(event) => {
                      handleOnChange(event.target.value, setmessageToBook);
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
                    <p>
                      En cochant cette case,vous acceptez d'être recontacté(e)
                      pour la suite de la réservation.
                    </p>
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
                      En cochant cette case, ouvrez-vous à des offres
                      exceptionnelles et soyez parmi les premiers à découvrir
                      mes dernières créations artistiques.
                    </p>
                  </div>
                  {errorMessageToBook && (
                    <div className="error">
                      <p>{errorMessageToBook}</p>
                    </div>
                  )}
                  <input type="submit" value="Valider" />
                </form>
              )}
            </div>
          </div>
        </section>
      )}
      <section className="card-block">
        <div className="wrapper">
          <h2>Suggestions pour vous</h2>
          <div className="card-section">
            {errorMessage ? (
              <div>
                <p>{errorMessage}</p>
              </div>
            ) : (
              flashsCardList.map((flashCard, index) => {
                return (
                  <Link
                    to={`/tattoo/${flashCard._id}`}
                    key={index + flashCard._id}
                    className="card"
                  >
                    <div>
                      <img
                        src={flashCard.images[0].secure_url}
                        alt={`image de ${flashCard.name}`}
                      />
                    </div>
                    <div className="infos-card">
                      <h3>{flashCard.name}</h3>

                      {flashCard.keywords && (
                        <p className="card-hashtag">
                          {hashtag(flashCard.keywords)}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </section>
      {loginModal && (
        <Login
          server={props.server}
          setLoginModal={setLoginModal}
          adminToken={props.adminToken}
          setAdminToken={props.setAdminToken}
        />
      )}
      {projectModal && (
        <Project server={props.server} setProjectModal={setProjectModal} />
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
          <Link
            to={"/"}
            onClick={() => {
              setModalMenu(!ModalMenu);
            }}
          >
            Home
          </Link>

          <button
            onClick={() => {
              setProjectModal(true);
              setModalMenu(!ModalMenu);
            }}
          >
            Proposer un Projet
          </button>
          <button
            className="login-btn-small-screen"
            onClick={() => {
              setLoginModal(true);
              setModalMenu(!ModalMenu);
            }}
          >
            {props.adminToken ? "Session admin" : " Se connecter"}
          </button>
        </nav>
      )}
    </main>
  );
}
