"use server";

import { headers } from "next/headers";
import { auth } from "../auth";
import { apiFetch, getEnv, withErrorHandling } from "../utils";
import { BUNNY } from "@/constants";
import { videos } from "@/drizzle/schema";
import { db } from "@/drizzle/db";
import { revalidatePath } from "next/cache";

const VIDEO_STREAM_BASE_URL = BUNNY.STREAM_BASE_URL;
const THUMBNAIL_STORAGE_BASE_URL = BUNNY.STORAGE_BASE_URL;
const THUMBNAIL_CDN_URL = BUNNY.CDN_URL;
const BUNNY_LIBRARY_ID = getEnv("BUNNY_LIBRARY_ID");
const ACCESS_KEY = {
  streamAccessKey: getEnv("BUNNY_STREAM_ACCESS_KEY"),
  storageAccessKey: getEnv("BUNNY_STORAGE_ACCESS_KEY"),
};
//Helper function
const getSessionUserId = async (): Promise<string> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || !session.user) {
    throw new Error("User not authenticated");
  }
  return session.user.id;
};

const revalidatePaths = (paths: string[]) => {
  paths.forEach((path) => {
    revalidatePath(path);
  });
};

//server Actions
export const getVideoUploadUrl = withErrorHandling(async () => {
  const userId = await getSessionUserId();

  const videoResponse = await apiFetch<BunnyVideoResponse>(
    `${VIDEO_STREAM_BASE_URL}/${BUNNY_LIBRARY_ID}/videos`,
    {
      method: "POST",
      bunnyType: "stream",
      body: { title: "Temporary Video", collectionId: "" },
    }
  );

  const uploadURL = `${VIDEO_STREAM_BASE_URL}/${BUNNY_LIBRARY_ID}/videos/${videoResponse.guid}`;

  return {
    videoId: videoResponse.guid,
    uploadURL,
    accessKey: ACCESS_KEY.streamAccessKey,
  };
});

export const getThumbnailUploadUrl = withErrorHandling(
  async (videoId: string) => {
    const userId = await getSessionUserId();
    const fileName = `${Date.now()}-${videoId}-thumbnail`;
    const uploadURL = `${THUMBNAIL_STORAGE_BASE_URL}/thumbnails/${fileName}`;
    const cdnUrl = `${THUMBNAIL_CDN_URL}/thumbnails/${fileName}`;

    return {
      uploadURL,
      accessKey: ACCESS_KEY.storageAccessKey,
      cdnUrl,
    };
  }
);

export const saveVideoDetails = withErrorHandling(
  async (videoDetails: VideoDetails) => {
    const userId = await getSessionUserId();
    await apiFetch(
      `${VIDEO_STREAM_BASE_URL}/${BUNNY_LIBRARY_ID}/videos/${videoDetails.videoId}`,
      {
        method: "POST",
        bunnyType: "stream",
        body: {
          title: videoDetails.title,
          description: videoDetails.description,
          visibility: videoDetails.visibility,
        },
      }
    );

    await db.insert(videos).values({
      ...videoDetails,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
      videoUrl: `${BUNNY.EMBED_URL}/${BUNNY_LIBRARY_ID}/${videoDetails.videoId}`,
    });

    revalidatePaths(["/"]);
    return {
      videoId: videoDetails.videoId,
      message: "Video details saved successfully",
    };
  }
);
