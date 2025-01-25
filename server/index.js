const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');

const io = require('socket.io')(9992, {
    cors: {
        origin: "*"
    }
});

let clients = [];

function messageHandler(data) {
    for (let i=0; i < clients.length; i++) {
        clients[i].send(data);
    }
    console.log(data);
}

io.on('connection', function(socket) {
    clients.push(socket);
    socket.on('message', messageHandler);
});

console.log("ChatServer listening on port 9992");


app.use(cors());

console.log(app);


app.get('/SudokuBoard', (req, res) => {
    console.log("SudokuBoard Backend API Call...")

    const apiUrl = 'https://sugoku.onrender.com/board?difficulty=easy'

    axios.get(apiUrl)
        .then(response => res.json(response.data))
        .catch(error => {
            console.error('Error fetching data:', error);
            res.status(500).send('Server error');
        });


});

app.get('/Crossword', (req, res) => {
    console.log("Crossword Backend API Call...")

    const apiUrl = 'https://crossword-maker.p.rapidapi.com/crosswords/create-crossword'

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'x-rapidapi-key': '50154ac29emsh8b479d978d31ab4p160ab3jsn0357769acfe4',
            'x-rapidapi-host': 'crossword-maker.p.rapidapi.com'
        },
        body: {
            qFields: [
                'question1',
                'question2'
            ],
            aFields: [
                'Answer1',
                'ansWer2'
            ],
            note: 'example note'
        }
    })
        .then(response => response.text()) // Parse the JSON response
        .then(data => {
            res.text(data); // Send the API response data back to the client
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            res.status(500).send('Server error');
        });

});

app.listen(8080, () => {
    console.log('ApiServer listening on port 8080');
})