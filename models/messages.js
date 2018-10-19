module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define('messages', {
    /*
      create table messages(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        userId integer,
        username text,
        text text,
        type enum('text', 'image') NOT NULL DEFAULT 'text',
        channelId integer
      );
    */
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    userId: { type: DataTypes.INTEGER },
    username: { type: DataTypes.TEXT },
    text: { type: DataTypes.TEXT },
    type: {
      type: DataTypes.ENUM('text', 'image'),
      allowNull: false,
      defaultValue: 'text',
    },
    channelId: { type: DataTypes.INTEGER },
  }, { timestamps: false });
  sequelize.sync().then(() => {
    Messages.findOrCreate({
      where: {
        userId: 1,
      },
      defaults: {
        userId: 1,
        username: 'Leanne Graham',
        text: 'hello',
        type: 'text',
        channelId: 1,
      },
    });
    Messages.findOrCreate({
      where: {
        userId: 2,
      },
      defaults: {
        userId: 2,
        username: 'Ervin Howell',
        text: 'world',
        type: 'text',
        channelId: 1,
      },
    });
  });
  return Messages;
};
