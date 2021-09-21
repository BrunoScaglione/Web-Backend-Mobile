import React from 'react';
import {useSelector, useDispatch} from 'react-redux'

// o Redux meio que faz as funcoes do useReducer e do useContext ao mesmo tempo

/// deixando dinamico
function addCourseAction(title) {
    return {type: 'ADD_COURSE', title}
}


function CourseList () {

    const qty = 2;  // vamos supor que essa eh a quantidade de cursos que eu quero mostrar 

    // ese cara eh pra compartilhar a info que vem do provider(info do state)
    const courses = useSelector(
        state => state.data.slice(0, qty), // selecionando sohos dois primeiros cursos
        [qty]  // só quero que courses mude se qty mudar, beneficios: se nao mudar jah ta memorizado,
        // e se mudar executo dnovo pra pegar o novo valor
        );
    // esse cara eh pra disparar as actions 
    const dispatch = useDispatch();

    // exemplo mais simples, nao dinamico feito primeiro:
    // function addCourse() {
    //    // o que esta dentro de dispatch eh minha action (um objeto)
    //     dispatch({type: 'ADD_COURSE', title: 'GraphQl'})
    // }


    /// para ser um pouco mais dinamico pode ser assim: dentro do dipacth coloca uma funcao(ta lah em cima) que devolve um objeto
    function addCourse() {
        dispatch(addCourseAction('GraphQl'))
    }

    return (
        <>
            <ul>
                {/* courses eh uma string */}
                {/* Exemplo do site do React soh pra relembrar
                <MyComponent>foo</MyComponent> -- equivalent to -- <MyComponent>{'foo'}</MyComponent> */}
                {courses.map(course => <li key={course}>{course}</li>)}
            </ul>
            <button type="button" onClick={addCourse}>
                Adicionar curso
            </button>
        </>
    );
}

export default CourseList;