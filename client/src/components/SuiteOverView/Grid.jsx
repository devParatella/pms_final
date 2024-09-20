import * as React from 'react';
// import Header from "../Body/Header";
import NavBar from "../Body/NavBar";
import Footer from "../Body/Footer";
import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Grid2';
import OutlinedCard from './Card';
import Legend from './Legend';
import './grid.css';
const cardStatus = ['Livre', 'Ocupada', 'Saída', 'Ocupada', 'Ocupada', 'Saída', 'Livre', 'Ocupada', 'Saída', 'Livre', 'Ocupada', 'Saída', 'Livre', 'Ocupada', 'Saída', 'Livre', 'Ocupada', 'Saída', 'Livre', 'Ocupada', 'Saída', 'Livre', 'Ocupada', 'Saída', 'Livre', 'Ocupada', 'Saída', 'Ocupada', 'Ocupada', 'Saída', 'Livre', 'Ocupada', 'Saída', 'Livre', 'Ocupada', 'Saída', 'Livre', 'Ocupada', 'Saída', 'Livre', 'Ocupada', 'Saída', 'Livre', 'Ocupada', 'Saída', 'Livre', 'Ocupada', 'Saída'];
const empresa = ["_", "Bauminas", "Manufatora", "Energisa", "Bauminas", "Manufatora", "Energisa", "Bauminas", "Manufatora", "Energisa", "Bauminas", "Manufatora", "Energisa", "Bauminas", "Manufatora", "_", "Bauminas", "Manufatora", "Energisa", "Bauminas", "Manufatora", "Energisa", "Bauminas", "Manufatora", "Energisa", "Bauminas", "Manufatora", "Energisa", "Bauminas", "Manufatora", "_", "Bauminas", "Manufatora", "Energisa", "Bauminas", "Manufatora", "Energisa", "Bauminas", "Manufatora", "Energisa", "Bauminas", "Manufatora", "Energisa", "Bauminas", "Manufatora", "_", "Bauminas", "Manufatora", "Energisa", "Bauminas", "Manufatora", "Energisa", "Bauminas", "Manufatora", "Energisa", "Bauminas", "Manufatora", "Energisa", "Bauminas", "Manufatora"]
const nome = ["_", "Manoel da Silva", "Patricio Torres", "Fernando Cabral", "Mauricio Teles", "_", "Manoel da Silva", "Patricio Torres", "Fernando Cabral", "Mauricio Teles", "_", "Manoel da Silva", "Patricio Torres", "Fernando Cabral", "Mauricio Teles", "_", "Manoel da Silva", "Patricio Torres", "Fernando Cabral", "Mauricio Teles", "_", "Manoel da Silva", "Patricio Torres", "Fernando Cabral", "Mauricio Teles", "_", "Manoel da Silva", "Patricio Torres", "Fernando Cabral", "Mauricio Teles", "_", "Manoel da Silva", "Patricio Torres", "Fernando Cabral", "Mauricio Teles", "_", "Manoel da Silva", "Patricio Torres", "Fernando Cabral", "Mauricio Teles"]
const Checkin = [" __/___/__", " 10/09/24  ", " 11/09/24  ", " 19/09/24  ", " 19/09/24  ", " 05/09/24  ", " __/___/__", " 11/09/24  ", " 19/09/24  ", " 19/09/24  ", " __/___/__", " 10/09/24  ", " 11/09/24  ", " 19/09/24  ", " 19/09/24  ", " __/___/__", " 10/09/24  ", " 11/09/24  ", " 19/09/24  ", " 19/09/24  ", " __/___/__", " 10/09/24  ", " 11/09/24  ", " 19/09/24  ", " 19/09/24  ", " 05/09/24  ", " __/___/__", " 11/09/24  ", " 19/09/24  ", " 19/09/24  ", " __/___/__", " 10/09/24  ", " 11/09/24  ", " 19/09/24  ", " 19/09/24  ", " __/___/__", " 10/09/24  ", " 11/09/24  ", " 19/09/24  ", " 19/09/24  "]
const Checkout = [" __/___/__", " 19/09/24  ", " 17/09/24  ", " 19/09/24  ", " 19/09/24  ", " 17/09/24  ", " __/___/__", " 17/09/24  ", " 19/09/24  ", " 19/09/24  ", " __/___/__", " 19/09/24  ", " 17/09/24  ", " 19/09/24  ", " 19/09/24  ", " __/___/__", " 19/09/24  ", " 17/09/24  ", " 19/09/24  ", " 19/09/24  ", " __/___/__", " 19/09/24  ", " 17/09/24  ", " 19/09/24  ", " 19/09/24  ", " 17/09/24  ", " __/___/__", " 17/09/24  ", " 19/09/24  ", " 19/09/24  ", " __/___/__", " 19/09/24  ", " 17/09/24  ", " 19/09/24  ", " 19/09/24  ", " __/___/__", " 19/09/24  ", " 17/09/24  ", " 19/09/24  ", " 19/09/24  "]

// Componente principal que inclui o Header, NavBar e Footer
function MainComponent() {

  return (
    <>
      {/* <Header /> */}
      <NavBar />
    </>
  );
}

// Componente de Grid responsivo
export default function ResponsiveGrid() {
  return (
    <>
    <div className="container">
      <MainComponent />
      <Legend />
 
      <Box sx={{ flexGrow: 1 }}>

        <Grid2
          container
          spacing={{ xs: 2, md: 1 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          justifyContent="center"
          alignItems="center"
          sx={{ margin: '15px' }}
        >

          {Array.from(Array(40)).map((_, index) => (
            <Grid2 item xs={2} sm={4} md={4} key={index}>
              <OutlinedCard
                number={index + 100}
                status={cardStatus[index]}
                Checkin={Checkin[index]}
                Checkout={Checkout[index]}
                nome={nome[index]}
                empresa={empresa[index]}
              />
            </Grid2>
          ))}
        </Grid2>
      </Box>
      <Footer />
      </div>
    </>

  );
}
