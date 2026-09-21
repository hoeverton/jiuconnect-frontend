import api from "./api";

export async function getCurrentUser() {
  const response = await api.get("users/me/");

  return response.data;
}

export async function updateUser(data) {
  const response = await api.put(
    "users/me/",
    data
  );

  return response.data;
}

export async function updateUserPhoto(file) {
  const formData = new FormData();

  formData.append("foto", file);

  const response = await api.patch(
    "users/me/",
    formData
  );

  return response.data;
}