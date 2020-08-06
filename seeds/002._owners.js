exports.seed = function (knex) {
  return knex('owners').insert([
    { first_name: 'Marian', last_name: 'Mocanu', cpr: 11111111, email: 'mocanumarian1993@gmail.com' },
    { first_name: 'John', last_name: 'Smith', cpr: 22222222, email: 'johnsmith@mail.dk'}
  ]);
};