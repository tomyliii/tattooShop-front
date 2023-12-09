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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

gsap.registerPlugin(ScrollTrigger);

export default function Home(props) {
  // console.log(props);

  const error = (txt) => {
    toast.error(txt);
  };
  const warning = (txt) => {
    toast.warning(txt);
  };
  const success = (txt) => {
    toast.success(txt);
  };

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
                {/* <span className="start-text-description">❝ </span>
                <br /> */}
                {text}
                {/* <br />
                <span className="end-text-description"> ❞</span> */}
              </p>
            </div>
          </section>
        </div>
        <div className="wrapper">
          <Flashs server={props.server} />
        </div>
        <div className="wrapper">
          <Contact
            server={props.server}
            success={success}
            warning={warning}
            error={error}
          />
        </div>
        {loginModal && (
          <Login
            server={props.server}
            setLoginModal={setLoginModal}
            adminToken={props.adminToken}
            setAdminToken={props.setAdminToken}
            success={success}
            warning={warning}
            error={error}
          />
        )}
        {projectModal && (
          <Project
            server={props.server}
            setProjectModal={setProjectModal}
            success={success}
            warning={warning}
            error={error}
          />
        )}
      </main>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}
