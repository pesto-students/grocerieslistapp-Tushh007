import { initializeEditPage, generateLastEdited } from "./views";
import { updateList, removeList } from "./lists";

const listTitle = document.querySelector("#list-title");
const listBody = document.querySelector("#list-body");
const dateElement = document.querySelector("#last-edited");
const removeButton = document.querySelector("#remove-list");
const listId = location.hash.substring(1);

initializeEditPage(listId);

// list title
listTitle.addEventListener("input", (e) => {
  const list = updateList(listId, {
    title: e.target.value,
  });
  dateElement.textContent = generateLastEdited(list.updatedAt);
});

// input body
listBody.addEventListener("input", (e) => {
  const list = updateList(listId, {
    body: e.target.value,
  });
  dateElement.textContent = generateLastEdited(list.updatedAt);
});

// remove list button
removeButton.addEventListener("click", (e) => {
  removeList(listId);
  location.assign("/home.html");
});

window.addEventListener("storage", (e) => {
  if (e.key === "lists") {
    initializeEditPage(listId);
  }
});
