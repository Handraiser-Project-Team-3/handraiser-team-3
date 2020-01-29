/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("students", {
    id: {
      type: "serial",
      primaryKey: true
    },
    user_id: {
      type: "serial",
      notNull: true,
      references: '"users"'
    },
    class_id: {
      type: "integer",
      notNull: true,
      references: '"class"'
    },
    date_joined: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp")
    }
  });
};

exports.down = pgm => {
  pgm.dropTable("students");
};
