import { useEffect, useState } from 'react'
import ActionAreaCard from './card';
import { getAllCharacters } from '../servicios/rymService';
import { Box, Modal, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Encabezado from './encabezado';
import Footer from './PieDePagina';
 
const CharacterModal = ({character, open, onClose}) => {
    if(!character) return null;
 
    const boxProps = {
        position: 'absolute',
        width: 400,
        bgcolor: 'background.paper',
        border: '3px solid #0000',
        boxShadow: 24,
        p: 4,
        borderRadius: 2
    }
 
    return (
        <Modal open={open} onClose={onClose} sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}
          >
            <Box sx={boxProps}>
                <img src={character.image} width="100%" alt={character.name}/>
                <Typography variant='h2' component="h2">
                    {character.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Especie: {character.species}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Estatus: {character.status}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Genero: {character.gender}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Origen: {character.origin.name}
                </Typography>
            </Box>
        </Modal>
    )
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));
 
 
export default function RickAndMorty(){
    const [data, setData] = useState([]);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [info, setInfo] = useState(null);
    const apiUrl = "https://rickandmortyapi.com/api";
    const fetchMoreData = async (url) => {
        const response = await getAllCharacters(url);
        console.log(response);
        setData(response.results);
        setInfo(response.info);
    };

    useEffect(() => {
        async function fetchData(){
            const response = await getAllCharacters(`${apiUrl}/character/`);
            setData(response.results);
            setInfo(response.info);
        }
        fetchData();
    }, [])

    const handleOpenModal = (character) => {
        setSelectedCharacter(character);
    }
 
    const handleCloseModal = () => {
        setSelectedCharacter(null);
    }
 
    return(
        <div>
            <Box sx={{ mb: 1, textAlign: 'center', p: 1 }}>
                <Encabezado></Encabezado>
                <Stack spacing={2} direction="row" justifyContent="center" sx={{ mt: 2 }}>
                    <Button variant="contained" onClick={ () => fetchMoreData(info.prev) } disabled={!info?.prev} >Pagina Anterior</Button>
                    <Button variant="contained" onClick={ () => fetchMoreData(info.next) } disabled={!info?.next} >Pagina Siguiente</Button>
                </Stack>
            </Box>
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Grid container spacing={3}>
                {data.map( (element) => (
                        <Grid size="auto">
                            <Item>
                                <ActionAreaCard 
                                    imagen= {element.image}
                                    titulo={element.name} 
                                    cuerpo={`Especie: ${element.species}, Estado: ${element.status}`}
                                    onClick = { () => handleOpenModal(element)}
                                /> 
                            </Item>
                        </Grid>
                    ) )
                }
                </Grid>

                <Box 
                    sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}
                >
                    <Stack spacing={2} direction="row">
                        <Button variant="contained" onClick={ () => fetchMoreData(info.prev) } disabled={!info?.prev} >Pagina Anterior</Button>
                        <Button variant="contained" onClick={ () => fetchMoreData(info.next) } disabled={!info?.next} >Pagina Siguiente</Button>
                    </Stack>
                </Box>
            </Box>

            <CharacterModal
                character={selectedCharacter}
                open={!!selectedCharacter}
                onClose={handleCloseModal}
            />

            <Box sx={{ mb: 1, textAlign: 'center'}}>
                <Footer></Footer>
            </Box>
        </div>
    )
}