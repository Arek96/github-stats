import { inject, injectable } from "inversify";

import { AuthService } from "./AuthService";

@injectable()
export class InitService {
  constructor(@inject(AuthService) private authService: AuthService) {}

  init = () => {
    this.authService.initAuth();
  };
}
