import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const ColorLabel = styled(Typography)(({ color }) => ({
    display: 'inline-block',
    padding: '1px 4px',
    border: `2px solid ${color}`,
    borderRadius: '4px',
    marginRight: '10px',
    background: color,
    color: 'white',

}));

const Legend = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{ margin: '15px' }}
        >
            <Box
                display="flex"
                flexWrap="wrap"
                gap={2}
                justifyContent="center"
                sx={{ marginBottom: '15px' }}
            >
                {/* Siglas */}
                <ColorLabel color="black">SL - Super Luxo</ColorLabel>
                <ColorLabel color="black">RM - Real Master</ColorLabel>
                <ColorLabel color="black">ST - Standart</ColorLabel>
                <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                >
                    {/* Legendas de Cores */}
                    <ColorLabel color="red">Ocupada</ColorLabel>
                    <ColorLabel color="green">Livre</ColorLabel>
                    <ColorLabel color="blue">Manutenção</ColorLabel>
                    <ColorLabel color="purple">SAÍDA EXTRAPOLADA</ColorLabel>
                    <ColorLabel color="gray">Cinza</ColorLabel>
                    <ColorLabel color="darkOrange">Suja</ColorLabel>
                    <ColorLabel color="brown">Reservada</ColorLabel>
                    <ColorLabel color="linear-gradient(to right, darkOrange 50%, green 50%)">
                        Camareira</ColorLabel>
                    <ColorLabel color="linear-gradient(to right, green 50%, red 50%)">
                        SAÍDA  HOJE</ColorLabel>
                </Box>
            </Box>


        </Box>
    );
};

export default Legend;
