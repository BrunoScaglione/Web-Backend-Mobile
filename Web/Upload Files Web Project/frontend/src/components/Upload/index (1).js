import React, { Component } from 'react';

// obs: ta usando classe pq o video eh antigo

import Dropzone from 'react-dropzone';

import { DropContainer, UploadMessage } from './styles';

class Upload extends Component {
  // eh um metodo da classe
  renderDragMessage = (isDragActive, isDragReject) => {
    if (!isDragActive) {
      return <UploadMessage>Arraste arquivos aqui ...</UploadMessage>
    }

    if (isDragReject) {
      return <UploadMessage type="error">Arquivo não suportado</UploadMessage>
    }

    return <UploadMessage type="success">Solte os arquivos aqui</UploadMessage>
  };


  render() {
    const { onUpload } = this.props;

    return (
      // imprtante fazer validacao tanto no front como no back
      // onDropAccepted vai ser chamada toda vez que for feito um ou masi uploads
      // isDragActive eh true quando usuario ta com arquivo em cima
      // isDragReject quando o usuario ta passando em cima 
      // com um arquivo de outro tipo 
      // onUpload vai "atuar" no componente pai => App.js , onde tem tdas as informacoes
      <Dropzone accept="image/*" onDropAccepted={onUpload} >
        { ({ getRootProps, getInputProps, isDragActive, isDragReject}) => (
          // estamos definindo DropContainer como o elemento do nosso JSX que vai conter 
          // as propriedades de upload
          <DropContainer 
            {...getRootProps()}
            isDragActive={isDragActive}
            isDragReject={isDragReject}
          >
            {/* esse vai ser o input de type file que sempre tem que ter */}
            <input {...getInputProps()}/>
            {this.renderDragMessage(isDragActive, isDragReject)}
          </DropContainer>
        )}
      </Dropzone>
    );
  }
}

export default Upload;