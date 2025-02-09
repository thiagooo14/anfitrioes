import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import SearchBar from '../components/SearchBar';
import { getAcomodacoes } from '../api/api';
import { Acomodacao } from '../types/acomodacao';
import CardAcomodacao from '../components/CardAcomodacoes';

function Saved() {
  const [acomodacoes, setAcomodacoes] = useState<Acomodacao[]>([]);
  const [hasFavorites, setHasFavorites] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAcomodacoes();
      const favoritedStates = JSON.parse(localStorage.getItem('favoritedStates') || '{}');
      const filteredData = data.filter((acomodacao: Acomodacao) => favoritedStates[acomodacao.id]);
      setAcomodacoes(filteredData);

      setHasFavorites(filteredData.length > 0); 
    };

    fetchData();
  }, []);

  return (
    <Box padding={2}>
      {!hasFavorites ? ( 
        <Typography variant="h6" color="textSecondary" align="center" sx={{ mt: 2 }}>
          Nada salvo.
        </Typography>
      ) : (
        <>
          <SearchBar />
          <CardAcomodacao acomodacoes={acomodacoes} />
        </>
      )}
    </Box>
  );
}

export default Saved;