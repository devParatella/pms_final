import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as React from 'react';

const getStyles = (status) => {
  switch (status) {
    case 'Livre':
      return {
        borderColor: 'green',

        backgroundColor: '#e8f5e9', // Fundo verde claro
      };
    case 'Ocupada':
      return {
        borderColor: 'red',
        backgroundColor: '#ffebee', // Fundo vermelho claro
      };
    case 'Saída':
      return {
        borderColor: 'orange',
        backgroundColor: '#fff3e0', // Fundo laranja claro
      };
    default:
      return {
        borderColor: 'grey',
        backgroundColor: '#f5f5f5', // Fundo cinza claro
      };
  }
};

export default function OutlinedCard({ number, status, empresa, nome, Checkin, Checkout, onclick }) {
  const styles = getStyles(status);

  return (
    <>
    <Box >
        {/* <Button size="small"></Button> */}
      <Card variant="outlined" sx={{  maxWidth: 180, maxHeight: 177 ,borderColor: styles.borderColor ,borderWidth: 3,height: '100%',transition: 'transform 0.3s ease','&:hover': {
      transform: 'scale(1.35)',
    },}}>
        <CardContent sx={{  padding: 1 }}>
          {/* Título do card com fundo condicional */}
          <Typography
            gutterBottom
            sx={{ 
              backgroundColor: styles.backgroundColor, 
              color: 'text.primary', 
              fontSize: 16, 
            }}
          >
            Suíte {number} - {status}
          </Typography>
          <Typography
             sx={{ 
             backgroundColor: styles.backgroundColor, 
             color: 'text.primary', 
             fontSize: 10, 
            }}>
          Entrada{Checkin}   Saída{Checkout} 
          </Typography>
          <Typography sx={{ 
             backgroundColor: styles.backgroundColor, 
             color: 'text.primary', 
             fontSize: 12, 
            }}>
          {nome} 
          </Typography>
          <Typography variant="body2">
          {empresa}
          </Typography>

          <Typography variant="body2">
          Consumo
          </Typography>
          <Typography variant="body2">
          Lavanderia
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Extrato</Button><Button size="small">Checkout</Button>
        </CardActions>
      </Card>
    </Box>
    </>
  );
}
