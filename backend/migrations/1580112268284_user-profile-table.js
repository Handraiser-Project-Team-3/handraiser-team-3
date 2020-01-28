/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("user_profile", {
    id: {
      type: "serial",
      primaryKey: true
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
      type: "boolean",
      notNull: true
    }
  });
};

exports.down = pgm => {
  pgm.dropTable("user_profile", { cascade: true });
};