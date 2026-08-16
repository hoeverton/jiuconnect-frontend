import api from "./api";

export async function getMyDisponibilidades() {
  const response = await api.get(
    "disponibilidades/minhas/"
  );

  return response.data;
}

export async function createDisponibilidade(data) {
  const response = await api.post(
    "disponibilidades/create/",
    data
  );

  return response.data;
}

export async function updateDisponibilidade(id, data) {
  const response = await api.patch(
    `disponibilidades/minhas/${id}/`,
    data
  );

  return response.data;
}

export async function deleteDisponibilidade(id) {
  const response = await api.delete(
    `disponibilidades/minhas/${id}/`
  );

  return response.data;
}