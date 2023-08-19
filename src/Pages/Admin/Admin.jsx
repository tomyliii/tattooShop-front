import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import handleOnChange from "../../assets/Tools/Functions/HandleOnChange";
import "./admin.css";
import axios from "axios";
import DragAndDrop from "../../Components/DragAndDrop/DragAndDrop";
import Cookies from "js-cookie";
import EditFlash from "../../Components/EditFlash/EditFLash";
import FlashsAdmin from "../../Components/FlashsAdmin/FlashsAdmin";
import BookedFlash from "../../Components/BookedFLash/BookedFlash";
import CustomerMessages from "../../Components/CustomerMessages/CustomerMessages";
import CustomerProjects from "../../Components/CustomerProjects/CustomerProjects";
import Toggle from "../../Components/Toggle/Toggle";

export default function Admin(props) {
  const [admin, setAdmin] = useState({});
  const [text, setText] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [updateInfos, setUpdateInfos] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [mail, setMail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [textDescription, setTextDescription] = useState("");
  const [flashName, setFlashName] = useState("");
  const [flashDescription, setFlashDescription] = useState("");
  const [flashKeywords, setFlashKeywords] = useState("");
  const [flashPictures, setFlashPicutres] = useState([]);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [errorMessageInfo, setErrorMessageInfo] = useState("");
  const [errorMessageflash, setErrorMessageflash] = useState("");
  const [statusFlashAdd, setStatusFlashAdd] = useState(false);
  const [showArchived, setSwhoArchived] = useState(false);
  const maxFilesAuthorized = 1;
  document.body.style.overflow = "";
  useEffect(() => {
    try {
      if (!props.adminToken) {
        navigate("/");
      }
      (async () => {
        const responseAdmin = await axios.get(`${props.server}admin`, {
          headers: {
            authorization: "Bearer " + props.adminToken,
            "Content-Type": "multipart/form-data",
          },
        });
        const responsetext = await axios.get(`${props.server}text`);

        setText(responsetext.data[0].description);
        setAdmin(responseAdmin.data);
        setIsReady(true);
      })();
    } catch (error) {}
  }, [updateInfos]);

  const handleOnSubmitInfo = async (event) => {
    try {
      event.preventDefault();
      if (password && password !== confirmPassword) {
        return setErrorMessageInfo("Les mots de passe ne sont pas identiques.");
      }

      const formData = new FormData();
      formData.append("avatar", files[0]);
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("password", password);
      formData.append("number", number);
      formData.append("mail", mail);

      const response = await axios.put(
        `${props.server}admin/update`,
        formData,
        {
          headers: {
            authorization: "Bearer " + props.adminToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      Cookies.set("adminToken", response.data.token, {
        secure: true,
        expires: 7,
        sameSite: "strict",
      });
      props.setAdminToken(response.data.token);
      setFiles([]);
      setErrorMessageInfo("");
      setUpdateInfos(false);
    } catch (error) {
      if (error.status) {
        console.log({ status: error.status, message: error.message });
      } else {
        console.log(error.message);
      }
      setErrorMessageInfo("Une erreur est survenue.");
    }
  };
  const handleOnSubmitNewFlash = async (event) => {
    event.preventDefault();
    try {
      if (flashName && flashDescription && flashPictures.length !== 0) {
        const formData = new FormData();
        flashPictures.forEach((picture) => {
          formData.append("images", picture);
        });
        formData.append("images", flashPictures);
        formData.append("description", flashDescription);
        formData.append("name", flashName);
        formData.append("keywords", flashKeywords);

        const response = await axios.post(
          `${props.server}tatoo/create`,
          formData,
          {
            headers: {
              Authorization: "Bearer " + props.adminToken,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setStatusFlashAdd(true);
        setFlashPicutres([...[]]);
        setFlashDescription("");
        setFlashName("");
        setFlashKeywords("");
        setErrorMessageflash("");
        setTimeout(() => {
          setStatusFlashAdd(false);
        }, 5000);
      } else {
        setErrorMessageflash(
          "Information(s) manquante(s). Impossible de valider votre demande."
        );
        setTimeout(() => {
          setErrorMessageflash("");
        }, 5000);
      }
    } catch (error) {
      if (error.status) {
        console.log({ status: error.status, message: error.message });
      } else {
        console.log(error.message);
      }
      setErrorMessageflash("Une erreur est survenue.");
      setTimeout(() => {
        setErrorMessageflash("");
      }, 5000);
    }
  };

  return !isReady ? (
    <div>
      <p>Loading, please wait...</p>
    </div>
  ) : (
    <>
      <nav className="admin-nav">
        <Link to={"/"}>Home</Link>
        <div className="toggle-nav">
          <Toggle isChecked={showArchived} setIsCheked={setSwhoArchived} />
          <p>Afficher aussi les documents archivés.</p>
        </div>
      </nav>

      <main className="admin-section">
        <div className="wrapper">
          <div>
            <div>
              <img
                src={admin.avatar.secure_url}
                alt="avatar de l'admin"
                className="avatar"
              />
            </div>
            <p>{`${admin.firstname} ${admin.lastname}`}</p>
          </div>
          <section>
            {!updateInfos ? (
              <div className="admin-infos">
                <h2>Infos adminitrateur</h2>
                <div>
                  <p>Nom: {admin.lastname}</p>
                </div>
                <div>
                  <p>Prénom: {admin.firstname}</p>
                </div>
                <div>
                  <p>
                    Numero de Télephone:&nbsp;
                    {admin.phoneNumber ? "0" + admin.phoneNumber : "Non défini"}
                  </p>
                </div>
                <div>
                  <p>E-mail: {admin.mail}</p>
                </div>
                <div>
                  <p>Mot de passe: ******</p>
                </div>
                <div className="text-pres-div">
                  <p>Texte de présentation:</p>
                  <p className="text-pres">{text}</p>
                </div>
                <button
                  onClick={() => {
                    setUpdateInfos(true);
                  }}
                >
                  Modifier
                </button>
              </div>
            ) : (
              <div>
                <h2>Mise à jour des infos</h2>
                <form
                  onSubmit={(event) => {
                    handleOnSubmitInfo(event);
                  }}
                  className="infos-update"
                >
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    value={firstname}
                    onChange={(event) => {
                      handleOnChange(event.target.value, setFirstname);
                    }}
                    placeholder={admin.firstname}
                  />
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    value={lastname}
                    onChange={(event) => {
                      handleOnChange(event.target.value, setLastname);
                    }}
                    placeholder={admin.lastname}
                  />
                  <input
                    type="email"
                    name="mail"
                    id="mail"
                    value={mail}
                    onChange={(event) => {
                      handleOnChange(event.target.value, setMail);
                    }}
                    placeholder={admin.mail}
                  />
                  <input
                    type="number"
                    name="number"
                    id="number"
                    value={number}
                    onChange={(event) => {
                      handleOnChange(event.target.value, setNumber);
                    }}
                    placeholder={
                      admin.number
                        ? Number(admin.number)
                        : "Numéro de téléphone"
                    }
                  />
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(event) => {
                      handleOnChange(event.target.value, setPassword);
                    }}
                    placeholder="********"
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(event) => {
                      handleOnChange(event.target.value, setConfirmPassword);
                    }}
                    placeholder="********"
                  />
                  <textarea
                    name="textDescription"
                    id="textDescription"
                    cols="30"
                    rows="10"
                    value={textDescription}
                    onChange={(event) => {
                      handleOnChange(event.target.value, setTextDescription);
                    }}
                    placeholder={text}
                  ></textarea>
                  <DragAndDrop
                    setErrorMessage={setErrorMessageInfo}
                    setFlashPictures={setFiles}
                    flashPictures={files}
                    maxFilesAuthorized={maxFilesAuthorized}
                  />
                  {errorMessageInfo && <p>{errorMessageInfo}</p>}
                  <input type="submit" value="Valider" />{" "}
                  <button
                    onClick={() => {
                      setUpdateInfos(false);
                    }}
                    className="cancel-form"
                  >
                    Annuler
                  </button>
                </form>
              </div>
            )}
          </section>
          <section>
            <div>
              <FlashsAdmin
                server={props.server}
                adminToken={props.adminToken}
              ></FlashsAdmin>
            </div>
            <div className="add-flash">
              <EditFlash
                handleOnSubmitNewFlash={handleOnSubmitNewFlash}
                flashName={flashName}
                setFlashName={setFlashName}
                flashDescription={flashDescription}
                setFlashDescription={setFlashDescription}
                flashKeywords={flashKeywords}
                setFlashKeywords={setFlashKeywords}
                flashPictures={flashPictures}
                setFlashPicutres={setFlashPicutres}
                errorMessage={errorMessageflash}
                setErrorMessage={setErrorMessageflash}
              />

              {statusFlashAdd && <p>Flash ajouté a votre base de donnée</p>}
            </div>
          </section>
          <section className="customer-ask">
            <h2>Les demandes</h2>
            <h3>Les réservations</h3>

            <BookedFlash
              server={props.server}
              adminToken={props.adminToken}
              showArchived={showArchived}
              setSwhoArchived={setSwhoArchived}
            />
            <h3>Les message</h3>
            <CustomerMessages
              server={props.server}
              adminToken={props.adminToken}
              showArchived={showArchived}
              setSwhoArchived={setSwhoArchived}
            />
            <h3>Les projets</h3>
            <CustomerProjects
              server={props.server}
              adminToken={props.adminToken}
              showArchived={showArchived}
              setSwhoArchived={setSwhoArchived}
            />
          </section>
        </div>
      </main>
    </>
  );
}
