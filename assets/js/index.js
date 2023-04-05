const apiUrl = "https://api.thedogapi.com/v1/images/search?limit=10";
const apiKey = "YOUR_API_KEY"; // Replace with your own API key

fetch(apiUrl, {
  headers: {
    "x-api-key": apiKey,
  },
})
  .then((response) => response.json())
  .then((data) => {
    const dogsDiv = document.getElementById("dogs");
    let dogsHtml = "";
    data.forEach((dog) => {
      dogsHtml += `
        <div>
          <img src="${dog.url}" alt="Dog image">
          <p>Breed: ${dog.breeds[0].name}</p>
          <p>Life span: ${dog.breeds[0].life_span}</p>
          <p>Temperament: ${dog.breeds[0].temperament}</p>
        </div>
      `;
    });
    dogsDiv.innerHTML = dogsHtml;
  })
  .catch((error) => console.error(error));
