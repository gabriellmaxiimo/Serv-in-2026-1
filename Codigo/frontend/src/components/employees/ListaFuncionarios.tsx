import type { Funcionario } from '../../types/Funcionario';

interface PropsListaFuncionarios {
    funcionarios: Funcionario[];
}

const ListaFuncionarios = ({ funcionarios }: PropsListaFuncionarios) => {
    if (funcionarios.length === 0) {
        return <p className="emp-empty">Funcionários não encontrados.</p>;
    }

    return (
        <div className="emp-table-card">
            <table className="emp-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Cargo</th>
                    </tr>
                </thead>
                <tbody>
                    {funcionarios.map((funcionario) => (
                        <tr key={funcionario.id}>
                            <td>{funcionario.id}</td>
                            <td>{funcionario.nome}</td>
                            <td>{funcionario.cargo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}; 

export default ListaFuncionarios;