from flask import Flask, make_response, jsonify, request
from flask_cors import CORS
from db import Acomodacoes

app = Flask(__name__)
CORS(app)

@app.route('/acomodacoes', methods=['GET'])
def get_acomodacoes():
    cidade = request.args.get('cidade')
    if cidade:
        acoms = [acom for acom in Acomodacoes if cidade.lower() in acom['localizacao'].lower()]
        return make_response(jsonify(acoms))
    return make_response(jsonify(Acomodacoes))

@app.route('/acomodacoes/<int:id>', methods=['GET'])
def get_acomodacao(id):
    acom = next((acom for acom in Acomodacoes if acom['id'] == id), None)
    if acom:
        return make_response(jsonify(acom))
    return make_response(jsonify({'error': 'Acomodação não encontrada'}), 404)

# app.run()