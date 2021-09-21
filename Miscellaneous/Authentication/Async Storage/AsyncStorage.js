
///////////////arquivo soh de demonstracao 

////: obs fazer uma token que demora muito pra expirar eh perigoso pq se o cara hacker jah era
//// soh que se expirar muito rapido vai ficar mandando o susuario fazer login td hora, entao 
// o certo eh ficar dando refresh nas tokens assim que a token principal estiver sendo expirada

// parece que omelhor jeito eh o servidor sempre devolver uma token e uma refreh token (client ejah comeca com uma refresh)
// essa refreh token fica armazenada em cookie httponly e a token principal em uma variavel 


///OBS: mas o localstorage na web eh essencial pra gente guardar qualquer variavel nao secreta, inclusive
// pra adar logout de todoas as abas da pra fazer assim:

//primeiro, o logout que o cara vai dar em uma aba:
async function logout() {
  inMemoryToken = null;
  window.localStorage.setItem('logout', Date.now())  
}

/// ai temos que adicionar isso pra qualquer aba ouvir esse evento e emanda pro login

window.addEventListener('storage', syncLogout);

syncLogout (event) {
  if (event.key === 'logout') {
    console.log('logged out from storage!')
    Router.push('/login')
  }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////

// mas vamos dar uma olhada no async storage/analogo ao local storage web


//// análogo ao localStorage usando ReactJS na web


// salvando noAsync Storage (apos registro usuario)
const token = '8fcwfwenvjwavnewfewadwds43vj';

const saveUserToken = async token => {
  try {
    await AsyncStorage.setItem('userToken', token);
  } catch (err) {
    console.log(err.message)
  }
};

// Pegando o valor do Async Storage(quando usuario entra na aplicação, pra ver se ele ta autenticado ou nao)

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken')
  } catch (err) {
    console.log(err.message)
  }

  return token;

}

// Deletando (logout do user)

const deleteUserId = async () => {
  try {
    await AsyncStorage.removeItem('userId');
  } catch (err) {
    console.log(error.message);
  }
}

////////