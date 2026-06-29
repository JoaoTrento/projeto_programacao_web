import '../styles/Cabecalho.css'
import logo from "../assets/logo_flow_sense.svg"
import riscos from "../assets/tres_riscos.svg"

export default function Cabecalho() {
    return(
        <header className="cabecalho">
            <span>
                <img src={logo} alt="" />
                <h1>Flow Sense Monitor</h1>
            </span>
            <ul>
                <li>Home</li>
                <li>Cadastros</li>
                <li>Mapa</li>
                <li>Prevenção</li>
            </ul>
            <img src={riscos} alt="" />
        </header>
    )
}