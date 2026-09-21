import api from "./api";

export async function getTrilhas() {
  const response = await api.get("/trilhas/");
  return response.data;
}

export async function getTrilhaDetalhe(id) {
  const response = await api.get(`/trilhas/${id}/`);
  return response.data;
}

export async function criarTrilha(dados) {
  const response = await api.post("/trilhas/create/", dados);
  return response.data;
}

export async function criarTecnica(dados) {
  const response = await api.post("/tecnicas/create/", dados);
  return response.data;
}

export async function getProgressoAluno(alunoId) {
  const response = await api.get(
    `/professor/alunos/${alunoId}/progresso/`
  );

  return response.data;
}

export async function marcarTecnicaAprendida(
  alunoId,
  tecnicaId,
  aprendido
) {
  const response = await api.post(
    `/professor/alunos/${alunoId}/progresso/`,
    {
      tecnica: tecnicaId,
      aprendido: aprendido,
    }
  );

  return response.data;
}

export async function atualizarTecnicaAprendida(
  alunoId,
  tecnicaId,
  aprendido
) {
  const response = await api.patch(
    `/professor/alunos/${alunoId}/progresso/${tecnicaId}/`,
    {
      aprendido: aprendido,
    }
  );

  return response.data;
}

export async function atualizarTecnica(id, dados) {
  const response = await api.patch(
    `/tecnicas/${id}/`,
    dados
  );

  return response.data;
}


export async function excluirTecnica(id) {
  await api.delete(
    `/tecnicas/${id}/`
  );
}


export async function desativarTecnica(id) {
  const response = await api.patch(
    `/tecnicas/${id}/`,
    {
      ativa: false,
    }
  );

  return response.data;
}

export async function getCategorias(trilhaId) {
  const response = await api.get(
    `/trilhas/${trilhaId}/categorias/`
  );

  return response.data;
}


export async function criarCategoria(trilhaId, dados) {
  const response = await api.post(
    `/trilhas/${trilhaId}/categorias/`,
    dados
  );

  return response.data;
}

export async function atualizarTrilha(id, dados) {
  const response = await api.patch(
    `/trilhas/${id}/`,
    dados
  );
  return response.data;
}

export async function desativarTrilha(id) {
  const response = await api.patch(
    `/trilhas/${id}/desativar/`
  );
  return response.data;
}

export async function atualizarCategoria(trilhaId, categoriaId, dados) {
  const response = await api.patch(
    `/trilhas/${trilhaId}/categorias/${categoriaId}/`,
    dados
  );

  return response.data;
}


export async function excluirCategoria(trilhaId, categoriaId) {
  await api.delete(
    `/trilhas/${trilhaId}/categorias/${categoriaId}/`
  );
}