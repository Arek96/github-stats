import { inject, injectable } from "inversify";
import { AuthService } from "./AuthService";

@injectable()
export class RequestFactory {
  constructor(@inject(AuthService) private authService: AuthService) {}

  public fetch = async (url: string, params?: RequestInit) => {
    return this.authService.isAuthorized
      ? fetch(url, { ...params, headers: this.authService.authHeaders })
      : fetch(url, params);
  };
}
