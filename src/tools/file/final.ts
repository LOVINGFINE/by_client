import { FileTypeProp } from "./type";

export const file_types: FileTypeProp = {
  Image: {
    label: "图片格式",
    types: [
      "image/gif",
      "image/jpeg",
      "image/png",
      "image/tiff",
      "image/vnd.wap.wbmp",
      "image/x-icon",
      "image/x-jng",
      "image/x-ms-bmp",
      "image/svg+xml",
      "image/webp",
    ],
  },
  Excel: {
    label: "excel格式",
    types: ["application/vnd.ms-excel"],
  },
  Pdf: {
    label: "pdf格式",
    types: ["application/pdf"],
  },
  Ppt: {
    label: "ppt格式",
    types: ["application/vnd.ms-powerpoint"],
  },
  Word: {
    label: "word格式",
    types: [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
      "application/rtf",
    ],
  },
  Zip: {
    label: "压缩文件",
    types: ["application/zip", "application/x-rar-compressed"],
  },
  Video: {
    label: "视频文件",
    types: [
      "application/x-shockwave-flash",
      "video/3gpp",
      "video/mp4",
      "video/mpeg",
      "video/quicktime",
      "video/webm",
      "video/x-flv",
      "video/x-m4v",
      "video/x-ms-wmv",
      "video/x-msvideo",
    ],
  },
  Audio: {
    label: "音频文件",
    types: [
      "audio/mpeg",
      "audio/mpeg",
      "audio/ogg",
      "audio/x-m4a",
      "audio/x-realaudio",
    ],
  },
  Txt: {
    label: "文本文件",
    types: ["text/css", "text/html", "text/plain", "text/xml"],
  },
  Unknown: {
    label: "未知",
    types: [],
  },
};
