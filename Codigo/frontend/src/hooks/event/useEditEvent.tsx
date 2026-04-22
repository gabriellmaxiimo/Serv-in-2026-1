import { useState } from "react";
import { message } from "antd";
import api from "../../services/api";
import dayjs, { Dayjs } from "dayjs";

const useEditEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [location, setLocation] = useState("");

  const [imageUrl, setImageUrl] = useState<string>();
  const [loading, setLoading] = useState(false);

  const getEventById = async (id: string) => {
    try {
      setLoading(true);

      const response = await api.get(`/events/${id}`);
      const data = response.data;

      // já seta os estados (igual create usa)
      setTitle(data.name);
      setDescription(data.description);
      setStartDate(data.initialDate ? dayjs(data.initialDate) : null);
      setEndDate(data.finalDate ? dayjs(data.finalDate) : null);
      setLocation(data.location);

      if (data.image) {
        setImageUrl(data.image);
      }

      return data;
    } catch (error) {
      console.error(error);
      message.error("Erro ao carregar evento");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 🔥 ATUALIZAR EVENTO
  const updateEvent = async (id: string) => {
    try {
      setLoading(true);

      await api.put(`/events/${id}`, {
        name: title,
        description,
        initialDate: startDate ? startDate.toISOString() : null,
        finalDate: endDate ? endDate.toISOString() : null,
        location,
        image: imageUrl,
      });

      message.success("Evento atualizado com sucesso!");
    } catch (error) {
      console.error(error);
      message.error("Erro ao atualizar evento");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 UPLOAD (copiado do seu padrão)
  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

    if (!isJpgOrPng) {
      message.error("Você só pode enviar JPG/PNG!");
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      message.error("Imagem deve ter menos de 2MB!");
    }

    return isJpgOrPng && isLt2M;
  };

  const getBase64 = (img: File, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () =>
      callback(reader.result as string)
    );
    reader.readAsDataURL(img);
  };

  const handleChange = (info: any) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }

    if (info.file.originFileObj) {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  return {
    // estados
    title,
    setTitle,
    description,
    setDescription,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    location,
    setLocation,

    // imagem
    imageUrl,
    loading,
    beforeUpload,
    handleChange,

    // funções principais
    getEventById,
    updateEvent,
  };
};

export default useEditEvent;