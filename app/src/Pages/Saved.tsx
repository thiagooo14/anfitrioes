import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import SearchBar from '../components/SearchBar';
import { getAcomodacoes } from '../api/api';
import { Acomodacao } from '../types/acomodacao';
import CardAcomodacao from '../components/CardAcomodacoes';

function Saved() {
  const [acomodacoes, setAcomodacoes] = useState<Acomodacao[]>([]);
  const [hasFavorites, setHasFavorites] = useState(false);
  const [cidade, setCidade] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAcomodacoes(cidade);
      const favoritedStates = JSON.parse(
        localStorage.getItem('favoritedStates') || '{}'
      );
      const filteredData = data.filter(
        (acomodacao: Acomodacao) => favoritedStates[acomodacao.id]
      );
      setAcomodacoes(filteredData);

      setHasFavorites(filteredData.length > 0);
    };

    fetchData();
  }, [cidade]);

  return (
    <Box padding={2}>
      {!hasFavorites ? (
        <Typography textAlign={'center'} pt={15} variant='h3'>
          Sem acomodações salvas no favorito
        </Typography>
      ) : (
        <>
          <SearchBar value={cidade} onChange={setCidade} />
          {/* {acomodacoes.length === 0 && (
            <Typography textAlign={'center'} pt={15} variant='h3'>
              sem resultados para a sua busca
            </Typography>
          )} */}
          <CardAcomodacao acomodacoes={acomodacoes} />
        </>
      )}
    </Box>
  );
}

export default Saved;