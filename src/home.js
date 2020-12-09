import { createList } from "./lists";
import { setFilters } from "./filters";
import { renderLists } from "./views";

renderLists();

document.querySelector("#logout").addEventListener("click", () => {
  location.assign(`/index.html`);
});

document.querySelector("#create-list").addEventListener("click", () => {
  const id = createList(location.hash.substring(1));
  location.assign(`/edit.html#${id}`);
});

document.querySelector("#search-text").addEventListener("input", (e) => {
  setFilters({
    searchText: e.target.value,
  });
  renderLists();
});

document.querySelector("#filter-by").addEventListener("change", (e) => {
  setFilters({
    sortBy: e.target.value,
  });
  renderLists();
});

window.addEventListener("storage", (e) => {
  if (e.key === "lists") {
    renderLists();
  }
});
