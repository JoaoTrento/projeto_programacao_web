import { useEffect, useState } from "react";
import "../styles/CardHistorico.css"

export default function CardHistorico() {
    const [historico, setHistorico] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    async function buscarMedicoes() {
        const resposta = await fetch("http://127.0.0.1:8000/lista_medicoes");

        if (!resposta.ok) {
            throw new Error("Erro ao carregar histórico");
        }

        return resposta.json();
    }

    useEffect(() => {
        let componenteAtivo = true;

        buscarMedicoes()
            .then((dados) => {
                if (componenteAtivo) {
                    setHistorico(dados);
                    setErro("");
                }
            })
            .catch((error) => {
                if (componenteAtivo) {
                    setErro(error.message);
                }
            })
            .finally(() => {
                if (componenteAtivo) {
                    setCarregando(false);
                }
            });

        return () => {
            componenteAtivo = false;
        };
    }, []);

    async function handleDeletarHistorico(id) {
        try {
            setErro("");

            const resposta = await fetch(`http://127.0.0.1:8000/deletahist/${id}`, {
                method: "DELETE",
            });

            if (!resposta.ok) {
                throw new Error("Erro ao deletar histórico");
            }

            const dados = await buscarMedicoes();
            setHistorico(dados);
        } catch (error) {
            setErro(error.message);
        }
    }

    return (
        <section className="card_historico">
            <h2>HISTÓRICO RECENTE</h2>

            {erro && <p className="historico_erro">{erro}</p>}

            <table>
                <thead>
                    <tr>
                        <th>Data/Hora</th>
                        <th>Tensão (V)</th>
                        <th>Corrente (A)</th>
                        <th>Potência (W)</th>
                        <th>Status</th>
                        <th>Ação</th>
                    </tr>
                </thead>

                <tbody>
                    {carregando && (
                        <tr>
                            <td colSpan="6" className="historico_vazio">
                                Carregando histórico...
                            </td>
                        </tr>
                    )}

                    {!carregando && historico.length === 0 && (
                        <tr>
                            <td colSpan="6" className="historico_vazio">
                                Nenhum histórico encontrado.
                            </td>
                        </tr>
                    )}

                    {historico.map((item) => (
                        <tr key={item.id}>
                            <td>{item.data_hora}</td>
                            <td>{item.tensao}</td>
                            <td>{item.corrente}</td>
                            <td>{item.potencia}</td>
                            <td>
                                <span className="status_historico">Normal</span>
                            </td>
                            <td>
                                <button
                                    type="button"
                                    className="botao_deletar_historico"
                                    onClick={() => handleDeletarHistorico(item.id)}
                                    aria-label="Deletar histórico"
                                    title="Deletar histórico"
                                >
                                    <svg viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M9 3h6l1 2h4v2H4V5h4l1-2Z" />
                                        <path d="M6 9h12l-1 12H7L6 9Zm4 2v8h2v-8h-2Zm4 0v8h2v-8h-2Z" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}
