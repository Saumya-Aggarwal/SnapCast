"use client";
import { ICONS } from "@/constants";
import { useScreenRecording } from "@/lib/hooks/useScreenRecording";
import { duration } from "drizzle-orm/gel-core";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const RecordScreen = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const {
    recordedBlob,
    resetRecording,
    startRecording,
    stopRecording,
    isRecording,
    recordedVideoUrl,
    recordingDuration,
  } = useScreenRecording();

  const closeModal = () => {
    resetRecording();
    setIsOpen(false);
  };

  const handleStartRecording = async () => {
    await startRecording();
  };

  const handleRecordAgain = async () => {
    resetRecording();
    await startRecording();

    if (videoRef.current && recordedVideoUrl) {
      videoRef.current.src = recordedVideoUrl;
    }
  };  const goToUpload = () => {
    if (!recordedBlob) return;
    const url = URL.createObjectURL(recordedBlob);
    // Ensure duration is never zero or null
    const validDuration = recordingDuration && recordingDuration > 0 ? recordingDuration : 60; // Default to 1 minute if no duration
    sessionStorage.setItem(
      "recordedVideo",
      JSON.stringify({
        url,
        name: "screen-recording.webm",
        type: recordedBlob.type,
        size: recordedBlob.size,
        duration: validDuration,
      })
    );
    router.push("/upload");
    closeModal();
  };
  return (
    <>
      <div className="record">
        <button className="primary-btn" onClick={() => setIsOpen(true)}>
          <Image src={ICONS.record} alt="record" width={16} height={16} />
          <span>Record a video</span>
        </button>

        {isOpen && (
          <section className="dialog">
            <div className="overlay-record" onClick={closeModal}></div>
            <div className="dialog-content">
              <figure>
                <h3>Screen Recording</h3>
                <button onClick={closeModal} className="close-btn">
                  <Image src={ICONS.close} alt="close" width={22} height={22} />
                </button>
              </figure>

              <section>
                {isRecording ? (
                  <article>
                    <div />
                    <span>Recording Progress</span>
                  </article>
                ) : recordedVideoUrl ? (
                  <video src={recordedVideoUrl} ref={videoRef} controls></video>
                ) : (
                  <p>Click record to start capturing your Screen</p>
                )}
              </section>

              <div className="record-box">
                {!isRecording && !recordedVideoUrl && (
                  <button
                    onClick={handleStartRecording}
                    className="record-start"
                  >
                    <Image
                      src={ICONS.record}
                      alt="record"
                      height={18}
                      width={18}
                    ></Image>
                    Record
                  </button>
                )}

                {isRecording && (
                  <button onClick={stopRecording} className="record-stop">
                    <Image
                      src={ICONS.record}
                      alt="stop"
                      height={18}
                      width={18}
                    ></Image>
                    Stop Recording
                  </button>
                )}

                {recordedVideoUrl && (
                  <>
                    <button
                      onClick={handleRecordAgain}
                      className="record-again"
                    >
                      Record Again
                    </button>
                    <button onClick={goToUpload} className="record-upload">
                      <Image
                        src={ICONS.upload}
                        alt="upload"
                        height={17}
                        width={17}
                      ></Image>
                      Continue to Upload
                    </button>
                  </>
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default RecordScreen;
