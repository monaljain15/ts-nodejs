import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as helmet from 'helmet';
import * as jmEzMySql from 'jm-ez-mysql';
import * as morgan from 'morgan';
import * as path from 'path';
import * as trimRequest from 'trim-request';
import * as methodoverride from 'method-override';
import { Routes } from './routes';

dotenv.config();

jmEzMySql.init({
    acquireTimeout: 100 * 60 * 1000,
    connectTimeout: 100 * 60 * 1000,
    connectionLimit: 10000,
    database: process.env.DBNAME,
    dateStrings: true,
    host: process.env.DBHOST,
    passwword: process.env.DBPASSWORD,
    user: process.env.DBUSER,
    timeout: 100 * 60 * 1000,
    timezone: 'utc',
    multipleStatements: true,
    socketPath: '/Applications/XAMPP/xamppfiles/var/mysql/mysql.sock'
});

class App {
    public app: express.Application;
    constructor() {
        const NODE_ENV = process.env.NODE_ENV;
        const PORT = process.env.DBPORT as string;
        this.app = express();
        this.app.use(helmet());
        this.app.all("/*", (req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Request-Headers", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Acess-Control-Allow-Headers, Authorization, token, x-auth-token");
            res.header("Access-Control-Allow-Methods", "GET, POST");
            if (req.method === 'OPTIONS') {
                res.writeHead(200);
                res.end();
            } else {
                next();
            }
        });

        if (NODE_ENV === 'development') {
            this.app.use(express.static(path.join(process.cwd(), "public")));
            this.app.use("/bower_components", express.static(path.join(process.cwd(), "bower_components")))
            this.app.use(morgan("dev"));
        } else {
            this.app.use(compression());
            this.app.use(express.static(path.join(process.cwd(), "dist")));
        }

        this.app.set("port", PORT);
        this.app.use(bodyParser.json({limit: "50mb"}));
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json(), (error, req, res, next) => {
            if (error) {
                return res.status(400).json({error: req.t('ERR_GENERIC_SYNTAX')});
            }
            next();
        });
        this.app.use(methodoverride());
        this.app.use(trimRequest.all);
        const routes = new Routes(NODE_ENV);
        this.app.use("/api/v1", routes.path());
    }
}

export default new App().app;