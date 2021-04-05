import React, { Component, useState } from "react";
import { useHistory } from 'react-router-dom';
import api from "../services/api";
import { login } from "../services/auth";
import { useAlert } from 'react-alert'


export default function Login() {
    const history = useHistory();
    const alert = useAlert();

    const [action, setAction] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    async function handleSignIn(event) {
        event.preventDefault();

        if (!email || !password) {
            setError("Preencha e-mail e senha para continuar!");
        }
        else {
            try {
                const response = await api.post("/auth/login", { email, password });
                login(response.data.data.token);
                history.push("/cliente");
            } catch (err) {
                alert.show("Nome e/ou usuário incorreto.", {
                    onClose: () => { window.location.reload(); }
                });
            }
        }
    }


    return (
        <div className="outer">
            <form className="inner">

                <h3>Entrar</h3>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        onChange={e => setEmail(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={e => setPassword(e.target.value)} />
                </div>


                <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={handleSignIn}>Logar</button>
            </form>
        </div>
    );
}