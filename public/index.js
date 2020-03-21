var socket = io();
socket.on('connect', () =>{
    console.log('connected to server');  
})
socket.on('disconnect', ()=>{
    console.log('disconnected to server');
})
socket.on('newMessage', (message)=>{
    console.log(message);
    var li = $('<li></li>')
    li.text(`${message.from}: ${message.text}`)
    li.appendTo($('#messages'))
})

$('#submit').click(function(){
    var msgText = $('.msgtext').val();
    if(msgText.length < 1){
        alert("Message length should be greater than 0")
        return;
    }
    socket.emit('createMessage', {
        from: 'User',
        text: msgText
    }, function(){
        var msgText = $('.msgtext').val('');
        console.log('got it');
    })
});
