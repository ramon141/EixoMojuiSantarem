import React, { useEffect, useState } from 'react';
import {
    Grid,
    Card,
    CardContent,
    FormControl,
    Typography,
    Select,
    MenuItem
} from '@material-ui/core';
import { useStyles } from './classes';
import api from '../../services/api';
import { useSchool } from '../../contexts/studentsContext';

export default function AssociateSchool() {
    const classes = useStyles();
    const [schools, setSchools] = useState([]);
    const { schoolId, setSchoolId } = useSchool();
    useEffect(() => {
        const getAllSchools = async () => {
            try {
                let response = await api.get('schools');
                setSchools(response.data);
            } catch (e) {
                console.error(e);
            }
        }
        getAllSchools();
    }, []);

    return (
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" align="center" className={classes.textTitle}>
                            Associar escola ao estudante
                        </Typography>

                        <FormControl fullWidth size='small'>
                            <Select
                                variant='outlined'
                                value={schoolId}
                                onChange={e => setSchoolId(e.target.value)}
                            >
                                {schools.map(item => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}