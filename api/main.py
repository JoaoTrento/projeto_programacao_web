from conexao_db import executa_query_db
from fastapi import FastAPI
#uvicorn main:app --reload

app = FastAPI()

@app.get("medicao_recente")
def medicao_recente():
    query = "SELECT * FROM vw_medicoes_completas ORDER BY data_hora DESC LIMIT 1"
    resposta = executa_query_db(query)
    return [
        {
            "id": r[0],
            "nome_maquina": r[1],
            "setor": r[2],
            "nome_operador": r[3],
            "nome_empresa": r[4],
            "corrente": r[5],
            "tensao": r[6],
            "data_hora": r[7],
        }
        for r in resposta
    ]