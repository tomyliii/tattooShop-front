import { useEffect, useState, useLayoutEffect, useRef } from "react";
import "./flashs.css";
import axios from "axios";
import { Link } from "react-router-dom";
import PagesCalculator from "../../assets/Tools/Functions/pagesCalculator";
import Pagination from "../Pagination/Pagination";
import handleOnChange from "../../assets/Tools/Functions/HandleOnChange";
import hashtag from "../../assets/Tools/Functions/hashTag";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Flashs(props) {
  const [flashsListe, setFlashsListe] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [flashsCardList, setFlashsCardList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [limit, setlimit] = useState(20);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);
  const cardSection = useRef();

  useEffect(() => {
    try {
      (async () => {
        const response = await axios.get(
          `${props.server}tatoo?search=${search}&limit=${limit}&page=${page}`
        );
        const responsetoCard = await axios.get(
          `${props.server}tatoo?limit=${response.data.count}`
        );

        const flashsArrayToCard = [];

        for (let i = 0; i < 4; i++) {
          const random = Math.floor(Math.random() * response.data.count);
          flashsArrayToCard.push(responsetoCard.data.tatoos[random]);
        }

        PagesCalculator(response.data.count, limit, setPages);
        setFlashsCardList([...flashsArrayToCard]);
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
          `${props.server}tatoo?search=${search}&limit=${limit}&page=${page}`
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
        `${props.server}tatoo?search=${search}&limit=${limit}&page=${page}`
      );
      PagesCalculator(response.data.count, limit, setPages);

      setFlashsListe(response.data.tatoos);
      setPage(1);
    } catch (error) {
      console.log(error);
      setErrorMessage("Une erreur est survenue.");
    }
  };

  gsap.registerEffect({
    name: "slideToLeft",
    effect: (targets, config) => {
      return gsap.fromTo(
        targets,
        { x: 200, opacity: 0 },
        {
          x: 0,
          opacity: 1,

          scrollTrigger: {
            trigger: targets,
            start: "top bottom",
            scrub: true,
            end: "top center",
          },
        }
      );
    },
  });
  gsap.registerEffect({
    name: "slideToRight",
    effect: (targets, config) => {
      return gsap.fromTo(
        targets,
        { x: -200, opacity: 0 },
        {
          x: 0,
          opacity: 1,

          scrollTrigger: {
            trigger: targets,
            start: "top bottom",
            scrub: true,
            end: "top center",
          },
        }
      );
    },
  });

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.effects.slideToLeft(".box-section");
    });
    return () => ctx.revert();
  }, [isReady]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.effects.slideToRight(".card-section");
    });
    return () => {
      ctx.revert();
    };
  }, [isReady]);

  return !isReady ? (
    <div>
      <p>Loading, please wait...</p>
    </div>
  ) : (
    <>
      <section id="flashs-section">
        <h2>Les Flashs</h2>

        <>
          <div className="card-section" ref={cardSection}>
            {errorMessage ? (
              <div>
                <p>{errorMessage}</p>
              </div>
            ) : (
              flashsCardList.map((flash, index) => {
                return (
                  <Link
                    to={`/tattoo/${flash._id}`}
                    key={index + flash._id}
                    className="card"
                    onClick={() => {
                      window.scrollTo(0, 0);
                    }}
                  >
                    <div className="image">
                      <img
                        src={flash.images[0].secure_url}
                        alt={`image de ${flash.name}`}
                      />
                    </div>
                    <div className="infos-card">
                      <h3>{flash.name}</h3>
                      {/* <p className="description">{flash.description}</p> */}
                      {flash.keywords && (
                        <p className="card-hashtag">
                          {hashtag(flash.keywords)}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })
            )}
          </div>
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
                    className="box"
                    onClick={() => {
                      window.scrollTo(0, 0);
                    }}
                  >
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
        </>
      </section>
    </>
  );
}
