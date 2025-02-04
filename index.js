async function getMovie() {
    const response = await fetch("https://www.omdbapi.com/?i=tt3896198&apikey=145209d1");
    const data = await response.json();
    console.log(data);
    let html = "";
    document.getElementById("search-results").innerHTML = `
        <div id="result">
            <img src="${data.Poster}" />
            <div id="result-info">
                <p>${data.Title}</p>
                <div id="movie-info">
                    <p>This is the home section.</p>
                    <div>
                        <img id="add-icon" />
                        <p>Watchlist</p>
                    </div>

                </div>
            </div>
        </div>
        <hr />
    `;
}

getMovie();


