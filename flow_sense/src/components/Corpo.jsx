import CardAtual from "./CardAtual"
import CardInformacoes from "./CardInformacoes"
import CardMinMax from "./CardMinMax"

export default function Corpo() {
    return(
        <div className="corpo">
            <span className="cards">
                <CardAtual/>
                <CardMinMax/>
                <CardInformacoes/>
            </span>
        </div>
    )
}