import Image from "next/image";
import React from "react";

const FileInput = ({
  onChange,
  onReset,
  previewUrl,
  type,
  id,
  label,
  accept,
  file,
  inputRef,
}: FileInputProps) => {
  return (
    <section className="file-input">
      <label htmlFor={id}>{label}</label>
      <input
        type="file"
        id={id}
        accept={accept}
        ref={inputRef}
        hidden
        onChange={onChange}
      />

      {!previewUrl ? (
        <figure
          onClick={() => {
            inputRef.current?.click();
          }}
        >
          <Image
            src={"/assets/icons/upload.svg"}
            alt="upload"
            width={24}
            height={24}
          ></Image>
          <p>Click to Upload your {id}</p>
        </figure>
      ) : (
        <div>
          {type === "video" ? (
            <video src={previewUrl} controls></video>
          ) : (
            <Image src={previewUrl} alt="Image" fill></Image>
          )}

          <button type="button" onClick={onReset}>
            <Image
              src={"/assets/icons/close.svg"}
              alt="close"
              width={16}
              height={16}
            ></Image>
          </button>
          <p>{file?.name}</p>
        </div>
      )}
    </section>
  );
};

export default FileInput;
