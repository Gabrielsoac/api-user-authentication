import express from 'express';
import { UserRouter } from '../routes/UserRouter';

const Server = express();
Server.use(express.json());

Server.use(UserRouter);

export { Server }