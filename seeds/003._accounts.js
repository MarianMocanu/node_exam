exports.seed = (knex) => {
  return knex('accounts').insert([      // password
    { username: 'admin', password: '$2b$12$tGCh9eONpb5vkoku3Cl0senHc6JPlIT.b1DPva.J2YrnlJc.opQ0G', role_id: 1, owner_id: 1 },
    { username: 'marian', password: '$2b$12$mc.N/6ccJHbmaY8x0LtL6.90nnxzXB2ApCCm2kb.BHsUnVgSjBEJG', role_id: 2, owner_id: 2 }
  ]);
};
