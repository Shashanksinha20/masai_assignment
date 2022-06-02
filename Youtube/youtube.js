let api_key = "AIzaSyCMxw_KjNZmLYEakoum5WAdQ7zYjhlPOkY"



let makeRequest = async () => {
    try{
    let query = document.getElementById('query').value;
    let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=${api_key}`
    let res = await fetch(url);
    let data = await res.json()
    console.log(data);
    append(data.items)
    }catch(error){
        console.log(error)
    }
}



let append = (data) => {
    let container = document.getElementById('results');
    // console.log(data);
    data.forEach(({id : {videoId}, snippet: {title}}) => {
        let card = document.createElement('card');
        console.log(videoId)
        console.log(title);
        let iframe = document.createElement('iframe')
        iframe.src = `https://www.youtube.com/embed/${videoId}`;
        iframe.allow = "fullscreen";    
        let h3 = document.createElement('h3');
        h3.innerText = title;
        card.append(iframe, h3);

        let video = {
            title,
            videoId
        }
        card.onclick = () => {
            playvideo(video);
        }


        container.append(card)

    });

    let playvideo = (video) => {
        
        console.log(video);
        window.localStorage.setItem('video', JSON.stringify(video))
        // window.location.href = "video.html"
    }


    // 
}

// <iframe width="560" height="315" src="https://www.youtube.com/embed/QCRpVw2KXf8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>