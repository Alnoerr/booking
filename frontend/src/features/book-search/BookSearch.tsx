import SearchIcon from '@mui/icons-material/Search'
import { InputAdornment, TextField } from '@mui/material'

interface Props {
  value: string
  onChange: (value: string) => void
}

export function BookSearch({ value, onChange }: Props) {
  return (
    <TextField
      value={value}
      onChange={(event) => onChange(event.target.value)}
      fullWidth
      placeholder="Название, автор или жанр"
      sx={{ mt: 3, mb: 4, maxWidth: 600, bgcolor: 'white' }}
      slotProps={{
        input: {
          startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
        },
      }}
    />
  )
}

