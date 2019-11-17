let url = "https://strive-school-testing-apis.herokuapp.com/api/movies/"
let username = "user15"
let password = "sHHU5KWmVE26avC8"
let token = btoa(username + ":" + password)

loadFilms = async() => {
    let events = await getEvents()
    console.log("events", events)
    let div = document.querySelector("#main-div-with-films")

    events.forEach(async event => {
        let films = await getEvent(event)
        console.log(films)
        div.innerHTML += `
        <div class="header col-12">
            <h3>${event}</h3>
        </div>
            ${films.map(film => `
            <div class="card card-item-film col-lg-2 col-md-4 col-sm-6 col-12">
            <img src="${film.imageUrl}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h6 class="card-text"> <a href="details.html?artistId=${film._id}&artistName=${film.name}">${film.name}</a></h6>
                </div>
            </div>
            `  )}
        `
    });
}

loadFilmsBackOffice = async() => {
    let events = await getEvents();
    const divWithFilms = document.querySelector("#accordion")
    console.log("events", events)

    if(events.length > 0){
        events.forEach(async event => {
            let films = await getEvent(event)
            console.log(films)
            divWithFilms.innerHTML += films.map(film => 
                `
                <div class="card" id="div${film._id}">
                <a href="backoffice.html?id=${film._id}&name=${film.name}" class="card-a"><h6 class="card-a">Go to films page</h6></a>
                    <div>
                        <i class="fas fa-times-circle delete-btn" onclick="deleteFilm('${film._id}')"></i>
                        <a href="backoffice.html?id=${film.name}"><i onclick="updateFilm('${film.category}')" class="fas fa-edit update-btn"></i></a>
                    </div>
                    <div class="card-header" id="heading${film._id}">
                        <h5 class="mb-0 name-of-film-backoffice">
                            <button class="btn btn-link btn-backoffice collapsed" data-toggle="collapse" data-target="#collapse${film._id}" aria-expanded="false" aria-controls="collapse${film._id}">
                            ${film.name} 
                            </button>
                        </h5>
                    </div>
                    <div id="collapse${film._id}" class="collapse" aria-labelledby="heading${film._id}" data-parent="#accordion">
                        <div class="card-body row">
                            <div class="col-4">
                                <img src="${film.imageUrl}" alt="" class="film-image">
                            </div>
                            <div class="col-4">
                                <ul class="list-description">
                                    <li>${film.name}</li>
                                    <li>${film.category}</li>
                                </ul>
                            </div>
                            <div class="col-4">
                                <p>${film.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
                `).join("")
            })
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