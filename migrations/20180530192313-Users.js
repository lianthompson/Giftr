'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.createTable('Users', {
    id: { type: 'int', primaryKey: true },
    first_name: 'string',
    last_name: 'string',
    date: 'string',
    email: 'string'
  }, callback);
};

exports.down = function(db) {
  return db.dropTable('Users');
;
};

exports._meta = {
  "version": 1
};
