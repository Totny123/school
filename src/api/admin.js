import request from "@/utils/request";

export function getInfo(params) {
  return request({
    url: "/admin",
    method: "get",
    params,
  });
}

export function delAdmin(id) {
  return request({
    url: "/admin",
    method: "post",
    params: { id },
  });
}

export function editAdmin(data) {
  return request({
    url: "/admin/edit",
    method: "post",
    data,
  });
}

export function addAdmin(data) {
  return request({
    url: "/admin/add",
    method: "post",
    data,
  });
}
