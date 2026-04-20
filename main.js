import * as profile from "./userProfile.js";
import * as wiki from "./wikiData.js";
import * as cards from "./cardHandler.js";



var loaded_card_amount = 10;


async function main() {
    const articles = await wiki.getRandomArticle(loaded_card_amount) 
    console.log(articles)

    for(var i = 0; i<loaded_card_amount; i++){
        cards.createCard(articles.query.random[i].title, i, await wiki.getWikiData(articles.query.random[i].title));
        profile.add_to_session(articles.query.random[i].title)
    }
    profile.saveProfile();
}

main();

window.addEventListener("scrolledDown", async (e) => {

    //delete old card
    cards.deleteCard(0);
    //create new card
    const new_article = await wiki.getRandomArticle(1);
    cards.createCard(new_article.query.random[0].title, e.detail.cardId+1, await wiki.getWikiData(new_article.query.random[0].title));
    console.log(profile.session_profile);
  });
