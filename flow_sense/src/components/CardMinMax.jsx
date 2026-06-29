import { useEffect, useState } from "react";
import "../styles/CardMinMax.css"
import maximum from "../assets/maximum.svg"

export default function CardMinMax() {
    const [medicoes, setMedicoes] = useState(null);

    useEffect(() => {
        async function buscaMedicoesMinMax() {
            const resposta = await fetch("http://127.0.0.1:8000/min_max");
            const dados = await resposta.json();

            setMedicoes(dados[0]);
        }

        buscaMedicoesMinMax();
    }, []);

    if (!medicoes) {
        return (

            <div className="card_minmax">
                <header>
                    <img src={maximum} alt="" />
                    <h2>MÍNIMO E MÁXIMO ...</h2>
                </header>
                <span>
                    <p>Mínimo</p>
                    <p>Máximo</p>
                </span>
                <span>
                    <p>Tensão</p>
                    <p>... V</p>
                    <p>... V</p>
                </span>
                <span>
                    <p>Corrente</p>
                    <p>... A</p>
                    <p>... A</p>
                </span>
                <span>
                    <p>Potência</p>
                    <p>... W</p>
                    <p>... W</p>
                </span>
            </div>
        )
        }
        


    return (
        <div className="card_minmax">
            <header>
                <img src={maximum} alt="" />
                <h2>MÍNIMO E MÁXIMO</h2>
            </header>
            <span>
                <p>Mínimo</p>
                <p>Máximo</p>
            </span>
            <span>
                <p>Tensão</p>
                <p>{medicoes.tensao_min} V</p>
                <p>{medicoes.tensao_max} V</p>
            </span>
            <span>
                <p>Corrente</p>
                <p>{medicoes.corrente_min} A</p>
                <p>{medicoes.corrente_max} A</p>
            </span>
            <span>
                <p>Potência</p>
                <p>{Number(medicoes?.potencia_min).toFixed(1)} W</p>
                <p>{Number(medicoes?.potencia_max).toFixed(1)} W</p>
            </span>
        </div>
    )
}