import { useCallback, useEffect, useState } from "react";
import "./flashsAdmin.css";
import axios from "axios";
import { Link } from "react-router-dom";
import PagesCalculator from "../../assets/Tools/Functions/pagesCalculator";
import Pagination from "../Pagination/Pagination";
import handleOnChange from "../../assets/Tools/Functions/HandleOnChange";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faBoxArchive,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
export default function FlashsAdmin(props) {
  const [flashsListe, setFlashsListe] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [limit, setlimit] = useState(20);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    try {
      (async () => {
        const response = await axios.get(
          `${props.server}tatoo/all?search=${search}&limit=${limit}&page=${page}`,
          {
            headers: {
              authorization: "Bearer " + props.adminToken,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        PagesCalculator(response.data.count, limit, setPages);

        setFlashsListe(response.data.tatoos);
        setIsReady(true);
      })();
    } catch (error) {
      console.log(error);
      setErrorMessage("Une erreur est survenue.");
    }
  }, []);

  useEffect(() => {
    try {
      (async () => {
        const response = await axios.get(
          `${props.server}tatoo/all?search=${search}&limit=${limit}&page=${page}`,
          {
            headers: {
              authorization: "Bearer " + props.adminToken,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setFlashsListe(response.data.tatoos);
      })();
    } catch (error) {
      console.log(error);
      setErrorMessage("Une erreur est survenue.");
    }
  }, [page]);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `${props.server}tatoo/all?search=${search}&limit=${limit}&page=${page}`,
        {
          headers: {
            authorization: "Bearer " + props.adminToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      PagesCalculator(response.data.count, limit, setPages);

      setFlashsListe(response.data.tatoos);
      setPage(1);
    } catch (error) {
      console.log(error);
      setErrorMessage("Une erreur est survenue.");
    }
  };

  return !isReady ? (
    <div>
      <p>Loading, please wait...</p>
    </div>
  ) : (
    <>
      <section id="flashs-section">
        <h2>Les Flashs</h2>
        <form
          onSubmit={(event) => {
            handleOnSubmit(event);
          }}
        >
          <input
            type="text"
            placeholder="Chercher un tatouage"
            value={search}
            onChange={(event) => {
              handleOnChange(event.target.value, setSearch);
            }}
          />
          <input type="submit" value="Valider" />
        </form>
        <div className="box-section">
          {errorMessage ? (
            <div>
              <p>{errorMessage}</p>
            </div>
          ) : (
            flashsListe.map((flash) => {
              return (
                <Link
                  to={`/tattoo/${flash._id}`}
                  key={flash._id}
                  className={`box ${!flash.disable && "archived"}`}
                >
                  <div className="button-section"></div>
                  <div>
                    <img
                      src={flash.images[0].secure_url}
                      alt={`image de ${flash.name}`}
                    />
                  </div>
                  <div className="box-title">
                    <p>{flash.name}</p>
                  </div>
                </Link>
              );
            })
          )}
        </div>
        <Pagination
          pages={pages}
          selectedPage={page}
          setSelectedPage={setPage}
        />
      </section>
    </>
  );
}
