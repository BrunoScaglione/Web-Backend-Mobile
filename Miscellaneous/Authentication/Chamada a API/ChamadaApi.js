///////////////arquivo soh de demonstracao 


/////a chamda a api eh igualzinho a agente fazia com react native (usando axios e express) em chamdas https

/// exemplo airbnb rocketseat: (aqui ele nao ta utilizando unform, mas ccom unform fica bem melhor)

handleSignInPress = async () => {
  if (this.state.email.length === 0 || this.state.password.length === 0) {
    this.setState({ error: 'Preencha usuário e senha para continuar!' }, () => false);
  } else {
    try {
      const response = await api.post('/sessions', {
        email: this.state.email,
        password: this.state.password,
      });
        
      await AsyncStorage.setItem('@AirBnbApp:token', response.data.token);

      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Main' }),
        ],
      });
      this.props.navigation.dispatch(resetAction);
    } catch (_err) {
      this.setState({ error: 'Houve um problema com o login, verifique suas credenciais!' });
    }
  }
};