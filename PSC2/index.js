// https://swapi.dev/api/people/?search=

let id;

async function makeRequest(q){
    try{
        var res = await fetch(`https://swapi.dev/api/people/?search=${q}`);
        var data = await res.json()
        // console.log(data)
        console.log(data.results);
        return data.results;
    }catch(error){
        console.log(error);
        
    }
}

let searchList = document.getElementById('searchList');


function append(movies){
    // console.log(movies);
    searchList.innerText = null;
    if(movies == undefined){
        return false;
    }
movies.forEach(el => {

    let p1 = document.createElement('p');
    p1.innerText = el.name;
    p1.style.cursor = "pointer";
    p1.style.padding = "10px"
    p1.style.backgroundColor = "#F8F8F8"

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





