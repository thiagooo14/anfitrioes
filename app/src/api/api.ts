import axios, { AxiosResponse } from 'axios';
import { Acomodacao } from '../types/acomodacao';

const url = `http://127.0.0.1:5000/acomodacoes`;

export const getAcomodacoes = async (): Promise<Acomodacao[]> => {
  try {
    const response: AxiosResponse<Acomodacao[]> = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('erro no metodo GET da API', error);
    throw error;
  }
}