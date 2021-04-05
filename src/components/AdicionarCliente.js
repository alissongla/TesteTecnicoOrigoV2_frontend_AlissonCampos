import React, { useState, useEffect } from 'react';
import api from "../services/api";
import { useHistory } from "react-router-dom";
import Sidebar from "./Sidebar";
import TelefoneInput from "./inputs/TelefoneInput";
import DataInput from "./inputs/DataInput";
import MultiSelect from "react-multi-select-component";
import { useAlert } from 'react-alert'


export default function AdicionarCliente() {
    const history = useHistory();
    const alert = useAlert();

    const [action, setAction] = useState("");
    const [nomeCliente, setNomeCliente] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");
    const [nascimento, setNascimento] = useState(new Date());
    const [planoSelecionados, setPlanoSelecionados] = useState([]);
    const [listaPlanos, setlistaPlanos] = useState([]);

    let planosCadastrados = [];


    useEffect(() => {
        getPlanos();
    }, []);

    async function getPlanos() {

        const response = await api.get('/plano');
        let planos = response.data.data;
        planos.map((plano) => {
            let planoObj = {
                label: plano.nome,
                value: plano.id
            };
            planosCadastrados.push(planoObj);
        });
        setlistaPlanos(planosCadastrados);

    }


    async function handleAdicionarClientes(event) {
        event.preventDefault();
        alert.show("Deseja adicionar esse cliente?", {
            closeCopy: "Não",
            actions: [
                {
                    copy: "Sim",
                    onClick: () => setAction(() => { adicionarCliente() })
                }
            ]
        });

    }

    async function adicionarCliente() {
        try {
            let planos = [];
            planoSelecionados.map((plano) => {
                planos.push(plano.value);
            });

            //Limpando o campo de telefone
            let telefoneFormatado = telefone.replace('(', '').replace(')', '').replace(' ', '').replace('-', '');
            let arrayData = nascimento.split("/");
            let nascimentoFormatado = arrayData[2] + '-' + arrayData[1] + '-' + arrayData[0];
            let data = {
                nome: nomeCliente,
                data_nascimento: nascimentoFormatado,
                email: email,
                telefone: telefoneFormatado,
                cidade: cidade,
                estado: estado,
                planos: planos
            }
            const response = await api.post("/cliente/", data);

            alert.show("Cliente adicionado com sucesso", {
                onClose: () => { history.push("/cliente"); }
            });

        } catch (error) {
            alert.show("Esse cliente não pode ser adicionado.", {
                onClose: () => { window.location.reload(); }
            });
        }
    }

    function handleVoltar() {
        history.push("/cliente");
    }

    return (
        <>
            <Sidebar />
            <div className="innerForm">
                <form>
                    <div className="form-group">
                        <label>Nome</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Informe o texto"
                            onChange={e => setNomeCliente(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Informe o email"
                            onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Data de nascimento</label>
                        <DataInput
                            type="text"
                            className="form-control"
                            placeholder="Informe a data de nascimento"
                            onChange={e => setNascimento(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Telefone</label>
                        <TelefoneInput
                            type="text"
                            className="form-control"
                            placeholder="Informe o telefone"
                            onChange={e => setTelefone(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Cidade</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Informe a cidade"
                            onChange={e => setCidade(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Estado</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Informe o estado"
                            onChange={e => setEstado(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Planos</label>
                        <MultiSelect
                            options={listaPlanos}
                            value={planoSelecionados}
                            onChange={setPlanoSelecionados}
                            labelledBy="Select"
                        />
                    </div>
                    <div className="form-group">
                        <button
                            className="editButton"
                            onClick={handleAdicionarClientes}
                        >Adicionar cliente</button>
                        <button
                            className="editButton"
                            onClick={handleVoltar}
                        >Voltar</button>
                    </div>
                </form>
            </div>
        </>
    );

}
