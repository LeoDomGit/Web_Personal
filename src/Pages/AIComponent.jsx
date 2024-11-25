import React, { useState } from "react";
import { Dropzone, FileMosaic } from "@dropzone-ui/react";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import axios from "axios";

function AIComponent() {
  const [files, setFiles] = useState([]);
  const [apiImageUrl, setApiImageUrl] = useState(null); // To store the processed image URL
  const [loading, setLoading] = useState(false); // For API request status

  const updateFiles = async (incomingFiles) => {
    setFiles(incomingFiles);

    if (incomingFiles.length > 0) {
      const file = incomingFiles[0].file; // Get the first file
      const formData = new FormData();
      formData.append("image", file);

      setLoading(true); // Set loading state to true while waiting for API response

      try {
        // Send the image to the API
        const response = await axios.post("https://backend.morin.id.vn/api/image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // Update the processed image URL from the API response
        setApiImageUrl(response.data.url);
      } catch (error) {
        console.error("Error uploading the image:", error);
        alert("Failed to upload the image. Please try again.");
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    }
  };

  return (
    <>
      <div className="container text-middle pt-5">
        <div className="card border-0 shadow">
          <div className="row m-3 d-flex justify-content-center">
            <div className="col-md-3">
              <Dropzone onChange={updateFiles} value={files}>
                {files.map((file) => (
                  <FileMosaic {...file} preview />
                ))}
              </Dropzone>
            </div>
            <div className="col-md">
              {files.length === 0 ? (
                <p>Please upload an image</p> // Message if no image is uploaded
              ) : loading ? (
                <p>Loading...</p> // Show "Loading..." while waiting for the API response
              ) : (
                <ReactCompareSlider
                  itemOne={
                    files.length > 0 ? (
                      <ReactCompareSliderImage
                        src={URL.createObjectURL(files[0].file)}
                        alt="Uploaded image"
                      />
                    ) : (
                      <p>Please upload an image</p>
                    )
                  }
                  itemTwo={
                    apiImageUrl ? (
                      <ReactCompareSliderImage
                        src={apiImageUrl}
                        alt="AI-processed image"
                      />
                    ) : (
                      <p>Waiting for AI-processed image</p>
                    )
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AIComponent;
