//esse arquivo é uado para manipular as requisições da API e preencher o html 

// faz a requisição generica á api
function apiRequest(url, callback, method='GET', data=null) {
    const requestOptions = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
	        },
        };

    if (data) {
        requestOptions.body = JSON.stringify(data);
    }

    fetch(url, requestOptions).then((response) => {
	    if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }
        return response.json();
    }).then((responseData) => {
        callback(null, responseData);
    }).catch((error) => {
        callback(error, null);
    });
}



//
function startRequest(url, modelo, contenier){
	apiRequest(url, (error, data) => {
	    if (error) {
	        console.error('Erro ao acessar o endpoint:', error);
	    } else {
	        var hmtlText = "";
	        const jsonData =data;
	        jsonData.forEach(item => {
	        	createElements(contenier, modelo(item));
	        });
	        //document.getElementById("grid-t2").innerHTML = hmtlText;;
	    }
	});
}


// Função para criar elementos e atribuir atributos
function createElementWithAttributes(tag, attributes) {
    var element = document.createElement(tag);
    for (var key in attributes) {
        element[key] = attributes[key];
    }
    return element;
}


// Função para criar elementos recursivamente
function createElements(parent, elements) {
    elements.forEach(function (el) {
        var child = createElementWithAttributes(el.tag, el);
        parent.appendChild(child);
        if (el.children) {
            createElements(child, el.children);
        }
    });
}

function elementId(id){
	return document.getElementById(id);
}






/////////////////////////////////////////////////////////////////////////////////
//////////////////////DEFINIÇÕES DE MODELOS/////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
// Modelos de Elementos e atributos
var cardsHome = function(data){
	console.log(data);
	return [
    { tag: "div", class: "cards-servicos", id:"cards-servicos"+data.ID_USUARIO, children: [
        { tag: "div", class: "coluna-1-s", children: [
            { tag: "a", href: "painel.html", children: [
                { tag: "img", class: "imagem-perfil", src: '"'+data.FOTO_PERFIL+'"', alt: "" }
            ]}
        ]},
        { tag: "div", class: "coluna-2-s", children: [
            { tag: "h1", id: "profissao", textContent: "Mestre de obras" },
            { tag: "h2", id: "nome-profissional", textContent: '"'+data.NOME+'"' }
        ]},
        { tag: "div", class: "coluna-3-s", children: [
            { tag: "button", id: "btn-empreita", class: "btn-empreita", textContent: "Aceito Empreita" }
        ]}
    ]}
];
}


/////////////////////////////////////////////////////////////////////////////////
//////////////////////MAPEAMENTO DOS MODELOS/////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

var modelos = {
	cardsHome:cardsHome, 
}




/////////////////////////////////////////////////////////////////////////////////
//////////////////////DEFINIÇÃO DE ROTINAS///////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

var home=function(){
	startRequest(urlApi+'profissionais/getAll/15', modelos['cardsHome'], elementId("grid-t2"));


}


/////////////////////////////////////////////////////////////////////////////////
//////////////////////MAPEAMENTO DAS ROTINAS///////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

var rotinas = {
	home:home,
}