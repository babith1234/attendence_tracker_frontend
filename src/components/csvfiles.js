import { storage } from "../firebase/firebaseConfig";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import csvImage from "../images/csv.png";
import Navbar from "./navbar";

function Cvfiles() {
  const params = useParams();
  const sec = params.sec;
  const sub = params.sub;
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const folderRef = ref(storage, `csv/${sub}/${sec}`);

    listAll(folderRef)
      .then(function (result) {
        Promise.all(result.items.map((itemRef) => getDownloadURL(itemRef)))
          .then((downloadURLs) => {
            setUrls(downloadURLs);
            setLoading(false);
          })
          .catch(function (error) {
            console.error("Error getting download URLs:", error);
            setLoading(false);
          });
      })
      .catch(function (error) {
        console.error("Error listing files:", error);
        setLoading(false);
      });
  }, [sec, sub]);

  return (
    <>
      <Navbar />
      <h1 className="text-3xl text-center dark:text-slate-400 font-bold mb-4">
        Attendance Sheet for {sub} - {sec}
      </h1>
      <div className="flex min-h-screen justify-center flex-wrap">
        {loading ? (
          <div className="flex mt-10 ">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            <span className="ml-3 text-teal-500">Loading...</span>
          </div>
        ) : (
          <div className="flex min-h-screen justify-center flex-wrap">
            {urls.length === 0 ? (
              <p className="text-center text-gray-500">
                No Attendance sheet found for {sub} - {sec}
              </p>
            ) : (
              urls.map((url, index) => (
                <div key={index} className="m-5">
                  <a href={url} download className="flex flex-col items-center">
                    <img src={csvImage} alt="CSV" className="w-20 h-20 mb-2" />
                    <span className="dark:text-white">
                      {new Date().toLocaleDateString()}
                    </span>
                  </a>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Cvfiles;
