let movieTitleArray = [];
let watchList = [];

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");

searchBtn.addEventListener("click", getMovieByTitle);

// Prevent form button submit default behaviour

document.getElementById("search-bar").addEventListener("submit", function (event) {
    event.preventDefault();
});

// Use global variable movieTitleArray in for...of loop to return all data from &t= endpoint

async function getMovieByTitle() {
    let html = "";
    movieTitleArray = [];
    await getMovieBySearch();
    console.log(movieTitleArray.length);
    if (movieTitleArray.length >= 1) {
        for (let movie of movieTitleArray) {
            const titleResponse = await fetch(`https://www.omdbapi.com/?apikey=145209d1&t=${movie}`);
            const titleData = await titleResponse.json();
            document.getElementById("toggle-empty").style.display = "none";
            document.getElementById("container").style.overflowY = "scroll";

            if (titleData.Plot.length > 132) {
                let maxLength = 132;
                let shortText = truncateText(titleData.Plot, maxLength);
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
                            <span>${shortText}<button type="button" data-plot="${titleData.Plot}">Read more</button></span>
                            
                        </div>
                    </div>
                </div>
                <hr />
            `;
            } else {
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
                            <p>${titleData.Plot}</p>
                        </div>
                    </div>
                </div>
                <hr />
            `;
            }
            document.getElementById("search-results").innerHTML += html;

        }
    } else if (movieTitleArray.length === 0) {
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

// Read more functionality

document.querySelector("#container").addEventListener("click", (e) => {

    if (e.target.tagName === "BUTTON" && e.target.dataset.plot) {
        const resultElement = e.target.closest('.result-3');
        const textElement = resultElement.querySelector('span');

        console.log(textElement);
        console.log(e.target.dataset.plot);

        if (textElement) {
            const plotText = e.target.dataset.plot;
            textElement.textContent = plotText;
        }
        e.target.classList.add('hidden');
    }
});

function truncateText(text, maxLength) {
    text = text.trimEnd();

    if (text.length > maxLength) {
        let truncatedText = text.substring(0, maxLength).trimEnd();
        return truncatedText + '...';
    }
    return text;
}

// Watchlist functionality

document.querySelector("#container").addEventListener("click", (e) => {
    const resultElement = document.querySelector(`.result[data-id="${e.target.dataset.id}"]`)
    if (resultElement) {
        watchList.push(resultElement.outerHTML);
        localStorage.setItem("savedResultHTML", JSON.stringify(watchList));
        console.log("Added to watchlist!")
    }
});