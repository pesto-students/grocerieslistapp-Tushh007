let userList = ["user1", "user2", "user3"];
let currentUser = "";

document.querySelector("#search-user").addEventListener("input", (e) => {
  currentUser = e.target.value;
});

document.querySelector("#login").addEventListener("click", () => {
  const user = userList.find((user) => user === currentUser);
  if (user) {
    localStorage.setItem("currentUser", currentUser);
    location.assign(`/home.html#${user}`);
  } else {
    document.querySelector("#msg").textContent = "USER NOT FOUND! TRY AGAIN...";
  }
});
