import { injectable } from "inversify";

@injectable()
export class ErrorService {
  public handle = (message: string): void => {
    window.alert(message);
  };
}
