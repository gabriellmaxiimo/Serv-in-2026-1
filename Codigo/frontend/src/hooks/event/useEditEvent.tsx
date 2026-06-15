import { useState } from "react";
import { message, type GetProp, type UploadProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import api from "../../services/api";
import { openErrorNotification } from "../../components/errorNotification";
import { openSuccessNotification } from "../../components/successNotification";
import { getAddressByCep } from "../../services/address/integration";

const useEditEvent = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  // localização detalhada
  const [cep, setCep] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [neighborhood, setNeighborhood] = useState<string>("");
  const [street, setStreet] = useState<string>("");

  const [location, setLocation] = useState<string>("");

  const [fileObject, setFileObject] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

  const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Você só pode subir arquivos JPG/PNG!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("A imagem deve ser menor que 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const uploadImageToCloudinary = async (file: any) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "servin_preset");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dvmtw56ww/image/upload`,
        { method: "POST", body: formData }
      );
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Erro ao subir imagem para o Cloudinary:", error);
      return null;
    }
  };

  // Buscar evento por ID
  const getEventById = async (id: string) => {
    try {
      setLoading(true);
      const response = await api.get(`/events/${id}`);
      const data = response.data;

      setTitle(data.name);
      setDescription(data.description);
      setStartDate(data.initialDate ? dayjs(data.initialDate) : null);
      setEndDate(data.finalDate ? dayjs(data.finalDate) : null);

      setCep(data.cep || "");
      setState(data.state || data.uf || "");
      setCity(data.city || data.localidade || "");
      setNeighborhood(data.neighborhood || data.bairro || "");
      setStreet(data.street || data.logradouro || "");
      setLocation(data.location || "");

      if (data.imageUrl) {
        setImageUrl(data.imageUrl);
      }

      return data;
    } catch (error) {
      openErrorNotification("Erro ao carregar evento", "Não foi possível carregar os dados do evento.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Atualizar evento
  const updateEvent = async (id: string) => {
    try {
      setLoading(true);

      let finalImageUrl = imageUrl;
      if (fileObject) {
        finalImageUrl = await uploadImageToCloudinary(fileObject);
      }

      await api.put(`/events/${id}`, {
        name: title,
        description,
        initialDate: startDate ? startDate.toISOString() : null,
        finalDate: endDate ? endDate.toISOString() : null,
        cep,
        state,
        city,
        neighborhood,
        street,
        location,
        imageUrl: finalImageUrl || "",
      });

      openSuccessNotification("Evento atualizado com sucesso!");
    } catch (error: any) {
      openErrorNotification("Erro ao atualizar evento", error.response?.data || "Erro interno no servidor");
    } finally {
      setLoading(false);
    }
  };

  // Buscar endereço por CEP (igual ao useEvent)
  const onSearch = async (value: string) => {
    try {
      const response = await getAddressByCep(value);

      if (response) {
        setCep(response.data.cep);
        setState(response.data.uf);
        setCity(response.data.localidade);
        setNeighborhood(response.data.bairro);
        setStreet(response.data.logradouro);

        return response.data;
      }
    } catch (error) {
      openErrorNotification("Erro ao buscar endereço", "Não foi possível buscar o endereço para o CEP informado.");
    }
  };

  const handleChange: UploadProps["onChange"] = (info) => {
    const file = info.file.originFileObj;
    if (file) {
      setFileObject(file);
      getBase64(file as FileType, (url) => {
        setImageUrl(url);
      });
    }
  };

  return {
    // estados
    title, setTitle,
    description, setDescription,
    startDate, setStartDate,
    endDate, setEndDate,
    cep, setCep,
    state, setState,
    city, setCity,
    neighborhood, setNeighborhood,
    street, setStreet,
    location, setLocation,

    // imagem
    imageUrl, setImageUrl,
    handleChange,
    beforeUpload,
    loading,

    // funções
    getEventById,
    updateEvent,
    onSearch,
  };
};

export default useEditEvent;
