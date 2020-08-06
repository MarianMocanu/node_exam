const { Model } = require('objection');

const Account = require('./Account');

class Role extends Model {
    static tableName = 'roles';

    static relationMappings = {
        account: {
            relation: Model.HasOneRelation,
            modelClass: Account,
            join: {
                from: 'accounts.roleId',
                to: 'roles.id'
            }
        }
    }
}

module.exports = Role;
