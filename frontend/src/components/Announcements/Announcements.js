import React, { useState, useEffect, useContext, useRef } from "react";
import styles from "./Announcements.module.css";
import { FaTimes } from "react-icons/fa";
import { UserContext } from "../../context/UserContext.js";
import RippleButton from "../../utils/Buttons/RippleButton.js";
// import axios from "axios";
import { MdDelete } from "react-icons/md";
const Announcements = ({ onClose }) => {
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementDescription, setAnnouncementDescription] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);
  const [openDrawer, setOpenDrawer] = useState(false);

  const announcementListRef = useRef(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:1234/api/announcements",
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch announcements");
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setAnnouncements(data);
        } else {
          console.error("Expected an array, but got:", data);
        }
      } catch (error) {
        setError("Failed to load announcements.");
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!announcementTitle.trim()) return;
    if (!announcementDescription.trim()) return;
    console.log(announcementTitle, announcementDescription);
    try {
      const response = await fetch("http://localhost:1234/api/announcements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: announcementTitle,
          description: announcementDescription,
        }),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to create announcement");
      }
      const newAnnouncement = await response.json();
      setAnnouncements((prevAnnouncements) => [
        ...prevAnnouncements,
        newAnnouncement,
      ]);
      setAnnouncementTitle("");
      setAnnouncementDescription("");
      setOpenDrawer(false);
    } catch (error) {
      console.error("Error posting announcement:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:1234/api/announcements/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete announcement");
      }
      setAnnouncements((prevAnnouncements) =>
        prevAnnouncements.filter((ann) => ann._id !== id)
      );
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };

  useEffect(() => {
    // Scroll to the bottom whenever announcements are updated
    if (announcementListRef.current) {
      announcementListRef.current.scrollTop =
        announcementListRef.current.scrollHeight;
    }
  }, [announcements]);

  const renderForm = () => (
    <div
      className={`
        ${styles["formContainer"]}`}
    >
      <form className={`${styles["announcement-form"]}`} onSubmit={handleSend}>
        <button
          className={styles.formCloseButton}
          onClick={() => setOpenDrawer(false)}
        >
          <FaTimes />
        </button>
        <label htmlFor="title">Title</label>
        <br />
        <input
          id="title"
          type="text"
          placeholder="Enter the Title..."
          value={announcementTitle}
          onChange={(e) => setAnnouncementTitle(e.target.value)}
        />
        <br />
        <label htmlFor="description">Description</label>
        <br />
        <textarea
          id="description"
          rows="4"
          placeholder="Enter the description..."
          value={announcementDescription}
          onChange={(e) => setAnnouncementDescription(e.target.value)}
        ></textarea>
        <RippleButton type="submit">Add</RippleButton>
      </form>
    </div>
  );

  const renderAnnouncements = () =>
    announcements.map((ann) => (
      <div key={ann._id} className={styles.announcementItem}>
        <div>
          <p className={styles.announcementTitle}>{ann.title}</p>
          <p className={styles.announcementDescription}>{ann.description}</p>
          <small className={styles.announcementTime}>
            {new Date(ann.createdAt).toLocaleDateString("en-GB")}{" "}
            {new Date(ann.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </small>
        </div>
        {user && user.isSuperAdmin && (
          <button
            className={styles.deleteButton}
            onClick={() => handleDelete(ann._id)}
          >
            <MdDelete />
          </button>
        )}
      </div>
    ));
  return (
    <div className={styles["announcement-content"]}>
      <button className={styles.closeButton} onClick={onClose}>
        <FaTimes />
      </button>
      <h2 className="announcement-heading">Announcements</h2>

      <div className={styles.announcementList} ref={announcementListRef}>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : announcements.length > 0 ? (
          renderAnnouncements()
        ) : (
          <p>No announcements available.</p>
        )}
      </div>

      {user && user.isSuperAdmin && !openDrawer && (
        <>
          <RippleButton
            onClick={() => {
              setOpenDrawer(true);
            }}
          >
            Add New Announcement
          </RippleButton>
        </>
        // <div className={styles.inputContainer}>
        //   <input
        //     type="text"
        //     value={announcement}
        //     onChange={(e) => setAnnouncement(e.target.value)}
        //     placeholder="Type your announcement..."
        //     className={styles.input}
        //   />
        //   <RippleButton onClick={handleSend} className={styles.sendButton}>
        //     <FaPaperPlane />
        //   </RippleButton>
        // </div>
      )}
      {user && user.isSuperAdmin && openDrawer && renderForm()}
    </div>
  );
};

export default Announcements;
