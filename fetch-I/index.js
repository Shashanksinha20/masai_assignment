async function makeRequest(){
    try{
        let searchVal = document.getElementById('search__input').value;
        var res = await fetch(`http://www.omdbapi.com/?t=${searchVal}&apikey=fdd074e7`);
        var data = await res.json()
        // console.log(data)
        append(data);
        
    }
    catch(error){
        console.log(error);
        let container = document.getElementById('container');
        let imgHolder = document.createElement('div')
        imgHolder.style.border = "2px solid #333333"
        imgHolder.setAttribute("class", "imgHolder");
        let poster = document.createElement('img')
        poster.src = "https://i.stack.imgur.com/6M513.png"
        imgHolder.append(poster);
        container.append(imgHolder);
        // https://i.stack.imgur.com/6M513.png
    }
}

function append(data){
    
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