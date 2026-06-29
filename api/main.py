from conexao_db import executa_query_db
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
#uvicorn main:app --reload

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MedicaoInput(BaseModel):
    id_maquina: int
    corrente: float
    tensao: float

class MedicaoUpdate(BaseModel):
    corrente: float
    tensao: float

@app.get("/medicao_recente")
def medicao_recente():
    query = """
        SELECT 
            id_medicao, 
            nome_maquina, 
            setor, 
            nome_operador, 
            nome_empresa, 
            corrente, 
            tensao, 
            data_hora 
        FROM vw_medicoes_completas 
        ORDER BY data_hora 
        DESC LIMIT 1
    """
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

@app.get("/min_max")
def minimo_maximo():
    query = """
        SELECT 
            MIN(tensao) AS tensao_min, 
            MAX(tensao) AS tensao_max, 
            MIN(corrente) AS corrente_min, 
            MAX(corrente) AS corrente_max, 
            MIN((tensao * corrente)) AS potencia_min, 
            MAX((tensao * corrente)) AS potencia_max
        FROM vw_medicoes_completas; 
    """
    resposta = executa_query_db(query)
    return [
        {
            "tensao_min": r[0],
            "tensao_max": r[1],
            "corrente_min": r[2],
            "corrente_max": r[3],
            "potencia_min": r[4],
            "potencia_max": r[5],
        }
        for r in resposta
    ]

@app.post("/medicao")
def cria_medicao(medicao: MedicaoInput):
    query = """
        INSERT INTO medicoes (id_maquina, corrente, tensao, data_hora)
        VALUES (%s, %s, %s, %s)
    """
    params = (medicao.id_maquina, medicao.corrente, medicao.tensao, datetime.now())
    executa_query_db(query, params)
    return {"mensagem": "Medicao registrada com sucesso"}

@app.put("/medicao/{id}")
def atualiza_medicao(id: int, medicao: MedicaoUpdate):
    query = """
        UPDATE medicoes
        SET corrente = %s,
            tensao = %s
        WHERE id = %s
    """

    params = (medicao.corrente, medicao.tensao, id)

    linhas_afetadas = executa_query_db(query, params)

    if linhas_afetadas == 0:
        raise HTTPException(status_code=404, detail="Medição não encontrada")

    return {"mensagem": "Medição atualizada com sucesso"}

@app.get("/lista_medicoes")
def lista_medicoes():
    query = """
        SELECT
            id_medicao,
            corrente,
            tensao,
            (tensao * corrente) AS potencia,
            data_hora
        FROM vw_medicoes_completas
        ORDER BY data_hora DESC
    """

    resultado = executa_query_db(query)

    return [
        {
            "id": r[0],
            "corrente": r[1],
            "tensao": r[2],
            "potencia": r[3],
            "data_hora": r[4]
        }
        for r in resultado
    ]

@app.delete("/deletahist/{id}")
def deleta_historico(id: int):
    query = """
        DELETE FROM medicoes
        WHERE id = %s
    """

    params = (id,)

    linhas_afetadas = executa_query_db(query, params)

    if linhas_afetadas == 0:
        raise HTTPException(status_code=404, detail="Registro não encontrado")

    return {"mensagem": "Deletado com sucesso"}

