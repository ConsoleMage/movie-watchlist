let movieTitleArray = [];
let watchList = [];

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");

searchBtn.addEventListener("click", getMovieByTitle);

// Prevent form button submit default behaviour

document.getElementById("search-bar").addEventListener("submit", function (event) {
    console.log("prevent default works here!!");
    event.preventDefault();
});

// Use global variable movieTitleArray in for...of loop to return all data from &t= endpoint

async function getMovieByTitle() {
    await getMovieBySearch();
    console.log(movieTitleArray.length);
    if (movieTitleArray.length >= 1) {
        for (let movie of movieTitleArray) {
            const titleResponse = await fetch(`https://www.omdbapi.com/?apikey=145209d1&t=${movie}`);
            const titleData = await titleResponse.json();
            let movieObj = {
                poster: titleData.Poster,
                title: titleData.Title,
                rating: titleData.imdbRating,
                runtime: titleData.Runtime,
                genre: titleData.Genre,
                plot: titleData.Plot,
                id: titleData.imdbID
            };
            if (movieObj) {
                document.getElementById("toggle-empty").style.display = "none";
                document.getElementById("search-results").innerHTML += `
                    <div id="result" data-id=${movieObj.id}>
                        <img src="${movieObj.poster}" />
                        <div id="result-info">
                            <div id="result-1">
                                <p>${movieObj.title} ⭐</p>
                                <p>${movieObj.rating}</p>
                            </div>
                            <div id="result-2">
                                <p id="runtime">${movieObj.runtime}</p>
                                <p id="genre">${movieObj.genre}</p>
                                <div class="add-icon" data-id=${movieObj.id}></div>
                                <p id="watch">Watchlist</p>
                            </div>
                            <div id="result-3">
                                <p id="summary">${movieObj.plot}</p>
                            </div>
                        </div>
                    </div>
                    <hr />
                `;
            }
        }
    } else if (movieTitleArray.length === 0) {
        console.log("check if here is working");
        document.getElementById("toggle-empty").style.display = "none";
        document.getElementById("search-results").innerHTML += `
            <p>Unable to find what you’re looking for. Please try another search.</p>
    `;
    }
}

// Get movie titles from &s= endpoint first

async function getMovieBySearch() {
    const searchResponse = await fetch(`https://www.omdbapi.com/?apikey=145209d1&s=${searchInput.value}`);
    const searchData = await searchResponse.json();
    let movieArray = searchData.Search;
    if (movieArray) {
        for (let movie of movieArray) {
            movieTitleArray.push(movie.Title);
        }
    }
}

// Add to watchlist functionality

document.querySelector(".container").addEventListener("click", (e) => {
    const resultElement = document.querySelector(`#result[data-id="${e.target.dataset.id}"]`)

    if (resultElement) {
        console.log("add-icon clicked?")
        watchList.push(resultElement.outerHTML);
        localStorage.setItem("savedResultHTML", JSON.stringify(watchList));
    }

    const removeBtn = document.querySelector(".remove-icon")
});
