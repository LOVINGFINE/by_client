export enum JsonType {
  number = "number",
  boolean = "boolean",
  string = "string",
  array = "array",
  object = "object",
}

export interface JsonItem {
  path: string;
  label: string;
  depth: number;
  value: unknown;
  type: JsonType;
  children?: JsonItem[];
}
