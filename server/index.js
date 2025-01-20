const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');

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

app.get('/CineLine', (req, res) => {
    console.log("CineLine Backend API Call...")

    const options = {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjhmYzJiNTMyYjYwOGZmZTUwZDVjNzI5YzNjNjhkNiIsIm5iZiI6MTczNzM3ODUzMi42OTcsInN1YiI6IjY3OGU0YWU0MWMzNDFjODg5OTZkZTc5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b4jj-URqxALB3OvK2jJucywyDFLM_m_7WNkJzR6uB_4'
        }
    };

    // const apiUrl = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1'

    const apiUrls = [
        'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
        'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=2',
        'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=3',
        'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=4',
        'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=5'
    ];

    const apiRequests = apiUrls.map(url => axios.get(url, options));

    Promise.all(apiRequests)
        .then(responses => {
            // Wenn alle Anfragen erfolgreich sind, sende die kombinierten Daten zurück
            const combinedData = responses.map(response => response.data);
            res.json(combinedData);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            res.status(500).send('Server error');
        });
});

app.listen(8080, () => {
    console.log('server listening on port 8080');
})