import { CreatePrimaryQueryButton } from "@/buttons";

function CreateButtonsList(typeQuery) {
  return `<ul class="buttons__list">
            ${CreatePrimaryQueryButton("xmlHttpRequest", typeQuery, "xml")}
            ${CreatePrimaryQueryButton("Fetch", typeQuery, "fetch")}
            ${CreatePrimaryQueryButton("Axios", typeQuery, "axios")}
          </ul>`;
}

export { CreateButtonsList };
