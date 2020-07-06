import { injectable } from "inversify";

@injectable()
export class ErrorService {
  public handle = (message: string) => {
    window.alert(message);
  };
}
