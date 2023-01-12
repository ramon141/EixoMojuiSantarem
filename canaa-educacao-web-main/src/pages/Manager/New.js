import React, { useCallback, useState } from 'react';
import {
    Card,
    CardContent,
    TextField,
    Grid,
    Button,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@material-ui/core';
import { classes } from './classes';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import MaskInput from '../../components/MaskInput';

const randomPasswordGenerator = (len = 8) => {
    const string = 'abcdefghijklimnoqrstuvxyzABCDEFGHIJKLIMNOQRSTUVXYZ@!$%-Ç#?';
    let pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += string.charAt(Math.floor(Math.random() * string.length));
    }
    return pwd;
}

export default function New() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const history = useHistory();
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async () => {
        if (name === '' || password === '' | email === "") return alert('Nenhum dos campos pode ser vazio!');
        try {
            const response = await api.post('/admin/users', {
                name, password, telefone: phone, role, email
            });
            console.log(response.data)
            alert('Funcionário criado')
            history.push('/manager-student')
        } catch (e) {
            console.error(e)
            console.log(e.response)
        }
    }
    return (
        <Grid container justifyContent='center' spacing={1} style={classes.gridRoot}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <Card style={classes.card}>
                    <CardContent>
                        <Typography variant='h5' style={classes.textTitle} align='center'>
                            Cadastrar funcionário
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={6}>
                                <TextField
                                    size='small'
                                    variant="outlined"
                                    label="Nome"
                                    fullWidth
                                    value={name}
                                    onChange={(e) => { setName(e.target.value) }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12} md={3}>
                                <FormControl
                                    fullWidth
                                    size='small'
                                    required
                                    variant='outlined'
                                    className={classes.input}
                                >
                                    <InputLabel>Perfil</InputLabel>
                                    <Select
                                        label='Perfil'
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <MenuItem value='Admin'>Admin</MenuItem>
                                        <MenuItem value='Monitor'>Monitor</MenuItem>
                                        <MenuItem value='Técnico'>Técnico</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <MaskInput
                                    mask="(99) 99999-9999"
                                    value={phone}
                                    onChange={setPhone}
                                    required
                                    className={classes.input}
                                    valueOnlyNumbers={true}
                                    size="small"
                                    label="Nº do telefone"
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12} sm={12} md={8} >
                                <TextField
                                    size='small'
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    type="email"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12} md={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: '5px' }}>
                                <TextField
                                    size='small'
                                    variant="outlined"
                                    label="Senha"
                                    fullWidth
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }}
                                />
                                <Button
                                    variant='outlined'
                                    onClick={useCallback(() => {
                                        setPassword(randomPasswordGenerator(12))
                                    }, [])}
                                >
                                    GERAR
                                </Button>
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
                        onClick={(e) => { history.push('/manager-student') }}
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
    )
}