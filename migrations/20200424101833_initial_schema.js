exports.up = function (knex) {
  return knex.schema
    .createTable('roles', table => {
      table.increments('id');
      table.string('role');
    })
    .createTable('owners', table => {
      table.increments('id');
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('cpr').notNullable();
      table.string('email');
    })
    .createTable('accounts', table => {
      table.increments('id');
      table.string('username').unique().notNullable();
      table.string('password').notNullable();
      table.integer('role_id').unsigned().notNullable();
      table.integer('owner_id').unsigned().notNullable();

      table.foreign('role_id').references('roles.id');
      table.foreign('owner_id').references('owners.id');
    })
    
    .createTable('pets', table => {
      table.increments('id');
      table.string('name').notNullable();
      table.string('type').notNullable();
      table.integer('owner_id').unsigned().notNullable();

      table.foreign('owner_id').references('owners.id');
    })
    ;
};


exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('pets')
    .dropTableIfExists('accounts')
    .dropTableIfExists('owners')
    .dropTableIfExists('roles');
};
