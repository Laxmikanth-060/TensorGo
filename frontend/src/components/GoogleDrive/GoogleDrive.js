import React, { useRef, useState, useEffect } from "react";

function GoogleDrive() {
  const fileInputRef = useRef(null);
  const [folderName, setFolderName] = useState("");

  const [files, setFiles] = useState([]);
  let folderId = "1TA-cBG3Ud5etD9a1Am4Uk7LkX4CzeH2u";

  useEffect(() => {
    if (folderId) {
      fetchFiles(folderId);
    }
  }, [folderId]);

  const fetchFiles = async (folderId) => {
    try {
      const response = await fetch(
        `http://localhost:1234/gDrive/list-files/${folderId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch files");
      }
      const data = await response.json();
      console.log(data.files);
      setFiles(data.files);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const handleFileUpload = async () => {
    const files = fileInputRef.current.files;
    if (files.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }

      //   for (let pair of formData.entries()) {
      //     console.log(pair[0] + ": " + pair[1].name);
      //   }

      try {
        const response = await fetch("http://localhost:1234/gDrive/upload", {
          method: "POST",
          body: formData,
        });
        console.log(response);
        const data = await response.json();
        console.log("Uploaded files: ", data.files);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCreateFolder = async () => {
    if (folderName) {
      try {
        const response = await fetch(
          "http://localhost:1234/gDrive/create-folder",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ folderName }),
          }
        );
        console.log(response);
        const data = await response.json();
        console.log("Created folder ID: ", data.folderId);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Folder name is required.");
    }
  };

  return (
    <div>
      <h1>Upload File to Google Drive</h1>
      <input type="file" multiple ref={fileInputRef} />
      <button onClick={handleFileUpload}> Upload Files </button>
      <br />
      <br />
      <input
        type="text"
        placeholder="Folder Name"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
      />
      <button onClick={handleCreateFolder}>Create Folder</button>
      <div>
        <h1>Google Drive Files</h1>
        <div className="file-list">
          {files.map((file) => (
            <div key={file.id} className="file-item">
              <h3>{file.name}</h3>
              {file.mimeType.startsWith("image/") && (
                <img
                  src={`http://localhost:1234/gDrive/file/${file.id}`}
                  alt={file.name}
                  width="320"
                  height="240"
                />
              )}
              {file.mimeType.startsWith("video/") && (
                <video width="320" height="240" controls>
                  <source
                    src={`http://localhost:1234/gDrive/file/${file.id}`}
                    type="video/mp4"
                  />
                </video>
              )}
              {!file.mimeType.startsWith("image/") &&
                !file.mimeType.startsWith("video/") && (
                  <p>Unsupported file type: {file.mimeType}</p>
                )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GoogleDrive;
