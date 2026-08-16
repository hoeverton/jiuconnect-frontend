import api from "./api";

export async function getMyProfessorProfile() {
  const response = await api.get("professores/me/");

  return response.data;
}

export async function updateProfessorProfile(data) {
  const response = await api.put(
    "professores/update/",
    data
  );

  return response.data;
}

export async function updateProfessorPhoto(file) {
  const formData = new FormData();

  formData.append("foto", file);

  const response = await api.patch(
    "professores/update/",
    formData
  );

  return response.data;
}