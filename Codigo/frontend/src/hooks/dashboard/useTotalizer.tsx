import { useEffect, useState } from "react";
import { totalEvents } from "../../services/dashboard/integration";

const useTotalizer = () => {

    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchTotalizerData = async () => {
            const response = await totalEvents();
            setTotal(response);
        };
        fetchTotalizerData();
    }, []);

    return {
        total
    }
}

export default useTotalizer;