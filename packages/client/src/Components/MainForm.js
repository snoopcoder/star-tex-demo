/* eslint-disable react/prop-types,react/jsx-props-no-spreading */
import React from 'react';
import { Formik, getIn } from 'formik';
import { nanoid } from 'nanoid';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import * as Yup from 'yup';

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

const MemoRow = React.memo(function Row({ order, errors, index, onChange }) {
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
              error={!!getIn(errors, 'w')}
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
              error={!!getIn(errors, 'h')}
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
              error={!!getIn(errors, 'l')}
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
              error={!!getIn(errors, 'weight')}
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

const FormInner = ({ values, errors, setFieldValue, submitCount }) => {
  const onTotalCountChange = React.useCallback(
    ({ target: { value } }) => {
      if (Number.isInteger(+value) && value < 20) {
          setFieldValue('totalCount', Number(value), submitCount > 0);
          let data = values.orders.slice(0, value);
        const delta = value > data.length ? value - data.length : 0;
        data = [
          ...data,
          ...new Array(delta).fill({ w: '', h: '', l: '', weight: '' }),
        ].map((item) =>
          item.reactKey ? item : { ...item, reactKey: nanoid() },
        );
        setFieldValue('orders', data, false);
      }
    },
    [values, setFieldValue, submitCount],
  );
  const setFieldValueMemo = React.useCallback(
    (id, value) => {
      setFieldValue(id, value, submitCount);
    },
    [setFieldValue, submitCount],
  );
  return (
    <div>
      <TextField
        error={!!getIn(errors, 'totalCount')}
        variant="outlined"
        label="Количество мест"
        value={values.totalCount}
        name="totalCount"
        onChange={onTotalCountChange}
      />
      <Box pt={3} pb={3}>
        {values.orders.map((order, index) => (
          <MemoRow
            errors={getIn(errors, `orders.${index}`)}
            key={order.reactKey}
            order={order}
            index={index}
            onChange={setFieldValueMemo}
          />
        ))}
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      </Box>
    </div>
  );
};

const realParameter = Yup.number()
  .required('Необходимо значение')
  .positive()
  .integer()
  .min(1, 'Значение в диапазоне от 1 до 100')
  .max(100, 'Значение в диапазоне от 1 до 100');

const schema = Yup.object().shape({
  totalCount: Yup.number().required().min(1),
  orders: Yup.array()
    .of(
      Yup.object().shape({
        w: realParameter,
        h: realParameter,
        l: realParameter,
        weight: realParameter,
      }),
    )
    .min(1),
});

const MainFormik = ({ token }) => {
  const save = (values, setSubmitting, resetForm) => {
    fetch('http://localhost:4040/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        id: token,
        orders: values.orders,
      }),
    })
      .then((response) => response.json())
      .then(({ success }) => {
        if (success) {
          setSubmitting(false);
          resetForm();
        }
      });
  };
  return (
    <Box p={3}>
      <Formik
        validateOnChange={false}
        initialValues={{ orders: [], totalCount: '' }}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          save(values, setSubmitting, resetForm);
        }}
      >
        {({ values, handleSubmit, isSubmitting, submitCount, ...other }) => (
          <form onSubmit={handleSubmit}>
            <FormInner
              values={values}
              isSubmitting={isSubmitting}
              submitCount={submitCount}
              {...other}
            />
            <Box display="flex" justifyContent="flex-end">
              <Button
                type="submit"
                disabled={isSubmitting || !values.totalCount}
                variant="contained"
              >
                Создать
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default MainFormik;
