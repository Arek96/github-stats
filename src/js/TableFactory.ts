import { injectable } from "inversify";
import { IReposElement } from "./interfaces/IReposElement";
import { IRepo } from "./interfaces/IRepo";

@injectable()
export class TablesFactory {
  private readonly TABLE_CLASS_NAME: string = "repo_table";
  private readonly TABLE_CELL_CLASS_NAME: string = `${this.TABLE_CLASS_NAME}__cell`;
  private readonly TABLE_CELL_CLASS_ROW: string = `${this.TABLE_CLASS_NAME}__row`;
  private readonly NO_DESCRIPTION_STRING = "No description";

  public createTable = (element: IReposElement): HTMLElement => {
    const table = this.table;
    const tableContent = this.tableHeader.concat(
      this.getTableRows(element.repos)
    );
    table.innerHTML = tableContent;
    return table;
  };

  private get table(): HTMLTableElement {
    const table = document.createElement("table");
    table.className = this.TABLE_CLASS_NAME;
    return table;
  }

  private get tableHeader() {
    return `
        <tr class="${this.TABLE_CELL_CLASS_ROW}" >
            <th class="table__cell_name ${this.TABLE_CELL_CLASS_NAME}" >Name</th>
            <th class="table__cell_desc ${this.TABLE_CELL_CLASS_NAME}" >Description</th>
            <th class="table__cell_updated ${this.TABLE_CELL_CLASS_NAME}" >Last updated</th>
            <th class="table__cell_link ${this.TABLE_CELL_CLASS_NAME}"> Download link</th>
        </tr>    
        `;
  }

  private getRepoRow = (repo: IRepo) => {
    return `
        <tr class="${this.TABLE_CELL_CLASS_ROW}" >
            <td class="${this.TABLE_CELL_CLASS_NAME}" >
              ${repo.name}
            </td>
            <td 
              class="${this.TABLE_CELL_CLASS_NAME}" 
              title="${this.formatDescription(repo.description)}"
            >
              ${this.formatDescription(repo.description)}
            </td>
            <td
              class="${this.TABLE_CELL_CLASS_NAME}" >
              ${this.formatDate(repo.updated_at)}
            </td>
            <td 
              class="
                ${this.TABLE_CELL_CLASS_NAME} 
                ${this.TABLE_CELL_CLASS_NAME}__link
              " 
            >
              <a 
                href=${repo.clone_url} 
                title="${repo.clone_url}"
              >
                ${repo.clone_url}
              </a>
            </td>
        </tr>    
        `;
  };

  private formatDescription = (desc: string | null) =>
    typeof desc === "string" ? desc : this.NO_DESCRIPTION_STRING;

  private formatDate = (date: string): string => {
    const dateObject = new Date(date);
    return dateObject.toLocaleDateString();
  };

  private getTableRows = (repos: IRepo[]) => {
    return repos.map((repo) => this.getRepoRow(repo)).join("");
  };
}
