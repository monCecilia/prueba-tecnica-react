import React from "react";

const Photo = (props) => {
  return <img className="estilo-foto" src={props.photo} onClick={props.delete} alt="thumbnail" />;
};
export default Photo;
