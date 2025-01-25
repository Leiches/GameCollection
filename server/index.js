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

app.listen(8080, () => {
    console.log('ApiServer listening on port 8080');
})

// Server Management

app.use(express.json());

let highScores = {};

app.post('/highscore', (req, res) => {
    const { userName, gameName, score } = req.body;

    if (!userName || !gameName || score === undefined) {
        return res.status(400).json({ error: 'Invalid request. Missing userName, gameName, or score.' });
    }

    if (!highScores[gameName]) {
        highScores[gameName] = {};
    }

    if (!highScores[gameName][userName] || score > highScores[gameName][userName]) {
        highScores[gameName][userName] = score;
    }

    console.log('Updated highScores:', highScores); // Add this log
    res.json({ highScore: highScores[gameName][userName] });
});




app.get('/highscore/:gameName/:userName', (req, res) => {
    const { gameName, userName } = req.params;


    if (!gameName || !userName) {
        return res.status(400).json({ error: 'Invalid request. Missing gameName or userName.' });
    }

    if (!highScores[gameName]) {
        highScores[gameName] = {};
    }

    const highScore = highScores[gameName][userName] || 0;

    res.json({ highScore });
});



