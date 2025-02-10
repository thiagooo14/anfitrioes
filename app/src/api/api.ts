import axios, { AxiosResponse } from 'axios';
import { Acomodacao } from '../types/acomodacao';

const url = `http://127.0.0.1:5000/acomodacoes`;

export const getAcomodacoes = async (cidade?: string): Promise<Acomodacao[]> => {
  try {
    const response: AxiosResponse<Acomodacao[]> = await axios.get(!cidade ? url : `${url}?cidade=${cidade}` );
    return response.data;
  } catch (error) {
    console.error('erro no metodo GET da API', error);
    throw error;
  }
}

export const getAcomodacaoId = async (id: number): Promise<Acomodacao | null> => {
  try {
    const response: AxiosResponse<Acomodacao> = await axios.get(`${url}/${id}`);
    return response.data;
  } catch (error) {
    console.error('erro no metodo GET da API', error);
    throw error;
  }
};
