/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("users", {
    id: {
      type: "serial",
      primaryKey: true
    },
    account_type_id: {
      type: "integer",
      notNull: true,
      references: '"account_type"'
    },
    username: {
      type: "text",
      notNull: true
    },
    password: {
      type: "text",
      notNull: true
    }
  });
};

exports.down = pgm => {
  pgm.dropTable("users");
};
