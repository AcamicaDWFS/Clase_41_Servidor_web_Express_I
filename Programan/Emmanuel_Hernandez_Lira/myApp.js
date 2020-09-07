const express = require('express');
const app = express();
require('dotenv/config');
const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const mobilePhones = [
  {
    id: 1,
    brand: 'Samsung',
    model: 'Galaxy S10',
    memory: '8gb',
    storage: '128gb',
    price: 1000,
  },
  {
    id: 2,
    brand: 'Xiaomi',
    model: 'Redmi Note 5',
    memory: '4gb',
    storage: '64gb',
    price: 300,
  },
  {
    id: 3,
    brand: 'Huawei',
    model: 'Mate 30 Pro',
    memory: '8gb',
    storage: '128gb',
    price: 1200,
  },
];

function getPhonesBelowPrice(mobilePhones, price) {
  const queryPhones = mobilePhones.filter((phone) => {
    if (phone.price < price) return phone;
  });

  return queryPhones;
}

function comparePhonePrice(phoneA, phoneB) {
  let comparison = 0;

  if (phoneA.price > phoneB.price) {
    comparison = 1;
  } else if (phoneA.price < phoneB.price) {
    comparison = -1;
  }

  return comparison;
}

// Obtiene todos los telefonos, tambien permite obtener todos los telefonos
// con un precio menor al parametro price y ordenarlos si asi se requiere
app.get('/phones', (req, res) => {
  const price = parseInt(req.query.price);
  const sort = req.query.sort;

  console.log(req.query);

  if (!isNaN(price)) {
    const queryPhones = getPhonesBelowPrice(mobilePhones, price);

    if (sort === 'true') {
      queryPhones.sort(comparePhonePrice);
    }

    res.json(queryPhones);
  } else if (sort === 'true') {
    const sortedPhones = [...mobilePhones];
    sortedPhones.sort(comparePhonePrice);

    res.json(sortedPhones);
  } else {
    res.json(mobilePhones);
  }
});

// Añadir un telefono.
app.post('/phones', (req, res) => {
  const newPhone = req.body;
  const latestID = mobilePhones[mobilePhones.length - 1].id;

  newPhone.id = latestID + 1;

  mobilePhones.push(newPhone);

  res.json({
    status: 200,
    message: 'New phone added to DB',
    newPhoneID: latestID,
  });
});

// Modificar un telefono.
app.patch('/phones/:id', (req, res) => {
  const phoneIDs = mobilePhones.map((phone) => phone.id);
  const idx = phoneIDs.indexOf(parseInt(req.params.id));

  if (idx !== -1) {
    const { brand, model, memory, storage, price } = req.body;
    const phoneToModify = mobilePhones[idx];

    if (brand) {
      phoneToModify.brand = brand;
    }

    if (model) {
      phoneToModify.model = model;
    }

    if (memory) {
      phoneToModify.memory = memory;
    }

    if (storage) {
      phoneToModify.storage = storage;
    }

    if (price) {
      phoneToModify.price = price;
    }

    res.json(mobilePhones[idx]);
  } else {
    res.json({ status: 404, message: 'Phone not found...' });
  }
});

// Eliminar un telefono.
app.delete('/phones/:id', (req, res) => {
  const phoneIDs = mobilePhones.map((phone) => phone.id);
  const idx = phoneIDs.indexOf(parseInt(req.params.id));

  if (idx !== -1) {
    mobilePhones.splice(idx, 1);

    res.json({
      status: 200,
      message: `Phone with ID: ${req.params.id} deleted`,
    });
  } else {
    res.json({ status: 404, message: 'Phone not found...' });
  }
});

app.listen(port, () => {
  console.log(`Server is now listening at port ${port}`);
});
