import React from "react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitter, BsLinkedin } from "react-icons/bs";
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={classes.footer}>
      <div className={classes["footer-column"]}>
        <div className={classes["footer-sections"]}>
          <h2>Useful Info</h2>
          <ul className={classes["footer-sections_links"]}>
            <li>
              <Link to={"/our-mission"}>About Golden Shoe</Link>
            </li>
            <li>
              <Link to={"/our-impact"}>Modern Slavery Act</Link>
            </li>
            <li>
              <Link to={"/our-team"}>Sustainability</Link>
            </li>
          </ul>
        </div>

        <div className={classes["footer-sections"]}>
          <h2>Learn More</h2>
          <ul className={classes["footer-sections_links"]}>
            <li>
              <Link to={"/Careers"}>Careers</Link>
            </li>
            <li>
              <Link to={"/blog"}>Blog</Link>
            </li>
          </ul>
        </div>

        <div className={classes["footer-sections"]}>
          <h2>Support</h2>
          <ul className={classes["footer-sections_links"]}>
            <li>
              <Link to={"/help"}>Help Center</Link>
            </li>
            <li>
              <Link to={"/contact"}>Contact</Link>
            </li>
          </ul>
        </div>

        <div className={classes["footer-sections"]}>
          <h2>Follow Us</h2>
          <ul className={classes["footer-sections_socials"]}>
            <li>
              <a
                href="https://en-gb.facebook.com/"
                target="_blank"
                rel="noreferrer"
              >
                <BsFacebook size={20} />
              </a>
            </li>

            <li>
              <a href="https://instagram.com/" target="_blank" rel="noreferrer">
                <BsInstagram size={20} />
              </a>
            </li>

            <li>
              <a href="https://twitter.com/" target="_blank" rel="noreferrer">
                <BsTwitter size={20} />
              </a>
            </li>

            <li>
              <a href="https://linkedin.com/" target="_blank" rel="noreferrer">
                <BsLinkedin size={20} />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p>
        &copy; Golden Shoe Limited. All rights reserved{" "}
        {new Date().getFullYear()}.
      </p>
    </div>
  );
};

export default Footer;
