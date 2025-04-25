//login elements
const login = document.querySelector(".login");
const loginForm = document.querySelector(".login__form");
const loginInput = document.querySelector(".login__input");

//chat elements
const chat = document.querySelector(".chat");
const chatForm = chat.querySelector(".chat__form");
const chatInput = chat.querySelector(".chat__input");
const chatMessages = chat.querySelector(".chat__messages");

//msg elements
const msgSelfElement = document.querySelector(".message--self");
const msgSenderElement = document.querySelector(".message--sender");

//user
const user = { id:"", name:"", color:""}

const colors = [
    "cadetblue",
    "darkgoldenrod",
    "cornflowerblue",
    "darkkhaki",
    "hotpink",
    "gold"
];
//ws
let websocket

//mensagem propria
const createMessageSelfElement = (content) => {
    const div = document.createElement("div");
    
    div.classList.add("message--self");
    div.innerHTML = content;
    
    return div
}
//mensagem outros
const createMessageOtherElement = (content, sender, senderColor) => {
    const div = document.createElement("div");
    const span = document.createElement("span");

    div.classList.add("message--other");
    
    div.classList.add("message--self");
    span.classList.add("message--sender");
    span.style.color = senderColor;
    div.appendChild(span);

    span.innerHTML = sender;  
    div.innerHTML += content;

    return div
}

//cor aleatoria do array
const randomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}
//paginar rolar para o fim das mensagens
const scrollScreen = () => {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    })
}
//processar as mensagens
const processMessage = ({ data }) => {
    
    const { userId, userName, userColor, content } = JSON.parse(data);

    const message =
     userId == user.id
     ? createMessageSelfElement(content,)
    : createMessageOtherElement(content, userName, userColor);

    
    chatMessages.appendChild(message);

    scrollScreen();

}
//pegando login
const handleLogin = (event) => {
    event.preventDefault();
    user.name = loginInput.value;
    user.id = crypto.randomUUID();
    user.color = randomColor();

    login.style.display = "none";
    chat.style.display = "flex";
    
   websocket = new WebSocket(`ws://${location.hostname}:8080`);

    websocket.onmessage = processMessage
 
}
//enviando mensagens pro ws
const sendMessage = (event) => {
    event.preventDefault()

    const message = {
        userId: user.id,
        userName: user.name,
        userColor: user.color,
        content: chatInput.value
    }
    
    websocket.send(JSON.stringify(message));

    chatInput.value = ""
}

loginForm.addEventListener("submit", handleLogin);
chatForm.addEventListener("submit", sendMessage);
