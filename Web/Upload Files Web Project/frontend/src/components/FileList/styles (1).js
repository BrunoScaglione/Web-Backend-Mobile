import styled from 'styled-components';

export const Container = styled.ul`
  margin-top: 20px;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #444;

    & + li {
      margin-top: 15px;
    }

  }
`;

export const FileInfo = styled.div`
  display: flex;
  align-items: center;

  div {
    display: flex;
    flex-direction: column;

    span {
      font-size: 12px;
      color: #999;
      margin-top: 5px;

      button {
        border: 0;
        background: transparent;
        color: #e57878;
        margin-left: 5px;
        cursor: pointer;
      }

    }

  }
`;

export const Preview = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 5px;
  
  /* eh melhor pra dar resize do que usar uma tag img dentro  */
  background-image:url(${props => props.src});
  /* nao repetir a imagem na tentativa de preecnher tudo */
  background-repeat: no-repeat;
  /* dar um resize na imagem pra caber inteira dentro */
  background-size: cover;
  /* pra alinhar ao centro da imagem */
  background-position: 50% 50%;
  margin-right: 10px;
`;








