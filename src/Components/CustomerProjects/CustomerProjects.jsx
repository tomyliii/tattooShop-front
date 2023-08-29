import { useEffect, useState } from "react";
import "./customerProjects.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faBoxArchive } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";
export default function CustomerProjects(props) {
  const [isReady, setIsReady] = useState(false);
  const [projectList, setProjectList] = useState([]);
  const [infoProject, setInfoProject] = useState("");
  const [showImg, setShowImg] = useState(false);
  const [selectedImg, setSelectedImg] = useState({});
  const instance = axios.create({
    baseURL: props.server,
    headers: { Authorization: "Bearer " + props.adminToken },
  });

  if (showImg) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
  const handleOnClick = (value) => {
    setSelectedImg(value);
    setShowImg(true);
  };

  useEffect(() => {
    try {
      (async () => {
        const response = await instance.get(
          `admin/customersprojects?archived=${props.showArchived}`
        );

        setProjectList(response.data);
        setIsReady(true);
      })();
    } catch (error) {
      console.log(error);
      setInfoProject("une erreur est survenue.");
    }
  }, [infoProject, props.showArchived]);

  const handleOnClickArchive = async (value) => {
    try {
      console.log(props.adminToken);
      const response = await instance.put(
        `admin/manageprojectcustomer/${value}`
      );
      setInfoProject("Réservation mise à jour.");
      setTimeout(() => {
        setInfoProject("");
      }, 5000);
    } catch (error) {
      console.log(error);
      setInfoProject("Une erreur est survenue");
    }
  };
  const handleOnClickSup = async (value) => {
    try {
      const response = await instance.delete(
        `admin/deletprojectcustomer/${value}`
      );

      setInfoProject("Réservation supprimée.");
      setTimeout(() => {
        setInfoProject("");
      }, 5000);
    } catch (error) {
      console.log(error);
      setInfoProject("Une erreur est survenue");
    }
  };
  return !isReady ? (
    <div>
      <p>Loading, please wait...</p>
    </div>
  ) : (
    <div className="customer-project-section">
      {projectList.length === 0 ? (
        <p className="info-project-section">
          Vous n'avez aucune demande de projet.
        </p>
      ) : (
        projectList.map((project) => {
          return (
            <div
              key={project._id}
              className={`project ${project.archived && "archived"}`}
            >
              <div className="project-infos">
                <div className="button-section">
                  <button
                    onClick={(event) => {
                      handleOnClickSup(project.id);
                    }}
                    className="trash"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <button
                    onClick={(event) => {
                      handleOnClickArchive(project.id);
                    }}
                    className="archive"
                  >
                    <FontAwesomeIcon icon={faBoxArchive} />
                  </button>
                </div>
                <p>
                  {project.customer.firstname} {project.customer.lastname}
                </p>
                <p>{project.customer.mail}</p>
                <p>{"0" + project.customer.phoneNumber}</p>
                <p>{project.description}</p>
              </div>
              <div className="project-images">
                {project.images.map((image, index) => {
                  return (
                    <img
                      key={index}
                      src={image.secure_url}
                      alt={`Image du projet de ${project.customer.firstname}`}
                      onClick={(event) => {
                        handleOnClick(image);
                      }}
                    />
                  );
                })}
              </div>
            </div>
          );
        })
      )}
      <p className="info-project-section">{infoProject}</p>
      {showImg && (
        <div
          className="show-image"
          onClick={(event) => {
            setShowImg(false);
          }}
        >
          <div>
            <img src={selectedImg.secure_url} alt={`image de projet`} />
          </div>
        </div>
      )}
    </div>
  );
}
