import { useEffect, useState } from "react";
import "./bookedFlash.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faBoxArchive } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";
export default function BookedFlash(props) {
  const [isReady, setIsReady] = useState(false);
  const [bookedList, setBookedList] = useState([]);
  const [infoBook, setInfoBook] = useState("");

  const instance = axios.create({
    baseURL: props.server,
    headers: { Authorization: "Bearer " + props.adminToken },
  });
  useEffect(() => {
    try {
      (async () => {
        const response = await instance.get(
          `admin/bookedtatoos?archived=${props.showArchived}`
        );

        setBookedList(response.data);
        setIsReady(true);
      })();
    } catch (error) {
      console.log(error);
      setInfoBook("une erreur est survenue.");
    }
  }, [infoBook, props.showArchived]);

  const handleOnClickArchive = async (value) => {
    try {
      console.log(props.adminToken);
      const response = await instance.put(`admin/managebookedtatoo/${value}`);
      setInfoBook("Réservation mise à jour.");
      setTimeout(() => {
        setInfoBook("");
      }, 5000);
    } catch (error) {
      console.log(error);
      setInfoBook("Une erreur est survenue");
    }
  };
  const handleOnClickSup = async (value) => {
    try {
      const response = await instance.delete(
        `admin/deletebookcustomer/${value}`
      );

      setInfoBook("Réservation supprimée.");
      setTimeout(() => {
        setInfoBook("");
      }, 5000);
    } catch (error) {
      console.log(error);
      setInfoBook("Une erreur est survenue");
    }
  };
  return !isReady ? (
    <div>
      <p>Loading, please wait...</p>
    </div>
  ) : (
    <div className="booked-list">
      {bookedList.length === 0 ? (
        <p>Vous n'avez aucune réservation.</p>
      ) : (
        bookedList.map((Flash) => {
          return (
            <div
              key={Flash._id}
              className={Flash.archived === true ? "archived" : ""}
            >
              <div className="book-info">
                <p>
                  {Flash.customer.firstname} {Flash.customer.lastname}
                </p>
                <p>{Flash.customer.mail}</p>
                <p>{"0" + Flash.customer.phoneNumber}</p>
                <p>{Flash.message}</p>
                <div className="button-section">
                  <button
                    onClick={(event) => {
                      handleOnClickSup(Flash.id);
                    }}
                    className="trash"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <button
                    onClick={(event) => {
                      handleOnClickArchive(Flash.id);
                    }}
                    className="archive"
                  >
                    <FontAwesomeIcon icon={faBoxArchive} />
                  </button>
                </div>
              </div>
              <Link>
                <div>
                  <img
                    src={Flash.item.images[0].secure_url}
                    alt={`image de ${Flash.item.name}`}
                  />
                  <div className="title">
                    <p>{Flash.item.name}</p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })
      )}
      <p>{infoBook}</p>
    </div>
  );
}
