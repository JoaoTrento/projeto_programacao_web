import dotenv
import os
import psycopg2

dotenv.load_dotenv()

ENDERECO=os.getenv("ENDERECO")
PORTA=os.getenv("PORTA")
DATABASE=os.getenv("DATABASE")
USUARIO=os.getenv("USUARIO")
SENHA=os.getenv("SENHA")

def executa_query_db(query):
    try:
        connection = psycopg2.connect(
            host=ENDERECO,
            port=PORTA,
            database=DATABASE,
            user=USUARIO,
            password=SENHA
        )
        cursor = connection.cursor()
        cursor.execute(query)
        resultados = cursor.fetchall()
        return resultados
    except Exception as e:
        print(f"Erro ao conectar ao banco de dados: {e}")
        return []
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()