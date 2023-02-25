import {Avatar, Box, Container, Divider, List, ListItem, ListItemAvatar, ListItemText, Paper} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

export interface Participante {
    nombre: string;
}
export default function ListaParticipantes({participantes} : {participantes: Participante[]}){
    return <Container maxWidth="sm" style={{marginBottom: '20px'}}>
        <Paper elevation={3}>
        <List>
            {participantes.map((participante, index) => {
                return <ListItem key={index}>
                    <ListItemAvatar>
                        <Avatar>
                            <PersonIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={participante.nombre}/>
                    <Divider/>
                </ListItem>
            })
            }
        </List>
        </Paper>
    </Container>
}