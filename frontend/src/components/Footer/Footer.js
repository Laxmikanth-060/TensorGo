import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhoneAlt,
} from "react-icons/fa";
import { MdEmail, MdHome } from "react-icons/md";
import styles from "./Footer.module.css";
import RippleButton from "../../utils/Buttons/RippleButton";

function Footer() {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <div className={styles.logoIcons}>
          <div className={styles.logoContainer}>
            <img
              src="/abhiTrainings-logo-white.png"
              alt="LMS Logo"
              className={styles.logo}
            />
          </div>

          <div className={styles.iconsContainer}>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className={styles.icon} />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className={styles.icon} />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className={styles.icon} />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className={styles.icon} />
            </a>
          </div>
        </div>

        <div className={styles.quickLinks}>
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/courses">Courses</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/faq">FAQ</a>
            </li>
          </ul>
        </div>
        <div className={styles.subscribe}>
          <h3>Subscribe</h3>
          <form>
            <div className={styles.emailInputContainer}>
              <MdEmail className={styles.emailIcon} />
              <input
                type="email"
                placeholder="Your email"
                className={styles.emailInput}
              />
            </div>

            <RippleButton className={styles.subscribeButton}>
              Subscribe
            </RippleButton>
            {/* <button  className={styles.subscribeButton}>
              Subscribe
            </button> */}
          </form>
        </div>
        <div className={styles.helpCenter}>
          <h3>Help Center</h3>
          <p>
            <FaPhoneAlt className={styles.contactIcon} /> +91 9876543210
          </p>
          <p>
            <MdEmail className={styles.contactIcon} /> abhitrainings@gmail.com
          </p>
          <p>
            <MdHome className={styles.homeIcon} /> Madhapur, Hyderabad.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
