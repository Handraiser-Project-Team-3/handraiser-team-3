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
    email: {
      type: "text",
      notNull: true
    },
    first_name: {
      type: "text"
    },
    last_name: {
      type: "text"
    },
    user_image: {
      type: "text"
    },
    user_status: {
      type: "boolean"
    }
  });
};

exports.down = pgm => {
  pgm.dropTable("users", { cascade: true });
};
