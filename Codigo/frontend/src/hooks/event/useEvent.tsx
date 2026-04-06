import { useState } from "react"
import { createEvent } from "../../services/events/integration"
import dayjs, { Dayjs } from "dayjs";
import { openErrorNotification } from "../../components/errorNotification";
import { openSuccessNotification } from "../../components/successNotification";
import { message, type GetProp, type UploadProps } from "antd";

const useEvent = () => {
    const today = dayjs();
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [startDate, setStartDate] = useState<Dayjs>(today);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);
    const [location, setLocation] = useState<string>("")
    
    const [fileObject, setFileObject] = useState<any>(null); 
    const [imageUrl, setImageUrl] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);

    type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

    const getBase64 = (img: FileType, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
    };

    const beforeUpload = (file: FileType) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Você só pode subir arquivos JPG/PNG!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('A imagem deve ser menor que 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const uploadImageToCloudinary = async (file: any) => {
        if (!file) return null;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'servin_preset');

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/dvmtw56ww/image/upload`,
                { method: 'POST', body: formData }
            );
            const data = await response.json();
            return data.secure_url; 
        } catch (error) {
            console.error("Erro ao subir imagem para o Cloudinary:", error);
            return null;
        }
    };

    const fetchEvent = async () => {
        if (title.trim() === "" || location.trim() === "" || !startDate) {
            openErrorNotification("Campos obrigatórios", "Por favor, preencha os campos obrigatórios.");
            return;
        }

        setLoading(true);

        let finalImageUrl = "";
        if (fileObject) {
            finalImageUrl = await uploadImageToCloudinary(fileObject);
        }

        try {
            const response = await createEvent({
                name: title,
                description,
                initialDate: startDate.format("YYYY-MM-DDTHH:mm:ss"),
                finalDate: endDate ? endDate.format("YYYY-MM-DDTHH:mm:ss") : undefined,
                location,
                imageUrl: finalImageUrl || ""
            });

            if (response) {
                openSuccessNotification("Evento criado com sucesso!");
            }
            return response;
        } catch (error: any) {
            openErrorNotification("Erro ao criar evento", error.response?.data || "Erro interno no servidor");
        } finally {
            setLoading(false);
        }
    }

    const handleChange: UploadProps['onChange'] = (info) => {
        const file = info.file.originFileObj;
        
        if (file) {
            setFileObject(file);
            getBase64(file as FileType, (url) => {
                setImageUrl(url);
            });
        }
    };

    return {
        title, setTitle,
        description, setDescription,
        startDate, setStartDate,
        endDate, setEndDate,
        location, setLocation,
        imageUrl, setImageUrl,
        fetchEvent,
        handleChange,
        beforeUpload,
        loading
    }
}

export default useEvent;