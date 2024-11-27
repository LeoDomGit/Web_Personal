/* eslint-disable */
import React, { useState } from "react";
import { Dropzone, FileMosaic } from "@dropzone-ui/react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import "../css/ai.css";
import axios from "axios";
import Loading from "../Components/Loading";

function AIComponent() {
  const [files, setFiles] = useState([]);
  const [apiImageUrl, setApiImageUrl] = useState(null); // To store the processed image URL
  const [loading, setLoading] = useState(false); // For API request status
  const [prompt, setPrompt] = useState("");
  const [files1, setFiles1] = useState([]);
  const [apiImageUrl1, setApiImageUrl1] = useState(null); // To store the processed image URL
  const [loading1, setLoading1] = useState(false); // For API request status
  const [loading2, setLoading2] = useState(false); // For API request status
  const [apiImageUrl2, setApiImageUrl2] = useState(null); // To store the processed image URL

  const updateFiles = async (incomingFiles) => {
    setFiles(incomingFiles);

    if (incomingFiles.length > 0) {
      const file = incomingFiles[0].file;
      const formData = new FormData();
      formData.append("image", file);
      setLoading(true);
      const response = await axios.post(
        "https://project2.trungthanhzone.com/api/image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setApiImageUrl(response.data.url);
      setLoading(false);
    }
  };
  const generateImage = async () => {
    if (prompt == "") {
      alert("Please upload an prompt before generating.");
      return;
    }

    setLoading2(true);
    try {
      const formData = new FormData();
      formData.append("prompt", prompt);
      setLoading2(true);
      const response = await axios.post(
        "https://project2.trungthanhzone.com/api/generate",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setApiImageUrl2(response.data.url);
      setLoading2(false);
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Failed to generate the image. Please try again.");
    } finally {
      setLoading1(false);
    }
  };

  const updateFiles1 = async (incomingFiles) => {
    setFiles1(incomingFiles);

    if (incomingFiles.length > 0) {
      const file = incomingFiles[0].file;
      const formData = new FormData();
      formData.append("image", file);
      setLoading1(true);
      const response = await axios.post(
        "https://project2.trungthanhzone.com/api/removebackground",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setApiImageUrl1(response.data.url);
      setLoading1(false);
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">
            AI Image Tools
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#cartoon">
                  Cartoon Image Generation
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#remove-bg">
                  Remove Background
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#compare">
                  Create Image
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Log out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container text-middle pt-5">
        <div className="row" id="cartoon">
          <div className="col-md">
            <div className="card border-0 shadow">
              <h4 className="text-center pt-3">Cartoon Generation</h4>
              <div className="row m-3 d-flex justify-content-center">
                <div className="col-md-3  pt-5">
                  <Dropzone onChange={updateFiles} value={files}>
                    {files.map((file) => (
                      <FileMosaic {...file} preview />
                    ))}
                  </Dropzone>
                  <h5 style={{ fontSize: "17px" }} className="mt-4">
                    Please upload an image
                  </h5>
                </div>
                <div className="col-md w-100 text-center">
                  {files.length === 0 ? (
                    // <img src="https://www.giantfocal.com/hubfs/GiantFocal_Marketing/Growth_Tools/before-after-comparison.jpg" alt="" />
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{ minHeight: "300px", width: "100%" }}
                    >
                      <img
                        className="img-fluid"
                        src="https://codingartistweb.com/wp-content/uploads/2021/04/image-comparison-slider-01.png"
                        alt=""
                      />
                    </div>
                  ) : loading ? (
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{ minHeight: "300px", width: "100%" }}
                    >
                      <Loading />
                    </div>
                  ) : (
                    <div className="row mt-4 mb-4">
                      <ReactCompareSlider
                       style={{
                        height: "400px",
                        width: "auto",
                        margin: "0px auto",
                      }}
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
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4" id="remove-bg">
          <div className="col-md">
            <div className="card border-0 shadow">
              <h4 className="text-center pt-3">Remove Background</h4>
              <div className="row m-3 d-flex justify-content-center">
                <div className="col-md-3  pt-5">
                  <Dropzone onChange={updateFiles1} value={files1}>
                    {files1.map((file) => (
                      <FileMosaic {...file} preview />
                    ))}
                  </Dropzone>
                  <h5 style={{ fontSize: "17px" }} className="mt-4">
                    Please upload an image
                  </h5>
                </div>
                <div className="col-md w-100 text-center">
                  {files1.length === 0 ? (
                    // <img src="https://www.giantfocal.com/hubfs/GiantFocal_Marketing/Growth_Tools/before-after-comparison.jpg" alt="" />
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{ minHeight: "300px", width: "100%" }}
                    >
                      <img
                        className="img-fluid"
                        src="https://codingartistweb.com/wp-content/uploads/2021/04/image-comparison-slider-01.png"
                        alt=""
                      />
                    </div>
                  ) : loading1 ? (
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{ minHeight: "300px", width: "100%" }}
                    >
                      <Loading />
                    </div>
                  ) : (
                    <div className="row mt-4 mb-4">
                      <ReactCompareSlider
                       style={{
                        height: "400px",
                        width: "auto",
                        margin: "0px auto",
                      }}
                        itemOne={
                          apiImageUrl1 ? (
                            <ReactCompareSliderImage
                              src={apiImageUrl1}
                              alt="AI-processed image"
                            />
                          ) : (
                            <p>Waiting for AI-processed image</p>
                          )
                        }
                        itemTwo={
                          files1.length > 0 ? (
                            <ReactCompareSliderImage
                              src={URL.createObjectURL(files1[0].file)}
                              alt="Uploaded image"
                            />
                          ) : (
                            <p>Please upload an image</p>
                          )
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4" id="compare">
          <div className="col-md">
            <div className="card border-0 shadow">
              <h4 className="text-center pt-3">Image Generation</h4>
              <div
                style={{ width: "80%", margin: "0px auto !important" }}
                className="row  m-3 d-flex justify-content-center"
              >
                <div className="col-md-6 d-flex flex-column align-items-center pt-5">
                  <textarea
                    rows={4}
                    onChange={(e) => setPrompt(e.target.value)}
                    value={prompt}
                    className="form-control mb-3"
                    placeholder="Enter your prompt here"
                    style={{ maxWidth: "100%" }}
                  />
                  <button
                    onClick={generateImage}
                    className="btn btn-primary mb-3"
                    disabled={loading2 || !prompt}
                  >
                    Generate
                  </button>
                </div>
                <div className="col-md w-100 text-center">
                  {loading2 ? (
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{ minHeight: "300px", width: "100%" }}
                    >
                      <Loading />
                    </div>
                  ) : (
                    <div className="row mt-4 mb-4">
                      <img
                        style={{
                          height: "400px",
                          width: "auto",
                          margin: "0px auto",
                        }}
                        src={
                          apiImageUrl2
                            ? apiImageUrl2
                            : "https://typli.ai/_next/image?url=%2Fai-text-generator.png&w=1200&q=75"
                        }
                        alt={
                          apiImageUrl2 ? "Generated image" : "Placeholder image"
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-dark text-light py-4 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h5>About AI Image Tools</h5>
              <p>
                AI Image Tools provides cutting-edge solutions for image
                processing, including background removal, cartoon generation,
                and creative image generation using AI technologies.
              </p>
              <ul>
                <li>
                  <a href="#cartoon" className="text-light">
                    Cartoon
                  </a>{" "}
                </li>
                <li>
                  <a href="#remove-bg" className="text-light">
                    Remove Background
                  </a>{" "}
                </li>
                <li>
                  <a href="#compare" className="text-light">
                    Compare Images
                  </a>{" "}
                </li>
              </ul>
            </div>
            <div className="col-md-6 text-end">
              <h5>Contact Us</h5>
              <p>Email: leodomsolar@gmail.com</p>
              <p>Phone: +84 9 777 666 53</p>
            </div>
          </div>
          <div className="text-center mt-3">
            <p>&copy; 2024 AI Image Tools. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default AIComponent;
