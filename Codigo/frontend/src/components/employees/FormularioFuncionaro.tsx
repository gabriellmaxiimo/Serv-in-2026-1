import { useState } from "react";
import type { FormEvent } from "react";
import type { Funcionario } from "../../types/Funcionario";

const CHAVE_STORAGE = "funcionarios_cadastrados";

const FormularioFuncionario = () => {
  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState("");

  const aoSalvar = (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    const nomeLimpo = nome.trim();
    const cargoLimpo = cargo.trim();

    if (!nomeLimpo || !cargoLimpo) {
      window.alert("Preencha Nome e Cargo.");
      return;
    }

    const novoFuncionario: Funcionario = {
      id: Date.now(),
      nome: nomeLimpo,
      cargo: cargoLimpo,
    };

    const textoSalvo = localStorage.getItem(CHAVE_STORAGE);
    const listaAtual: Funcionario[] = textoSalvo ? JSON.parse(textoSalvo) : [];

    listaAtual.push(novoFuncionario);
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(listaAtual));

    window.alert(
      `Funcionario cadastrado com sucesso!\n\nNome: ${nomeLimpo}\nCargo: ${cargoLimpo}`
    );

    setNome("");
    setCargo("");
  };

  return (
    <form className="emp-form-card" onSubmit={aoSalvar}>
      <div className="emp-field">
        <label htmlFor="nome">Nome</label>
        <input
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Ex: Julia Ferreira"
        />
      </div>

      <div className="emp-field">
        <label htmlFor="cargo">Cargo</label>
        <input
          id="cargo"
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
          placeholder="Ex: Coordenador de Eventos"
        />
      </div>

      <button className="emp-button" type="submit">
        Salvar
      </button>
    </form>
  );
};

export default FormularioFuncionario;
