//alterando as configurações abaixo é possivel inicializar uma nova instancia do sistema ativando apenas os serviços que estiveem sobrecarregados em outras instancias, por exemplo, se o servidor principal estiver recebendo muitas chamadas da api, mas os outros serviços estivem ok, podemos abrir nova instancia ativando apenas o serviço de API

const Config = {
  'webServer':true, // vai servir as paginas .html do site? 
  'api':true,		// vai responder as chamadas da API?
  'chat':true		// vai disponibilizar o serviço de chat via Socket.io

};

module.exports = Config;