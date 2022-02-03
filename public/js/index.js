const sendButton = document.getElementById('sendButton');
const textArea = document.getElementById('message-input');
const messageContainer = document.getElementById('chat-window');



sendButton.addEventListener('click', async function (){
    const res = await fetch('http://localhost:3000/users')
    if(!res.ok) 
})


