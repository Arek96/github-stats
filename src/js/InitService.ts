import { inject, injectable } from "inversify";

import { AuthService } from "./AuthService";
import { ReposService } from "./ReposService";

@injectable()
export class InitService {
  constructor(
    @inject(AuthService) private authService: AuthService,
    @inject(ReposService) private reposService: ReposService
  ) {}

  init = () => {
    this.authService.initAuth();
    this.reposService.renderTables();
  };
}
