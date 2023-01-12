import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { format } from 'date-fns';
import api from '../../services/api';
import {
    Card,
    CardContent
} from '@material-ui/core';

export default function Shipment(props) {

    const [data, setData] = useState([]);

    useEffect(() => {
        api.get('shipments').then((response) => {
            //Somente mostrar os reconhecidos
            setData(response.data.filter((item) => !!item.accepted));

            //Mostrar todos
            //setData(response.data);
        })
    }, []);

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            hide: true
        },
        {
            field: 'name',
            headerName: 'Primeiro nome',
            valueGetter: (params) =>
                `${params.value.split(" ")[0]}`,
            width: 180
        },
        {
            field: 'dateTime',
            headerName: 'Data de reconhecimento',
            width: 250,
            valueGetter: (params) =>
                `${format(!!params.value ? new Date(params.value) : new Date(), 'dd/MM/yyyy')}`
        },
        {
            field: 'accepted',
            headerName: 'Telefone',
            width: 150,
            valueGetter: (params) =>
                `${!!params.value ? 'Reconhecido' : 'Não reconhecido'}`
        },
    ];


    return (

        <Card style={{ margin: 30 }}>
            <CardContent>
                <div style={{ height: 400 }}>
                    <DataGrid
                        columns={columns}
                        rows={data}
                    />
                </div>
            </CardContent>
        </Card>


    );
}