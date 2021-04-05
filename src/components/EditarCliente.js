import React, { useEffect, useState } from 'react';
import api from "../services/api";
import { useHistory } from "react-router-dom";
import Sidebar from "./Sidebar";
import MultiSelect from "react-multi-select-component";
import TelefoneInput from "./inputs/TelefoneInput";
import DataInput from "./inputs/DataInput";
import { useAlert } from 'react-alert'

class Link extends React.Component {
    render() {
        return null;
    }
}

export default function EditarCliente() {
    const history = useHistory();
    const alert = useAlert();
    const clienteId = history.location.state.clienteId;

    const [action, setAction] = useState("");
    const [cliente, setCliente] = useState([]);
    const [nomeCliente, setNomeCliente] = useState("");
    const [email, setEmail] = useState("");
    const [emailAntigo, setEmailAntigo] = useState("");
    const [nascimento, setNascimento] = useState(new Date());
    const [telefone, setTelefone] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");
    const [planoSelecionados, setPlanoSelecionados] = useState([]);
    const [listaPlanos, setlistaPlanos] = useState([]);

    let planosCadastrados = [];

    useEffect(() => {
        getCliente();
    }, []);

    useEffect(() => {
        getPlanos();
    }, []);

    async function getCliente() {

        const response = await api.get('/cliente/' + clienteId);
        setCliente(response.data);

        setNomeCliente(response.data[0].nome);
        setEmail(response.data[0].email);
        setEmailAntigo(response.data[0].email);
        setTelefone(response.data[0].telefone);
        setCidade(response.data[0].cidade);
        setEstado(response.data[0].estado);

        let dataNascimento = response.data[0].data_nascimento;
        let date = dataNascimento.substring(0, 10).split('-')
        let nascimentoFormatado = date[2] + '/' + date[1] + '/' + date[0];
        setNascimento(nascimentoFormatado);

        let arrayPlanos = [];
        response.data[0].planos.map((plano) => {
            let planoObj = {
                label: plano.nome,
                value: plano.id
            }
            arrayPlanos.push(planoObj);
        });

        setPlanoSelecionados(arrayPlanos);

    }

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

    async function handleEditarClientes(event) {
        event.preventDefault();
        alert.show("Deseja salvar os dados desse cliente?", {
            closeCopy: "Não",
            actions: [
                {
                    copy: "Sim",
                    onClick: () => setAction(() => { editarCliente() })
                }
            ]
        });
    }

    async function editarCliente() {
        try {
            let planos = [];
            planoSelecionados.map((plano) => {
                planos.push(plano.value);
            })
            let data = {
                nome: nomeCliente,
                telefone: telefone,
                cidade: cidade,
                estado: estado,
                planos: planos
            }
            if (email !== emailAntigo) {
                data.email = email;
            }
            const response = await api.put("/cliente/" + clienteId, data);

            alert.show("Informações adicionadas com sucesso.", {
                onClose: () => { history.push("/cliente"); }
            });
        } catch (error) {
            alert.show("Não foi possível realizar a edição.", {
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
                            value={nomeCliente}
                            onChange={e => setNomeCliente(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Informe o email"
                            value={email}
                            onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Data de nascimento</label>
                        <DataInput
                            value={nascimento}
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
                            value={telefone}
                            onChange={e => setTelefone(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Cidade</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Informe a cidade"
                            value={cidade}
                            onChange={e => setCidade(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Estado</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Informe o estado"
                            value={estado}
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
                    <button
                        className="editButton"
                        onClick={handleEditarClientes}
                    >Editar cliente</button>
                    <button
                        className="editButton"
                        onClick={handleVoltar}
                    >Voltar</button>
                </form>
            </div>
        </>
    );

}
