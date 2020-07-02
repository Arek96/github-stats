import "reflect-metadata";
import { Container } from "inversify";

import { AuthService } from "./AuthService";

import { InitService } from "./InitService";

const container = new Container();

container.bind<AuthService>(AuthService).toSelf();
container.bind<InitService>(InitService).toSelf();

export { container };
