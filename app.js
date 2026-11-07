const $ = (id) => document.getElementById(id);
let authMode = "signup";
let deferredInstall = null;
const questions = {
  question:["What is one small thing I do that makes you feel loved?","What is a memory of us that always makes you smile?","What is something new you'd love for us to try together?","When do you feel most understood by me?"],
  rather:["Would you rather have a cosy movie night or a spontaneous adventure?","Would you rather travel to the beach or explore a new city together?","Would you rather receive a handwritten letter or a surprise date?"],
  know:["What is my ultimate comfort food?","What is one place I dream of visiting?","What always makes me laugh?"],
  truth:["What was your first impression of me?","What is something you've always wanted to tell me?","What is your favourite way for us to spend time together?"]
};
let currentGame = "question";
let questionIndex = 0;
function toast(message){const t=$("toast");t.textContent=message;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2300)}
function getUsers(){try{return JSON.parse(localStorage.getItem("together_demo_users")||"[]")}catch{return []}}
function showMain(user){$("auth-screen").classList.add("hidden");$("main-screen").classList.remove("hidden");$("user-name").textContent=user.name;showPage("home")}
function showPage(page){document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));$(page+"-page").classList.add("active");document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.page===page));}
document.querySelectorAll(".auth-tab").forEach(btn=>btn.addEventListener("click",()=>{authMode=btn.dataset.mode;document.querySelectorAll(".auth-tab").forEach(b=>b.classList.toggle("active",b===btn));$("name-label").classList.toggle("hidden",authMode==="login");$("display-name").classList.toggle("hidden",authMode==="login");$("display-name").required=authMode==="signup";$("auth-submit").innerHTML=authMode==="signup"?'Create my account <span>→</span>':'Log in <span>→</span>';$("password").autocomplete=authMode==="signup"?"new-password":"current-password";}));
$("auth-form").addEventListener("submit",e=>{e.preventDefault();const email=$("email").value.trim().toLowerCase(),password=$("password").value,name=$("display-name").value.trim();let users=getUsers();if(authMode==="signup"){if(users.some(u=>u.email===email)){toast("An account with this email already exists on this device.");return}const user={email,password,name:name||"Friend"};users.push(user);localStorage.setItem("together_demo_users",JSON.stringify(users));localStorage.setItem("together_demo_session",email);showMain(user);toast("Welcome to Together ❤️")}else{const user=users.find(u=>u.email===email&&u.password===password);if(!user){toast("We couldn't find that demo account on this device.");return}localStorage.setItem("together_demo_session",email);showMain(user);toast("Welcome back ❤️")}});
$("logout-btn").addEventListener("click",()=>{localStorage.removeItem("together_demo_session");$("main-screen").classList.add("hidden");$("auth-screen").classList.remove("hidden");toast("You have logged out.")});
document.querySelectorAll("[data-page]").forEach(b=>b.addEventListener("click",()=>showPage(b.dataset.page)));
document.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>showPage(b.dataset.go)));
$("generate-code").addEventListener("click",()=>{const code="TOG-"+Math.random().toString(36).slice(2,6).toUpperCase()+"-"+Math.random().toString(36).slice(2,4).toUpperCase();$("invite-code").textContent=code;localStorage.setItem("together_demo_invite",code);toast("Demo invite code created.")});
$("copy-code").addEventListener("click",async()=>{const code=$("invite-code").textContent;try{await navigator.clipboard.writeText(code);toast("Invite code copied.")}catch{toast("Your code is "+code)}});
function loadGame(type){currentGame=type;questionIndex=Math.floor(Math.random()*questions[type].length);$("game-title").textContent=({question:"Question of the day",rather:"Would you rather?",know:"How well do you know me?",truth:"Truth or dare"})[type];$("game-question").textContent=questions[type][questionIndex];$("game-play").classList.remove("hidden");$("game-play").scrollIntoView({behavior:"smooth",block:"nearest"})}
document.querySelectorAll("[data-game]").forEach(b=>b.addEventListener("click",()=>loadGame(b.dataset.game)));
$("next-question").addEventListener("click",()=>{questionIndex=(questionIndex+1)%questions[currentGame].length;$("game-question").textContent=questions[currentGame][questionIndex]});
$("save-date").addEventListener("click",()=>{const date=$("special-date").value;if(!date){toast("Choose a date first.");return}localStorage.setItem("together_demo_date",date);renderCountdown(date);toast("Your special date has been saved on this device.")});
function renderCountdown(date){const target=new Date(date+"T00:00:00");const today=new Date();today.setHours(0,0,0,0);const days=Math.round((target-today)/86400000);$("countdown-result").textContent=days>0?`${days} days until your special day ♡`:days===0?"It's your special day! Celebrate love ♡":`Your special day was ${Math.abs(days)} days ago ♡`}
const savedDate=localStorage.getItem("together_demo_date");if(savedDate){$("special-date").value=savedDate;renderCountdown(savedDate)}
const session=localStorage.getItem("together_demo_session");if(session){const user=getUsers().find(u=>u.email===session);if(user)showMain(user)}
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredInstall=e;$("install-btn").classList.remove("hidden")});
$("install-btn").addEventListener("click",async()=>{if(!deferredInstall){toast("Use your browser menu and choose Add to Home screen.");return}deferredInstall.prompt();await deferredInstall.userChoice;deferredInstall=null;$("install-btn").classList.add("hidden")});
if("serviceWorker" in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register("./service-worker.js").catch(()=>{}))}
