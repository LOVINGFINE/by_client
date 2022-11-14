import request from "@/config/request";
import { TemplateListItem } from "../components/Template/type";

export function getSheetTemplates() {
  return request<TemplateListItem[]>({
    method: "get",
    url: `/sheet/templates`,
  });
}
