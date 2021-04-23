import React from 'react';
import {Grid, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';

const useStyles = makeStyles({
    fieldBlock: {
        margin: '15px auto',
        textAlign: 'center',
    }
});

const FormInput = ({name, label, onChange, value, required, type, error,helperText}) => {
    const classes = useStyles();
    return (
        <Grid container item className={classes.fieldBlock}>
            <TextField
                name={name}
                label={label}
                onChange={onChange}
                value={value}
                required={required}
                variant="outlined"
                type={type}
                error={error}
                helperText={helperText}
                fullWidth/>
        </Grid>
    );
}
FormInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    required: PropTypes.bool,
    type:PropTypes.string,
    error:PropTypes.bool,
    helperText:PropTypes.string
};

export default FormInput;