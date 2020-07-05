import { injectable, inject } from "inversify";
import { RequestFactory } from "./RequestFactory";
import { IReposElement } from "./interfaces/IReposElement";
import { TablesFactory } from "./TableFactory";
import { IRepo } from "./interfaces/IRepo";

@injectable()
export class ReposService {
  private readonly REPOS_WRAPPER_CLASS_NAME = "repos__wrapper";
  private readonly REPO_TAG_REGEX = /\brepo\b/;
  private readonly DIV_TAG_NAME = "div";

  constructor(
    @inject(RequestFactory) private requestFactory: RequestFactory,
    @inject(TablesFactory) private tableFactory: TablesFactory
  ) {}

  private getGHReposURL = (user: string) =>
    `https://api.github.com/users/${user}/repos`;

  private get repoTagNodes() {
    return document.getElementsByTagName("repo") as HTMLCollectionOf<
      HTMLElement
    >;
  }

  private fetchUserRepos = async (user: string): Promise<IRepo[]> => {
    const userRepos = await this.requestFactory.fetch(
      this.getGHReposURL(user),
      {
        method: "GET",
      }
    );

    return userRepos.json();
  };

  private getTimeSince1970 = (date: string): number => {
    const dateObject = new Date(date);

    return dateObject.getTime();
  };

  private filterReposByDate = (
    repos: IRepo[],
    dateConstrain: string
  ): IRepo[] => {
    return repos.filter(
      (repo) =>
        this.getTimeSince1970(repo.updated_at) >
        this.getTimeSince1970(dateConstrain)
    );
  };

  private extendNodeWithRepos = async (
    element: HTMLElement
  ): Promise<IReposElement> => {
    const repos = await this.fetchUserRepos(element.dataset.user);
    const filteredRepos = this.filterReposByDate(
      repos,
      element.dataset.updated
    );

    return { element, repos: filteredRepos };
  };

  private get nodesWithRepos() {
    return Array.from(this.repoTagNodes).map(
      async (element) => await this.extendNodeWithRepos(element)
    );
  }

  private replaceRepoWithDivTag = (element: Element) => {
    const elementInString: string = element.outerHTML;
    const elementWithReplacedTags = elementInString.replace(
      this.REPO_TAG_REGEX,
      this.DIV_TAG_NAME
    );

    element.outerHTML = elementWithReplacedTags;
  };

  private addClassName = (element: Element) => {
    element.className = this.REPOS_WRAPPER_CLASS_NAME;
  };

  public renderTables = () => {
    this.nodesWithRepos.forEach(async (element: Promise<IReposElement>) => {
      const repoElement = await element;

      repoElement.element.appendChild(
        this.tableFactory.createTable(repoElement)
      );
      this.addClassName(repoElement.element);
      this.replaceRepoWithDivTag(repoElement.element);
    });
  };
}
