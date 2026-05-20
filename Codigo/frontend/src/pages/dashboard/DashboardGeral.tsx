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
                        { name: 'Janeiro', x: 4000 },
                        { name: 'Fevereiro', x: 3000 }
                    ]}
                ></SimpleBarChart>
                <SimpleBarChart
                    data={[
                        { name: 'Janeiro', x: 4000 },
                        { name: 'Fevereiro', x: 3000 }
                    ]}
                ></SimpleBarChart>
            </SimpleChartContainer>
        </>
    )
}

export default DashboardGeral;