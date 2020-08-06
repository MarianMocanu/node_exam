exports.seed = (knex) => {
  return knex('pets').insert([
    { name: 'Jojo', type: 'cat', owner_id: 2 },
    { name: 'Rex', type: 'dog', owner_id: 1 }
  ]);
};