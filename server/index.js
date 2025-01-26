const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');

const crypto = require('crypto');

function generateDailyRandomNumbers(maxValue, count = 500) {
    // Get today's date as a seed (YYYYMMDD format)
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');

    // Use crypto to create a deterministic seed based on the date
    const seed = parseInt(crypto.createHash('md5').update(today).digest('hex').slice(0, 8), 16);

    // Simple pseudo-random number generator (Mulberry32 algorithm)
    function mulberry32(seed) {
        return function() {
            seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
            let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
            t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
    }

    // Initialize PRNG with today's seed
    const random = mulberry32(seed);

    // Generate random numbers
    const numbers = Array.from({ length: count }, () =>
        Math.floor(random() * (maxValue + 1))
    );

    return numbers;
}

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

    const filePath = 'data.txt';

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        try {
            let finalData = [];

            let jsonData = JSON.parse(data);
            console.log(jsonData.length);

            // Find the longest answer
            const longestWord = jsonData.reduce((longest, current) => {
                return current.answer.length > longest.length ? current.answer : longest;
            }, "");

            console.log(`Longest word: ${longestWord}`);
            console.log(`Length: ${longestWord.length}`);

            const maxValue = jsonData.length - 1;  // Set your desired max value here
            const dailyNumbers = generateDailyRandomNumbers(maxValue);
            console.log(dailyNumbers);

            dailyNumbers.forEach((num, index)=>{
                //console.log(num);
                //console.log(jsonData[num]);
                finalData.push(jsonData[num]);
            });

            res.json(finalData);
            /*
                        const maxLength = 14;
                        const filteredData = jsonData.filter(item => item.answer.length <= maxLength);


                        const outputFile = 'filtered_puzzle_data.txt';
                        fs.writeFile(outputFile, JSON.stringify(filteredData, null, 2), (err) => {
                            if (err) {
                                console.error('Error writing file:', err);
                            } else {
                                console.log(`Filtered data written to ${outputFile}`);
                            }
                        });

             */

        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            res.status(500).send('Server error');
        }
    });
});

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

app.get('/highscore/:gameName', (req, res) => {
    const { gameName } = req.params;

    if (!gameName) {
        return res.status(400).json({ error: 'Invalid request. Missing gameName.' });
    }

    if (!highScores[gameName]) {
        return res.status(404).json({ message: `No high scores found for game: ${gameName}.`, scores: {} });
    }

    res.json({scores: highScores[gameName]});
})

app.listen(8080, () => {
    console.log('ApiServer listening on port 8080');
})







