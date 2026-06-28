import CardAtual from "./CardAtual"
import CardMinMax from "./CardMinMax"

export default function Corpo() {
    return(
        <div className="corpo">
            <CardAtual></CardAtual>
            <CardMinMax></CardMinMax>
        </div>
    )
}