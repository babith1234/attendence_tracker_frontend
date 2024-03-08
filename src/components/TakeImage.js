import { storage } from "../firebase/firebaseConfig";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import React from "react";
import Select from "react-select";
import { useState, useRef, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import axios from "axios";

function TakeImage() {
  const facultyOptions = [
    { value: "DBMS", label: "DBMS" },
    { value: "CN", label: "CN" },
    { value: "OOPS", label: "OOPS" },
    { value: "OS", label: "OS" },
    { value: "DSA", label: "DSA" },
    { value: "AIML", label: "AIML" },
    { value: "DM", label: "DM" },
  ];

  const ClassOptions = [
    { value: "3A", label: " 3A" },
    { value: "3B", label: " 3B" },
    { value: "3C", label: " 3C" },
    { value: "5A", label: " 5A" },
    { value: "5B", label: " 5B" },
    { value: "5C", label: " 5C" },
  ];

  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [flag, setFlag] = useState(false);
  const [submitButton, setSubmitButton] = useState(false);
  let rawImageData;

  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    console.log(imgSrc);
  }, [imgSrc]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      videoRef.current.srcObject = stream;
      setFlag(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
      setFlag(false);
    }
  };

  const captureImage = () => {
    setFlag(false);
    setSubmitButton(true);
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0);

    const dataUrl = canvas.toDataURL("image/jpeg");
    setImgSrc(dataUrl);
    console.log(imgSrc);
  };

  const decodeImage = () => {
    const base64ImageData = imgSrc.split(",")[1];
    const binaryImageData = atob(base64ImageData);

    // Convert the binary data to a Uint8Array
    const uint8ArrayImageData = new Uint8Array(binaryImageData.length);
    for (let i = 0; i < binaryImageData.length; i++) {
      uint8ArrayImageData[i] = binaryImageData.charCodeAt(i);
    }

    console.log(uint8ArrayImageData);

    uploadImageToStorage(uint8ArrayImageData);
  };

  const uploadImageToStorage = (rawImageData) => {
    try {
      // Get the current date to use as the image name
      const currentDate = new Date().toISOString();
      const filePath = `pictures/${selectedFaculty.value}/${selectedClass.value}/${currentDate}.jpeg`;

      // Specify content type when uploading image
      const metadata = {
        contentType: "image/jpeg", // or 'image/jpeg' depending on the image format
      };

      // Create a reference to the storage location

      const storageRef = ref(storage, filePath);

      uploadBytes(storageRef, rawImageData, metadata).then((snapshot) => {
        toast.success("Image Uploaded successfully");
        setSubmitButton(false);

        setTimeout(async () => {
          // Inside the setTimeout, directly make the axios.post() call
          await axios
            .post("http://127.0.0.1:3002/display_image", {
              image_url: `pictures/${selectedFaculty.value}/${selectedClass.value}/${currentDate  }.jpeg`,
            })
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
        }, 5000);
      });
    } catch (error) {
      console.error("Error uploading image", error);
      toast.error(
        "Error uploading image. Please choose Subject and class before capturing image",
        {
          style: {
            borderRadius: "10px",
            background: "#232A3C",
            color: "#fff",
          },
        }
      );
      setSubmitButton(false);
    }
  };

  const handlecsv = () => {
    if (selectedClass && selectedFaculty) {
      navigate(`/csv/${selectedFaculty.value}/${selectedClass.value}`);
    } else {
      toast("Choose a class and subject!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex">
        <Select
          options={facultyOptions}
          placeholder="Select Subject..."
          isSearchable
          value={selectedFaculty}
          onChange={setSelectedFaculty}
          className="custom-select w-6/12 m-5 border border-blue-500 rounded"
        />

        <Select
          options={ClassOptions}
          placeholder="Select Class..."
          isSearchable
          value={selectedClass}
          onChange={setSelectedClass}
          className="custom-select w-6/12 m-5 border border-blue-500 rounded"
        />
      </div>
      <div className="flex col gap-4 justify-center">
        {!flag && !submitButton && (
          <button
            className="p-5 bg-green-400 rounded-3xl mb-4 md:h-20"
            onClick={startCamera}
          >
            Take picture
          </button>
        )}

        <center>
          <button
            className="p-5 bg-green-400 rounded-3xl mb-4 md:h-20"
            onClick={handlecsv}
          >
            View sheets
          </button>
        </center>
      </div>
      <div className="md:flex md:gap-5 col justify-center">
        {imgSrc && submitButton && <img src={imgSrc} alt="Captured" />}
        {!imgSrc && <video ref={videoRef} autoPlay />}

        {flag && (
          <center>
            <button
              className="p-5 bg-green-400 rounded-3xl mt-5 md:mt-40 md:h-20"
              onClick={captureImage}
            >
              Capture picture
            </button>
          </center>
        )}

        {submitButton && (
          <center>
            <button
              className="p-5 bg-green-400 rounded-3xl mt-5 md:h-20"
              onClick={decodeImage}
            >
              Submit picture
            </button>
          </center>
        )}
      </div>
    </div>
  );
}

export default TakeImage;
