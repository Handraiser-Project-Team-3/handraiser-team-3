/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("chat_room", {
    id: {
      type: "serial",
      primaryKey: true
    },
    room_name: {
      type: "text",
      notNull: true
    }
  });
};

exports.down = pgm => {
  pgm.dropTable("chat_room", { cascade: true });
};
