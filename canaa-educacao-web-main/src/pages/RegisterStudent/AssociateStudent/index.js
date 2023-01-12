import React from 'react';
import {
    Grid,
    Card,
    CardContent,
    Button,
    Typography
} from '@material-ui/core';

import { useStudent } from '../../../contexts/studentsContext';

import Relatives from '../RegisterRelatives/';
import { classes } from './classes';

export default function AssociateStudent({ onSubmit: submitNewStudent, onCancel }) {

    const {
        scholarityLevel,
    } = useStudent();

    return (
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
            {
                scholarityLevel !== "Ensino Superior" ?
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" align="center" style={classes.textTitle}>
                                    Cadastrar responsável do estudante
                                </Typography>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Relatives />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid> : false
            }

            <Grid container justifyContent='center' spacing={2} style={classes.containerButtons}>

                <Grid item xs={12} sm={4} md={3} lg={3} xl={2}>
                    <Button
                        fullWidth
                        style={{ backgroundColor: '#cfcfcf' }}
                        variant='outlined'
                        onClick={onCancel}
                    >
                        CANCELAR
                    </Button>
                </Grid>

                <Grid item xs={12} sm={4} md={3} lg={3} xl={2}>
                    <Button
                        fullWidth
                        style={{ backgroundColor: '#FBCC08' }}
                        variant='outlined'
                        onClick={submitNewStudent}
                    >
                        SALVAR
                    </Button>
                </Grid>

            </Grid>

        </Grid>
    );
}