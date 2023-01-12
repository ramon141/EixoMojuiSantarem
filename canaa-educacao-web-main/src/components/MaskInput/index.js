import React from 'react';
import InputMask from "react-input-mask";
import {
    TextField,
} from '@material-ui/core';

const getOnlyNumbers = (str) => {
    //Usando regex podemos substituir tudo que não é número por espaço em branco
    return str.replace(/[^0-9]/g, '');
}

export default function MaskInput({ mask, value, onChange, valueOnlyNumbers, ...props }) {

    function handleChange(event) {
        if (valueOnlyNumbers)
            onChange(getOnlyNumbers(event.target.value));
        else
            onChange(event.target.value);
    }

    return (
        <InputMask
            mask={mask}
            value={value}
            onChange={handleChange}
        >
            {() => <TextField {...props} />}
        </InputMask>
    )
}