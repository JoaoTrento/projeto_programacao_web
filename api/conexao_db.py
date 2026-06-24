import dotenv
import os
import pymysql

dotenv.load_dotenv()

ENDERECO = os.getenv("ENDERECO")
PORTA = int(os.getenv("PORTA"))
DATABASE = os.getenv("DATABASE")
USUARIO = os.getenv("USUARIO")
SENHA = os.getenv("SENHA")


def executa_query_db(query, params=None):
    connection = None
    cursor = None

    try:
        connection = pymysql.connect(
            host=ENDERECO,
            port=PORTA,
            database=DATABASE,
            user=USUARIO,
            password=SENHA
        )

        cursor = connection.cursor()
        cursor.execute(query, params)

        if query.strip().upper().startswith("SELECT"):
            return cursor.fetchall()

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