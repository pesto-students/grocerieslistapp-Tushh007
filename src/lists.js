import uuidv4 from "uuid/v4";
import moment from "moment";

let lists = [];

//  Read existing lists from local storage
const loadLists = () => {
  const listsJSON = localStorage.getItem("lists");

  try {
    return listsJSON ? JSON.parse(listsJSON) : [];
  } catch (e) {
    return [];
  }
};

// Save the lists to localStorage
const saveLists = () => {
  localStorage.setItem("lists", JSON.stringify(lists));
};

// Expose lists from module
const getLists = () => lists;

const createList = (user) => {
  const id = uuidv4();
  const timestamp = moment().valueOf();

  lists.push({
    id: id,
    user: user,
    title: "",
    body: "",
    createdAt: timestamp,
    updatedAt: timestamp,
  });

  saveLists();

  return id;
};

// Remove a list from the list
const removeList = (id) => {
  const listIndex = lists.findIndex((list) => list.id === id);

  if (listIndex > -1) {
    lists.splice(listIndex, 1);
    saveLists();
  }
};

// Sort your lists by one of the three ways
const sortLists = (sortBy) => {
  if (sortBy === "byEdited") {
    return lists.sort((a, b) => {
      if (a.updatedAt > b.updatedAt) {
        return -1;
      } else if (a.updatedAt < b.updatedAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "byCreated") {
    return lists.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return -1;
      } else if (a.createdAt < b.createdAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "alphabetical") {
    return lists.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    return lists;
  }
};

const updateList = (id, updates) => {
  const list = lists.find((list) => list.id === id);

  if (!list) {
    return;
  }

  if (typeof updates.title === "string") {
    list.title = updates.title;
    list.updatedAt = moment.valueOf();
  }

  if (typeof updates.body === "string") {
    list.body = updates.body;
    list.updatedAt = moment().valueOf();
  }

  saveLists();
  return list;
};

lists = loadLists();

export { getLists, createList, removeList, updateList, sortLists };
