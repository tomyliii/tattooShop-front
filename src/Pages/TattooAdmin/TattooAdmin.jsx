import { useNavigate } from "react-router-dom";
import "./tattooAdmin.css";
import { useState } from "react";

import axios from "axios";

import handleOnChange from "../../assets/Tools/Functions/HandleOnChange";

import DragAndDropTatooAdmin from "../../Components/DragAndDropTatooAdmin/DragAndDropTatooAdmin";

export default function TattooAdmin({
  server,
  flash,
  id,
  adminToken,
  setFlash,
}) {
  const navigate = useNavigate();

  const [flashName, setFlashName] = useState("");
  const [flashDescription, setFlashDescription] = useState("");
  const [flashKeywords, setFlashKeywords] = useState("");
  const [flashPictures, setFlashPicutres] = useState([]);
  const [picturesToAdd, setPicturesToAdd] = useState([]);
  const [errorMessageflash, setErrorMessageflash] = useState("");
  const [flashDisable, setFlashDisable] = useState(flash.disable);
  const instance = axios.create({
    baseURL: server,
    headers: {
      Authorization: "Bearer " + adminToken,
      "Content-Type": "multipart/form-data",
    },
  });

  console.log("adminflashpictures", flashPictures);
  console.log("pictures to add", picturesToAdd);

  const maxFilesAuthorized = 1;

  // const handleOnClickSupp = async (event, value) => {
  //   event.preventDefault();

  //   try {
  //     const response = await axios.put(
  //       `${props.server}tatoo/deletepicture/${id}`,
  //       {
  //         image: value,
  //       },
  //       {
  //         headers: {
  //           Authorization: "Bearer " + props.adminToken,
  //         },
  //       }
  //     );

  //     setFlash(response.data);
  //     setFlashPicutres([...response.data.images]);
  //   } catch (error) {
  //     if (error.response.data.message) {
  //       setErrorMessage(error.response.data.message);
  //     } else {
  //       setErrorMessage(error.message);
  //     }
  //     setTimeout(() => {
  //       setErrorMessage("");
  //     }, 3000);
  //     console.log(error);
  //   }
  // };

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
      console.log(response);
      setFlashDescription("");
      setFlashName("");
      setFlashKeywords("");
      setErrorMessageflash("");
      setPicturesToAdd([]);
      setFlash(response.data);
      setFlashPicutres([]);
    } catch (error) {
      console.log(error);
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
    <section className="modif">
      <div className="modif-flash">
        <h2>Modifier le flash</h2>
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

          {errorMessageflash && <p className="error">{errorMessageflash}</p>}
          <input type="submit" value="Valider" />
        </form>
      </div>
      <button
        title="supprimer le flash"
        className="supp-flash-btn"
        onClick={(event) => {
          handleSuppFlash();
        }}
      >
        <p>Supprimer le flash</p>
      </button>
    </section>
  );
}
