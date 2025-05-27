"use client";
import FileInput from "@/components/FileInput";
import FormField from "@/components/FormField";
import { MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE } from "@/constants";
import {
  getThumbnailUploadUrl,
  getVideoUploadUrl,
  saveVideoDetails,
} from "@/lib/actions/video";
import { useFileInput } from "@/lib/hooks/useFileInput";
import { set } from "better-auth";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

const uploadFileToBunny = async (
  file: File,
  uploadURL: string,
  accessKey: string
): Promise<void> => {
  return fetch(uploadURL, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
      AccessKey: accessKey,
    },
    body: file,
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to upload file: ${response.statusText}`);
    }
  });
};

const page = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    visibility: "public" as const,
  });
  const [videoDuration, setVideoDuration] = useState(0);
  const [error, setError] = useState("");
  const video = useFileInput(MAX_VIDEO_SIZE);
  const thumbnail = useFileInput(MAX_THUMBNAIL_SIZE);
  useEffect(() => {
    if (typeof video.duration === "number" && video.duration !== null) {
      setVideoDuration(video.duration);
    }
  }, [video.duration]);
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const checkForRecordedVideo = async () => {
      try {
        const stored = sessionStorage.getItem("recordedVideo");
        if (!stored) {
          return;
        }
        const { url, name, type, size, duration } = JSON.parse(stored);
        const blob = await fetch(url).then((res) => res.blob());
        const file = new File([blob], name, { type, lastModified: Date.now() });

        if (video.inputRef.current) {
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);
          video.inputRef.current.files = dataTransfer.files;

          const event = new Event("change", {
            bubbles: true,
          });

          video.inputRef.current.dispatchEvent(event);
          video.handleFileChange({
            target: video.inputRef.current,
          } as ChangeEvent<HTMLInputElement>);
        }        // Make sure duration is properly set and never zero
        if (duration && duration > 0) {
          setVideoDuration(duration);
        } else {
          // Set a default duration if none provided (1 minute = 60 seconds)
          setVideoDuration(60);
        }
        sessionStorage.removeItem("recordedVideo");
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error checking for recorded video:", error);
      }
    };
    checkForRecordedVideo();
  }, [video]);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (!video.file || !thumbnail.file) {
        setError("Please Upload both video and Thumbnail.");
        return;
      }
      if (!formData.title || !formData.description) {
        setError("Please Enter a Title and Description.");
        return;
      }
      //upload video to bunny
      const {
        videoId,
        uploadURL: videoUploadUrl,
        accessKey: videoAccessKey,
      } = await getVideoUploadUrl();
      if (!videoId || !videoUploadUrl || !videoAccessKey) {
        throw new Error("Failed to get video upload URL.");
      }

      await uploadFileToBunny(video.file, videoUploadUrl, videoAccessKey);

      //upload thumbnail to bunny
      const {
        uploadURL: thumbnailUploadUrl,
        accessKey: thumbnailAccessKey,
        cdnUrl: thumbnailCdnUrl,
      } = await getThumbnailUploadUrl(videoId);
      if (!thumbnailUploadUrl || !thumbnailAccessKey || !thumbnailCdnUrl) {
        throw new Error("Failed to get thumbnail upload URL.");
      }
      await uploadFileToBunny(
        thumbnail.file,
        thumbnailUploadUrl,
        thumbnailAccessKey
      );

      //Save video Details in DB
      await saveVideoDetails({
        videoId,
        thumbnailUrl: thumbnailCdnUrl,
        ...formData,
        duration: videoDuration,
      });

      router.push("/");
    } catch (error) {
      console.log("error submitting", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="wrapper-md upload-page">
      <h1>Upload a Video</h1>
      {error && <div className="error-field">{error}</div>}
      <form
        onSubmit={handleSubmit}
        className="rounded-20 shadow-10 gap-6 w-full flex-col px-5 py-7.5"
      >
        <FormField
          id="title"
          label="Title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Enter a clear and concise video title "
        />
        <FormField
          id="description"
          label="Description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Describe what is this about"
          as="textarea"
        />

        <FileInput
          id="video"
          label="Video"
          accept="video/*"
          file={video.file}
          previewUrl={video.previewUrl}
          inputRef={video.inputRef}
          onChange={video.handleFileChange}
          onReset={video.resetFile}
          type="video"
        />
        <FileInput
          id="thumbnail"
          label="Thumbnail"
          accept="image/*"
          file={thumbnail.file}
          previewUrl={thumbnail.previewUrl}
          inputRef={thumbnail.inputRef}
          onChange={thumbnail.handleFileChange}
          onReset={thumbnail.resetFile}
          type="image"
        />
        <FormField
          id="visibility"
          label="Visibility"
          value={formData.visibility}
          as="select"
          options={[
            {
              value: "public",
              label: "Public",
            },
            { value: "private", label: "Private" },
          ]}
          onChange={handleInputChange}
          placeholder="Enter a clear and concise video title "
        />
        <button type="submit" disabled={isSubmitting} className="submit-button">
          {isSubmitting ? "Uploading..." : "Upload Video"}
        </button>
      </form>
    </div>
  );
};

export default page;
