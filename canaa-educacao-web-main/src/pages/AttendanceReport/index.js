import React, { useState } from "react";

import {
    Card,
    CardContent,
    Grid,
    Typography
} from '@material-ui/core';

import { styles } from './styles.js';
import SelectDateRange from "../../components/SelectDateRange/index.js";
import RadioGroup from "./RadioGroup.js";
import SelectSchool from "./SelectSchool.js";
import ControlButtons from "./ControlButtons.js";
import { exportHTML, exportPDF, exportXLSX } from './Export/';
import api from "../../services/api.js";
import { format as formatDate } from "date-fns";

export default function AttendanceReport() {

    const [school, setSchool] = useState({ name: 'Todas', id: '-1' });
    const [format, setFormat] = useState('PDF');
    const [range, setRange] = useState({
        startDate: new Date(2021, 0, 1),
        endDate: new Date()
    });

    function fileName() {
        let ret = 'Relatório Canaã Educação - ';
        ret += formatDate(new Date(), 'dd/MM/yyyy');

        if (school.id !== '-1')
            ret += ` - Escola: ${school.name}`;

        return ret;
    }

    function issueReport() {
        let filter = {
            where: {
                datetime: { between: [range.startDate, range.endDate] }
            },
            include: [
                "student"
            ]
        };

        if (school.id !== '-1')
            filter.where = { ...filter.where, schoolId: school.id };

        api.get(`/shipments?filter=${JSON.stringify(filter)}`)
            .then((res) => {
                switch (format) {
                    case 'PDF':
                        exportPDF(res.data, fileName());
                        break;
                    case 'XLS':
                        exportXLSX(res.data, fileName());
                        break;
                    case 'HTML':
                        exportHTML(res.data, fileName());
                        break;
                    default:
                        console.log("Tipo de formulário desconhecido selecionado")
                }
            });
    }


    return (
        <>
            <Card style={{ margin: '30px 30px 0px 30px' }}>
                <CardContent>

                    <Typography variant="h5" align="center" style={styles.textTitle}>
                        Relatório de Viagens
                    </Typography>

                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} sm={12} md={7} lg={7}>
                            <SelectDateRange textFieldProps={{ label: 'Período das Viagens' }} range={range} setRange={setRange} />
                        </Grid>

                        <Grid item xs={12} sm={12} md={7} lg={7}>
                            <SelectSchool school={school} setSchool={setSchool} />
                        </Grid>

                        <Grid container item justifyContent='center'>
                            <Grid item>
                                <RadioGroup format={format} setFormat={setFormat} />
                            </Grid>
                        </Grid>
                    </Grid>

                </CardContent>
            </Card>

            <Grid container justifyContent='center' spacing={2} style={{ padding: 20 }}>
                <ControlButtons issueReport={issueReport} />
            </Grid>
        </>
    )
}