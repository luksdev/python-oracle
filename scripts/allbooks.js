function fazGETBooks(url){
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}

function fazDelete(url, body) {
    let request = new XMLHttpRequest()
    request.open("DELETE", url)
    request.setRequestHeader("Content-type", "application/json", "Access-Control-Allow-Origin", "*")
    request.send()
}

function main(){
    data = fazGETBooks('http://127.0.0.1:5000/livros')
    livros = JSON.parse(data);


    // console.log(livros['livros'])

    for(allbooks of Object.keys(livros['livros'])){
        // console.log(allbooks)
        for(let i = 0; i <= Object.keys(livros['livros']).length; i++){

        

            /**Adiciona nome do liro */

            var elemento_pai= document.getElementById("body-table")

            var celula = document.createElement('tr')
            celula.id = `book-${i}` 

            var linha = document.createElement('td')
            linha.id = `nome-${i}`

            linha.innerHTML = `${livros['livros'][i]['nome']}`
            
            celula.appendChild(linha)
            elemento_pai.appendChild(celula)

            /**Adiciona nome do autor */

            var linha2 = document.createElement('td')

            celula.appendChild(linha2)
            elemento_pai.appendChild(celula)

            linha2.innerHTML = `${livros['livros'][i]['autor']}`

            /**Adiciona opções DELETE, EDIT,  */

            var linha3 = document.createElement('td')
            addUl = document.createElement('ul')
            addUl.className = "list-inline m-0";

            addLi2 = document.createElement('li')
            addLi2.innerHTML = (`<button class="btn btn-success btn-sm rounded-0" type="button" data-toggle="modal" data-target="#modalEdit" data-placement="top" id=edit-${i} onclick="confirmAtualizacao(id)" title="Edit"><i class="fa fa-edit"></i></button>`)

            addLi3 = document.createElement('li')
            addLi3.innerHTML = (`<button class="btn btn-danger btn-sm rounded-0" id=dell-${i} type="button" data-toggle="modal" data-target="#modalExemplo" onclick="checkDelete(id)" data-placement="top" title="Delete"><i class="fa fa-trash"></i></button>`)

            addUl.appendChild(addLi2)
            addUl.appendChild(addLi3)
            linha3.appendChild(addUl)
            celula.appendChild(linha3)
            elemento_pai.appendChild(celula)

            addLi2.className = ("list-inline-item");
            addLi3.className = ("list-inline-item");

        }
    }
}

function deleteBook(id){
    data = fazGETBooks('http://127.0.0.1:5000/livros')
    livros = JSON.parse(data);


    var table = document.getElementById("body-table");
    var colunas = table.getElementsByTagName('td');

    console.log(id)

    id_formatado = (id.substring(5,9999));
    
    
    for (var i = 0, row; row = table.rows[i]; i++) {
        // console.log(livros['livros'][i]['nome'])

        nome = document.getElementById(`nome-${i}`)
        // nome = document.
        // console.log(nome.innerText)

        idlinha_formatado = row.id.substring(5,9999)
        
        // console.log(row.id)
        if(id_formatado == idlinha_formatado){
            console.log(livros['livros'][id_formatado]['nome'])
            console.log(row.id)
            document.getElementById(row.id).remove();
        }
    }
}

function dellRow(param){
    document.getElementById(param).remove()
    console.log('click novo')
}

function checkDelete(id){
    data = fazGETBooks('http://127.0.0.1:5000/livros')
    livros = JSON.parse(data);
    console.log("clicou")

    modal = document.getElementsByTagName("atualizarBook")
    



    var table = document.getElementById("body-table");
    var colunas = table.getElementsByTagName('td');

    id_formatado = (id.substring(5,9999));
    

    
    for (var i = 0, row; row = table.rows[i]; i++) {
        // console.log(livros['livros'][i]['nome'])

        nome = document.getElementById(`nome-${i}`)

        idlinha_formatado = row.id.substring(5,9999)

        // console.log(row.id)
        if(id_formatado == idlinha_formatado){
            modal.id = `bdel-${id_formatado}`
            console.log("teste id: " + modal.id)

            // console.log("id modal: " + modal[0].id)
            console.log(livros['livros'][id_formatado]['nome'])
            del_livro = livros['livros'][id_formatado]['nome']
            console.log(row.id)

            body = {
                "nome": del_livro,
            }
            
            console.log("id> " + row.id)

            document.getElementById("confirmedDell").addEventListener("click", function(){
                dellRow(row.id)
                console.log(teste)
            })

            document.getElementById("confirmedDell").addEventListener("click", function(){
                fetch('http://127.0.0.1:5000/livro/' + del_livro, {
                    method: 'DELETE',
                    })
                    // .then(res => res.text()) // or res.json()
                    .then(location.reload())
                    // .then(console.log('deletou'))
            })


            
            
        }
    }
}

function confirmAtualizacao(id){
    data = fazGETBooks('http://127.0.0.1:5000/livros')
    livros = JSON.parse(data);
    console.log("clicou")

    modal = document.getElementsByTagName("atualizarbookOK")

    // let newTitulo = document.getElementById("newTitulo")
    // let newAutor = document.getElementById("newAutor")
    // let newDesc = document.getElementById("newDesc")

    var table = document.getElementById("body-table");
    var colunas = table.getElementsByTagName('td');

    id_formatado = (id.substring(5,9999));
    

    
    for (var i = 0, row; row = table.rows[i]; i++) {
        // console.log(livros['livros'][i]['nome'])

       

        nome = document.getElementById(`nome-${i}`)
        // nome = document.
        // console.log(nome.innerText)
        // modal[0].id = `dell-ok-${id_formatado}`

        idlinha_formatado = row.id.substring(5,9999)

        // console.log(row.id)
        if(id_formatado == idlinha_formatado){
            modal.id = `edit-${id_formatado}`
            console.log("teste id: " + modal.id)

            // console.log("id modal: " + modal[0].id)
            console.log(`livro para atualizar: ${livros['livros'][id_formatado]['nome']}`)
            del_livro = livros['livros'][id_formatado]['nome']
            console.log(row.id)

            
            console.log("id> " + row.id)

            document.getElementById("atualizarBook").addEventListener("click", function(){
                let newTitulo = document.getElementById("newTitulo").value
                let newAutor = document.getElementById("newAutor").value
                let newDesc = document.getElementById("newDesc").value
        
                // console.log(bodyPUT)

                // console.log(`isso é um teste ${newTitulo1.value}`)

                console.log(newTitulo)
                console.log(newAutor)
                console.log(newDesc)

                bodyPUT = {
                    "nome": newTitulo,
                    "autor": newAutor,
                    "descricao": newDesc
                }

                console.log(bodyPUT)

                fetch('http://127.0.0.1:5000/livro/' + del_livro, {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json',},
                    body: JSON.stringify({ "nome": newTitulo, "autor": newAutor, "descricao": newDesc })
                    })
                    .then(console.log(bodyPUT))
                    .then(location.reload())
            })
            
            
        }
    }
}

main();
