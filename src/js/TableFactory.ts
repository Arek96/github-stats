import { injectable } from "inversify";
import { IReposElement } from "./interfaces/IReposElement";
import { IRepo } from "./interfaces/IRepo";

@injectable()
export class TablesFactory {
  public createTable = (element: IReposElement): HTMLElement => {
    const table = this.table;
    const tableContent = this.tableHeader.concat(
      this.getTableRows(element.repos)
    );
    table.innerHTML = tableContent;
    return table;
  };

  private get table(): HTMLTableElement {
    return document.createElement("table");
  }

  private get tableHeader() {
    return `
        <tr>
            <th class="table__cell_name" >Name</th>
            <th class="table__cell_desc" >Description</th>
            <th class="table__cell_updated" >Last updated</th>
            <th class="table__cell_link"> Download link</th>
        </tr>    
        `;
  }

  private getRepoRow = (repo: IRepo) => {
    return `
        <tr>
            <th class="table__cell_name" >${repo.name}</th>
            <th class="table__cell_desc" >${repo.description}</th>
            <th class="table__cell_updated" >${this.formatDate(
              repo.updated_at
            )}</th>
            <th class="table__cell_link" ><a href=${repo.clone_url}>${
      repo.clone_url
    }</a></th>
        </tr>    
        `;
  };

  private formatDate = (date: string): string => {
    const dateObject = new Date(date);
    return dateObject.toLocaleDateString();
  };

  private getTableRows = (repos: IRepo[]) => {
    return repos.map((repo) => this.getRepoRow(repo)).join("");
  };
}
