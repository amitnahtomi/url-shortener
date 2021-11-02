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
    console.log(await res.data);
    //document.getElementById("shortUrl").innerText = res.data;
}