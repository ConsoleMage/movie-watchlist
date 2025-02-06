let movieTitleArray = [];
let html = "";
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
    movieTitleArray = [];
    await getMovieBySearch();
    console.log(movieTitleArray.length);
    if (movieTitleArray.length >= 1) {
        for (let movie of movieTitleArray) {
            const titleResponse = await fetch(`https://www.omdbapi.com/?apikey=145209d1&t=${movie}`);
            const titleData = await titleResponse.json();
            if (movieTitleArray) {
                document.getElementById("toggle-empty").style.display = "none";
                document.getElementById("container").style.overflowY = "scroll";
                html = `
                    <div class="result" data-id=${titleData.imdbID}>
                        <img src="${titleData.Poster}" />
                        <div class="result-info">
                            <div class="result-1">
                                <p>${titleData.Title} ⭐</p>
                                <p>${titleData.imdbRating}</p>
                            </div>
                            <div class="result-2">
                                <p>${titleData.Runtime}</p>
                                <p class="genre">${titleData.Genre}</p>
                                <div class="add-icon" data-id=${titleData.imdbID}></div>
                                <p class="watch">Watchlist</p>
                            </div>
                            <div class="result-3">
                                <p class="result-3-text">${titleData.Plot}</p>
                                <div class="read-more">Read more</div>
                            </div>
                        </div>
                    </div>
                    <hr />
                `;
                document.getElementById("search-results").innerHTML += html;
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
    document.getElementById("search-results").innerHTML = `
                <div id="toggle-empty">
                    <img id="empty" src="./icons/film.png" alt="" />
                    <p id="empty-text">Start exploring</p>
                </div>`;
}

// Add to watchlist functionality

document.querySelector("#container").addEventListener("click", (e) => {
    const resultElement = document.querySelector(`#result[data-id="${e.target.dataset.id}"]`)
    if (resultElement) {
        watchList.push(resultElement.outerHTML);
        localStorage.setItem("savedResultHTML", JSON.stringify(watchList));
        console.log("Added to watchlist!")
    }
});