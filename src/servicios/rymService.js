export async function getAllCharacters(url) {
    return new Promise( (resolve, reject) =>  {
        fetch (url)
        .then( (response) => response.json() )
        .then( data => {resolve(data)} )
    } )
}   