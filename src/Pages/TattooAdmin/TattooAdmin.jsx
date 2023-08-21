import { useParams, useNavigate } from "react-router-dom";
import "./tattooAdmin.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";
import handleOnChange from "../../assets/Tools/Functions/HandleOnChange";
import Login from "../../Components/Modals/Login/Login";
import DragAndDropTatooAdmin from "../../Components/DragAndDropTatooAdmin/DragAndDropTatooAdmin";
import hashtag from "../../assets/Tools/Functions/hashTag";

export default function TattooAdmin(props) {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [selectedImg, setSelectedImg] = useState({});
  const [showImg, setShowImg] = useState(false);
  const [flash, setFlash] = useState("");
  const [loginModal, setLoginModal] = useState(false);
  const [flashName, setFlashName] = useState("");
  const [flashDescription, setFlashDescription] = useState("");
  const [flashKeywords, setFlashKeywords] = useState("");
  const [flashPictures, setFlashPicutres] = useState([]);
  const [picturesToAdd, setPicturesToAdd] = useState([]);
  const [errorMessageflash, setErrorMessageflash] = useState("");
  const [flashDisable, setFlashDisable] = useState(true);
  const instance = axios.create({
    baseURL: props.server,
    headers: {
      Authorization: "Bearer " + props.adminToken,
      "Content-Type": "multipart/form-data",
    },
  });

  console.log("adminflashpictures", flashPictures);
  console.log("pictures to add", picturesToAdd);

  if (showImg || loginModal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
  const { id } = useParams();
  const maxFilesAuthorized = 3;
  useEffect(() => {
    try {
      (async () => {
        const response = await instance.get(`tatoo/${id}`);

        setFlash(response.data);
        setFlashPicutres([...response.data.images]);
        setFlashDisable(response.data.disable);
        setIsReady(true);
      })();
    } catch (error) {
      console.log(error.message);
      setErrorMessage("Une erreur est survenue");
    }
  }, []);

  const pictures = (value) => {
    if (value.images.length === 1) {
      return (
        <div
          className={`one-picture  ${flash.disable === false && "archived"}`}
        >
          <button
            type="button"
            onClick={(event) => handleOnClickSupp(event, value.images[0])}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <img
            onClick={(event) => {
              handleOnClick(value.images[0]);
            }}
            src={value.images[0].secure_url}
            alt={`image de ${value.name}`}
          />
        </div>
      );
    } else if (value.images.length === 2) {
      return (
        <div
          className={`two-pictures  ${flash.disable === false && "archived"}`}
        >
          <div>
            <button
              type="button"
              onClick={(event) => handleOnClickSupp(event, value.images[0])}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <img
              onClick={(event) => {
                handleOnClick(value.images[0]);
              }}
              src={value.images[0].secure_url}
              alt={`image de ${value.name}`}
            />
          </div>
          <div>
            <button
              type="button"
              onClick={(event) => handleOnClickSupp(event, value.images[1])}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <img
              onClick={(event) => {
                handleOnClick(value.images[1]);
              }}
              src={value.images[1].secure_url}
              alt={`image de ${value.name}`}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div
          className={`three-pictures-admin  ${
            flash.disable === false && "archived"
          }`}
        >
          <div>
            <button
              type="button"
              onClick={(event) => handleOnClickSupp(event, value.images[0])}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <img
              onClick={(event) => {
                handleOnClick(value.images[0]);
              }}
              src={value.images[0].secure_url}
              alt={`image de ${value.name}`}
            />
          </div>
          <div className="three-pictures-seconde-part">
            <div>
              <button
                type="button"
                onClick={(event) => handleOnClickSupp(event, value.images[1])}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
              <img
                onClick={(event) => {
                  handleOnClick(value.images[1]);
                }}
                src={value.images[1].secure_url}
                alt={`image de ${value.name}`}
              />
            </div>
            <div>
              <button
                type="button"
                onClick={(event) => handleOnClickSupp(event, value.images[2])}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
              <img
                onClick={(event) => {
                  handleOnClick(value.images[2]);
                }}
                src={value.images[2].secure_url}
                alt={`image de ${value.name}`}
              />
            </div>
          </div>
        </div>
      );
    }
  };

  const handleOnClick = (value) => {
    setSelectedImg(value);
    setShowImg(true);
  };

  const handleOnClickSupp = async (event, value) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `${props.server}tatoo/deletepicture/${id}`,
        {
          image: value,
        },
        {
          headers: {
            Authorization: "Bearer " + props.adminToken,
          },
        }
      );

      setFlash(response.data);
      setFlashPicutres([...response.data.images]);
    } catch (error) {
      if (error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage(error.message);
      }
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      console.log(error);
    }
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();

      picturesToAdd.forEach((picture) => {
        formData.append("imagesToAdd", picture);
      });
      formData.append("disable", flashDisable);
      formData.append("images", flashPictures);
      formData.append("description", flashDescription);
      formData.append("name", flashName);
      formData.append("keywords", flashKeywords);
      formData.append("id", id);
      const response = await instance.put(`tatoo/edit`, formData);

      setErrorMessage("");
      setFlashDescription("");
      setFlashName("");
      setFlashKeywords("");
      setErrorMessageflash("");
      setPicturesToAdd([]);
      setFlash(response.data);
      setFlashPicutres([...response.data.images]);
    } catch (error) {
      if (error.response.data.message) {
        setErrorMessageflash(error.response.data.message);
      } else {
        if (error.status) {
          console.log({ status: error.status, message: error.message });
        } else {
          console.log(error.message);
        }
        setErrorMessageflash("Une erreur est survenue.");
      }
      setTimeout(() => {
        setErrorMessageflash("");
      }, 3000);
    }
  };

  const handleSuppFlash = async (event) => {
    try {
      const response = await instance.delete("tatoo/delete/" + id);

      console.log(response);
      navigate("/admin/edit");
    } catch (error) {
      if (error.response) {
        setErrorMessageflash(error.response);
      } else {
        if (error.status) {
          console.log({ status: error.status, message: error.message });
        } else {
          console.log(error.message);
        }
        setErrorMessageflash("Une erreur est survenue.");
      }
      setTimeout(() => {
        setErrorMessageflash("");
      }, 3000);
    }
  };
  console.log(picturesToAdd);
  return (
    <main className="tattoo-page">
      <nav>
        <Link to={"/"}>Home</Link>

        <button
          onClick={() => {
            setLoginModal(true);
          }}
        >
          {props.adminToken ? "Session admin" : " Se connecter"}
        </button>
      </nav>
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
              {pictures(flash)}
              <div
                className={`info-flash ${
                  flash.disable === false && "archived"
                }`}
              >
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
              )}{" "}
            </div>
          )}

          <div className="modif-flash">
            <h3>Modifier le flash</h3>
            <form
              onSubmit={(event) => {
                handleOnSubmit(event);
              }}
            >
              <input
                type="text"
                placeholder={flash.name}
                value={flashName}
                onChange={(event) => {
                  handleOnChange(event.target.value, setFlashName);
                }}
              />
              <textarea
                name="flashDescription"
                id="flashDescription"
                cols="30"
                rows="10"
                placeholder={flash.description}
                value={flashDescription}
                onChange={(event) => {
                  handleOnChange(event.target.value, setFlashDescription);
                }}
              ></textarea>
              <input
                type="text"
                placeholder={flash.keywords}
                value={flashKeywords}
                onChange={(event) => {
                  handleOnChange(event.target.value, setFlashKeywords);
                }}
              />
              <div className="checkbox">
                <div>
                  <input
                    type="checkbox"
                    value={flashDisable}
                    onChange={(event) => {
                      setFlashDisable(!flashDisable);
                    }}
                    checked={flashDisable ? true : false}
                  />
                </div>
                <p>Dispnible</p>
              </div>
              <DragAndDropTatooAdmin
                maxFilesAuthorized={maxFilesAuthorized}
                flashPictures={flashPictures}
                picturesToAdd={picturesToAdd}
                setPicturesToAdd={setPicturesToAdd}
                setErrorMessage={setErrorMessageflash}
              />

              {errorMessageflash && <p>{errorMessageflash}</p>}
              <input type="submit" value="Valider" />
            </form>
          </div>
          <button
            className="supp-flash-btn"
            onClick={(event) => {
              handleSuppFlash();
            }}
          >
            <p>Supprimer le flash</p>
          </button>
        </section>
      )}

      {loginModal && (
        <Login
          server={props.server}
          setLoginModal={setLoginModal}
          adminToken={props.adminToken}
          setAdminToken={props.setAdminToken}
        />
      )}
    </main>
  );
}
