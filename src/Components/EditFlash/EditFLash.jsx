import "./editFlash.css";
import DragAndDrop from "../DragAndDrop/DragAndDrop";
import handleOnChange from "../../assets/Tools/Functions/HandleOnChange";

export default function EditFlash({
  handleOnSubmitNewFlash,
  flashName,
  setFlashName,
  flashDescription,
  setFlashDescription,
  flashKeywords,
  setFlashKeywords,
  flashPictures,
  setFlashPicutres,
  errorMessage,
  setErrorMessage,
}) {
  const maxFilesAuthorized = 1;
  return (
    <div className="create-flash">
      <h3>Ajouter un flash</h3>
      <form
        onSubmit={(event) => {
          handleOnSubmitNewFlash(event);
        }}
      >
        <input
          type="text"
          placeholder="Nom"
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
          placeholder="Déscription du flash"
          value={flashDescription}
          onChange={(event) => {
            handleOnChange(event.target.value, setFlashDescription);
          }}
        ></textarea>
        <input
          type="text"
          placeholder="Mots cléfs"
          value={flashKeywords}
          onChange={(event) => {
            handleOnChange(event.target.value, setFlashKeywords);
          }}
        />
        <DragAndDrop
          maxFilesAuthorized={maxFilesAuthorized}
          setFlashPictures={setFlashPicutres}
          flashPictures={flashPictures}
          setErrorMessage={setErrorMessage}
        />

        {errorMessage && <p>{errorMessage}</p>}
        <input type="submit" value="Valider" />
      </form>
    </div>
  );
}
