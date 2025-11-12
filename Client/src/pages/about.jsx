import React from "react";
import "./About.css";

function About() {
  return (
    <section className="about-section">
      <div className="about-container">
        <h1 className="about-title">About  Food Store</h1>

        <p className="about-text">
          Welcome to <span className="highlight"> Food Store</span> — where{" "}
          <span className="highlight">flavor meets perfection</span>. At{" "}
          <span className="highlight"> Catering and Ushering Services</span>,
          we don’t just make food — we craft experiences. Born from a passion for
          authentic Nigerian cuisine and exceptional hospitality, our mission is
          to bring you dishes that celebrate tradition, taste, and creativity in
          every bite.
        </p>

        <p className="about-text">
          From rich <em>jollof rice</em> that ignites your senses to perfectly
          grilled proteins and freshly made soups, every meal we prepare is a
          blend of love, culture, and precision. But our excellence doesn’t stop
          at the kitchen — we also redefine the art of{" "}
          <strong>event management</strong>.
        </p>

        <p className="about-text">
          Whether it’s an intimate gathering or a grand celebration, our team of
          professionals ensures every detail — from décor to dining — reflects
          class, warmth, and your unique style. With years of expertise in{" "}
          <strong>food preparation, presentation, and service</strong>, 
          stands for quality you can taste, reliability you can trust, and
          elegance you can feel.
        </p>

        <p className="about-slogan">
           Food Store — Tasty Dishes. Memorable Events. Unmatched Experience.
        </p>

        <div className="connect-section">
          <h2 className="connect-title">Let’s Connect</h2>
          <p className="connect-text">
            Follow us, message us, and stay updated with our latest dishes and events.
          </p>
          <div className="connect-icons">
            <a href="https://wa.me/YourWhatsAppNumber" target="_blank" rel="noopener noreferrer">
              {/* WhatsApp icon */}
              <img src="/whatsapp.gif" alt="WhatsApp" className="icon" />
            </a>
            <a href="https://facebook.com/YourPage" target="_blank" rel="noopener noreferrer">
              <img src="/Facebook.png" alt="Facebook" className="icon" />
            </a>
            <a href="https://x.com/YourHandle" target="_blank" rel="noopener noreferrer">
              <img src="/twitter.png" alt="X (formerly Twitter)" className="icon" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
