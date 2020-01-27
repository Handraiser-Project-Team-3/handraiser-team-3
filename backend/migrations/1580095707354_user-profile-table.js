/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("user_profile", {
    id: {
      type: "serial",
      primaryKey: true
    },
    first_name: {
      type: "text",
      notNull: true
    },
    last_name: {
      type: "text",
      notNull: true
    },
    middle_name: {
      type: "text",
      notNull: true
    },
    email: {
      type: "text",
      notNull: true
    },
    user_image: {
      type: "blob"
    },
    user_status: {
      type: "boolean",
      notNull: true
    }
  });
};

exports.down = pgm => {
  pgm.dropTable("user_profile");
};
