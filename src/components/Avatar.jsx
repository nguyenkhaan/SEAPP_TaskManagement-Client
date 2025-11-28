import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

function Avatar({
  width = 86,
  height = 86,
  name = "Alexxxxxxxxxxxxxxxxxxxxxxxxxxx",
  email = "nguyenalex@gmail.comxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx sdfxxxxxxxxxxxx",
  style = {}
}) {
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const inp = useRef();

  const handleAvatarClick = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setAvatar(null);
      return;
    }
    setAvatar(e.target.files[0]);
  };

  useEffect(() => {
    if (avatar) {
      const objectURL = URL.createObjectURL(avatar);
      setPreview(objectURL);
      return () => URL.revokeObjectURL(objectURL);
    }
  }, [avatar]);

  const handleClick = () => {
    inp.current.click();
  };

  // ===== NEW =====
  const stop = (e) => e.stopPropagation();

  return (
    <div className="inline-flex flex-col justify-start items-center">
      <div
        className={`relative bg-center bg-cover bg-no-repeat bg-black rounded-full cursor-pointer border border-gray-600`}
        style={{
          backgroundImage: `url(${preview})`,
          width,
          height,
        }}
        onClick={handleClick}
      >
        <input
          className="w-full block h-full invisible my-avatar"
          onChange={handleAvatarClick}
          type="file"
          ref={inp}
        />

      </div>
      <div
        className="top-full cursor-text w-[173px] text-base font-semibold"
        onClick={stop}
        style={{...style}}
      >
        <span className="text-center w-[173px] line-clamp-2 wrap-break-word overflow-hidden font-[Montserrat]">
          {name}
        </span>
        <span className="text-center font-normal wrap-break-word text-[14px] line-clamp-2">
          {email}
        </span>
      </div>
    </div>
  );
}

export default Avatar;
