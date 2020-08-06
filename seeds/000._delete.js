exports.seed = (knex) => {
  return knex('pets').del()
    .then(() => {
      return knex('accounts').del()
        .then(() => {
          return knex('owners').del()
            .then(() => {
              return knex('roles').del();
            });
        });
    });
};
