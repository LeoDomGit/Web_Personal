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

  const [files1, setFiles1] = useState([]);
  const [apiImageUrl1, setApiImageUrl1] = useState(null); // To store the processed image URL
  const [loading1, setLoading1] = useState(false); // For API request status

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
      <div className="container text-middle pt-5">
        <div className="row">
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
        <div className="row mt-4">
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
      </div>
    </>
  );
}

export default AIComponent;
