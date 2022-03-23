import request from "@/utils/request";

export function getStu(params) {
  return request({
    url: "/student",
    method: "get",
    params,
  });
}

export function delStu(id) {
  return request({
    url: "/student/del",
    method: "post",
    data: { id },
  });
}

export function editStu(data) {
  return request({
    url: "/student/edit",
    method: "post",
    data,
  });
}

export function addStu(data) {
  return request({
    url: "/student/add",
    method: "post",
    data,
  });
}

export function stuIn(data) {
  return request({
    url: "student/stuIn",
    method: "post",
    data,
  });
}

export function stuOut(data) {
  return request({
    url: "student/stuOut",
    method: "post",
    data,
  });
}
