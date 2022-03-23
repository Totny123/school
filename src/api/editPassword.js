import request from "@/utils/request";

export function editPassword(data) {
  return request({
    url: "user/editPassword",
    method: "post",
    data,
  });
}
