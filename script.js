

const url = 'https://api.freeapi.app/api/v1/public/quotes/quote/random';
const options = {method: 'GET', headers: {accept: 'application/json'}};

async function fetchURL(url,options){
    const res = await fetch(url, options);
    const data = await res.json();
    return data
}

const quote_field = document.getElementById('quote-display');
function getRandomImage() {
    const time = new Date().getTime()
    quote_field.style.backgroundImage = `url('https://picsum.photos/300/300?random=${time}')`;
    // const data = res.json();
    // return res;
}

const getButton = document.getElementById("get-quote");
const author = document.getElementById("author");
const quote = document.getElementById("quote");
const save = document.getElementById("save");
getButton.addEventListener("click",async function(){
    const image = getRandomImage();
    const data = await fetchURL(url,options);
    console.log(data["data"]["content"])
    quote.innerText = data["data"]["content"];
    author.innerText = data["data"]["author"];
    
})

document.getElementById('clipboard').addEventListener('click',()=>{
    navigator.clipboard.writeText(quote.innerText).then(
        ()=>{alert("copied");}
    );
})

document.getElementById('save').addEventListener('click', function() {
    const element = document.getElementById('quote-display');
    html2canvas(element,{useCORS:true}).then(canvas => {
        const imageData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imageData;
        link.download = 'captured-div.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});
document.getElementById('twitter').addEventListener('click',()=>{
    window.open('https://twitter.com/share?url='+encodeURIComponent(quote.innerText))
})