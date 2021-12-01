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
    count_books.innerHTML = (`${count}`)

    /* Último livro adicionado*/
    
    let books = livros['livros']
    let last_books = books.reverse()
    console.log(last_books)

    var count_books = document.querySelector('#mais-vendido');
    count_books.innerHTML = (`${last_books[0]['nome']}`)

    /* Lançamento */

    lancamento_nome = document.querySelector('#title-seller');
    lancamento_desc = document.querySelector('#desc-seller');
    lancamento_autor = document.querySelector('#autor-seller');

    lancamento_nome.innerHTML = (`${last_books[0]['nome']}`);
    lancamento_desc.innerHTML = (`${last_books[0]['descricao']}</p>`);
    lancamento_autor.innerHTML = (`&rarr; Autor(a).: ${last_books[0]['autor']}`);


}

main()  
