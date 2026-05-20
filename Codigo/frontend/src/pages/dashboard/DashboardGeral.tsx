import SimpleBarChart from "../../components/dashboard/barChart/SimpleBarChart";
import Totalizer from "../../components/dashboard/totalizer/Totalizer";
import { SimpleChartContainer, TotalizerContainer } from "./style";

const DashboardGeral = () => {
    return (
        <>
            <TotalizerContainer>
                <Totalizer
                    total={100}
                    description="Total de eventos realizados"
                >
                </Totalizer>
                <Totalizer
                    total={100}
                    description="Total de eventos realizados"
                >
                </Totalizer>
                <Totalizer
                    total={100}
                    description="Total de eventos realizados"
                >
                </Totalizer>
                <Totalizer
                    total={100}
                    description="Total de eventos realizados"
                >
                </Totalizer>
            </TotalizerContainer>
            
            <SimpleChartContainer>
                <SimpleBarChart
                    data={[
                        { name: 'Janeiro', yKey: 4000 },
                        { name: 'Fevereiro', yKey: 3000 }
                    ]}
                    xAxisKey="Teste1"
                ></SimpleBarChart>
                <SimpleBarChart
                    data={[
                        { name: 'Janeiro', yKey: 4000 },
                        { name: 'Fevereiro', yKey: 3000 }
                    ]}
                    xAxisKey="Teste2"
                ></SimpleBarChart>
            </SimpleChartContainer>
        </>
    )
}

export default DashboardGeral;