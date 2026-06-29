import '../styles/Corpo.css'
import CardAtual from "./CardAtual"
import CardInformacoes from "./CardInformacoes"
import CardMinMax from "./CardMinMax"
import Indicador from "./Indicador"
import check_circle from "../assets/check_circle.svg"
import warning from "../assets/warning.svg"
import timer from "../assets/timer.svg"
import timeline from "../assets/timeline.svg"
import CardHistorico from './CardHistorico'

export default function Corpo() {
    return(
        <div className="corpo">
            <section>
                <h2 style={{ fontSize: 20, marginLeft: 25, marginTop: 15 }}>Painel de Gestão:</h2>
                <span className="cards">
                    <CardAtual/>
                    <CardMinMax/>
                    <CardInformacoes/>
                </span>
            </section>
            <section>
                <h2 style={{ fontSize: 20, marginLeft: 25, marginTop: 5 }}>Indicadores Rápidos:</h2>
                <span className="indicadores">
                    <Indicador imagem={check_circle} valor="Normal" nome_indicador="Status"
                        cor="rgba(0, 255, 34, 0.33)" cor_texto="rgb(1, 128, 29)"/>
                    <Indicador imagem={warning} valor="0" nome_indicador="Instabilidades"
                        cor="rgba(255, 217, 0, 0.33)" cor_texto="rgb(107, 109, 0)"/>
                    <Indicador imagem={timer} valor="00:02 H" nome_indicador="Tempo Online"
                        cor="rgba(247, 0, 255, 0.52)" cor_texto="rgb(88, 7, 104)"/>
                    <Indicador imagem={timeline} valor="8" nome_indicador="Medições"
                        cor="rgba(18, 0, 177, 0.33)" cor_texto="rgb(10, 0, 143)"/>
                </span>
            </section>
            <section>
                <span>
                    <CardHistorico/>
                </span>
            </section>
        </div>
    )
}