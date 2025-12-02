import React from "react";
import ReactDOM from "react-dom";
import { useRef, useEffect, useState } from "react";
interface IHook {
  image: any;
  setImage: any;
  previewImage: any;
  setPreviewImage: any;
}

interface IObj {
  hooks: IHook;
}

function ImageUpload({ hooks }: IObj) {
  const { image, setImage, previewImage, setPreviewImage } =
    hooks;
  const [props, setProps] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length == 0) {
      setImage(null);
      return;
    }
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    if (image) {
      const url: string = URL.createObjectURL(image);
      if (url) {
        if (!props) setProps(true); //Bat tinh nang len
        setPreviewImage(url);
        return () => URL.revokeObjectURL(url); //Xoa hinh anhn cua di, tranh gay leak memory
      } else {
        alert("Lỗi hiển thị hình ảnh");
        return;
      }
    }
  }, [image]);
  return previewImage ? (
    <div
      className={`bg-slate-100 font-medium text-lg cursor-pointer flex items-center justify-center rounded-xl w-[210px] h-[210px] mr-2 bg-cover bg-center bg-no-repeat grow-0`}
      onClick={handleClick}
      style={{
        backgroundImage: `url(${previewImage})`,
      }}
    >
      <input
        type="file"
        className="invisible w-0 h-0"
        ref={inputRef}
        onChange={(e) => handleChange(e)}
      />
    </div>
  ) : (
    <div
      className={`bg-slate-100 ${
        props ? "" : "border-4"
      } font-medium text-lg cursor-pointer border-dashed flex items-center justify-center ${
        props ? "" : "border-blue-300"
      } rounded-xl w-[210px] h-[210px] mr-2 bg-cover bg-center bg-no-repeat`}
      onClick={handleClick}
      style={{
        backgroundImage: `url(${previewImage})`,
      }}
    >
      {props || <span className="m-auto text-base md:text-lg">Click here to upload</span>}
      <input
        type="file"
        className="invisible w-0 h-0"
        ref={inputRef}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
}
export default ImageUpload;
