

async function getMovie() {
    const response = await fetch("https://www.omdbapi.com/?i=tt3896198&apikey=145209d1");
    const data = await response.json();
    console.log(data);
    let html = "";
    document.getElementById("search-results").innerHTML = `
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
                    <img id="add-icon" />
                    <p id="watch">Watchlist</p>
                </div>
                <div id="result-3">
                    <p id="summary">${data.Plot}</p>
                </div>
            </div>
        </div>
        <hr />
    `;
}

getMovie();





