const apiKey = ''; // Apenas a chave da API, não a URL completa, criar chave no site: https://www.omdbapi.com/

function searchMovie() {
    const movieInput = document.getElementById('movieInput').value;

    /*fetch: Usa para fazer uma requisição do recurso do JSON de servidores*/
    /*encodeURIComponent: Trata caracteres especiais da string que será incluída na URL*/
    fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(movieInput)}&apikey=${apiKey}`)
        /*.then(response..)..: É uma chamada de API fetch para processar resposta HTTP*/
        /*.then: Manipula o resultado assincrono*/
        /*.resonse.json.: Retorno da chamada que tá sendo passada no .then*/
        
        .then(response => response.json())
        .then(data => {
            const resultContainer = document.getElementById('movieResult');
            const sadFace = document.getElementById('sadFace');
            const errorMessage = document.getElementById('errorMessage');
            const movieDetails = document.getElementById('movieDetails');

            if (data.Response === 'True') {
                sadFace.style.display = 'none';
                errorMessage.textContent = '';
                displayMovieDetails(data, movieDetails);
            } else {
                sadFace.style.display = 'block';
                errorMessage.textContent = 'Filme não encontrado.';
                movieDetails.style.display = 'none';
            }

            resultContainer.style.display = 'block';
        })
        .catch(error => console.error('Erro na busca do filme:', error));
}

function displayMovieDetails(data, container) {
    container.style.display = 'block';
    container.innerHTML = `
        <img src="${data.Poster}" alt="${data.Title}">
        <h2>${data.Title}</h2>
        <p><strong>Ano:</strong> ${data.Year}</p>
        <p><strong>Gênero:</strong> ${data.Genre}</p>
        <p><strong>Duração:</strong> ${data.Runtime}</p>
        <p><strong>Sinopse:</strong> ${data.Plot}</p>
        <!--<p><strong>Diretor:</strong> ${data.Director}</p>-->
        <!--<p><strong>Atores:</strong> ${data.Actors}</p>-->       
        
    `;
}

