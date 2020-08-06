const { Model } = require('objection');

const Owner = require('./Owner');

class Pet extends Model {
  static tableName = 'pets';

  static relationMappings = {
    owner: {
      relation: Model.BelongsToOneRelation,
      modelClass: Owner,
      join: {
        from: 'pets.ownerId',
        to: 'owners.id'
      }
    }
  }
}

module.exports = Pet;