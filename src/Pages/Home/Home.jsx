import "./home.css";
import Header from "../../Components/Header/Header";
import axios from "axios";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import Img1 from "../../assets/Images/image12.jpg";
import Flashs from "../../Components/Flashs/Flashs";
import Contact from "../../Components/Contact/Contact";
import Login from "../../Components/Modals/Login/Login";
import Project from "../../Components/Modals/Project/Project";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollTrigger);

export default function Home(props) {
  console.log(props);
  const [isReady, setIsReady] = useState(false);
  const [text, setText] = useState("");
  const [loginModal, setLoginModal] = useState(false);
  const [projectModal, setProjectModal] = useState(false);
  if (projectModal || loginModal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  useEffect(() => {
    (async () => {
      const response = await axios.get(`${props.server}text`);

      setText(response.data[0].description);

      setIsReady(true);
    })();
  }, []);

  // useEffect(() => {
  //   const scrollAnimation = () => {
  //     let ctx = gsap.context(() => {
  //       gsap.fromTo(
  //         "h2",
  //         { x: 100, opacity: 0 },
  //         {
  //           x: 0,
  //           opacity: 1,
  //           delay: 0.3,
  //           scrollTrigger: {
  //             trigger: "h2",
  //             start: "0",
  //             scrub: true,
  //             end: "bottom center",
  //           },
  //         }
  //       );
  //     });
  //     return () => ctx.revert();
  //   };
  //   scrollAnimation();
  // }, []);

  return !isReady ? (
    <>
      <div>Please wait...</div>
    </>
  ) : (
    <>
      <Header
        adminToken={props.adminToken}
        setProjectModal={setProjectModal}
        setLoginModal={setLoginModal}
      ></Header>

      <main>
        <div className="wrapper">
          <section id="about-me-section">
            <h2>A propos de moi</h2>
            <div>
              <img
                src={Img1}
                alt="image d'un tatoueur tatouant une personne"
                className="img-aboute-me"
              />
              <img
                src={Img1}
                alt="image d'un tatoueur tatouant une personne"
                className="img-aboute-me-little-creen"
              />
              <p className="css-fix ">
                <span className="start-text-description">❝ </span>
                <br />
                {text} <br />
                <span className="end-text-description"> ❞</span>
              </p>
            </div>
          </section>
        </div>
        <div className="wrapper">
          <Flashs server={props.server} />
        </div>
        <div className="wrapper">
          <Contact server={props.server} />
        </div>
        {loginModal && (
          <Login
            server={props.server}
            setLoginModal={setLoginModal}
            adminToken={props.adminToken}
            setAdminToken={props.setAdminToken}
          />
        )}
        {projectModal && (
          <Project server={props.server} setProjectModal={setProjectModal} />
        )}
      </main>
    </>
  );
}
