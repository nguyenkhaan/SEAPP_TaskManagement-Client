import React from "react";
import ReactDOM from "react-dom";
import { useRef, useEffect, useState } from "react";
interface IHook {
  taskImage: any;
  setTaskImage: any;
  previewTaskImage: any;
  setPreviewTaskImage: any;
}

interface IObj {
  hooks: IHook;
}

function ImageUpload({ hooks }: IObj) {
  const { taskImage, setTaskImage, previewTaskImage, setPreviewTaskImage } =
    hooks;
  const [props, setProps] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length == 0) {
      setTaskImage(null);
      return;
    }
    setTaskImage(e.target.files[0]);
  };

  useEffect(() => {
    if (taskImage) {
      const url: string = URL.createObjectURL(taskImage);
      if (url) {
        if (!props) setProps(true); //Bat tinh nang len
        setPreviewTaskImage(url);
        return () => URL.revokeObjectURL(url); //Xoa hinh anhn cua di, tranh gay leak memory
      } else {
        alert("Lỗi hiển thị hình ảnh");
        return;
      }
    }
  }, [taskImage]);
  return previewTaskImage ? (
    <div
      className={`bg-slate-100 font-medium text-lg cursor-pointer flex items-center justify-center rounded-xl md:w-[210px] md:h-[210px] w-38 h-38 mr-2 bg-cover bg-center bg-no-repeat`}
      onClick={handleClick}
      style={{
        backgroundImage: `url(${previewTaskImage})`,
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
        backgroundImage: `url(${previewTaskImage})`,
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
