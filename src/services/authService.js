import api from "./api";

export async function getCurrentUser() {
  const response = await api.get("users/me/");
  return response.data;
}

export async function updateUser(data) {
  const response = await api.put("users/me/", data);
  return response.data;
}



