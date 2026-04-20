export async function getWikiData(page_name) {
    const response = await fetch("https://en.wikipedia.org/api/rest_v1/page/summary/"+page_name);
    const data = await response.json();
    return data;
}
export async function getRandomArticle(count){
    const response = await fetch("https://en.wikipedia.org/w/api.php?origin=*&action=query&list=random&format=json&rnnamespace=0&rnfilterredir=nonredirects&rnlimit="+count);
    const data = await response.json();
    return data;
}