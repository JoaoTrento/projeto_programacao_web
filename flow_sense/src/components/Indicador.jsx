import '../styles/Indicador.css'

export default function Indicador(props) {
    return (
        <div className="card_indicador" 
        style={{backgroundColor: props.cor, border: `3px solid ${props.cor}`, color: props.cor_texto}}>
            <img src={props.imagem} alt="" />
            <span>
                <p>{props.valor}</p>
                <p>{props.nome_indicador}</p>
            </span>
        </div>
    )
}