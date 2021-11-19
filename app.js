// TRANSIÇÃO TELA INICIAL
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
// const btn_create = document.querySelector("#btn-create")
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
  // let a_login = document.getElementById('btn-login'); 
  user = document.querySelector('#userInput')
  password = document.querySelector('#passwordInput')
  valorUser = user.value
  valorPassword = password.value

  for(var [key, value] of Object.entries(usuarios)){
      Object.keys(value).forEach((key) => {
          if(value[key]['login'] == `${valorUser}` && value[key]['senha'] == `${valorPassword}`){
            let logado = true
            if(logado == true){
              Swal.fire(
                `Olá ${valorUser}!`,
                'Logado com sucesso!',
                'success')
            }
            // a_login.href = "/admin.html"
          }
          else if(value[key]['login'] != `${valorUser}` && value[key]['senha'] != `${valorPassword}`){
            Swal.fire(
              'Error!',
              'Usuário ou senha incorretos!',
              'error'
            )
          }
      });
  }
}

function fazPost(url, body) {
  console.log("Body=", body)
  let request = new XMLHttpRequest()
  request.open("POST", url, true)
  request.setRequestHeader("Content-type", "application/json")
  request.send(JSON.stringify(body))

  // request.onload = function() {
  //     console.log(this.responseText)
  // }
  
  // return request.responseText
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