import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import SearchBar from '../components/SearchBar';
import { getAcomodacoes } from '../api/api';
import { Acomodacao } from '../types/acomodacao';
import CardAcomodacao from '../components/CardAcomodacoes';

function Home() {
  const [acomodacoes, setAcomodacoes] = useState<Acomodacao[]>([]);

  useEffect(() => {
    const fetchData  = async () => {
      const data = await getAcomodacoes();
      setAcomodacoes(data);
    };

    fetchData ();
  }, []);

  return (
    <Box padding={2}>
      <SearchBar />
      <CardAcomodacao acomodacoes={acomodacoes} />
    </Box>
  );
}

export default Home;
