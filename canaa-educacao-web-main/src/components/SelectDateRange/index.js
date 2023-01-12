import React, { useState } from "react";

import {
    Popover,
    Button,
    Box,
    TextField
} from '@material-ui/core';

import pt from 'date-fns/locale/pt';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import { format } from "date-fns";

export default function SelectDateRange({ range, setRange, textFieldProps }) {

    const [rangeTemp, setRangeTemp] = useState({
        startDate: new Date(2021, 0, 1),
        endDate: new Date()
    });

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    function confirm() {
        setRange(rangeTemp);
        handleClose();
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    function popOverSelectDateRange() {
        return (
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}>
                <DateRange
                    locale={pt}
                    editableDateInputs={true}
                    onChange={(item) => {
                        setRangeTemp({
                            startDate: item.selection.startDate,
                            endDate: item.selection.endDate
                        });
                    }}
                    moveRangeOnFirstSelection={false}
                    ranges={[{ startDate: rangeTemp.startDate, endDate: rangeTemp.endDate, key: 'selection' }]}
                    maxDate={new Date()}
                    minDate={new Date(2021, 0)}
                    dateDisplayFormat="dd MMMM yyyy"
                />
                <Box style={{ padding: 10 }}>
                    <Button variant="outlined" onClick={(e) => { confirm(); }}>OK</Button>
                </Box>
            </Popover>
        );
    }

    function selectRange() {
        return (
            <TextField
                variant="outlined"
                onClick={handleClick}
                fullWidth
                inputProps={{ min: 0, style: { textAlign: 'center' } }}
                value={
                    format(new Date(range.startDate), "dd/MM/yyyy") +
                    " até " +
                    format(new Date(range.endDate), "dd/MM/yyyy")
                }
                {...textFieldProps}
            />
        )
    }

    return (
        <>
            {selectRange()}
            {popOverSelectDateRange()}
        </>
    );
}