
document.addEventListener("DOMContentLoaded", function () {
  let socket = io('http://localhost:3310/');

  document.querySelector('#chat-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      const msg = document.getElementById('chat-input').value;
      socket.emit('message', { message: msg });
    }
  });

  socket.on('message', (data) => {
    let content = document.getElementById('output').value;
    document.getElementById('output').value = content + '\n' + data.message;
  });
});
