
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");

searchBtn.addEventListener("click", getMovie);

document.getElementById("search-bar").addEventListener("submit", function(event) {
    event.preventDefault();
});

async function getMovie() {
    console.log(searchInput.value);
    const response = await fetch(`https://www.omdbapi.com/?apikey=145209d1&t=${searchInput.value}`);
    const data = await response.json();
    console.log(data);
    if (data.Title) {
        document.getElementById("toggle-empty").style.display = "none";
        document.getElementById("search-results").innerHTML += `
            <div id="result">
                <img src="${data.Poster}" />
                <div id="result-info">
                    <div id="result-1">
                        <p>${data.Title} ⭐</p>
                        <p>${data.Ratings[0].Value.split('/')[0]}</p>
                    </div>
                    <div id="result-2">
                        <p id="runtime">${data.Runtime}</p>
                        <p id="genre">${data.Genre}</p>
                        <div id="add-icon"></div>
                        <p id="watch">Watchlist</p>
                    </div>
                    <div id="result-3">
                        <p id="summary">${data.Plot}</p>
                    </div>
                </div>
            </div>
            <hr />
    `;
    } else {
        document.getElementById("search-results").innerHTML += `
            <p>Unable to find what you’re looking for. Please try another search.</p>
    `;
    }

}



