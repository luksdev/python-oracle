from flask import Flask, Response, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import json
import cx_Oracle
import config

username = 'system'
password = 'ledux'
ip = 'localhost'
port = 1521
SID = 'xe'
dsn_tns = cx_Oracle.makedsn(ip, port, SID)
encoding = 'UTF-8'

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = ('oracle+cx_oracle://system:ledux@' +
            dsn_tns)

db = SQLAlchemy(app)

class Usuario(db.Model):
    login = db.Column(db.String(50))
    cpf = db.Column(db.String(14), primary_key = True)
    senha = db.Column(db.String(100))

    # db.create_all()
    # print('Cadastrado')
    def to_json(self):
        return {"login": self.login, "cpf": self.cpf , "senha": self.senha}

@app.route("/")
def home():
    connection = cx_Oracle.connect('system', 'ledux', dsn_tns)
    return jsonify(status='success', db_version=connection.version)

# Selecionar Tudo
@app.route("/usuarios", methods=["GET"])
def seleciona_usuarios():
    usuarios_objetos = Usuario.query.all()
    usuarios_json = [usuario.to_json() for usuario in usuarios_objetos]

    return gera_response(200, "usuarios", usuarios_json)

# Selecionar Individual
@app.route("/usuario/<id>", methods=["GET"])
def seleciona_usuario(id):
    usuario_objeto = Usuario.query.filter_by(id=id).first()
    usuario_json = usuario_objeto.to_json()

    return gera_response(200, "usuario", usuario_json)


# Cadastrar
@app.route("/usuario", methods=["POST"])
def cria_usuario():
    body = request.get_json()

    try:
        usuario = Usuario(login=body["login"], cpf=body["cpf"] , senha=body["senha"])
        db.session.add(usuario)
        db.session.commit()
        return gera_response(201, "usuario", usuario.to_json(), "Criado com sucesso")
    except Exception as e:
        print('Erro', e)
        return gera_response(400, "usuario", {}, "Erro ao cadastrar")


# Atualizar
@app.route("/usuario/<id>", methods=["PUT"])
def atualiza_usuario(id):
    usuario_objeto = Usuario.query.filter_by(id=id).first()
    body = request.get_json()

    try:
        if ('login' in body):
            usuario_objeto.login = body['login']
        if ('senha' in body):
            usuario_objeto.senha = body['senha']
        if ('cpf' in body):
            usuario_objeto.cpf = body['cpf']

        db.session.add(usuario_objeto)
        db.session.commit()
        return gera_response(200, "usuario", usuario_objeto.to_json(), "Atualizado com sucesso")
    except Exception as e:
        print('Erro', e)
        return gera_response(400, "usuario", {}, "Erro ao atualizar")


# Deletar
@app.route("/usuario/<id>", methods=["DELETE"])
def deleta_usuario(id):
    usuario_objeto = Usuario.query.filter_by(id=id).first()

    try:
        db.session.delete(usuario_objeto)
        db.session.commit()
        return gera_response(200, "usuario", usuario_objeto.to_json(), "Deletado com sucesso")
    except Exception as e:
        print('Erro', e)
        return gera_response(400, "usuario", {}, "Erro ao deletar")


def gera_response(status, nome_do_conteudo, conteudo, mensagem=False):
    body = {}
    body[nome_do_conteudo] = conteudo

    if (mensagem):
        body["mensagem"] = mensagem

    return Response(json.dumps(body), status=status, mimetype="application/json")


app.run(debug=True)
