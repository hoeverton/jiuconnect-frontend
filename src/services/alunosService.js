import api from "./api";

export async function getMeusAlunos() {
  const response = await api.get("/professor/alunos/");
  return response.data;
}

export async function getAlunoDetalhe(id) {
  const response = await api.get(`/professor/alunos/${id}/`);
  return response.data;
}