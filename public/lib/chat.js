var socket = io.connect();

// on connection to server, ask for user's name with an anonymous callback
socket.on('connect', function(){
    // call the server-side function 'adduser' and send one parameter (value of prompt)
    socket.emit('adduser', prompt("What's your name?"));
});

// listener, whenever the server emits 'updatechat', this updates the chat body
socket.on('updatechat', function (username, data) {
    $('#conversation').append('<b>'+username + ':</b> ' + data + '<br>');
});


function switchRoom(room){
    socket.emit('switchRoom', room);
}

// listener, whenever the server emits 'updateusers', this updates the username list
socket.on('updateusers', function(data) {
    $('#users').empty();
    $.each(data, function(key, value) {
        $('#users').append('<div>' + value + '</div>');
    });
});

// on load of page
$(function(){
    // when the client clicks SEND
    $('#datasend').click( function() {
        var message = $('#data').val();
        $('#data').val('');
        // tell server to execute 'sendchat' and send along one parameter
        socket.emit('sendchat', message);
    });

    // when the client hits ENTER on their keyboard
    $('#data').keypress(function(e) {
        if(e.which == 13) {
            $(this).blur();
            $('#datasend').focus().click();
        }
    });
});

//when button clicked
$(function(){
    // when the client clicks SEND
    $('#dataRoom').click( function() {
        var message = $('#choiceRoom').val(); //On récupère la valeur dans choice
        // tell server to execute 'changeRoom' and send along one parameter
        socket.emit('switchRoom', message);
    });

    // when the client hits ENTER on their keyboard
    $('#choiceRoom').keypress(function(e) {
        if(e.which == 13) {
            $(this).blur();
            $('#dataRoom').focus().click();
        }
    });
});