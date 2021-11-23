// TRANSIÇÃO TELA INICIAL
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

// MÁSCARA PARA CPF
function criaMascara(mascaraInput){
  const tamanhoInput = document.getElementById(`${mascaraInput}Input`).maxLength;
  let valorInput = document.getElementById(`${mascaraInput}Input`).value;
  let valorSemPonto = document.getElementById(`${mascaraInput}Input`).value.replace(/([^0-9])+/g, "");
  const mascaras = {
    CPF: valorInput.replace(/[^\d]/g, "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
  };
  
  maximoInput = 11
  valorInput.length === maximoInput ? document.getElementById(`${mascaraInput}Input`).value = mascaras[mascaraInput] : document.getElementById(`${mascaraInput}Input`).value = valorSemPonto;
};

// Auth (API)
function fazGET(url){
  let request = new XMLHttpRequest()
  request.open("GET", url, false)
  request.send()
  return request.responseText
}

function main(){
  data = fazGET('http://127.0.0.1:5000/usuarios')
  usuarios = JSON.parse(data)
  usuarios
}

//Capturar dados
function auth(){
  user = document.querySelector('#userInput')
  password = document.querySelector('#passwordInput')
  valorUser = user.value
  valorPassword = password.value
  var i = 0

  for(let key of Object.entries(usuarios)){
    for(let i = 0; i < Object.keys(key[1]).length; i++){
      if(key[1][i]['login'] == `${valorUser}` && key[1][i]['senha'] == `${valorPassword}` && key[1][i]['login'] == `${valorUser}` != undefined){
        console.log('Passou')
        console.log(key[1][i]['login'] + ' - ' + key[1][i]['senha'])
        return Swal.fire(
          `Olá ${valorUser}!`,
          'Logado com sucesso!',
          'success')
        }
      else if(key[1][i]['login'] != `${valorUser}` && key[1][i]['senha'] != `${valorPassword}`){
          console.log('Não passou')
          Swal.fire(
            'Error!',
            'Usuário ou senha incorretos!',
            'error'
          )
        }
    }    
  }
}

function fazPost(url, body) {
  console.log("Body=", body)
  let request = new XMLHttpRequest()
  request.open("POST", url, true)
  request.setRequestHeader("Content-type", "application/json")
  request.send(JSON.stringify(body))
}

function cadastraUsuario() {
  let url = "http://127.0.0.1:5000/usuario"
  let nome = document.getElementById("USERInput").value
  let cpf = document.getElementById("CPFInput").value
  let senha = document.getElementById("PASSWORDInput").value

  console.log(nome)
  console.log(cpf)
  console.log(senha)
  
  body = {
      "login": nome,
      "cpf": cpf,
      "senha": senha
  }
  fazPost(url, body)
}

function checkRegister(){
  let username = document.getElementById("USERInput").value
  
  if((document.form_register.user_register.value=="" || document.form_register.user_register.length > 3)){
    Swal.fire(
      'Error!',
      'Complete todos os dados!',
      'error'
    )}
    else if(document.form_register.cpf_register.value =="" || document.form_register.cpf_register.length >= 14){
      Swal.fire(
        'Error!',
        'Complete todos os dados!',
        'error'
      )}
      else if(document.form_register.senha_register.value == "" || document.form_register.senha_register.length >= 3){
        Swal.fire(
          'Error!',
          'Complete todos os dados!',
          'error'
        )}
        else{
          Swal.fire(
            `Bom trabalho ${username}!`,
            'Cadastrado com sucesso!',
            'success')
            cadastraUsuario()
        }
      }

main()