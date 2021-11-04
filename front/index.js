document.getElementById("submit").addEventListener("click", getShortUrl);
async function getShortUrl() {
    let longUrl = document.getElementById("longUrl").value
    const res = await fetch("http://localhost:3000/", {
        method: "POST",
        headers:{
            Accept: "application/json",
             "Content-Type": "application/json"
        },
        body: JSON.stringify({"url": longUrl})
    })
    document.getElementById("shortUrl").innerText = await res.json();
}

document.getElementById("statistic").addEventListener("click", async ()=>{
    let link = document.getElementById("shortUrl").innerText;
    if(link === "" || link === "url not valid") return;
    let id = link.split("/")[3];
    const res = await fetch(`http://localhost:3000/api/${id}`, {method: "GET"});
        console.log(id);
       let result = await res.json();
       document.getElementById("urlStats").innerText = `this link was visited ${result.timesVisited} times and was last visited on ${result.lastVisited}`;
    console.log(result);
})