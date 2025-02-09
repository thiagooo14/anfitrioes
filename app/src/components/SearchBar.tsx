import { useState } from 'react';
import { TextField, Box } from '@mui/material';

const SearchBar = () => {
  const [cidade, setCidade] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCidade(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
      <TextField
        label="Pesquisar Cidade"
        variant="outlined"
        value={cidade}
        onChange={handleChange}
      />
    </Box>
  );
};

export default SearchBar;
