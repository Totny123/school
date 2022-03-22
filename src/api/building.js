import request from "@/utils/request";

export function getList(query) {
  return request({
    method: "get",
    url: "building",
    params: query,
  });
}

export function del(id) {
  return request({
    method: "post",
    url: "building/del",
    data: { id },
  });
}

export function add(data) {
  return request({
    url: "building/add",
    method: "post",
    data,
  });
}

export function edit(data) {
  console.log(data);
  return request({
    method: "post",
    url: "/building/edit",
    data,
  });
}
