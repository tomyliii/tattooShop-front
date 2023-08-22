import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import Thumbs from "../Thumbs/Thumbs";
import "./dragAndDropTatooAdmin.css";

export default function DragAndDropTatooAdmin(props) {
  const [arrayOfImages, setArrayOfImages] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      try {
        if (maxFilesAuthorizedToDropp === 0) {
          props.setErrorMessage(
            "Vous avez dépassé le nombre maximal de fichiés."
          );
          setTimeout(() => {
            props.setErrorMessage("");
          }, 5000);
          throw { message: "nombre maximal atteint." };
        }

        setArrayOfImages([
          ...arrayOfImages,
          ...acceptedFiles.map((file) => {
            return Object.assign(file, { preview: URL.createObjectURL(file) });
          }),
        ]);

        props.setPicturesToAdd([...props.picturesToAdd, ...acceptedFiles]);
      } catch (error) {
        console.log(error);
      }
    },
    [arrayOfImages]
  );

  const handleOnClick = (event, value) => {
    try {
      event.stopPropagation();

      const arrayOfImagesCopy = [...arrayOfImages];

      const index = arrayOfImages.indexOf(value.name);

      arrayOfImagesCopy.splice(index, 1);
      setArrayOfImages([...arrayOfImagesCopy]);

      const picturesArrayCopy = [...props.picturesToAdd];
      picturesArrayCopy.splice(index, 1);
      props.setPicturesToAdd([...picturesArrayCopy]);
    } catch (error) {
      console.log(error);
      props.setErrorMessage("Une erreur est survenue.");
    }
  };

  const maxFilesAuthorizedToDropp =
    props.maxFilesAuthorized - arrayOfImages.length;

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,

    isDragReject,
  } = useDropzone({
    onDrop,
    multiple: true,
    maxFiles: maxFilesAuthorizedToDropp,
    accept: { "image/*": [] },
  });

  const rejectedItems = fileRejections.map((picture) => {
    return (
      <li key={picture.file.path}>
        {picture.file.path}
        <ul>
          {picture.errors.map((error) => {
            if (error.code === "file-invalid-type") {
              return (
                <li key={error.code}>Votre fichier n'est pas au bon format.</li>
              );
            }
            if (error.code === "too-many-files") {
              return (
                <li key={error.code}>
                  Vous avez dépassé le nombre maximal autorisé (Maximum
                  {maxFilesAuthorizedToDropp} photos).
                </li>
              );
            } else {
              return <li key={error.code}>{error.message}</li>;
            }
          })}
        </ul>
      </li>
    );
  });

  useEffect(() => {
    setArrayOfImages([...props.picturesToAdd]);
  }, [maxFilesAuthorizedToDropp]);

  return (
    <div className="dropzone-section">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {isDragReject ? (
          <p className="drag-Reject">Vos fichiers ne sont pas valides.</p>
        ) : isDragActive ? (
          <p className="drag-Accept">Déposez vos photos.</p>
        ) : (
          <p>Glissez et déposez vos photos ou cliquez pour les séléctionner.</p>
        )}
        <button type="button">
          <FontAwesomeIcon icon={faPlus} />
          &nbsp;Cliquez
        </button>
      </div>

      <div className="pictures-status">
        {arrayOfImages.length === 0 && rejectedItems.length === 0 ? (
          <p>
            Vous pouvez déposer {maxFilesAuthorizedToDropp} image.
            <br />
            Veillez à choisir un format adapté (image).
          </p>
        ) : (
          ""
        )}
        {arrayOfImages.length !== 0 && (
          <div className="pictures-accepted">
            <h4>Photo(s) acceptée(s):</h4>

            <div>
              <Thumbs
                arrayOfImages={arrayOfImages}
                handleOnClick={handleOnClick}
              />
            </div>
          </div>
        )}
        {rejectedItems.length !== 0 && (
          <div className="pictures-rejected">
            <h4>Fichier(s) refusé(s):</h4>
            <ul>{rejectedItems}</ul>
          </div>
        )}
      </div>
    </div>
  );
}
