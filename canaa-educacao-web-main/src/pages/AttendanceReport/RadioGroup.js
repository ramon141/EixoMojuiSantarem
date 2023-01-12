import React from "react";

import {
    FormControl,
    InputLabel,
    FormControlLabel,
    RadioGroup as RadioGroupMUI,
    Radio,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    radio: {
        '&$checked': {
            color: '#FBCC08'
        }
    },
    checked: {},
}));

export default function RadioGroup({ format, setFormat }) {

    const classes = useStyles();

    const controlProps = (item) => ({
        checked: format === item,
        onChange: handleChange,
        value: item,
        inputProps: { 'aria-label': item },
    });

    const handleChange = (event) => {
        setFormat(event.target.value);
    };

    return (
        <>
            <InputLabel style={{ textAlign: 'center' }}>Formato do relatório: </InputLabel>

            <FormControl component="fieldset">
                <RadioGroupMUI row>
                    <FormControlLabel value=".pdf" control={<Radio
                        {...controlProps('PDF')}
                        classes={{ root: classes.radio, checked: classes.checked }}
                    />} label="PDF" />
                    <FormControlLabel value=".xls" control={<Radio
                        {...controlProps('XLS')}
                        classes={{ root: classes.radio, checked: classes.checked }}
                    />} label="XLS" />
                    <FormControlLabel value=".html" control={<Radio
                        {...controlProps('HTML')}
                        classes={{ root: classes.radio, checked: classes.checked }}
                    />} label="HTML" />
                </RadioGroupMUI>
            </FormControl>
        </>
    )


}