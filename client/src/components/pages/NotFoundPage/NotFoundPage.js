import { Button, makeStyles, TextareaAutosize, TextField, Typography } from '@material-ui/core';
import SentimentDissatisfiedRoundedIcon from '@material-ui/icons/SentimentDissatisfiedRounded';
import { useEffect, useState } from 'react';
import { useStyles } from './NotFoundPageClasses';

const useAdminStyle = makeStyles(theme => ({
  root: {
    borderRadius: theme.spacing(1),
    border: '1px solid gray',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3)
  },
  li: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5
  },
  input: {
    marginBottom: theme.spacing(1)
  },
  group: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  }
}));

function NotFoundPage() {
  const classes = useStyles();
  const cls = useAdminStyle();
  const [values, setValues] = useState({
    name: '',
    price: '',
    count: '',
    description: '',
    mainImage: '',
    optionName: '',
    optionValue: '',
    options: [],
    image: '',
    images: [],
    category: '',
    categories: [],
  });
  const [status, setStatus] = useState('idle');

  const handleChange = (event) => {
    setValues(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  }

  const fetchProduct = async () => {
    const res = await fetch('/api/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(values)
    });

    if (res.ok) {
      setStatus('ok');
      setTimeout(() => {
        setStatus(null);
      }, 1000);
    };
  }

  const pushCategory = () => {
    const categories = [...values.categories];
    categories.push(values.category.toLocaleLowerCase());

    setValues(prev => ({
      ...prev,
      category: '',
      categories
    }));
  }

  const popOption = (event) => {
    const target = event.target;
    const li = target.closest('li');
    const name = li.getAttribute('name');
    const value = li.getAttribute('value');
    let newData = [...values[name]];

    newData = newData.filter(item => item.name !== value);

    setValues(prev => ({
      ...prev,
      [name]: newData
    }));
  }

  const popItem = (event) => {
    const target = event.target;
    const li = target.closest('li');
    const name = li.getAttribute('name');
    const value = li.getAttribute('value');
    let newData = [...values[name]];

    newData = newData.filter(itemValue => itemValue !== value);

    setValues(prev => ({
      ...prev,
      [name]: newData
    }));
  }

  const pushImage = () => {
    const images = [...values.images];
    images.push(values.image);

    setValues(prev => ({
      ...prev,
      image: '',
      images
    }));
  }

  const pushOption = () => {
    const options = [...values.options];
    options.push({ name: values.optionName, value: values.optionValue })

    setValues(prev => ({
      ...prev,
      optionName: '',
      optionValue: '',
      options
    }));
  }

  useEffect(() => {
    document.title = 'Not found';
  });

  return (
    <div className={classes.root}>
      <SentimentDissatisfiedRoundedIcon
        color="secondary"
        fontSize="large"
        className={classes.icon}
      />
      <Typography className={classes.title} color="secondary" variant="h3"> Not Found</Typography>
      <div className={cls.root}>
        <Button color="primary" variant={status === 'ok' ? 'contained' : 'outlined'} onClick={fetchProduct}>Fetch</Button>
        <TextField
          className={cls.input}
          label="name"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
        <TextField
          className={cls.input}
          label="price"
          name="price"
          value={values.price}
          onChange={handleChange}
        />
        <TextField
          className={cls.input}
          label="url"
          name="url"
          value={values.url}
          onChange={handleChange}
        />
        <TextField
          className={cls.input}
          label="count"
          name="count"
          value={values.count}
          onChange={handleChange}
        />
        <TextareaAutosize
          className={cls.input}
          placeholder="description"
          name="description"
          value={values.description}
          onChange={handleChange}
        />
        <TextField
          className={cls.input}
          label="mainImage"
          name="mainImage"
          value={values.mainImage}
          onChange={handleChange}
        />
        <div className={cls.group}>
          <TextField
            className={cls.input}
            label="optionName"
            name="optionName"
            value={values.optionName}
            onChange={handleChange}
          />
          <TextField
            className={cls.input}
            label="optionValue"
            name="optionValue"
            value={values.optionValue}
            onChange={handleChange}
          />
          <Button variant="outlined" onClick={pushOption}>Push Option</Button>
        </div>
        <ul>{

          values.options.map(({name, value}) => (
            <li className={cls.li} name="options" value={name} key={name}>{name} - {value}<Button color="primary" variant="outlined" onClick={popOption}>x</Button></li>
          ))

        }</ul>
        <div className={cls.group}>
          <TextField
            label="image"
            name="image"
            value={values.image}
            onChange={handleChange}
          />
          <Button variant="outlined" onClick={pushImage}>Push Image</Button>
        </div>
        <ul>{

          values.images.map(image => (
            <li className={cls.li} name="images" value={image} key={image}>{image}<Button color="primary" variant="outlined" onClick={popItem}>x</Button></li>
          ))

        }</ul>
        <div className={cls.group}>
          <TextField
            label="category"
            name="category"
            value={values.category}
            onChange={handleChange}
          />
          <Button variant="outlined" onClick={pushCategory}>Push Category</Button>
        </div>
        <ul>{

          values.categories.map(categ => (
            <li className={cls.li} name="categories" value={categ} key={categ}>{categ}<Button color="primary" variant="outlined" onClick={popItem}>x</Button></li>
          ))

        }</ul>
      </div>
      <Button onClick={async () => {
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            filter: {
              categories: [
                'apple',
                'xiaomi'
              ]
            },
          })
        });
        const data = await res.json();
        console.log(data);
      }}>Mobile</Button>
    </div>
  )
}

export default NotFoundPage;