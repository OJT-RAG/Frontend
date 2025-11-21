// src/api/userApi.js
import httpClient from "./httpClient";

const userApi = {
  // Cập nhật user
  update: (data) => httpClient.post("/user/update", data),

  // Lấy thông tin user theo ID
  getById: (userId) => httpClient.get(`/user/${userId}`),
};

export default userApi;