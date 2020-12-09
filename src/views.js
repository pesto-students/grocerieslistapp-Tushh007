import moment from "moment";
import { getFilters } from "./filters";
import { sortLists, getLists } from "./lists";

// Generate the DOM structure for a list
const generateListDOM = (list) => {
  const listEl = document.createElement("a");
  const textEl = document.createElement("a");
  const statusEl = document.createElement("p");

  // Setup the list title text
  if (list.title.length > 0) {
    textEl.textContent = list.title;
  } else {
    textEl.textContent = "Unnamed grocery list";
  }
  textEl.classList.add("list-item__title");
  listEl.appendChild(textEl);

  // Setup the link
  listEl.setAttribute("href", `/edit.html#${list.id}`);
  listEl.classList.add("list-item");

  // Setup status message
  statusEl.textContent = generateLastEdited(list.updatedAt);
  statusEl.classList.add("list-item__subtitle");
  listEl.appendChild(statusEl);

  return listEl;
};

// render application lists
const renderLists = () => {
  const listsEl = document.querySelector("#lists");
  const filters = getFilters();
  const lists = sortLists(filters.sortBy);
  const searchedLists = lists.filter((list) =>
    list.title.toLowerCase().includes(filters.searchText.toLowerCase())
  );

  const filteredLists = searchedLists.filter((list) =>
    list.user.toLowerCase().includes(localStorage.getItem("currentUser"))
  );

  listsEl.innerHTML = "";

  if (filteredLists.length > 0) {
    filteredLists.forEach((list) => {
      const listEl = generateListDOM(list);
      listsEl.appendChild(listEl);
    });
  } else {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No lists to show";
    emptyMessage.classList.add("empty-message");
    listsEl.appendChild(emptyMessage);
  }
};

const initializeEditPage = (listId) => {
  const listTitle = document.querySelector("#list-title");
  const listBody = document.querySelector("#list-body");
  const dateElement = document.querySelector("#last-edited");

  const lists = getLists();
  const list = lists.find((list) => list.id === listId);
  if (!list) {
    location.assign("/index.html");
  }

  // setting up title and body fields
  listTitle.value = list.title;
  listBody.value = list.body;
  dateElement.textContent = generateLastEdited(list.updatedAt);
};

// Generate the last edited message
const generateLastEdited = (timestamp) =>
  `Last edited ${moment(timestamp).fromNow()}`;

export { generateListDOM, renderLists, generateLastEdited, initializeEditPage };
