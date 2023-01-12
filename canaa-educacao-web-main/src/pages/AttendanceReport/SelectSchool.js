import React, { useEffect, useState } from "react";
import api from "../../services/api.js";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
    TextField
} from '@material-ui/core';

export default function SelectSchool({ school, setSchool }) {

    const [allSchool, setAllSchool] = useState([]);

    useEffect(() => {
        api.get('/schools').then((res) => {
            setAllSchool([{ name: 'Todas', id: '-1' }, ...res.data]);
        });
    }, []);

    function getOptionLabel(option) {
        if (option.id === '-1')
            return option.name;
        return `${option.id} - ${option.name}`;
    }

    return (
        <Autocomplete
            options={allSchool}
            fullWidth
            value={school}
            onChange={(event, newInputValue) => {
                if (newInputValue !== null)
                    setSchool(newInputValue);
            }}
            getOptionLabel={getOptionLabel}
            renderInput={(params) => <TextField {...params} label="Escola" variant="outlined" />}
        />
    );
}