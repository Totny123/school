import request from "@/utils/request";

export function repair(data) {
  return request({
    url: "/repair",
    method: "post",
    data,
  });
}

export function getList(params) {
  return request({
    url: "/repair",
    method: "get",
    params,
  });
}
