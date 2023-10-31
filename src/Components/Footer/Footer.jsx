import "./footer.css";
import React from "react";
import InstaLogo from "../../assets/Images/instaLogo.png";
import tikTokLogo from "../../assets/Images/tikTokLogo.png";

function Footer() {
  return (
    <footer>
      <div>
        <p>
          Tous les contenus, les images, les textes, les graphiques et les
          créations artistiques exposées sur ce site internet, sont protégés par
          les lois internationales sur le droit d'auteur et sont la propriété
          intellectuelle de White Fox Ink.
          <br /> <br /> Toute reproduction, copie, distribution ou utilisation
          non autorisée de ces contenus, en tout ou en partie, est strictement
          interdite. En accédant à ce site, vous reconnaissez et acceptez que
          les œuvres présentées ici sont protégées par des droits d'auteur. Vous
          vous engagez à ne pas copier, reproduire, distribuer, afficher
          publiquement, créer des œuvres dérivées ou utiliser de toute autre
          manière les contenus de ce site sans l'autorisation écrite préalable
          de white Fox Ink. <br /> <br />
          Toute violation de ces droits d'auteur peut entraîner des actions en
          justice et des réclamations de dommages-intérêts conformément à la
          législation en vigueur. <br /> <br /> Nous nous réservons le droit de
          prendre toutes les mesures nécessaires pour protéger nos droits de
          propriété intellectuelle et faire respecter ces termes. <br /> <br />{" "}
          Pour toute demande d'autorisation d'utilisation ou de licence pour les
          œuvres exposées sur ce site, veuillez nous contacter. <br /> <br />{" "}
          Nous vous remercions de respecter notre travail et notre créativité en
          évitant toute utilisation non autorisée de nos œuvres. <br /> © 2023
          White Fox Ink. Tous droits réservés.
        </p>
        <div className="links">
          <p>
            <a
              href="https://instagram.com/white.fox.ink?igshid=MmU2YjMzNjRlOQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              <img src={InstaLogo} alt="lien vers Instagram" />
              White.Fox.Ink
            </a>
            <a
              href="https://www.tiktok.com/@white.fox.ink?_t=8eyGmgUInQ0&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              <img src={tikTokLogo} alt="lien vers TikTok" />
              @white.fox.ink
            </a>
          </p>
        </div>
      </div>
      <p>
        Created By&nbsp;
        <a
          href="https://www.linkedin.com/in/thomas-seabra-961679271"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          TomyLii
        </a>
      </p>
    </footer>
  );
}

export default React.memo(Footer);
