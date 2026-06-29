import dotenv
import os
import psycopg2

dotenv.load_dotenv()

# Variáveis de conexão
ENDERECO = os.getenv("ENDERECO")        # host
PORTA = int(os.getenv("PORTA"))         # porta
DATABASE = os.getenv("DATABASE")        # nome do banco
USUARIO = os.getenv("USUARIO")          # usuário
SENHA = os.getenv("SENHA")              # senha

def executa_query_db(query, params=None):
    """
    Executa qualquer query no PostgreSQL.
    - SELECT retorna os resultados
    - INSERT/UPDATE/DELETE retorna número de linhas afetadas
    """
    connection = None
    cursor = None

    try:
        connection = psycopg2.connect(
            host=ENDERECO,
            port=PORTA,
            database=DATABASE,
            user=USUARIO,
            password=SENHA
        )

        cursor = connection.cursor()
        cursor.execute(query, params)

        # Se for SELECT, retorna todos os resultados
        if query.strip().upper().startswith("SELECT"):
            return cursor.fetchall()

        # Para INSERT/UPDATE/DELETE
        connection.commit()
        return cursor.rowcount

    except Exception as e:
        print(f"Erro ao executar query no banco: {e}")
        raise e

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()