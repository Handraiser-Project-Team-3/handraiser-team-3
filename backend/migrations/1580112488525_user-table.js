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
    user_profile_id: {
      type: "integer",
      notNull: true,
      references: '"user_profile"'
    },
    email: {
      type: "text",
      notNull: true
    }
  });
};

exports.down = pgm => {
  pgm.dropTable("users", { cascade: true });
};
