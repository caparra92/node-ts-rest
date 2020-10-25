import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import routes from './routes/Routes';
import posts from './routes/Posts';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';

class Server {

    public app: express.Application;
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config() {

        //MongoDB
        const MONGO_URI = 'mongodb://localhost/tsrestapi';
        mongoose.set('useFindAndModify', true);
        mongoose.connect(MONGO_URI || process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })
        .then(db => console.log('DB ONLINE'));
        //Settings
        this.app.set('port', process.env.PORT || 3000);

        //middlewares
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());
    }

    routes() {
        this.app.use(routes);
        this.app.use('/api/posts',posts);
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        })
    }
}

const server = new Server();
server.start();