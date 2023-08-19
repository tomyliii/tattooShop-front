import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function Thumbs(props) {
  return props.arrayOfImages.map((picture) => {
    return (
      <div key={`${picture.name}${picture.preview}`} className="thumb">
        <div>
          <div>
            <button
              type="button"
              onClick={(event) => props.handleOnClick(event, picture)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <img
              src={picture.preview}
              onLoad={() => {
                URL.revokeObjectURL(picture.preview);
              }}
            />
          </div>
        </div>
      </div>
    );
  });
}
