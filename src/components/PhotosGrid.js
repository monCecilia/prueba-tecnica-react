import React, { useState, useEffect, Fragment } from "react";
import Photo from "./Photo";
import LazyLoad from "react-lazyload";

const REQ_STATUS = {
  INITIAL: "INITIAL",
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

const PhotosGrid = () => {
  const [photos, setPhotos] = useState([]);
  const [fetchStatus, setFetchStatus] = useState(REQ_STATUS.INITIAL);

  useEffect(() => {
    setFetchStatus(REQ_STATUS.LOADING);
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((res) => res.json())
      .then((photos) => {
        setPhotos(photos);
        setFetchStatus(REQ_STATUS.SUCCESS);
      })
      .catch((e) => {
        setFetchStatus(REQ_STATUS.FAILURE);
        console.error(e);
      });
  }, []);
  const deleteFunction = (id) => {
    const arrFiltered = photos.filter((photo) => photo.id !== id);
    setPhotos(arrFiltered);
  };

  return (
    <div>
      {fetchStatus === REQ_STATUS.INITIAL ||
      fetchStatus === REQ_STATUS.LOADING ? (
        "loading..."
      ) : fetchStatus === REQ_STATUS.SUCCESS ? (
        <div className="grilla">
          {photos.map((photo) => (
            <div className="img-container">
              <LazyLoad height={200} continuous lazy load>
                <Photo key={photo.id} photo={photo.thumbnailUrl} delete={() => deleteFunction(photo.id)} />
              </LazyLoad>
            </div>
          ))}
        </div>
      ) : (
        "Ha habido un error con tu petición"
      )}
    </div>
  );
};
export default PhotosGrid;
