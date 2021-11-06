import './style.css'
document.getElementById("submit").addEventListener("click", getShortUrl);
async function getShortUrl() {
    let longUrl = document.getElementById("longUrl").value
    const res = await fetch("http://localhost:3000/short/", {
        method: "POST",
        headers:{
            Accept: "application/json",
             "Content-Type": "application/json"
        },
        body: JSON.stringify({"url": longUrl})
    })
    let result = await res.json();
    if(result !== "url not valid"){
    document.getElementById("shortUrl").innerText = result;
    document.getElementById("shortUrl").href = result;
    return;
    }
    document.getElementById("shortUrl").innerText = result;
}

document.getElementById("statistic").addEventListener("click", async ()=>{
    let link = document.getElementById("shortUrl").innerText;
    if(link === "" || link === "url not valid") return;
    let id = link.split("/")[3];
    const res = await fetch(`http://localhost:3000/api/${id}`, {method: "GET"});
       let result = await res.json();
       if(result.lastVisited !== undefined){
       document.getElementById("urlStats").innerText = `this link was visited ${result.timesVisited} times and was last visited on ${result.lastVisited}`;
       }
       else {
        document.getElementById("urlStats").innerText = `this link was visited ${result.timesVisited} times`
       }
});
