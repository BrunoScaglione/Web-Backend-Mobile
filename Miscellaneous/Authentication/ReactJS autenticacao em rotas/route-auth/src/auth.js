// funcao que vai simular ae o usuario esta autenticado ou nao:
// por que na nossa aplicacao vais ser assim:
// 1) usuario se autentica 2) a gente recebe token da nossa api 3) a gente guarda no local storage/session storage 
// 4) aqui eh o momento que a gente pega o valor do local storage!
//  {token: value}
// lembrando que local storage soh aceita string
// entao tem que pra salvar no local storage fazendo :
////// recebemos um json da api {token, ...rest} = await res.json
//////////// localstorage.setItem('token', JSON.stringify(value))
// e depois pra pegar faz JSON parse pra voltar a ser objeto JSON.parse(localStorage.getItem('token'))

//mas agora vamos mockar

// const isAuthenticated = () => true;
export const isAuthenticated = () => false;

export default isAuthenticated