/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("student_request", {
    id: {
      type: "serial",
      primaryKey: true
    },
    class_id: {
      type: "integer",
      notNull: true,
      references: '"class"'
    },
    student_id: {
      type: "integer",
      notNull: true,
      references: '"classroom_users"'
    },
    title: {
      type: "text",
      notNull: true
    },
    status: {
      type: "boolean",
      notNull: true
    },
    date_posted: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp")
    }
  });
};

exports.down = pgm => {
  pgm.dropTable("student_request");
};