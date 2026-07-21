export type ProcessedImage = {
  originalUrl: string;
  processedUrl: string;
  publicId: string;
  width: number;
  height: number;
};

export type ProcessingStage = "uploading" | "removing" | "preparing";
