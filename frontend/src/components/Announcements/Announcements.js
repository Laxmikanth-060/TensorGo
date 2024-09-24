import React, { useState, useEffect, useContext, useRef } from "react";
import styles from "./Announcements.module.css";
import { FaTimes, FaPaperPlane } from "react-icons/fa";
import { UserContext } from "../../context/UserContext.js";

const Announcements = ({ onClose }) => {
  const [announcement, setAnnouncement] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);
  
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
  
  const handleSend = async () => {
    if (!announcement.trim()) return;
    try {
      const response = await fetch("http://localhost:1234/api/announcements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: announcement }),
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
      setAnnouncement("");
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
      announcementListRef.current.scrollTop = announcementListRef.current.scrollHeight;
    }
  }, [announcements]);

  return (
    <div className={styles["announcement-content"]}>
      <button className={styles.closeButton} onClick={onClose}>
        <FaTimes />
      </button>
      <h2>Announcements</h2>

      <div className={styles.announcementList} ref={announcementListRef}>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : announcements.length > 0 ? (
          announcements.map((ann) => (
            <div key={ann._id} className={styles.announcementItem}>
              <div>
                <p className={styles.announcementContentText}>{ann.content}</p>
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
                  <FaTimes />
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No announcements available.</p>
        )}
      </div>

      {user && user.isSuperAdmin && (
        <div className={styles.inputContainer}>
          <input
            type="text"
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
            placeholder="Type your announcement..."
            className={styles.input}
          />
          <button onClick={handleSend} className={styles.sendButton}>
            <FaPaperPlane />
          </button>
        </div>
      )}
    </div>
  );
};

export default Announcements;
