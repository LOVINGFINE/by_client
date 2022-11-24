import request from "@/config/request";
import { CategoryRecord, TemplateListItem } from "../components/Template/type";

export function getSheetTemplates(search: string, hotLimit = 3) {
  return request<{
    hot: TemplateListItem[];
    categories: CategoryRecord[];
  }>({
    method: "get",
    url: `/sheet/templates`,
    params: {
      search,
      hotLimit,
    },
  });
}
