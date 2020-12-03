import { configService } from '../src/App/services/config.service';

import fs = require('fs');

fs.writeFileSync('ormconfig.json',
  JSON.stringify(configService.getTypeOrmConfig(), null, 2)
);