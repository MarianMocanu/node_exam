const { Model } = require('objection');

const Role = require('./Role');
const Owner = require('./Owner');

class Account extends Model {
    static tableName = 'accounts';

    static relationMappings = {
        role: {
            relation: Model.BelongsToOneRelation,
            modelClass: Role,
            join: {
                from: 'accounts.roleId',
                to: 'roles.id'
            }
        },
        owner: {
            relation: Model.BelongsToOneRelation,
            modelClass: Owner,
            join: {
                from: 'accounts.ownerId',
                to: 'owners.id'
            }
        }
    }
}

module.exports = Account;
