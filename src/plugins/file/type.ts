export enum FileType {
  Txt = "Txt",
  Image = "Image",
  PDF = "Pdf",
  Excel = "Excel",
  Ppt = "Ppt",
  Video = "Video",
  Word = "Word",
  Zip = "Zip",
  Audio = "Audio",
  Unknown = "Unknown",
}

export type FileSize = {
  value: string | number;
  unit: string;
};

export interface FileInfo {
  url?: string;
  type: FileType;
  filename: string;
  mimeType: string;
  size: FileSize;
}

export type FileTypeProp = {
  [k in FileType]: {
    label: string;
    types: string[];
  };
};
