/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("participants", {
    id: {
      type: "serial",
      primaryKey: true
    },
    chat_room_id: {
      type: "integer",
      notNull: true,
      references: '"chat_room"'
    },
    user_id: {
      type: "integer",
      notNull: true,
      references: '"users"'
    }
  });
};

exports.down = pgm => {
  pgm.dropTable("participants");
};
