
import SimpleBarChart from "../../components/dashboard/barChart/SimpleBarChart";
import Totalizer from "../../components/dashboard/totalizer/Totalizer";
import useTotalizer from "../../hooks/dashboard/useTotalizer";
import * as S from "./styles";

const DashboardsPage: React.FC = () => {

    const { total } = useTotalizer();

    const data = [
        { name: "Eventos", key: total },
    ];
    

    return (
        <S.DashboardContainer>
            <S.TotalizersContainer>
                <Totalizer total={total} description="Total de Eventos" />
                <Totalizer total={100} description="Total de Eventos" />
                <Totalizer total={100} description="Total de Eventos" />
                <Totalizer total={100} description="Total de Eventos" />
            </S.TotalizersContainer>

            <S.ChartsContainer>
                <SimpleBarChart data={data} color="blue" key="x"/>
                <SimpleBarChart data={data} color="blue" key="x"/>
                <SimpleBarChart data={data} color="blue" key="x"/>
            </S.ChartsContainer>
        </S.DashboardContainer>
    )
};

export default DashboardsPage;