import React, { useRef } from "react";

function GoogleDrive() {
  const fileInputRef = useRef(null);

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
  return (
    <div>
      <h1>Upload File to Google Drive</h1>
      <input type="file" multiple ref={fileInputRef} />
      <button onClick={handleFileUpload}> Upload Files </button> <br /> <br />
    </div>
  );
}

export default GoogleDrive;
