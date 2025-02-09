import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Stack,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';

import { Acomodacao } from '../types/acomodacao';

interface CardAcomodacoesProps {
  acomodacoes: Acomodacao[];
}

const CardAcomodacoes = ({ acomodacoes }: CardAcomodacoesProps) => {
  const navigate = useNavigate();
  const [favoritedStates, setFavoritedStates] = useState<{
    [id: number]: boolean;
  }>(() => {
    const storedFavorites = localStorage.getItem('favoritedStates');
    return storedFavorites ? JSON.parse(storedFavorites) : {};
  });

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoritedStates');
    if (storedFavorites) {
      setFavoritedStates(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favoritedStates', JSON.stringify(favoritedStates));
  }, [favoritedStates]);

  const handleFavorite = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setFavoritedStates({
      ...favoritedStates,
      [id]: !favoritedStates[id] || false,
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
      }}
    >
      <Grid container spacing={4}>
        {acomodacoes.map((acomodacao) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={acomodacao.id}>
            <Card
              sx={{
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                borderRadius: '12px',
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)',
                },
              }}
              onClick={() => navigate(`/acomodacao/${acomodacao.id}`)}
            >
              <Box sx={{ position: 'relative', height: '20rem' }}>
                <CardMedia
                  component='img'
                  image={acomodacao.imagem}
                  alt={acomodacao.nome}
                  sx={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.02)',
                    },
                  }}
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: '2px',
                    right: '2px',
                    backgroundColor: 'transparent',
                    '&:hover': {
                      transform: 'scale(1.2)',
                    },
                  }}
                  onClick={(e) => handleFavorite(e, acomodacao.id)}
                >
                  {favoritedStates[acomodacao.id] ? (
                    <FavoriteIcon sx={{ color: '#E63946' }} />
                  ) : (
                    <FavoriteBorderIcon sx={{ color: '#FFFFFF80' }} />
                  )}
                </IconButton>
              </Box>
              <CardContent sx={{ padding: '1rem' }}>
                <Stack spacing={1}>
                  <Typography variant='body2' color='gray.600'>
                    {acomodacao.localizacao}
                  </Typography>
                  <Typography variant='h6' fontWeight='semibold'>
                    {acomodacao.nome}
                  </Typography>
                  <Typography
                    variant='h5'
                    fontWeight='bold'
                    color='secondary.400'
                  >
                    R$ {acomodacao.preco_noite.toFixed(2)} / noite
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CardAcomodacoes;
