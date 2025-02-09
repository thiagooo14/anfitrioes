import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  IconButton,
  CardMedia,
  Stack,
  Button,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { getAcomodacaoId } from '../api/api';
import { Acomodacao } from '../types/acomodacao';

const AcomodacaoDetalhes = () => {
  const { id } = useParams<{ id: string }>();
  const [acomodacao, setAcomodacao] = useState<Acomodacao | null>(null);
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

  useEffect(() => {
    const fetchAcomodacao = async () => {
      const acomodacaoData = await getAcomodacaoId(Number(id));
      setAcomodacao(acomodacaoData);
    };

    fetchAcomodacao();
  }, [id]);

  return (
    <Box
      display='flex'
      maxWidth={{ xs: '100%', md: '60%' }}
      mx='auto'
      px={{ xs: 6, md: 0 }}
      p={4}
      flexDirection='column'
      gap={6}
    >
      {!acomodacao ? (
        <Typography>Acomodação não encontrada.</Typography>
      ) : (
        <>
          <Box position='relative' flex={{ md: 1 }}>
            <CardMedia
              component='img'
              image={acomodacao.imagem}
              alt={acomodacao.nome}
              sx={{
                borderRadius: '12px',
                objectFit: 'cover',
                maxHeight: '400px',
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
          <Stack flex={1} alignItems='flex-start' spacing={2}>
            <Grid
              container
              justifyContent='space-between'
              alignItems='center'
              display={{ xs: 'none', md: 'flex' }}
            >
              <Grid>
                <Typography variant='h5' fontWeight='bold' color='gray.800'>
                  {acomodacao.nome}
                </Typography>
              </Grid>
              <Grid></Grid>
            </Grid>
            <Typography
              variant='h5'
              color='gray.800'
              display={{ xs: 'block', md: 'none' }}
            >
              {acomodacao.nome}
            </Typography>
            <Grid container spacing={6} mb={10}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Stack alignItems='flex-start' spacing={1}>
                  <Typography variant='body1' color='gray.700'>
                    {acomodacao.localizacao}
                  </Typography>
                  <Typography variant='body2' color='gray.600' lineHeight={1.6}>
                    Desfrute de uma estadia relaxante em nosso espaço acolhedor,
                    projetado para proporcionar conforto e conveniência. Ideal
                    para viajantes individuais, casais ou famílias, oferecemos
                    quartos bem equipados, uma cozinha completa para preparar
                    suas refeições favoritas e um banheiro impecável.
                  </Typography>
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Stack alignItems='flex-start' spacing={2}>
                  <Typography
                    variant='h6'
                    fontWeight='semibold'
                    color='secondary.400'
                  >
                    R$ {acomodacao.preco_noite.toFixed(2)} / noite
                  </Typography>
                  <Button
                    variant='contained'
                    color='primary'
                    size='large'
                    fullWidth
                    href='/'
                  >
                    Reservar Agora
                  </Button>
                </Stack>
              </Grid>
            </Grid>
            {/* <Toaster /> */}
          </Stack>
        </>
      )}
    </Box>
  );
};

export default AcomodacaoDetalhes;
