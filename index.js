async function getMovie() {
    const response = await fetch("https://www.omdbapi.com/?i=tt3896198&apikey=145209d1");
    const data = await response.json();
    console.log(data);
    let html = "";
    document.getElementById("search-results").innerHTML = `
            <div id="result">
                <img src=${data.Poster} />
                <h2>Home</h2>
                <p>This is the home section.</p>
            </div>
    `;
    
}

getMovie();


