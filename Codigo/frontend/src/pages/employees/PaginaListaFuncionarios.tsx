import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListaFuncionarios from "../../components/employees/ListaFuncionarios";
import { mockFuncionarios } from "../../mocks/funcionarios";
import type { Funcionario } from "../../types/Funcionario";

const CHAVE_STORAGE = "funcionarios_cadastrados";

const PaginaListaFuncionarios = () => {
	const [funcionarios, setFuncionarios] = useState<Funcionario[]>(mockFuncionarios);

	useEffect(() => {
		const textoSalvo = localStorage.getItem(CHAVE_STORAGE);
		const cadastrados: Funcionario[] = textoSalvo ? JSON.parse(textoSalvo) : [];
		setFuncionarios([...mockFuncionarios, ...cadastrados]);
	}, []);

	return (
		<section className="emp-page">
			<h2 className="emp-page-title">Funcionários listados</h2>
			<p className="emp-page-subtitle">
				Protótipo da Sprint 1 com listagem em tabela e dados mockados.
			</p>

			<div className="emp-actions">
				<Link className="emp-button" to="/employees/cadastro">
					Cadastrar funcionário
				</Link>
			</div>

			<ListaFuncionarios funcionarios={funcionarios} />
		</section>
	);
};

export default PaginaListaFuncionarios;