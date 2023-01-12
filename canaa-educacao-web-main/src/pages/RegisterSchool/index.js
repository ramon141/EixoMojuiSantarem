
import React, { useState } from 'react';
import {
    Grid,
    Card,
    CardContent,
    Button,
    Typography,
    TextField
} from '@material-ui/core';
import { classes } from './classes';
import api from '../../services/api';
import { schoolFactory } from '../../utils/school';
import { useHistory } from 'react-router-dom';

export default function RegisterSchool() {
    const history = useHistory();

    const [neighborhood, setNeighborhood] = useState('');
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');

    const handleCancel = () => {
        history.push('/manager-student');
    }

    const handleSubmit = async () => {
        let school = schoolFactory();
        school.address = address;
        school.name = name;
        school.neighborhood = neighborhood;
        try {
            await api.post('/schools', school);
            alert('Sucesso, cadastrado!');
            setName('');
            setAddress('');
            setNeighborhood('');
        } catch (e) {
            alert('Algo deu errado');
            console.error(e);
        }
    }
    return (
        <Grid container justifyContent='center' spacing={1} style={classes.gridRoot}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <Card style={classes.card}>
                    <CardContent>
                        <Typography variant='h5' style={classes.textTitle} align='center'>
                            Cadastrar escola
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <TextField
                                    size='small'
                                    variant="outlined"
                                    label="Nome da Escola"
                                    fullWidth
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12} md={7} lg={7}>
                                <TextField
                                    size='small'
                                    label="Logradouro"
                                    variant="outlined"
                                    fullWidth
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12} md={5} lg={5}>
                                <TextField
                                    size='small'
                                    variant="outlined"
                                    label="Bairro"
                                    fullWidth
                                    value={neighborhood}
                                    onChange={(e) => setNeighborhood(e.target.value)}
                                />
                            </Grid>

                        </Grid>
                    </CardContent>
                </Card>
            </Grid>

            <Grid container justifyContent='center' spacing={2} style={classes.containerButtons}>

                <Grid item xs={12} sm={4} md={3} lg={3} xl={2}>
                    <Button
                        fullWidth
                        style={classes.btnCancel}
                        variant='outlined'
                        onClick={handleCancel}
                    >
                        Cancelar
                    </Button>
                </Grid>

                <Grid item xs={12} sm={4} md={3} lg={3} xl={2}>
                    <Button
                        fullWidth
                        style={classes.btnSave}
                        variant='outlined'
                        onClick={handleSubmit}
                    >
                        SALVAR
                    </Button>
                </Grid>

            </Grid>
        </Grid>
    );
}
