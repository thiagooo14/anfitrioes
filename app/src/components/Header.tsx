// import React from 'react';

import {
  Box,
  useMediaQuery,
  Link,
  Button,
  Drawer,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import logo from '../assets/logo.png';

const Header = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  return (
    <Box
      sx={{
        bgcolor: 'rgba(255, 255, 255, 0.9)',
        paddingX: { xs: 4, md: 16 },
        paddingY: 4,
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        transition: 'top 0.3s ease',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link href='/' underline='none'>
          <Box
            component='img'
            src={logo}
            alt='Logo'
            sx={{ height: { xs: 24, sm: 48 } }}
          />
        </Link>
        {isMobile ? (
          <>
            <IconButton
              onClick={() => setOpen(true)}
              aria-label='Abrir menu'
              sx={{ variant: 'ghost' }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer open={open} onClose={() => setOpen(false)}>
              <Box sx={{ width: 280 }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                    alignItems: 'center',
                    padding: '1rem',
                  }}
                >
                  <Button
                    variant='text'
                    href='/'
                    sx={{ width: '100%', color: 'black' }}
                  >
                    Acomodações
                  </Button>
                  <Button
                    variant='text'
                    href='/liked'
                    sx={{ width: '100%', color: 'black' }}
                  >
                    Salvos
                  </Button>
                </Box>
              </Box>
            </Drawer>
          </>
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 4,
            }}
          >
            <Button variant='text' href='/' sx={{ color: 'black' }}>
              Acomodações
            </Button>{' '}
            <Button variant='text' href='/salvo' sx={{ color: 'black' }}>
              Salvos
            </Button>{' '}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Header;
