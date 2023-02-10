let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

const toySubmit = document.querySelector(".add-toy-form");
toySubmit.addEventListener("submit", submission);

function submission(event) {
  event.preventDefault();
  const toy1 = {
    name: event.target.name.value,
    likes: 0,
    image: event.target.image.value,
  };
  postToy(toy1);
}

function postToy(toy1) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toy1),
  })
    .then((res) => res.json())
    .then(renderToys);
}

function loadToys() {
  fetch("http://localhost:3000/toys")
    .then((response) => response.json())
    .then((toys) => toys.forEach((toy) => renderToys(toy)));
}
loadToys();

const cardBoard = document.querySelector("#toy-collection");

function renderToys(toys) {
  console.log(toys);
  const div = document.createElement("div");
  div.className = "card";

  const h2 = document.createElement("h2");
  h2.textContent = `${toys.name}`;
  div.append(h2);

  const img = document.createElement("img");
  img.src = `${toys.image}`;
  img.alt = `${toys.name}`;
  img.title = `${toys.name}`;
  img.className = "toy-avatar";
  div.append(img);

  const likes = document.createElement("p");
  likes.innerText = "Like " + toys.likes;
  div.append(likes);

  const likeBtn = document.createElement("button");
  likeBtn.className = "button";
  likeBtn.textContent = "Like ❤️";
  likeBtn.addEventListener("click", () => {
    ++toys.likes;
    
    fetch(`http://localhost:3000/toys/${toys.id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({likes: toys.likes}),
    });
  });

  div.append(likeBtn);

  cardBoard.append(div);
}
