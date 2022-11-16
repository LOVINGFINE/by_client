import request from "@/config/request";
import { CategoryRecord, TemplateListItem } from "../components/Template/type";

export function getSheetTemplates(search: string) {
  return request<{
    hot: TemplateListItem[];
    categories: CategoryRecord[];
  }>({
    method: "get",
    url: `/sheet/templates?search=${search}`,
  });
}
