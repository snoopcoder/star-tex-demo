/* eslint-disable react/prop-types */
import React from 'react';
import { Formik, Form } from 'formik';
import { nanoid } from 'nanoid';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import DisplayFormikState from './DisplayFormikState';

const useStyles = makeStyles(() => ({
  itemRow: {
    position: 'relative',
  },
  indexContainer: {
    position: 'absolute',
    height: '100%',
    left: -24,
    width: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const MemoRow = React.memo(function Row({ order, index, onChange }) {
  const classes = useStyles();
  const onChangeHandler = (option) => ({ target: { value } }) => {
    onChange(`orders.${index}`, { ...order, [option]: value });
  };

  return (
    <Box mb={2}>
      <Grid container className={classes.itemRow}>
        <div className={classes.indexContainer}>{`${index + 1}.`}</div>
        <Grid item container xs={12} spacing={4}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              helperText="Ширина"
              value={order.w}
              onChange={onChangeHandler('w')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">см</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              helperText="Высота"
              value={order.h}
              onChange={onChangeHandler('h')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">см</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              helperText="Длина"
              value={order.l}
              onChange={onChangeHandler('l')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">см</InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <Grid item container xs={12} spacing={4}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              helperText="Вес"
              value={order.weight}
              onChange={onChangeHandler('weight')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">Кг</InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
});

const FormInner = ({ values, setFieldValue, ...other }) => {
  const onTotalCountChange = React.useCallback(
    ({ target: { value } }) => {
      if (Number.isInteger(+value) && value < 20) {
        let data = values.orders.slice(0, value);
        const delta = value > data.length ? value - data.length : 0;
        data = [
          ...data,
          ...new Array(delta).fill({ w: '', h: '', l: '', weight: '' }),
        ].map((item) =>
          item.reactKey ? item : { ...item, reactKey: nanoid() },
        );
        setFieldValue('totalCount', Number(value));
        setFieldValue('orders', data);
      }
    },
    [values, setFieldValue],
  );
  return (
    <Form>
      <TextField
        variant="outlined"
        label="Количество мест"
        value={values.totalCount}
        name="totalCount"
        onChange={onTotalCountChange}
      />
      <Box pt={3} pb={3}>
        {values.orders.map((order, index) => (
          <MemoRow
            key={order.reactKey}
            order={order}
            index={index}
            onChange={setFieldValue}
          />
        ))}
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <DisplayFormikState values={values} {...other} />
      </Box>
    </Form>
  );
};

const MainFormik = () => {
  return (
    <Box p={3}>
      <Formik
        initialValues={{ orders: [], totalCount: '' }}
        onSubmit={(values) =>
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
          }, 500)
        }
      >
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {(props) => <FormInner {...props} />}
      </Formik>
      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained">Создать</Button>
      </Box>
    </Box>
  );
};

export default MainFormik;
