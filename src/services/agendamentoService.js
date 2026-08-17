import api from "./api";

// =========================================================
// LISTAR AGENDAMENTOS DO PROFESSOR
// =========================================================

export async function getProfessorAgendamentos() {
  const response = await api.get(
    "/professor/agendamentos/"
  );

  return response.data;
}

// =========================================================
// CONFIRMAR AGENDAMENTO
// =========================================================

export async function confirmarAgendamento(id) {
  const response = await api.patch(
    `/agendamentos/${id}/confirmar/`
  );

  return response.data;
}

// =========================================================
// CONCLUIR AGENDAMENTO
// =========================================================

export async function concluirAgendamento(id) {
  const response = await api.patch(
    `/agendamentos/${id}/concluir/`
  );

  return response.data;
}

// =========================================================
// CANCELAR AGENDAMENTO
// =========================================================

export async function cancelarAgendamento(id) {
  const response = await api.patch(
    `/agendamentos/${id}/cancelar/`
  );

  return response.data;
}


// =========================================================
// MEUS AGENDAMENTOS DO ALUNO
// =========================================================

export async function getMeusAgendamentos() {
  const response = await api.get(
    "/me/agendamentos/"
  );

  return response.data;
}