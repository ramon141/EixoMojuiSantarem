import React from 'react';
import {
    Grid,
    Button
} from '@material-ui/core';
import {
    Delete,
    Edit
} from '@material-ui/icons'
import { DataGrid } from '@mui/x-data-grid';

import legalResponsibleImg from '../../../assets/responsavel_icone.png';

export default function Relatives({ relatives, deleteRelative, loadRelative }) {

    function getAddress(params) {
        return (
            <>
                {params.value} - {params.row.addressNumber} - {params.row.neighborhood}
            </>
        );
    }

    function getRelationship(params) {
        return (
            <>
                {params.value}
                {
                    params.row.isLegalResponsible ?
                        <img src={legalResponsibleImg} alt="Responsavel" width={15} /> : false
                }

            </>
        );
    }

    function btnActions(params) {
        return (
            <Grid container justifyContent="center">
                <Grid item xs={6} sm={6} md={6} lg={6}>
                    <Button
                        variant="outlined"
                        onClick={() => { loadRelative(params.row.email) }}>
                        <Edit />
                    </Button>
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                    <Button
                        variant="outlined"
                        onClick={() => { deleteRelative(params.row.email) }}>
                        <Delete />
                    </Button>
                </Grid>
            </Grid>
        )
    }

    const columns = [
        {
            field: 'relationship',
            headerName: 'Parentesco',
            width: 100,
            renderCell: getRelationship
        },
        {
            field: 'fullName',
            headerName: 'Nome',
            width: 120,
            valueGetter: (params) =>
                `${params.value.split(" ")[0]} ${(params.value.split(" ")[1] || "")}`,
        },
        {
            field: 'email',
            headerName: 'E-mail',
            width: 220
        },
        {
            field: 'phone',
            headerName: 'Telefone',
            width: 120
        },
        {
            field: 'address',
            headerName: 'Endereço',
            renderCell: getAddress,
            width: 280
        },
        {
            field: 'neighborhood',
            renderCell: btnActions,
            width: 150
        }
    ];


    return (
        < div style={{ height: 400, width: '100%' }}>
            <DataGrid
                columns={columns}
                rows={relatives}
                pageSize={5}
                getRowId={(row) => row.email}
                rowsPerPageOptions={[5]}
            />
        </div>
    );
}