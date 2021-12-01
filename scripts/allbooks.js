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

            /**Adiciona nome do liro */

            var elemento_pai= document.getElementById("body-table")

            var celula = document.createElement('tr')

            var linha = document.createElement('td')

            linha.textContent = `${livros['livros'][i]['nome']}`
            console.log(livros['livros'][i]['nome'])
            
            celula.appendChild(linha)
            elemento_pai.appendChild(celula)

            /**Adiciona nome do autor */

            var linha2 = document.createElement('td')

            celula.appendChild(linha2)
            elemento_pai.appendChild(celula)

            linha2.textContent = `${livros['livros'][i]['autor']}`

            /**Adiciona opções DELETE, EDIT,  */

            var linha3 = document.createElement('td')
            addUl = document.createElement('ul')
            addUl.className = "list-inline m-0";

            addLi2 = document.createElement('li')
            addLi2.innerHTML = ('<button class="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit"><i class="fa fa-edit"></i></button>')

            addLi3 = document.createElement('li')
            addLi3.innerHTML = ('<button class="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash"></i></button>')

            addUl.appendChild(addLi2)
            addUl.appendChild(addLi3)
            linha3.appendChild(addUl)
            celula.appendChild(linha3)
            elemento_pai.appendChild(celula)

            addLi2.className = ("list-inline-item");
            addLi3.className = ("list-inline-item");



            
            
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
