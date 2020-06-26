fetch('http://api.tvmaze.com/shows/1121')
    .then((response) => {
        if (!response.ok) {
            throw new Error(`${response.status} - ${response.statusText}`);
        }
        return response.json();
    })
    .then((data) => {
        document.body.innerHTML = `<h1>${data.name}</h1><img src="${data.image.medium}" alt=""/><h1>Episodes:</h1>`;
        return fetch(`${data._links.self.href}/episodes`);
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`${response.status} - ${response.statusText}`);
        }
        return response.json();
    })
    .then((data) => {
        data.map((episode) => {
            let name = episode.name;
            let img = { ...episode.image };
            document.body.innerHTML += `<h2>S${episode.season}E${episode.number} - ${name}</h2>`;
            document.body.innerHTML += `
            ${
                img.medium
                    ? `<img src="${img.medium}" alt=""/>`
                    : `<div>no img</div>`
            }`;
        });
    })
    .catch((err) => {
        console.log(`${err}`);
    });
