import mongoose from 'mongoose';
import { PORT } from './constants';

import * as serverService from './services/server.service';

const UserName = process.env.MONGO_USER;
const Password = process.env.MONGO_PASS;
const clasterInfo = process.env.MONGO_CLUSTER;

(async () => {
  try {
    await mongoose.connect(`mongodb+srv://${UserName}:${Password}@${clasterInfo}.mongodb.net/managerApp`);
    serverService.server.listen(process.env.PORT || PORT, function () {
      console.log('Сервер ожидает подключения...');
    })
  } catch (error) {
    console.log(error);
  }
})();



process.on('SIGINT', async () => {
  await mongoose.disconnect();
  process.exit();
});
