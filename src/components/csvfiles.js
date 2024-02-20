import { storage } from "../firebase/firebaseConfig";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import csvImage from "../images/csv.png";

function Cvfiles() {
  const params = useParams();
  const sec = params.sec;
  const sub = params.sub;
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const folderRef = ref(storage, `csv/${sub}/${sec}`);

    listAll(folderRef)
      .then(function (result) {
        Promise.all(result.items.map((itemRef) => getDownloadURL(itemRef)))
          .then((downloadURLs) => {
            setUrls(downloadURLs);
          })
          .catch(function (error) {
            console.error("Error getting download URLs:", error);
          });
      })
      .catch(function (error) {
        console.error("Error listing files:", error);
      });
  }, [sec, sub]);

  return (
    <div className="flex justify-center flex-wrap">
      {urls.map((url, index) => (
        <div key={index} className="m-5">
          <a href={url} download className="flex flex-col items-center">
            <img src={csvImage} alt="CSV" className="w-20 h-20 mb-2" />
            <span>{new Date().toLocaleDateString()}</span>
          </a>
        </div>
      ))}
    </div>
  );
}

export default Cvfiles;
