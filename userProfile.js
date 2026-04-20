var session_profile = {
    seen:[]
}
var loaded_profile;
try{loaded_profile = JSON.parse(localStorage.getItem("profile"))} catch(error){
    loaded_profile = session_profile
}

export function add_to_session(title){
    console.log(loaded_profile)
    if(typeof loaded_profile == undefined || loaded_profile.length == 0){
        loaded_profile = session_profile
    }
    loaded_profile.seen.push(title)
}
export function saveProfile(){
    localStorage.setItem("profile", JSON.stringify(loaded_profile))
}