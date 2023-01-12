import React, { useState } from 'react';
import {
    Grid,
    Button,
    FormControlLabel,
    TextField
} from '@material-ui/core';

import TableRelatives from './TableRelatives.js';
import { useRelatives } from '../../../contexts/studentsContext.js';
import { IOSSwitch } from '../../../components/IOSSwitch/Switch';
import Notification from '../../../components/Notification/Notification';
import { classes } from './styles.js';
import MaskInput from '../../../components/MaskInput/index.js';

const NOTIFY_INITIAL_STATE = {
    type: '',
    message: '',
    title: '',
    isOpen: false
};

export default function Relatives() {
    //Estados dos campos
    const [fullName, setFullName] = useState('');
    const [relationship, setRelationship] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [addressNumber, setAddressNumber] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [isLegalResponsible, setIsLegalResponsible] = useState(false);
    const [emailUserTobeEdited, setEmailUserTobeEdited] = useState('');

    const [notify, setNotify] = useState(NOTIFY_INITIAL_STATE);

    let relatives = useRelatives();

    function getRelativeFromStates() {
        return {
            email,
            phone,
            address,
            addressNumber,
            fullName,
            relationship,
            neighborhood,
            isLegalResponsible,
        };
    }

    function cleanFields() {
        setEmailUserTobeEdited('');
        setFullName('');
        setEmail('');
        setRelationship('');
        setPhone('');
        setAddress('');
        setAddressNumber('');
        setNeighborhood('');
        setIsLegalResponsible(false);
    }

    function onSubmit() {
        try {
            emailUserTobeEdited === '' ?
                handleAddRelatives() : handleEditRelatives()
        } catch (error) {
            setNotify({
                type: 'error',
                message: error.message,
                title: '',
                isOpen: true
            });
        }

    }

    function handleAddRelatives() {
        relatives.add(getRelativeFromStates());
        cleanFields();
    }

    function handleEditRelatives() {
        relatives.put(getRelativeFromStates(), emailUserTobeEdited);
        cleanFields();
    }

    function loadRelative(email) {
        const relative = relatives.getRelative(email);

        setFullName(relative.fullName);
        setEmail(relative.email);
        setRelationship(relative.relationship);
        setPhone(relative.phone);
        setAddress(relative.address);
        setAddressNumber(relative.addressNumber);
        setNeighborhood(relative.neighborhood);
        setIsLegalResponsible(relative.isLegalResponsible);

        setEmailUserTobeEdited(email);
    }

    function deleteRelative(email) {
        relatives.remove(email);
    }

    return (
        <>
            <Grid container style={{ marginTop: '30px' }} spacing={1} direction='row'>
                <Grid item xs={12} sm={12} md={8} lg={4} xl={4}>
                    <TextField
                        required
                        style={classes.input}
                        size="small"
                        label="Nome Completo"
                        variant="outlined"
                        value={fullName}
                        onChange={(e) => { setFullName(e.target.value) }}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={4} lg={2} xl={2}>
                    <TextField
                        required
                        style={classes.input}
                        size="small"
                        label="Parentesco"
                        variant="outlined"
                        value={relationship}
                        onChange={(e) => { setRelationship(e.target.value) }}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={8} lg={4} xl={4}>
                    <TextField
                        required
                        style={classes.input}
                        size="small"
                        label="Endereço de e-mail"
                        variant="outlined"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={4} lg={2} xl={2}>
                    <MaskInput
                        mask="(99) 99999-9999"
                        value={phone}
                        onChange={setPhone}
                        required
                        style={classes.input}
                        size="small"
                        valueOnlyNumbers={true}
                        label="Nº do telefone"
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
            </Grid>

            <Grid container spacing={1} direction="row" >
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <TextField
                        required
                        style={classes.input}
                        size="small"
                        label="Logradouro"
                        variant="outlined"
                        value={address}
                        onChange={(e) => { setAddress(e.target.value) }}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                    <TextField
                        required
                        style={classes.input}
                        size="small"
                        label="Número da casa"
                        variant="outlined"
                        value={addressNumber}
                        onChange={(e) => { setAddressNumber(e.target.value) }}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                    <TextField
                        required
                        style={classes.input}
                        size="small"
                        label="Bairro"
                        variant="outlined"
                        value={neighborhood}
                        onChange={(e) => { setNeighborhood(e.target.value) }}
                        fullWidth
                    />
                </Grid>


                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Button
                        style={{ backgroundColor: "#f5d72f", color: 'black', fontWeight: 'bold' }}
                        variant="contained"
                        color="primary"
                        onClick={() => onSubmit()}
                    >
                        {
                            emailUserTobeEdited === '' ? "Adicionar" : "Editar"
                        }
                    </Button>

                    <FormControlLabel style={classes.formControlLabel}
                        control={<IOSSwitch checked={isLegalResponsible} onChange={(e) => setIsLegalResponsible(!isLegalResponsible)} />}
                        label={<strong>Responsável Legal</strong>}
                        labelPlacement="start"
                    />
                </Grid>

                {
                    relatives.getRelatives().length !== 0 ?
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <TableRelatives
                                relatives={relatives.getRelatives()}
                                deleteRelative={deleteRelative}
                                loadRelative={loadRelative}
                            />
                        </Grid> : false
                }

            </Grid>


            <Notification notify={notify} setNotify={setNotify} />
        </>

    );
}