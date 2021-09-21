import React, {useRef, useEffect} from 'react';
import {Form} from '@unform/web';
import {Scope} from '@unform/core';
import * as Yup  from 'yup';

/// porque unform?

//1) Relacionamentos Complexos

//nossa api vai precisar receber objetos assim geralmente:

//  myPostReq = JSON(myObject = {
//   name: "Diego Fernandes",
//   groups: [
//     {title: "Rocketseat"},s
//     {title: "ReactJS"}
//   ]
// })

// enntao pra isso ficaria assim os inputs  normal:

/* <input name="group[0].title"/>
<input name="group[1].title"/> */

// ai dependendo dos relacionamentos isso pode se complicar bastante

// 2) Performace 

// o unform usa a hook useRef() prapegar o valor atual do input em vez de passsar para um estado e colocar no input 
// // value = {password} (hooks) e isso, ISSO GERA UM MONTE DE RENDER DESNECESSARIO

import './App.css';
import Input from './components/Form/input'

const initialData = {
  email: 'diego@rocketseat.com.br',
  address: {
    city: "rio do sul"
  }
}

// vamos supor que meu backend espera essa estrutura:
const user = {
  name: "Diego",
  address: {
    street: 'Rua teste',
    number: 123,
  }
}
// no unform fica amt facil eh soh fazer adress.street no campo de Input de street 
//  e eh soh fazer number.street no campo de Input do number 

function App() {
  const formRef = useRef(null);

  async function handleSubmit(data, {reset}) {

    // validando o campo nome
    // if (data.adress.city === "") {
    //   formRef.current.setFieldError('adress.city', 'A cidade é obrigatória');
    // }

    /// com a biblioteca Yup
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string().email('Digite um e-mail válido').required('O e-mail é obrigatório'),
        adress: Yup.object().shape({
          city: Yup.string().min(3, 'No mínimo 3 caracteres').required('A cidade é obrigatória')
        })
      });

      await schema.validate(data, {
        // pra ele passar por todos os erros e nao parar no primeiro q encontrar 
        abortEarly: false,
      })

      console.log(data);

      // reseta errors
      formRef.current.setErrors({});

      // reseta formulario
      reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        // quer dizer que nosso erro foi um erro de validacao
        console.log(err)

        const errorMessages = {};

        err.inner.forEach(error => {
          // vai preencher erro messages assim poe exemplo:
          // {
          //   name: 'O nome é obrigatório'
          // }
          errorMessages[error.path] = error.message
        })

        formRef.current.setErrors(errorMessages)
      }
    }


  }
  
  // mockando chamada a api
  useEffect(() => {
    setTimeout(() => {
      formRef.current.setData({
        name: 'Diego Fernandes',
        email: 'diego@rocketseat.com.br',
        address: {
          city: 'Rio do Sul'
        }
      })
      // e podemos ter acesso a outras propriedades dos campos
      // olhar documentacao, ver os metodos
    })
  }, [])


  return (
    <div className="App">
      <h1>Hello World</h1>
      <Form ref={formRef} /*initialData= {initialData}*/ onSubmit={handleSubmit}>
        <Input name="name"/>
        <Input name="email"/>
        <Input type="password" name="password"/>
        {/* // esse .adress fica toda hora se repetindo entao podemos colocar um Scopo 
        // para essses Inputs */}
        <Scope path="address">
          <Input name="street"/>
          <Input name="number"/>
          <Input name="city"/>
          <Input name="nighborhood"/>
          <Input name="region"/>
        </Scope>
        <button type="submit">enviar</button>
      </Form>
    </div>
  );
}

export default App;
