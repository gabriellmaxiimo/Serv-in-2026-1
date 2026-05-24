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
                <Totalizer total={totalEvents} description="Eventos Realizados" />
                <Totalizer total={totalEmployees} description="Funcionários" />
                <Totalizer total={totalProfessionals} description="Profissionais" />
            </TotalizerContainer>
            
            <SimpleChartContainer>
                <SimpleBarChart
                    title="Profissionais por Evento"
                    data={eventsByProfessionalData}
                    valueKey="Total"
                />

                <SimpleBarChart
                    title="Eventos por Período"
                    data={eventsByDateData}
                    valueKey="Total"
                />
            </SimpleChartContainer>
        </>
    );
};

export default DashboardGeral;