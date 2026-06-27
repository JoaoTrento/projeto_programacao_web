import { useEffect, useState } from "react";
import "../styles/CardAtual.css"
import electric_bolt from "../assets/electric_bolt.svg"

export default function CardAtual() {
    const [medicao, setMedicao] = useState(null);

    useEffect(() => {
        async function buscaMedicaoRecente() {
            const resposta = await fetch("http://127.0.0.1:8000/medicao_recente");
            const dados = await resposta.json();

            setMedicao(dados[0]);
        }

        buscaMedicaoRecente();
    }, []);

    if (!medicao) {
        return(

        <div className="card_atual">
            <header>
                <img src={electric_bolt} alt="" />
                <h2>STATUS ATUAL - Carregando...</h2>
            </header>
            <span>
                <p>Tensão</p>
                <p  style={{ color: "rgb(5, 134, 255)" }}>... V</p>
            </span>
            <span>
                <p>Corrente</p>
                <p style={{ color: "rgb(12, 184, 78)" }}>... A</p>
            </span>
            <span>
                <p>Potência</p>
                <p>... W</p>
            </span>
            <span>
                <p>Status</p>
                <p>...</p>
            </span>
        </div>
        )
    }

    return (
        <div className="card_atual">
            <header>
                <img src={electric_bolt} alt="" />
                <h2>STATUS ATUAL</h2>
            </header>
            <span>
                <p>Tensão</p>
                <p  style={{ color: "rgb(5, 134, 255)" }}>{medicao.tensao} V</p>
            </span>
            <span>
                <p>Corrente</p>
                <p  style={{ color: "rgb(12, 184, 78)" }}>{medicao.corrente} A</p>
            </span>
            <span>
                <p>Potência</p>
                <p>{Number(medicao.tensao) * Number(medicao.corrente)} W</p>
            </span>
            <span>
                <p>Status</p>
                <p>Normal</p>
            </span>
        </div>
    );
}
