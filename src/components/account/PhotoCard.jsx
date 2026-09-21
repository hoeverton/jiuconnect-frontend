import { useEffect, useRef, useState } from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { Camera } from "lucide-react";

import { useAuth } from "../../context/AuthContext";

import {
  getMyProfessorProfile,
  updateProfessorPhoto,
} from "../../services/professorService";

export default function PhotoCard() {
  const fileInputRef = useRef(null);

  const {
    user,
    updatePhoto,
  } = useAuth();

  const [profile, setProfile] = useState(null);

  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false);

  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const isProfessor =
    user?.tipo_usuario === "professor";

  // =========================================================
  // CARREGAR PERFIL DO PROFESSOR
  // =========================================================

  useEffect(() => {
    if (!isProfessor) {
      return;
    }

    async function loadProfile() {
      try {
        setLoading(true);
        setError("");

        const data =
          await getMyProfessorProfile();

        setProfile(data);

      } catch (error) {
        console.error(
          "Erro ao carregar perfil do professor:",
          error
        );

        setError(
          "Não foi possível carregar sua foto."
        );

      } finally {
        setLoading(false);
      }
    }

    loadProfile();

  }, [isProfessor]);

  // =========================================================
  // SELECIONAR FOTO
  // =========================================================

  function handleSelectPhoto(event) {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    setMessage("");
    setError("");

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError(
        "Formato inválido. Use JPG, PNG ou WEBP."
      );

      event.target.value = "";

      return;
    }

    const maxSize =
      5 * 1024 * 1024;

    if (file.size > maxSize) {
      setError(
        "A imagem deve ter no máximo 5 MB."
      );

      event.target.value = "";

      return;
    }

    const previewUrl =
      URL.createObjectURL(file);

    setPreview(previewUrl);

    uploadPhoto(file);
  }

  // =========================================================
  // ENVIAR FOTO
  // =========================================================

  async function uploadPhoto(file) {
    setSaving(true);
    setMessage("");
    setError("");

    try {
      if (isProfessor) {

        const data =
          await updateProfessorPhoto(
            file
          );

        setProfile(data);

      } else {

        const result =
          await updatePhoto(file);

        if (!result.success) {
          throw result.error;
        }
      }

      setPreview(null);

      setMessage(
        "Foto atualizada com sucesso."
      );

    } catch (error) {
      console.error(
        "Erro ao atualizar foto:",
        error
      );

      setPreview(null);

      setError(
        "Não foi possível atualizar sua foto."
      );

    } finally {
      setSaving(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  // =========================================================
  // URL DA FOTO
  // =========================================================

  function getPhotoUrl() {

    if (preview) {
      return preview;
    }

    let foto = null;

    if (isProfessor) {
      foto = profile?.foto;
    } else {
      foto = user?.foto;
    }

    if (!foto) {
      return null;
    }

    if (foto.startsWith("http")) {
      return foto;
    }

    return `http://127.0.0.1:8000${foto}`;
  }

  const photoUrl =
    getPhotoUrl();

  // =========================================================
  // INICIAL
  // =========================================================

  const nome =
    isProfessor
      ? profile?.nome
      : user?.username;

  const initial =
    nome?.charAt(0).toUpperCase() || "?";

  // =========================================================
  // LOADING PROFESSOR
  // =========================================================

  if (
    isProfessor &&
    loading
  ) {
    return (
      <Card className="p-6">

        <div className="flex justify-center">

          <div
            className="
              w-28
              h-28
              rounded-full
              bg-zinc-800
              animate-pulse
            "
          />

        </div>

      </Card>
    );
  }

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <Card className="p-6">

      <div className="flex flex-col items-center">

        {/* FOTO */}

        <div className="relative">

          {photoUrl ? (

            <img
              src={photoUrl}
              alt="Foto do usuário"
              className="
                w-28
                h-28
                rounded-full
                object-cover
                border
                border-violet-500/30
                shadow-lg
                shadow-violet-500/20
              "
            />

          ) : (

            <div
              className="
                w-28
                h-28
                rounded-full
                bg-gradient-to-br
                from-violet-500
                to-purple-700
                flex
                items-center
                justify-center
                text-4xl
                font-bold
                text-white
                shadow-lg
                shadow-violet-500/20
              "
            >
              {initial}
            </div>

          )}

          {/* CÂMERA */}

          <button
            type="button"
            onClick={() =>
              fileInputRef.current?.click()
            }
            disabled={saving}
            className="
              absolute
              bottom-0
              right-0
              w-10
              h-10
              rounded-full
              bg-violet-600
              hover:bg-violet-500
              disabled:opacity-50
              transition
              flex
              items-center
              justify-center
              shadow-lg
            "
          >
            <Camera size={18} />
          </button>

        </div>

        {/* INPUT */}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleSelectPhoto}
          className="hidden"
        />

        {/* NOME */}

        <h3 className="mt-6 text-xl font-semibold text-white">
          {nome ||
            (isProfessor
              ? "Professor"
              : "Aluno")}
        </h3>

        {/* TIPO */}

        <p className="text-zinc-500 text-sm mt-1 capitalize">
          {user?.tipo_usuario || ""}
        </p>

        {/* BOTÃO */}

        <Button
          type="button"
          variant="outline"
          fullWidth
          className="mt-8"
          onClick={() =>
            fileInputRef.current?.click()
          }
          disabled={saving}
        >
          {saving
            ? "Enviando..."
            : "Alterar foto"}
        </Button>

        {/* INFORMAÇÃO */}

        <p className="text-xs text-zinc-600 text-center mt-4">
          JPG, PNG ou WEBP · máximo 5 MB
        </p>

        {/* SUCESSO */}

        {message && (
          <div
            className="
              w-full
              mt-4
              rounded-xl
              border
              border-green-500/20
              bg-green-500/10
              px-4
              py-3
              text-sm
              text-green-400
              text-center
            "
          >
            {message}
          </div>
        )}

        {/* ERRO */}

        {error && (
          <div
            className="
              w-full
              mt-4
              rounded-xl
              border
              border-red-500/20
              bg-red-500/10
              px-4
              py-3
              text-sm
              text-red-400
              text-center
            "
          >
            {error}
          </div>
        )}

      </div>

    </Card>
  );
}