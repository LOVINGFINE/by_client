import { getOs } from "./lib/os";
export * from "./lib/type";

export default {
  os: getOs(),
};
