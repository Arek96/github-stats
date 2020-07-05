import "reflect-metadata";
import { Container } from "inversify";

import { AuthService } from "./AuthService";

import { InitService } from "./InitService";
import { RequestFactory } from "./RequestFactory";
import { ReposService } from "./ReposService";
import { TablesFactory } from "./TableFactory";

const container = new Container();

container.bind<AuthService>(AuthService).toSelf();
container.bind<InitService>(InitService).toSelf();
container.bind<RequestFactory>(RequestFactory).toSelf();
container.bind<ReposService>(ReposService).toSelf();
container.bind<TablesFactory>(TablesFactory).toSelf();

export { container };
