import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    TextField,
    Grid,
    Button,
    Typography,
    Tooltip
} from '@material-ui/core';

import {
    Search,
    Delete,
    Edit
} from '@material-ui/icons';

import {
    GiTeacher
} from 'react-icons/gi';

import { DataGrid } from '@mui/x-data-grid';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import apiTraining from '../../services/apiTraining';
import Notification from '../../components/Notification/Notification';
import ConfirmDialog from '../../components/Notification/ConfirmDialog';

let allStudents = [];

const NOTIFY_INITIAL_STATE = {
    type: '',
    message: '',
    title: '',
    isOpen: false
};

const CONFIRM_DIALOG_INITIAL_STATE = {
    title: '',
    subTitle: '',
    isOpen: false
};

export default function ManagerStudent() {
    const history = useHistory();

    const [notify, setNotify] = useState(NOTIFY_INITIAL_STATE);
    const [confirmDialog, setConfirmDialog] = useState(CONFIRM_DIALOG_INITIAL_STATE);
    const [filterSearch, setFilterSearch] = useState('');

    //Por enquando os estudantes serão fisicos, entretanto, posteriormente será implementado a API
    const [students, setStudents] = useState([]);

    const btnActions = (params) => {
        const isTrained = params.row.isTrained;

        return (
            <>
                <Grid container spacing={1}>
                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4} >
                        <Button
                            variant="outlined"
                            size="small"
                            fullWidth
                            onClick={() => handleEdit(params.row.id)}
                        >
                            <Edit />
                        </Button>
                    </Grid>

                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4} >
                        <Button
                            variant="outlined"
                            size="small"
                            fullWidth
                            onClick={() => handleConfirmDelete(params.row.id)}
                        >
                            <Delete style={{ color: '#F70000' }} />
                        </Button>
                    </Grid>

                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4} >
                        <Tooltip
                            title={isTrained ? 'Estudante já treinando' : 'Treinar estudante'}
                            arrow>
                            <div>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    disabled={isTrained}
                                    fullWidth
                                    label={'Teste'}
                                    onClick={() => callTrainingApi(params.row)}
                                >
                                    <GiTeacher
                                        disabled={isTrained}
                                        size={24}
                                        style={{
                                            color: isTrained ? '#ccc' : '#93C46C'
                                        }}
                                    />
                                </Button>
                            </div>
                        </Tooltip>
                    </Grid>
                </Grid>
            </>
        );
    }

    function handleEdit(id) {
        //student será um objeto que conterá todas as informações de estudante como fullName, birthday, etc...
        const student = students.filter((studentFilter) => studentFilter.id === id)[0];
        console.log(student);


        history.push(
            '/student-edit/' + id
        );
    }

    function closeConfirmDialog() {
        setConfirmDialog(prev => ({
            ...prev,
            isOpen: false
        }));
    }

    function handleConfirmDelete(id) {
        setConfirmDialog({
            title: 'O estudante será deletado do sistema',
            subTitle: 'Após a confirmação não será mais possível desfazer a operação.',
            onConfirm: () => { closeConfirmDialog(); handleDelete(id) },
            isOpen: true
        });
    }

    function handleDelete(id) {
        try {
            api.delete(`students/${id}`);

            allStudents = allStudents.filter(student => student.id !== id);
            setStudents(allStudents);
        } catch (err) {
            setNotify({
                type: 'error',
                message: 'O sistema apresentou um erro ao tentar deletar o estudante. Por favor, saia e entre no sistema novamente.',
                title: 'Falha ao deletar',
                duration: 20000, //Tempo para ele dar um erro ou treinar com sucesso
                isOpen: true
            });
        }
    }

    function ErrorTrainigElement(message, imgSource) {
        return (
            <div style={{ textAlign: 'center' }}>
                {message}:
                <img alt='Imagem com erro' src={imgSource} width={200} />
            </div>
        )
    }

    function callTrainingApi(student) {
        const dataRequest = {
            'email': 'string',
            'password': 'string',
        }

        setNotify({
            type: 'info',
            message: 'Treinando estudante, tenha paciência',
            title: 'Treinando...',
            duration: 20000, //Tempo para ele dar um erro ou treinar com sucesso
            isOpen: true
        });

        apiTraining.post(`/train/${student.matriculationNumber}`, dataRequest)
            .then((response) => {
                setNotify({
                    type: 'success',
                    message: 'Estudante treinado com sucesso!',
                    title: 'Treinado',
                    duration: 2000,
                    isOpen: true
                });

            }).catch((error) => {
                //Dentro da mensagem de erro vem o link da imagem que apresentou o erro
                const detail = error.response.data.detail;

                //Para extrair basta usar um regex que seleciona todo o texto entre { e } chaves
                const regex = /(?<message>.+) {(?<link>.+)}/;
                const resultRegex = detail.match(regex);
                const groupsRegex = resultRegex.groups;

                const message = groupsRegex.message;
                const imgSource = groupsRegex.link;

                setNotify({
                    type: 'error',
                    message: ErrorTrainigElement(message, imgSource),
                    title: 'Ocorreu um erro no treinamento',
                    duration: 2000,
                    isOpen: true
                });
            });
    }

    function formatDate(date) {
        if (!(date instanceof Date))
            date = new Date(date);

        return date.toISOString().split('T')[0].split('-').reverse().join('/');
    }

    const columns = [
        {
            field: 'matriculationNumber',
            headerName: 'Matrícula',
            width: 145
        },
        {
            field: 'fullName',
            headerName: 'Primeiro nome',
            valueGetter: (params) =>
                `${params.row.fullName.split(" ")[0]}`,
            width: 180
        },
        {
            field: 'birthday',
            headerName: 'Data de nascimento',
            width: 170,
            valueGetter: (params) =>
                `${formatDate(params.value)}`
        },
        {
            field: 'phone',
            headerName: 'Telefone',
            width: 150
        },
        {
            field: 'neighborhood',
            headerName: 'Bairro',
            width: 200
        },
        {
            field: 'id',
            headerName: '',
            renderCell: btnActions,
            width: 250
        }
    ];

    function handleSearch() {
        setStudents(
            allStudents
                .filter(student =>
                    student.matriculationNumber === filterSearch ||
                    student.fullName.toLowerCase().includes(filterSearch.toLowerCase())
                )
        );
    }

    useEffect(() => {
        async function loadStudents() {
            allStudents = await getAllStudents();
            setStudents(allStudents);
        }

        loadStudents();
    }, []);



    async function getAllStudents() {
        //?filter={"include":["pictures"]} --> Adiciona as fotos ao objeto
        const allStudents = await api.get('students?filter={"include":["pictures"]}');
        return allStudents.data;
    }

    useEffect(() => {
        if (filterSearch.length === 0) {
            setStudents(allStudents);
        }
    }, [filterSearch]);

    return (
        <Card style={{ margin: 30 }}>
            <CardContent>
                <Grid
                    container
                    justifyContent="center"
                    alignItems='center'
                    spacing={1}
                >
                    <Grid item xs={12} sm={6} md={5} lg={4} xl={2} style={{ marginBottom: 50 }}>
                        <Button
                            fullWidth
                            variant="outlined"
                            style={{ backgroundColor: '#93C46C' }}
                            onClick={() => history.push('/student-register')}
                        >
                            Cadastrar novo estudante
                        </Button>
                    </Grid>

                    <Grid item xs={9} sm={10} md={11} lg={11} xl={11}>
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            label="Pesquise o nome ou a matrícula do estudante"
                            value={filterSearch}
                            onChange={(e) => { setFilterSearch(e.target.value); }}
                        />
                    </Grid>

                    <Grid item xs={3} sm={2} md={1} lg={1} xl={1}>
                        <Button
                            variant='outlined'
                            fullWidth style={{ height: 40, backgroundColor: "#FBCC08" }}
                            onClick={handleSearch}
                        >
                            <Search />
                        </Button>
                    </Grid>

                    {
                        students.length !== 0 ?
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ height: 400, width: '100%' }}>

                                <DataGrid
                                    columns={columns}
                                    getRowId={(row) => row.id}
                                    rows={students}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                />
                            </Grid> : <Typography style={{ marginTop: 30 }} variant='h6'>Ainda não há estudantes cadastrados</Typography>
                    }

                </Grid>
            </CardContent>

            <Notification notify={notify} setNotify={setNotify} />
            <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
        </Card >


    );
}   