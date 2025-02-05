
// const addBtn = document.getElementById("add-icon");
// addBtn.addEventListener("click", saveToWatchlist);

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");


searchBtn.addEventListener("click", getMovie);


document.getElementById("search-bar").addEventListener("submit", function(event) {
    console.log("prevent default works here!!");
    event.preventDefault();
});

async function getMovie() {
    console.log(searchInput.value);
    // By Search
    // By Title
    const response = await fetch(`https://www.omdbapi.com/?apikey=145209d1&t=${searchInput.value}`);
    const data = await response.json();
    console.log(data);
    let movieObj = {
        poster: data.Poster,
        title: data.Title,
        rating: data.Ratings[0].Value.split('/')[0],
        runtime: data.Runtime,
        genre: data.Genre,
        plot: data.Plot
    };
    if (movieObj) {
        document.getElementById("toggle-empty").style.display = "none";
        document.getElementById("search-results").innerHTML += `
            <div id="result">
                <img src="${movieObj.poster}" />
                <div id="result-info">
                    <div id="result-1">
                        <p>${movieObj.title} ⭐</p>
                        <p>${movieObj.rating}</p>
                    </div>
                    <div id="result-2">
                        <p id="runtime">${movieObj.runtime}</p>
                        <p id="genre">${movieObj.genre}</p>
                        <div id="add-icon"></div>
                        <p id="watch">Watchlist</p>
                    </div>
                    <div id="result-3">
                        <p id="summary">${movieObj.plot}</p>
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



