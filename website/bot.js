//chatbot
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn=document.querySelector(".chat-input span");
const chatbox=document.querySelector(".chatbox")

let userMessage;
const API_KEY="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";

const createChatLi=(message,className)=>{
//create a chat<li> element with passed message and className

const chatLi = document.createElement("li");
chatLi.classList.add("chat",className);
let chatContent=className ==="chat-outgoing"? `<p>${message}</p>` : `<span class="material-symbols-outlined">
smart_toy
</span><p>${message}</p>`;
chatLi.innerHTML=chatContent;
return chatLi;
}
const generateResponse =(incomingChatLI)=>{
    const API_URL="https://api.openai.com/v1/chat/completions";
    const messageElement =incomingChatLI.querySelector("p")


    //define properties and message for api request
    const requestOptions={
        method:"POST",
        
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${API_KEY}`
        },
        body:JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user",content: userMessage}]
        }),
    }
    //send post requst to api get response
    fetch(API_URL,requestOptions).then(res=>res.json()).then(data => {
        messageElement.textContent=data.choices[0].message.content;
    }).catch((error)=>{
        messageElement.textContent="Oops!Something went wrong,please try later.";
    })
}

const handleChat =()=>{
    userMessage=chatInput.value.trim();
    if(!userMessage)return;
    //append the users message to the chatbox
   chatbox.appendChild(createChatLi(userMessage,"chat-outgoing"));

   setTimeout(()=>{
    //display typing response
    const incomingChatLI=createChatLi("Typing....","chat-incoming")
    chatbox.appendChild(incomingChatLI);
    generateResponse(incomingChatLI);
   },600)

}

sendChatBtn.addEventListener("click",handleChat);


