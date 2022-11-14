import { file_types } from "../final";
import { FileSize, FileType } from "../type";
import { FileInfo } from "../type";

export function bytesToStringUnit(size: number): FileSize {
  const byte = 1024; //byte
  const target = {
    value: "",
    unit: "",
  };
  if (size < byte) {
    target["value"] = `${size}`;
    target["unit"] = "B";
  } else if (size < Math.pow(byte, 2)) {
    target["value"] = `${Math.round((size / byte) * 100) / 100}`;
    target["unit"] = "KB";
  } else if (size < Math.pow(byte, 3)) {
    target["value"] = `${Math.round((size / Math.pow(byte, 2)) * 100) / 100}`;
    target["unit"] = "MB";
  } else if (size < Math.pow(byte, 4)) {
    target["value"] = `${Math.round((size / Math.pow(byte, 3)) * 100) / 100}`;
    target["unit"] = "GB";
  } else {
    target["value"] = `${Math.round((size / Math.pow(byte, 4)) * 100) / 100}`;
    target["unit"] = "TB";
  }
  return target;
}

/**
 * 获取文件类型
 * @param type file mime type
 * @returns FileType
 */
export const getFileType = (mimeType: string): FileType => {
  let target = FileType.Unknown;
  for (const key in file_types) {
    const item = file_types[key as FileType];
    if (item.types && item?.types.includes(mimeType || "")) {
      target = key as FileType;
    }
  }
  return target;
};

/**
 * 获取文件info信息
 * @param type file mime type
 * @returns FileInfo
 */
export const readFileInfo = (file: File | FileInfo, url?: string): FileInfo => {
  if (file instanceof File) {
    return {
      url: url || "",
      filename: file.name,
      type: getFileType(file.type),
      mimeType: file.type,
      size: bytesToStringUnit(file.size),
    };
  } else {
    return file;
  }
};

/**
 * 读取文件数据
 * @param file: File
 * @returns callback
 */
export function readFileBinaryProgress(
  file: File,
  end: (err: boolean, res: string) => void,
  progress?: (t: number, l?: number, p?: number) => void
) {
  const reader = new FileReader();
  reader.addEventListener("load", (event) => {
    const result = event?.target?.result as string;
    if (result) {
      end(false, result);
    } else {
      end(false, "");
    }
  });
  reader.addEventListener("progress", (event) => {
    if (event.loaded && event.total && progress) {
      const percent = (event.loaded / event.total) * 100;
      progress(event.total, event.loaded, percent);
    }
  });
  reader.readAsDataURL(file);
}

/**
 * 上传文件
 * @param options { accept?: string; multiple?: boolean; }
 * @returns Promise<File[] | File>
 */
export function uploadFile(
  callback: (e: File[] | File) => void,
  options?: {
    accept?: string;
    multiple?: boolean;
  }
) {
  try {
    const { accept, multiple = false } = options || {};
    const input = document.createElement("input");
    input.type = "file";
    if (accept) {
      input.accept = accept;
    }
    input.multiple = multiple;
    input.addEventListener("change", (e: Event) => {
      const { files = [] } = e.target as unknown as { files: File[] };
      if (files && files[0]) {
        if (options && options.multiple !== undefined) {
          callback(files);
        } else {
          callback(files[0]);
        }
      }
    });
    input.click();
  } catch (e) {}
}

/**
 * 下载文件
 * @param payload { url: string; filename: boolean; }
 * @returns Promise<void>
 */
export async function onFileDownload(payload: {
  url: string;
  filename: string;
}): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const { url, filename } = payload;
      fetch(url, {
        method: "get",
      })
        .then((response) => response.blob())
        .then((data) => {
          const downloadUrl = window.URL.createObjectURL(new Blob([data]));
          const a = document.createElement("a");
          a.href = downloadUrl;
          a.download = filename;
          a.click();
          resolve();
        });
    } catch (e) {
      reject(e);
    }
  });
}
