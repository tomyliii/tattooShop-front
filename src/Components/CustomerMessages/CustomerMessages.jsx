import { useState, useEffect, useSyncExternalStore } from "react";
import "./customerMessages.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faBoxArchive } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function CustomerMessages(props) {
  const [isReady, setIsReady] = useState(false);
  const [messagesList, setMessageList] = useState([]);
  const [infoMessage, setInfoMessage] = useState("");

  const instance = axios.create({
    baseURL: props.server,
    headers: { Authorization: "Bearer " + props.adminToken },
  });

  useEffect(() => {
    try {
      (async () => {
        const response = await instance.get(
          `/admin/customersmessages?archived=${props.showArchived}`
        );

        setMessageList(response.data);
        setIsReady(true);
      })();
    } catch (error) {
      console.log(error);
      setInfoMessage("Une erreur est survenue.");
    }
  }, [infoMessage, props.showArchived]);

  const handleOnClickArchive = async (value) => {
    try {
      const response = await instance.put(
        `admin/managemessagecustomer/${value}`
      );
      setInfoMessage("Réservation mise à jour.");
      setTimeout(() => {
        setInfoMessage("");
      }, 5000);
    } catch (error) {
      console.log(error);
      setInfoMessage("Une erreur est survenue");
    }
  };
  const handleOnClickSup = async (value) => {
    try {
      const response = await instance.delete(
        `admin/deletemessagecustomer/${value}`
      );

      setInfoMessage("Réservation supprimée.");
      setTimeout(() => {
        setInfoMessage("");
      }, 5000);
    } catch (error) {
      console.log(error);
      setInfoMessage("Une erreur est survenue");
    }
  };
  return !isReady ? (
    <div>
      <p>Loading, please wait...</p>
    </div>
  ) : (
    <div className="admin-messages">
      {messagesList.length === 0 ? (
        <p className="info-admin-messages">Vous n'avez aucun messages.</p>
      ) : (
        messagesList.map((message) => {
          return (
            <div
              key={message._id}
              className={message.archived === true ? "archived" : ""}
            >
              <div>
                <div className="info-customer">
                  <p>
                    {message.customer.firstname} {message.customer.lastname}
                  </p>
                  <p>{message.customer.mail}</p>
                  <div className="button-section">
                    <button
                      onClick={(event) => {
                        handleOnClickSup(message.id);
                      }}
                      className="trash"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button
                      onClick={(event) => {
                        handleOnClickArchive(message.id);
                      }}
                      className="archive"
                    >
                      <FontAwesomeIcon icon={faBoxArchive} />
                    </button>
                  </div>{" "}
                  <p>{"0" + message.customer.phoneNumber}</p>
                </div>
                <div className="customer-message">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })
      )}
      <p className="info-admin-messages">{infoMessage}</p>
    </div>
  );
}
