import { Base64 } from "js-base64";
import { injectable } from "inversify";

@injectable()
export class AuthService {
  public GITHUB_USER_URL: string = "https://api.github.com/user";

  public isAuthorized: boolean | undefined = undefined;

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

  private fetchUser = async () => {
    const user = await fetch(this.GITHUB_USER_URL, {
      method: "GET",
      headers: this.authHeaders
    });
    return user;
  };

  private checkIfAuthorized = async () => {
    const user = await this.fetchUser();
    user.status === 200
      ? (this.isAuthorized = true)
      : (this.isAuthorized = false);
  };

  private get encodedAuthString(): string {
    return Base64.encode(
      `${process.env.USERNAME}:${process.env.PERSONAL_ACCESS_TOKEN}`
    );
  }
}
