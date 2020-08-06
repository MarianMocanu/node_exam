const { Model } = require('objection');

const Account = require('./Account');
const Pet = require('./Pet')

class Owner extends Model {
  static tableName = 'owners';

  static relationMappings = {
    account: {
      relation: Model.HasOneRelation,
      modelClass: Account,
      join: {
        from: 'accounts.ownerId',
        to: 'owners.id'
      }
    },
    pet: {
      relation: Model.HasManyRelation,
      modelClass: Pet,
      join: {
        from: 'pets.ownerId',
        to: 'owners.id'
      }
    }
  }
}

module.exports = Owner;
