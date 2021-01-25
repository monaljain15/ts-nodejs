import * as dotenv from 'dotenv';
import * as http from 'http';

dotenv.config();

import app from './server';

http.createServer(app).listen(app.get("port"), () => {
    console.log('Express server listening on port' + app.get("port"));
});