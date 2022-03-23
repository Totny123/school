import request from "@/utils/request";

export function getList(query) {
  return request({
    method: "get",
    url: "dormitory",
    params: query,
  });
}

export function del(id) {
  return request({
    method: "post",
    url: "dormitory/del",
    data: { id },
  });
}

export function add(data) {
  return request({
    url: "dormitory/add",
    method: "post",
    data,
  });
}

export function edit(data) {
  console.log(data);
  return request({
    method: "post",
    url: "/dormitory/edit",
    data,
  });
}
