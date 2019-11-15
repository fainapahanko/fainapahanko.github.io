let url = "https://strive-school-testing-apis.herokuapp.com/api/movies/"
let username = "user15"
let password = "sHHU5KWmVE26avC8"
let token = btoa(username + ":" + password)

loadFilms = async() => {
    let events = await getEvents()
    console.log("events", events)
    let div = document.querySelector("#main-div-with-films")

    if(events.length > 0){
        for(var i = 0; i < events.length; i++){
            console.log(events[i])
            let films = await getEvent(events[i])
            switch (events[i]) {
                case "Comedy": 
                    div.innerHTML += `
                    <div class="header col-12">
                        <h3>${events[i]}</h3>
                    </div>
                    `
                    div.innerHTML += films.map(film => `
                    <div class="card card-item-film col-lg-2 col-md-4 col-sm-6 col-12">
                        <img src="${film.imageUrl}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h6 class="card-text"> <a href="details.html?artistId=${film._id}&artistName=${film.name}">${film.name}</a></h6>
                        </div>
                    </div>`).join("")
                    break;
                case "Drama": 
                    div.innerHTML += `
                    <div class="header col-12">
                        <h3>${events[i]}</h3>
                    </div>
                    `
                    div.innerHTML += films.map(film => `
                    <div class="card card-item-film col-lg-2 col-md-4 col-sm-6 col-12">
                        <img src="${film.imageUrl}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h6 class="card-text"> <a href="details.html?artistId=${film._id}&artistName=${film.name}">${film.name}</a></h6>
                        </div>
                    </div>`).join("")
                    break;
                case "Сartoon": 
                    div.innerHTML += `
                    <div class="header col-12">
                        <h3>${events[i]}</h3>
                    </div>
                    `
                    div.innerHTML += films.map(film => `
                    <div class="card card-item-film col-lg-2 col-md-4 col-sm-6 col-12">
                        <img src="${film.imageUrl}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h6 class="card-text"> <a href="details.html?artistId=${film._id}&artistName=${film.name}">${film.name}</a></h6>
                        </div>
                    </div>`).join("")
                    break;
                default:
                    console.log('Sorry, we are out of');
            }
        }
    }
}

loadFilmsBackOffice = async() => {
    let events = await getEvents();
    const divWithFilms = document.querySelector("#accordion")
    console.log("events", events)

    if(events.length > 0){
        for(var i = 0; i < events.length; i++){
            let films = await getEvent(events[i])
            divWithFilms.innerHTML += films.map(event => 
                `
                <div class="card" id="div${event._id}">
                <a href="backoffice.html?id=${event._id}&name=${event.name}" class="card-a"><h6 class="card-a">Go to films page</6></a>
                    <div>
                        <i class="fas fa-times-circle delete-btn" onclick="deleteFilm('${event._id}')"></i>
                        <a href="backoffice.html?id=${event.name}"><i onclick="updateFilm('${event.category}')" class="fas fa-edit update-btn"></i></a>
                    </div>
                    <div class="card-header" id="'${event.name}'">
                        <h5 class="mb-0">
                            <button class="btn btn-link btn-backoffice collapsed" data-toggle="collapse" data-target="#${event.category}" aria-expanded="false" aria-controls="${event.category}">
                            ${event.name} 
                            </button>
                        </h5>
                    </div>
                    <div id="${event.category}" class="collapse" aria-labelledby="${event.name}" data-parent="#accordion">
                        <div class="card-body row">
                            <div class="col-4">
                                <img src="${event.imageUrl}" alt="" class="film-image">
                            </div>
                            <div class="col-4">
                                <ul class="list-description">
                                    <li>${event.name}</li>
                                    <li>${event.category}</li>
                                </ul>
                            </div>
                            <div class="col-4">
                                <p>${event.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
                `).join("")
        }
    } else if (events.length < 1) {
        console.log("uups")
        divWithFilms.innerHTML = `
        <h2>No films</h2>
        `
    }
}

postEvent = async event => {

    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(event),
        headers: {
            "authorization" : "Basic " + token,
            "Content-Type" : "application/json"
        }
    })
    return response
}

updateEvent = async(category, event) => {
    const response = await fetch(url + category, {
        method: "PUT",
        body: JSON.stringify(event),
        headers: {
            "authorization" : "Basic " + token,
            "Content-Type" : "application/json"
        }
    })
    return response
}

getEvent = async(id) => {
    const response = await fetch(url + id, {
        headers: {
            "authorization" : "Basic " + token,
        }
    })
    return await response.json()
}

getEvents = async() => {
    let response = await fetch(url, {
        headers: {
            "authorization" : "Basic " + token,
        }
    })
    return await response.json()
}


deleteEvent = async(id) => {
    const response = await fetch(url + id, {
        method: "DELETE",
        headers: {
            "authorization" : "Basic " + token,
        }
    })
    return response.ok
}