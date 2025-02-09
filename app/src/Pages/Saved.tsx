import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import SearchBar from '../components/SearchBar';
import { getAcomodacoes } from '../api/api';
import { Acomodacao } from '../types/acomodacao';
import CardAcomodacao from '../components/CardAcomodacoes';

function Saved() {
  const [acomodacoes, setAcomodacoes] = useState<Acomodacao[]>([]);
  const [hasFavorites, setHasFavorites] = useState(false); // Novo estado

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAcomodacoes();
      const favoritedStates = JSON.parse(localStorage.getItem('favoritedStates') || '{}');
      const filteredData = data.filter((acomodacao: Acomodacao) => favoritedStates[acomodacao.id]);
      setAcomodacoes(filteredData);

      // Verifica se há algum favorito após filtrar
      setHasFavorites(filteredData.length > 0); 
    };

    fetchData();
  }, []);

  return (
    <Box padding={2}>
      {/* Condicionalmente renderiza a mensagem ou os cards */}
      {!hasFavorites ? ( // Usa o novo estado hasFavorites
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