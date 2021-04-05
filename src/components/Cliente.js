import React, { useEffect, useState } from 'react';
import api from "../services/api";
import { useHistory } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAlert } from 'react-alert'

class Link extends React.Component {
    render() {
        return null;
    }
}
let paginasExistentes = [];
export default function Cliente() {
    const history = useHistory();
    const alert = useAlert();


    const [action, setAction] = useState("");
    const [pagina, setPagina] = useState(1);
    const [clientes, setClientes] = useState([]);
    const [clientesConfig, setClientesConfig] = useState({});
    let tableData = [];

    useEffect(() => {
        getClientes();
    }, [pagina]);

    useEffect(() => {
        if (paginasExistentes.length == 0) {
            for (let i = 1; i <= clientesConfig.last_page; i++) {
                paginasExistentes.push(i)
            }
        }
    }, [clientesConfig]);

    async function getClientes() {
        const response = await api.get('/cliente?page=' + pagina);

        setClientesConfig(response.data);
        setClientes(response.data.data);
    }

    function handleEditarCliente(clienteId) {
        history.push({
            pathname: "/cliente/editar/" + clienteId,
            state: { clienteId: clienteId }
        });
    }

    function handleExcluirCliente(clienteId) {
        alert.show("Deseja excluir esse cliente?", {
            closeCopy: "Não",
            actions: [
                {
                    copy: "Sim",
                    onClick: () => { setAction(() => { excluirCliente(clienteId) }) }
                }
            ]
        });
    }

    async function excluirCliente(clienteId) {
        try {
            const response = await api.delete("/cliente/" + clienteId);
            if (response.status === 204) {
                alert.show("Cliente excluído com sucesso", {
                    closeCopy: "Ok",
                    onClose: () => { window.location.reload(); }
                });
            }
        } catch (error) {
            alert.show("Esse cliente não pode ser excluído", {
                closeCopy: "Ok",
                onClose: () => { window.location.reload(); }
            });
        }


    }

    function handleAdicionarCliente() {
        history.push("/cliente/adicionar/");
    }
    return (

        <>
            <Sidebar />
            <div className="innerForm">
                <table >
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Cidade</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((cliente) => (
                            <tr key={cliente.id}>
                                <td width="40%">{cliente.nome}</td>
                                <td width="30%">{cliente.cidade}</td>
                                <td width="20%">{cliente.estado}</td>
                                <td>
                                    <button className="botaoEditarIndex"
                                        onClick={() => handleEditarCliente(cliente.id)}>Editar</button>
                                </td>
                                <td>
                                    <button className="botaoExcluirIndex" onClick={() => handleExcluirCliente(cliente.id)}>Remover</button>
                                </td>
                            </tr>
                        )
                        )}
                    </tbody>
                </table>
                <div className='footerButtons'>
                    <button className="botaoAdicionarIndex"
                        onClick={handleAdicionarCliente}>Adicionar Cliente</button>
                    <div>
                        {paginasExistentes.map((value, index) => {
                            return <button
                                key={index}
                                className="paginationButton"
                                onClick={() => { setPagina(value) }}>
                                {value
                                }</button>
                        })}
                    </div>
                </div>
            </div>
        </>
    );

}
