function fazGETBooks(url){
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}

function main(){
    data = fazGETBooks('http://127.0.0.1:5000/livros')
    livros = JSON.parse(data);

    console.log(livros['livros'])

    for(allbooks of Object.keys(livros['livros'])){
        console.log(allbooks)
        for(let i = 0; i <= Object.keys(livros['livros']).length; i++){
            var elemento_pai= document.getElementById("body-table")

            var celula = document.createElement('tr')

            var linha = document.createElement('td')

            linha.textContent = `${livros['livros'][i]['nome']}`
            console.log(livros['livros'][i]['nome'])
            
            celula.appendChild(linha)
            elemento_pai.appendChild(celula)

            var linha2 = document.createElement('td')

            celula.appendChild(linha2)
            elemento_pai.appendChild(celula)

            linha2.textContent = `${livros['livros'][i]['autor']}`
            
        }
    }
    
    // for(allbooks of Object.entries(livros['livros'])){
    //     // console.log(allbooks[1]['nome'])
    //     for(let i = 0; i < livros['livros'].length; i++){
    //         var elemento_pai= document.getElementById("body-table")

    //         var celula = document.createElement('tr')

    //         var linha = document.createElement('td')

    //         linha.textContent = `${livros['livros'][i]['nome']}`
    //         // console.log(i)
    //         console.log(livros['livros'][i]['nome'])

    //         celula.appendChild(linha)
    //         elemento_pai.appendChild(celula)
    //     }
    //     lista.innerHTML = (`<li>${allbooks[1]['nome']}</li>`)
    // }
}

main();
