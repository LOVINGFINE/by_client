import { getOs } from "./lib/os";
export * from "./type";

export default {
  os: getOs(),
};
