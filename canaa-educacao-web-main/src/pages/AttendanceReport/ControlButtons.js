import React from "react";
import {
    Grid,
    Button
} from '@material-ui/core';

export default function ControlButtons({ issueReport }) {
    return (
        <>
            <Grid item sm={5} md={4} lg={3} xl={2}>
                <Button fullWidth variant='outlined' style={{ backgroundColor: '#CFCFCF' }}>
                    Cancelar
                </Button>
            </Grid>

            <Grid item sm={5} md={4} lg={3} xl={2}>
                <Button fullWidth variant='outlined' onClick={issueReport} style={{ backgroundColor: '#FBCC08' }}>
                    Emitir Relatório
                </Button>
            </Grid>
        </>
    );
}