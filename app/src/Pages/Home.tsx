import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import SearchBar from '../components/SearchBar';
import { getAcomodacoes } from '../api/api';
import { Acomodacao } from '../types/acomodacao';
import CardAcomodacao from '../components/CardAcomodacoes';

function Home() {
  const [acomodacoes, setAcomodacoes] = useState<Acomodacao[]>([]);
  const [cidade, setCidade] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAcomodacoes(cidade);
      setAcomodacoes(data);
    };

    fetchData();
  }, [cidade]);

  return (
    <Box padding={2}>
      <SearchBar value={cidade} onChange={setCidade} />
      {acomodacoes.length === 0 && <Typography>sem acomodacao</Typography>}
      <CardAcomodacao acomodacoes={acomodacoes} />
    </Box>
  );
}

export default Home;
