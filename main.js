const card_template = document.getElementById("card_template");
const feed = document.getElementById("scroll_window");


async function get_wiki_data(page_name) {
    const response = await fetch("https://en.wikipedia.org/api/rest_v1/page/summary/"+page_name);
    const data = await response.json();
    return data;
}
async function get_random_article(count){
    const response = await fetch("https://en.wikipedia.org/w/api.php?origin=*&action=query&list=random&format=json&rnnamespace=0&rnfilterredir=nonredirects&rnlimit="+count);
    const data = await response.json();
    return data;
}
async function main() {
    const articles = await get_random_article(3) 
    console.log(articles)

    create_card(articles.query.random[0].title)
    create_card(articles.query.random[1].title)
    create_card(articles.query.random[2].title)
}
async function expand(){
    const response = await fetch("https://en.wikipedia.org/w/rest.php/v1/page/"+current_page_name+"/html");
    const data = await response.text();
    console.log(data)   
}
async function create_card(title){
    const new_template = card_template.content.cloneNode(true);

    current_page = await get_wiki_data(title);

    if(current_page.originalimage){
        const new_image = document.createElement("img");
        new_image.src = current_page.originalimage.source
        new_image.style.width = "100%"
        new_template.querySelector(":nth-child(1)").querySelector("p").after(new_image);
    }

    new_template.querySelector("h1").textContent = title
    new_template.querySelector("p").textContent = current_page.extract
    new_template.querySelector("button").title_data = title

    feed.appendChild(new_template)
}


function scrollSnapDetector(e) {
    var atSnappingPoint = e.target.scrollTop % e.target.offsetHeight === 0;
    var timeOut         = atSnappingPoint ? 0 : 150; //see notes

    clearTimeout(e.target.scrollTimeout); //clear previous timeout

    e.target.scrollTimeout = setTimeout(function() {
        console.log('Scrolling stopped!');
    }, timeOut);
}

feed.addEventListener('scroll', scrollSnapDetector);

main();