/* eslint-disable */ 
import React, { useState, useEffect } from "react";
import axios from "axios";
import AvatarEditor from "react-avatar-editor";
import Dropzone from "react-dropzone";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import Loading from "../Components/Loading";

function AIComponent() {
  const [image, setImage] = useState("https://static.thenounproject.com/png/562976-200.png");
  const [scale, setScale] = useState(1);
  const [image_url, setImageUrl] = useState("");
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });
  const [file, setFile] = useState(null);
  const [usageCount, setUsageCount] = useState(0);

  useEffect(() => {
    const savedCount = localStorage.getItem("usageCount");
    if (savedCount) {
      setUsageCount(Number(savedCount));
    }
  }, []);

  const handleDrop = (dropped) => {
    setImage(URL.createObjectURL(dropped[0])); // Display the image locally
    setFile(dropped[0]);
  };

  const handlePositionChange = (position) => {
    setPosition(position);
  };

  const handleScaleChange = (event) => {
    setScale(parseFloat(event.target.value));
  };

  const [loading, setLoading] = useState(false);
  const transferStyle = () => {
    if (usageCount < 2) {
      if (image_url === "") {
        const formData = new FormData();
        formData.append("device_id", "0304");
        formData.append("platform", "android");
        formData.append("image", file);
        formData.append("slug", "new-profile-picture");
        setLoading(true);
        axios
          .post(
            "https://toonappbackend.trungthanhzone.com/api/effect",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((res) => {
            if (res.data.status === true) {
              setImageUrl(res.data.url); // Set the transformed image URL
              const newCount = usageCount + 1;
              setUsageCount(newCount);
              localStorage.setItem("usageCount", newCount);
              setLoading(false)
            }
          });
      }
    } else {
      alert("You have already used this feature 2 times.");
    }
  };

  return (
    <div
      style={{
        // background: `url('https://static.vecteezy.com/system/resources/previews/004/968/002/non_2x/cute-abstract-modern-background-free-vector.jpg') no-repeat center fixed`,
        backgroundSize: "cover",
        width:'100%',
        height: "100vh",
      }}
      className="d-flex align-items-center justify-content-center min-vh-100"
    >
        {loading &&(
        <Loading/>
        )}
      <div className="container card shadow p-5">
        <div className="row">
          <div className="col-md-5 round">
            <Dropzone onDrop={handleDrop} noKeyboard>
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps()}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    border: "1px solid white",
                  }}
                >
                  <AvatarEditor
                    image={image}
                    className="w-90 h-100 border-light"
                    scale={scale}
                    position={position}
                    onPositionChange={handlePositionChange}
                    style={{ border: "2px solid #f8f9fa" }} // Light border directly applied
                  />
                </div>
              )}
            </Dropzone>
          </div>
          <div className="col-md d-flex align-items-center justify-content-center">
            <div className="row text-center">
            <button
  className="btn btn-primary mt-3"
  onClick={transferStyle}
  disabled={loading || usageCount >= 2}
>
  Magic Image
</button>
            </div>
          </div>
          <div className="col-md-5 d-flex justify-content-center align-items-center mt-3">
            {image_url && image ? (
              <ReactCompareSlider
                style={{ height: "460px" }}
                itemOne={
                  <ReactCompareSliderImage src={image} alt="Original Image" />
                }
                itemTwo={
                  <ReactCompareSliderImage
                    src={image_url}
                    alt="Transformed Image"
                  />
                }
              />
            ) : (
              <img
                src="https://pixlr.com/images/generator/text-to-image.webp"
                alt="Circular Display"
                style={{
                  width: "100%",
                  maxWidth: "auto",
                  height: "400px",
                  borderRadius: "50%",
                }}
              />
            )}
          </div>
        </div>
        <div className="row mt-3 text-center">
            <h4>Vui lòng kéo thả hình vào ô bên trái</h4>
        </div>
      </div>
    </div>
  );
}

export default AIComponent;
