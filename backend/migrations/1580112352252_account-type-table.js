/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("account_type", {
    id: {
      type: "serial",
      primaryKey: true
    },
    account_type_name: {
      type: "text",
      notNull: true
    }
  });
};

exports.down = pgm => {
  pgm.dropTable("account_type");
};
