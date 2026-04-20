const card_template = document.getElementById("card_template");
const feed = document.getElementById("scroll_window");

var last_scroll_top = 50;

var lastCardId = 0;

export function getMiddleCard(){

    const cards = Array.from(feed.querySelectorAll(".card"))
    const container_rect = feed.getBoundingClientRect();
    const container_center_y = container_rect.top + container_rect.height/2

    var closest_card = null
    var closest_distance = Infinity

    for(const card of cards){
        const rect = card.getBoundingClientRect();
        const card_center_y = rect.top + rect.height/2
        const distance = Math.abs(card_center_y - container_center_y)

        if(distance<closest_distance){
            closest_distance = distance;
            closest_card = card;
        }
    }
    return closest_card   
}
export async function deleteCard(index){
    feed.querySelectorAll(".card")[index].remove();
}
export async function createCard(title, cardId, data){
    const new_template = card_template.content.cloneNode(true);

    if(data.originalimage){
        const new_image = document.createElement("img");
        new_image.src = data.originalimage.source
        new_image.style.width = "100%"
        new_template.querySelector(":nth-child(1)").querySelector("p").after(new_image);
    }

    new_template.querySelector("h1").textContent = title
    new_template.querySelector("p").textContent = data.extract
    new_template.querySelector("button").title_data = title

    new_template.querySelector(".card").cardId = cardId;
    feed.appendChild(new_template)
}

function scrollSnapDetector(e) {
    //scroll direction detector


    if(e.target.scrollTop > last_scroll_top){
        console.log("down")
    } else if(e.target.scrollTop < last_scroll_top) {
        console.log("up")
    }
    last_scroll_top = e.target.scrollTop
    //snap detector
    var atSnappingPoint = e.target.scrollTop % e.target.offsetHeight === 0;
    var timeOut         = atSnappingPoint ? 0 : 150; //see notes

    clearTimeout(e.target.scrollTimeout); //clear previous timeout

    e.target.scrollTimeout = setTimeout(function() {
        const currentCard = getMiddleCard();
        const currentCardId = currentCard.cardId;

        if(currentCardId > lastCardId){
            //scrolling down
            window.dispatchEvent(new CustomEvent("scrolledDown", {
                detail: { cardId: currentCardId, cardElement: currentCard}
              }));
            lastCardId = currentCardId
        } else if (currentCardId < lastCardId){
            //scrolling up
            window.dispatchEvent(new CustomEvent("scrolledUp", {
                detail: { cardId: currentCardId, cardElement: currentCard}
              }));
            lastCardId = currentCardId
        }
    }, timeOut);
}

feed.addEventListener('scroll', scrollSnapDetector);