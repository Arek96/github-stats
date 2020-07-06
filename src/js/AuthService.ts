import { Base64 } from "js-base64";
import { injectable, inject } from "inversify";
import { ErrorService } from "./ErrorService";

@injectable()
export class AuthService {
  public GITHUB_USER_URL: string = "https://api.github.com/user";
  private NOT_AUTH_USER_MESSAGE: string =
    "You are not authorized to github. Check the credentials in .env file. But you can still send 60 request to GH API";

  public isAuthorized: boolean | undefined = undefined;

  constructor(@inject(ErrorService) private errorService: ErrorService) {}

  public initAuth = (): void => {
    this.checkIfAuthorized();
  };

  private get authHeaderValue(): string {
    return `Basic ${this.encodedAuthString}`;
  }

  public get authHeaders(): Headers {
    const headers = new Headers();

    headers.append("Authorization", this.authHeaderValue);

    return headers;
  }

  private fetchUser = async (): Promise<Response> => {
    const user = await fetch(this.GITHUB_USER_URL, {
      method: "GET",
      headers: this.authHeaders,
    });

    return user;
  };

  private checkIfAuthorized = async (): Promise<void> => {
    const user = await this.fetchUser();

    if (user.status === 200) {
      this.isAuthorized = true;
    } else {
      this.isAuthorized = false;
      this.errorService.handle(this.NOT_AUTH_USER_MESSAGE);
    }
  };

  private get encodedAuthString(): string {
    return Base64.encode(
      `${process.env.USERNAME}:${process.env.PERSONAL_ACCESS_TOKEN}`
    );
  }
}
