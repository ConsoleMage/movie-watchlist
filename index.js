

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
                </div>
                <div id="result-2">
                    <p id="runtime">116 min</p>
                    <p id="genre">Drama, Mystery, Sci-fi</p>
                    <img id="add-icon" />
                    <p id="watch">Watchlist</p>
                </div>

            </div>
        </div>
        <hr />
    `;
}

getMovie();


// <div id="result-3">
// <p id="summary">A blade runner must pursue and terminate four replicants who stole a ship in space, and have returned to Earth to find their creator.</p>
// </div>


