import { useEffect, useState } from "react";
import "../styles/CardInformacoes.css"
import information from "../assets/information.svg"

export default function CardInformacoes() {
    const [informacoes, setInformacoes] = useState(null)

    useEffect(() => {
        async function buscaInformacoes() {
            const resposta = await fetch("http://127.0.0.1:8000/medicao_recente")
            const dados = await resposta.json();

            setInformacoes(dados[0])
        } buscaInformacoes()
    }, [])

    if (!informacoes) {
        return <h1>A</h1>
    }

    return (
        <div className="card_informacoes">
            <header>
                <img src={information} alt="" />
                <h2>OUTRAS INFORMAÇÕES</h2>
            </header>
            <span>
                <p>Atualização</p>
                <p>{informacoes.data_hora}</p>
            </span>
            <span>
                <p>Maquina</p>
                <p>{informacoes.nome_maquina}</p>
            </span>
            <span>
                <p>Setor</p>
                <p>{informacoes.setor}</p>
            </span>
            <span>
                <p>Empresa</p>
                <p>{informacoes.nome_empresa}</p>
            </span>
            <span>
                <p>Operador</p>
                <p>{informacoes.nome_operador}</p>
            </span>
        </div>
    )
}