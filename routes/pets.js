const router = require('express').Router();

const Pet = require('../models/Pet.js');
const Owner = require('../models/Owner.js');

router.get('/pets', async (req, res) => {
  const { value } = req.session;

  if (value == 'noSession' || typeof value === 'undefined') {
    return res.redirect('/login?error=Your request needs authorization. Please log in.');
  } else if (value.role.role == "ADMIN") {
    try {
      const ownersWithPets = await Owner.query().select('id', 'first_name', 'last_name').withGraphFetched('pet');
      console.log(ownersWithPets);
      return res.render('pets/pets.ejs', {
        session: value,
        owners: ownersWithPets
      });
    } catch (error) {
      console.log(error);
    };
  }
  else {
    try {
      const ownersWithPets = await Owner.query().select('id', 'first_name', 'last_name').where('id', value.owner.id).withGraphFetched('pet');
      console.log(ownersWithPets);
      return res.render('pets/pets.ejs', {
        session: value,
        owners: ownersWithPets
      });
    } catch (error) {
      console.log(error);
    };
  };
});

router.post('/pets', async (req, res) => {
  const { value } = req.session;
  const { name, type } = req.body;

  if (value == 'noSession' || typeof value === 'undefined') {
    return res.redirect('/login?error=Your request needs authorization. Please log in.');
  } else if (name && type) {
    try {
      const newPet = await Pet.query().insert({
        name,
        type,
        owner_id: value.owner.id
      });
      console.log(newPet);
      return res.redirect('/pets');
    } catch (error) {
      console.log(error);
    }
  };
});

module.exports = router;