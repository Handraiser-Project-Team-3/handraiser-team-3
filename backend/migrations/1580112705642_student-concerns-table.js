/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("student_concerns", {
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
      references: '"students"'
    },
    mentor_id: {
      type: "integer",
      notNull: true,
      references: '"mentors"'
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
  pgm.dropTable("student_concerns");
};
