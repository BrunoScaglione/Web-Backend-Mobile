// funcao de action que vai ser ativadaquando o usuario clicar em uma aula no componente Sidebar.js

export function toggleLesson(module, lesson) {
  return {
    type: 'TOGGLE_LESSON',
    module,
    lesson,
  };
};

