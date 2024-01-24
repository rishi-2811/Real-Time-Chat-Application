const socket=io('http://localhost:7000')
const messageContainer=document.getElementById('message-container')
const messageForm=document.getElementById('send-container')
const messageInput=document.getElementById('message-input')

const name=prompt('Enter your name?')
appendMessage('You joined')
socket.emit('new-user',name)

socket.on('newuser-message',name=>{
    appendMessage(`${name} joined`)
})

messageForm.addEventListener('submit',e=>{
    e.preventDefault()
    const message=messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-message',message)
    messageInput.value=''
})

function appendMessage(message){
    const messageElement=document.createElement('div')
    messageElement.innerText=message
    messageContainer.append(messageElement)
}  

socket.on('chat-message',data=>{
    appendMessage(`${data.name}: ${data.message}`)
})