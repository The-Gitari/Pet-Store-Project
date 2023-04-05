const apiUrl = "https://api.thedogapi.com/v1";
const apiKey = "live_yteZqRBNj4idAySvdpEyUembQtxUaLc0cY4dcLSkJeYLLVNXmtQ17Pm3Fj1UXzx1";

// Function to display dog information on the page
function displayDogInfo(dog) {
  const dogDiv = document.createElement("div");
  const dogImage = document.createElement("img");
  dogImage.src = dog.url;
  dogImage.alt = "Dog image";
  const breedParagraph = document.createElement("p");
  breedParagraph.innerText = `Breed: ${dog.breeds[0].name}`;
  const lifeSpanParagraph = document.createElement("p");
  lifeSpanParagraph.innerText = `Life span: ${dog.breeds[0].life_span}`;
  const temperamentParagraph = document.createElement("p");
  temperamentParagraph.innerText = `Temperament: ${dog.breeds[0].temperament}`;
  dogDiv.appendChild(dogImage);
  dogDiv.appendChild(breedParagraph);
  dogDiv.appendChild(lifeSpanParagraph);
  dogDiv.appendChild(temperamentParagraph);
  document.getElementById("dogs").appendChild(dogDiv);
}

// Search for dog breed
document.getElementById("search-button").addEventListener("click", () => {
  const breed = document.getElementById("search-input").value.trim();
  if (breed !== "") {
    fetch(`${apiUrl}/breeds/search?q=${breed}`, {
      headers: {
        "live_yteZqRBNj4idAySvdpEyUembQtxUaLc0cY4dcLSkJeYLLVNXmtQ17Pm3Fj1UXzx1": apiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("dogs").innerHTML = "";
        data.forEach((breedData) => {
          fetch(`${apiUrl}/images/search?breed_id=${breedData.id}`, {
            headers: {
              "live_yteZqRBNj4idAySvdpEyUembQtxUaLc0cY4dcLSkJeYLLVNXmtQ17Pm3Fj1UXzx1": apiKey,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              data.forEach((dog) => displayDogInfo(dog));
            })
            .catch((error) => console.error(error));
        });
      })
      .catch((error) => console.error(error));
  }
});

// Upload a dog
document.getElementById("upload-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const breed = document.getElementById("breed").value.trim();
  const email = document.getElementById("email").value.trim();
  if (name !== "" && breed !== "" && email !== "") {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("breed", breed);
    formData.append("email", email);
    fetch(`${apiUrl}/images/upload`, {
      method: "POST",
      headers: {
        "live_yteZqRBNj4idAySvdpEyUembQtxUaLc0cY4dcLSkJeYLLVNXmtQ17Pm3Fj1UXzx1": apiKey,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => alert("Dog uploaded successfully!"))
      .catch((error) => console.error(error));
  }
});
