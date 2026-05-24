import SimpleBarChart from "../../components/dashboard/barChart/SimpleBarChart";
import Totalizer from "../../components/dashboard/totalizer/Totalizer";
import useBarCharts from "../../hooks/dashboard/useBarCharts";
import useTotalCharts from "../../hooks/dashboard/useTotalCharts";
import { SimpleChartContainer, TotalizerContainer } from "./style";

const DashboardGeral = () => {
    const { totalEvents, totalEmployees, totalProfessionals } = useTotalCharts();
    const { eventsByProfessional, eventsByDate } = useBarCharts();

    const eventsByProfessionalData = eventsByProfessional.map(item => ({
                        name: item.description,
                        Total: item.totalprofessionals
                    }))

    const eventsByDateData = eventsByDate.map(item => ({
        name: item.period,
        Total: item.count
    }))

    return (
        <>
            <TotalizerContainer>
                <Totalizer total={totalEvents} description="Total de eventos realizados" />
                <Totalizer total={totalEmployees} description="Total de Funcionários" />
                <Totalizer total={totalProfessionals} description="Total de Profissionais" />
            </TotalizerContainer>
            
            <SimpleChartContainer>
                <SimpleBarChart
                    data={eventsByProfessionalData}
                    valueKey="Total"
                />

                <SimpleBarChart
                    data={eventsByDateData}
                    valueKey="Total"
                />
            </SimpleChartContainer>
        </>
    );
};

export default DashboardGeral;