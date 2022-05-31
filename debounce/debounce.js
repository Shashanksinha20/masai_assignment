let id;

async function makeRequest(q){
    try{
        var res = await fetch(`http://www.omdbapi.com/?s=${q}&apikey=fdd074e7`);
        var data = await res.json()
        console.log(data)
        // append(data);
        return data.Search;
    }catch(error){
        console.log(error);
        // let container = document.getElementById('container');
        // let imgHolder = document.createElement('div')
        // imgHolder.style.border = "2px solid #333333"
        // imgHolder.setAttribute("class", "imgHolder");
        // let poster = document.createElement('img')
        // poster.src = "https://i.stack.imgur.com/6M513.png"
        // imgHolder.append(poster);
        // container.append(imgHolder);

        // https://i.stack.imgur.com/6M513.png
    }
}

let searchList = document.getElementById('searchList');


function append(movies){
    console.log(movies);
    searchList.innerText = null;
    if(movies == undefined){
        return false;
    }
movies.forEach(el => {

    let p1 = document.createElement('p');
    p1.innerText = el.Title;
    p1.style.cursor = "pointer";
    p1.style.padding = "10px"
    p1.style.backgroundColor = "#F8F8F8"
    p1.addEventListener('click', function(event){
        console.log(el);
        appendMovieCard(el.imdbID)
        // appendMovieCard(el)

    })


    searchList.append(p1);
});

}




async function main()
{
    let query = document.getElementById('search__input').value;
    if(query.length){
        searchList.style.display = "block";
    }else{
        searchList.style.display = "none";
    }
    let response = makeRequest(query);
    let data = await response
    // console.log("mainfunc",data); 
    append(data)

}

function debounceFunction(func, delay){clearTimeout(id)
    if(id){
        clearTimeout(id)
    }
    id = setTimeout(function(){
        func()
    },delay)
}


async function fetchMovieWithImdbId(id){
    try{
        var res = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=fdd074e7`);
        var data = res.json()
        // console.log(data)
        return data;
        
    }catch(error){
        console.log(error);
        
    }
}



async function appendMovieCard(id){

    // async function appendMovieCard(data){
        const data =  await fetchMovieWithImdbId(id)
        searchList.style.display = "none";

        console.log(data, data.imdbID, data.Poster)

        let container = document.getElementById('container');
        
        let imgHolder = document.createElement('div')
        imgHolder.setAttribute("class", "imgHolder");
        let poster = document.createElement('img')
        poster.src = data.Poster
        imgHolder.append(poster);

        let movieDesc = document.createElement('div');
        movieDesc.setAttribute("class", "movieDesc");

        let title = document.createElement('h1');
        title.innerText = data.Title;

        let releaseDate = document.createElement('p');
        releaseDate.innerText = "Released : "+data.Released

        let director = document.createElement('p');
        director.innerText = "Director : "+data.Director

        let ratings = document.createElement('p');
        ratings.innerText = "IMDb : "+data.Ratings[0].Value

        let genre = document.createElement('p');
        genre.innerText = "Genre : "+data.Genre


        let lang = document.createElement('p');
        lang.innerText = "Language : "+data.Language

        // console.log(data.Ratings[0].Value)

        let str = data.Ratings[0].Value.slice(0,3)
        console.log(str);

        let flag = false;
        let recommend = document.createElement('div');

        if(Number(str) > 8.5){
            flag = true
            recommend.setAttribute("class", "recommendTag");
            recommend.innerText = "RECOMMENDED"
        }
        // console.log(Number(ratings*10))

        if(flag){
            movieDesc.append(title, releaseDate, director, ratings, genre, lang, recommend);
        }else{
            movieDesc.append(title, releaseDate, director, ratings, genre, lang);
        }
        

        container.append(imgHolder, movieDesc);

}