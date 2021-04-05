import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import api from "../services/api";
import { logout } from "../services/auth";

export default function Logout() {
    const history = useHistory();
    const [error, setError] = useState("");

    useEffect(() => {
        handleLogoff()
    }, [])

    async function handleLogoff() {
        try {
            const response = await api.post("/auth/logout");
            logout();
            history.push("/");
        } catch (err) {
            setError("Houve um problema com o login, verifique suas credenciais.");
        }

    }

    return (
        <></>
    )
}