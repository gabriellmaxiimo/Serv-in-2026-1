import { useState } from "react"
import { createEvent } from "../../services/events/integration"

import { Dayjs } from "dayjs";
import { openErrorNotification } from "../../components/errorNotification";
import { openSuccessNotification } from "../../components/successNotification";

const useEvent = () => {
    const today = new Date();
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [startDate, setStartDate] = useState<Dayjs>(today as unknown as Dayjs);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);
    const [location, setLocation] = useState<string>("")
    const [imageUrl, setImageUrl] = useState<any>("")

    const fetchEvent = async () => {
    if (title.trim() === "" || location.trim() === "" || !startDate) {
        openErrorNotification(
            "Campos obrigatórios", 
            "Por favor, preencha os campos obrigatórios."
        );
        return;
    }

    try {
        const response = await createEvent({
            name: title,
            description,
            initialDate: startDate.format("YYYY-MM-DDTHH:mm:ss"),
            finalDate: endDate ? endDate.format("YYYY-MM-DDTHH:mm:ss") : undefined,
            location,
            imageUrl: imageUrl?.file?.thumbUrl || ""
        });

        if (response) {
            openSuccessNotification("Evento criado com sucesso!");
        }
        return response;
    } catch (error: any) {
        openErrorNotification("Erro ao criar evento", error.response?.data || "Erro interno");
    }
}
    return {
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
        imageUrl,
        setImageUrl,
        fetchEvent
    }
}

export default useEvent