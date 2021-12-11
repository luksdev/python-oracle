/*cadastro livros
 */
function fazPost(url, body) {
    let request = new XMLHttpRequest()
    request.open("POST", url, true)
    request.setRequestHeader("Content-type", "application/json")
    request.send(JSON.stringify(body))
}

function cadastraLivro() {
    let url = "http://127.0.0.1:5000/livro"
    let nome = document.getElementById("tituloInput").value
    let descricao = document.getElementById("descricaoInput").value
    let autor = document.getElementById("autorInput").value

    console.log(nome)
    
    body = {
        "nome": nome,
        "descricao": descricao,
        "autor": autor
    }
    fazPost(url, body)

    if(nome && descricao && autor != ''){
        alert = document.querySelector('#alert-sucesso');

        alert.innerHTML = (`<div class="alert alert-success" role="alert">
        Livro cadastrado com sucesso!
      </div>`);
    }
  }
