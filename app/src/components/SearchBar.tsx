import { TextField, Box } from '@mui/material';

interface SearchBarProps {
  value: string;
  onChange: (cidade: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
      <TextField
        label='Pesquisar Cidade'
        variant='outlined'
        value={value}
        onChange={handleChange}
      />
    </Box>
  );
};

export default SearchBar;
