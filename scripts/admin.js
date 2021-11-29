function fazGETBooks(url){
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}
  
function main(){
    data = fazGETBooks('http://127.0.0.1:5000/livros')
    livros = JSON.parse(data);
    
    /* Contagem de livros atuais */
    var count = Object.keys(livros['livros']).length;
    console.log(count);
    var count_books = document.querySelector('#card-count-books');
    count_books.innerHTML = (`<h1>${count}</h1>`)

    /* Último livro adicionado*/
    
    let books = livros['livros']
    let last_books = books.reverse()
    console.log(last_books)

    var count_books = document.querySelector('#card-last-book');
    count_books.innerHTML = (`<h1>${last_books[0]['nome']}</h1>`)

    /* Lançamento */

    lancamento_nome = document.querySelector('#title-lancamento');
    lancamento_desc = document.querySelector('#desc-lancamento');
    lancamento_autor = document.querySelector('#autor-lancamento');

    lancamento_nome.innerHTML = (`<h1>${last_books[0]['nome']}</h1>`);
    lancamento_desc.innerHTML = (`<p>${last_books[0]['descricao']}</p>`);
    lancamento_autor.innerHTML = (`<p>Autor.: ${last_books[0]['autor']}</p>`);


}

main()  
