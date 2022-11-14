export enum DataSourceType {
  array = "array",
  buffer = "buffer",
  binary = "binary",
  base64 = "base64",
}

export interface ReadOption {
  type: DataSourceType | "file";
}
