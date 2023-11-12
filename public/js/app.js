 // Avanca para a proxima página

function addListners() {
    // Mapeamento dos botões para seus destinos
    const botoes = [
        { id: "btn-cadastrar"   , destino: "cadastro.html" },
        { id: "btn-login"       , destino: "login.html" },
        { id: "botao-proximo"   , destino: "profissional-acesso.html" },
        { id: "botao-proximo2"  , destino: "profissional-fotos.html" },
        { id: "botao-proximo3"  , destino: "profissional-horarios.html" },
        { id: "botao-proximo4"  , destino: "profissional-servicos.html" },
        { id: "botao-proximo5"  , destino: "painel.html" },

    ];

    // Adicione eventos aos botões
    botoes.forEach(function (botaoInfo) {
        var botao = document.getElementById(botaoInfo.id);
        if (botao) {
            botao.addEventListener("click", function () {
                redirecionar(botaoInfo.destino);
            });
        }
    });


    const elementosAddListner = [
        { id: "btn-cadastrar-1"  , evento:"click" , funcao: (function(event) {cadastroEtapa1(event);}) },
        { id: "botao-anterior"  , evento:"click" , funcao: window.history.back },
        { id: "bt-fill-google"  , evento:"click" , funcao: preencheFormGoogle },
    ];


    // Adicione eventos a elementos
    elementosAddListner.forEach(function (elemento_) {
        var elemento = document.getElementById(elemento_.id);
        if (elemento) {
            elemento.addEventListener(elemento_.evento,elemento_.funcao);
        }
    });

}
function redirecionar(destino) {
    window.location.href = destino;
}


// Validação do Formulário
function validarFormulario() {
    var nome = document.getElementById('nome').value;
    var email = document.getElementById('email').value;
    //var senha = document.getElementById('senha').value;
    //var copySenha = document.getElementById('copy-senha').value;

    if (nome === "") {
        alert("Por favor, preencha o campo 'Nome Completo'");
        return false;
    }

    if (email === "") {
        alert("Por favor, preencha o campo 'Email'");
        return false;
    }
    return true; // Formulário válido
}


function preencheFormGoogle(){
    const formulario = document.getElementById('form-cad-cliente');
    formulario.NOME.value = window.User().displayName;
    formulario.EMAIL.value = window.User().email;
    //formulario.NOME.value = window.User().phoneNumber);
}

// Apresenta as fotos no cadastro

function displayFileImage(inputId, imageId) {
    const fileInput = document.getElementById(inputId);
    const fileImage = document.getElementById(imageId);
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const objectURL = URL.createObjectURL(file);
        fileImage.src = objectURL;
        fileImage.style.display = 'block';
    } else {
        fileImage.src = '#';
        fileImage.style.display = 'none';
    }
}

function cadastroEtapa1(event) {
    if (!validarFormulario()){return false}
    
    var form = document.getElementById('form-cad-cliente');
        var formData = new FormData(form);
        var jsonData = {};

        formData.forEach(function (value, key) {
            jsonData[key] = value;
        });
        console.log(jsonData);

        apiRequest(urlApi+"usuario/cadastrar/json", console.log, 'POST', {'dataUser':jsonData})
}