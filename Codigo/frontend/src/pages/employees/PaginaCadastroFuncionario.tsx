import { Link } from "react-router-dom";
import FormularioFuncionario from "../../components/employees/FormularioFuncionaro";

const PaginaCadastroFuncionario = () => {
    return (
        <section className="emp-page">
            <h2 className="emp-page-title">Cadastro de funcionário</h2>
            <p className="emp-page-subtitle">
                Preencha os campos abaixo para incluir um novo funcionário.
            </p>

            <div className="emp-actions">
                <Link className="emp-button emp-button-secondary" to="/employees">
                    Funcionários listados
                </Link>
            </div>

            <FormularioFuncionario />
        </section>
    );
};

export default PaginaCadastroFuncionario;