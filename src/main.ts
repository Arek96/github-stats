import "./style/main.scss";

import { container } from "./js/container";
import { InitService } from "./js/InitService";

const initService = container.get<InitService>(InitService);

window.onload = initService.init;
