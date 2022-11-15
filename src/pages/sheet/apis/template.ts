import request from "@/config/request";
import {
  CategoryRecord,
  TemplateListItem,
} from "../components/Template/type";

export function getSheetTemplates() {
  return request<{
    hot: TemplateListItem[];
    categories: CategoryRecord[];
  }>({
    method: "get",
    url: `/sheet/templates`,
  });
}
