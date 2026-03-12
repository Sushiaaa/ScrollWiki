const card_template = document.getElementById("card_template");
const feed = document.getElementById("scroll_window");

async function get_wiki_data(page_name) {
    const response = await fetch("https://en.wikipedia.org/api/rest_v1/page/summary/"+page_name);
    const data = await response.json();
    return data;
}

async function main() {
    create_card("Brazil")
    create_card("Germany")
    create_card("Spain")
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
main();