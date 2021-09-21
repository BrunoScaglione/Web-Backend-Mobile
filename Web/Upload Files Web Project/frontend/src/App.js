import React, { Component, useEffect } from 'react';
import { uniqueId } from 'lodash';
import filesize from 'filesize';

import api from './services/api';

//obs: tanto faz onde o <GlobalStyle /> ficar
import GlobalStyle from "./styles/global";
import { Container, Content } from "./styles";

import Upload from "./components/Upload";
import FileList from "./components/FileList";





class App extends Component {

  state = {
    uploadedFiles: [],                    
  };          

  // esse files funciona jah automatico, sao os arquivos que a tag file recebe
  // ta sendo chamada de dentro de componentes filho, dentro de Upload
  handleUpload = files => {      
    const newuploadedFiles = files.map(file => ({
      // file eh a instanci ada classe file do javascript, o nosso arquivo
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file), // url preview pro usuario ver a fotinho
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }))

    this.setState({
      // com desestruturacao fica mais daora
      //  uploadedFiles: [...uploadedFiles, newuploadedFiles];
      uploadedFiles: this.state.uploadedFiles.concat(newuploadedFiles)
    });

    // upload de arquivos 1 de cada vez eh mellhor!

    newuploadedFiles.forEach(this.processUpload);

  };

  // eh uma funcoa bem geral, serve pra qualquer prorpiedade ser atualizada
  updateFile = (id, data) => {
    this.setState({ uploadedFiles: this.state.uploadedFiles.map(uploadedFile => {
      // o ...data vai sobreescever as propriedades de ...uploadedFiles
      return (
        id === uploadedFile.id 
          ? { ...uploadedFile, ...data}
          : uploadedFile
      );
    })})
  }

  processUpload = (uploadedFile) => {
    const data = new FormData();

    data.append('file', uploadedFile.file, uploadedFile.name);

    api.post('posts', data, {
      onUploadProgress: e => {
        const progress = parseInt(Math.round((e.loaded * 100) / e.total));

        this.updateFile(uploadedFile.id, {
          progress,
        })
      }
    }).then( res => {
      this.updateFile(uploadedFile.id , {
        uploaded: true,
        id: res.data._id, // id real (backend), pra deletar coisas vai ajudar mt por ex
        url: res.data.url
      });
    }).catch((err) => {
      console.log(err);
      this.updateFile(uploadedFile.id , {
        error: true,
      });
    });
  }

  handleDelete = async id => {
    // deleta no backend
    await api.delete(`posts/${id}`);
    // deleta do nosso estado
    this.setState({
      uploadedFiles: this.state.uploadedFiles.filter(file => file.id !== id)
    });

    console.log(this.state.uploadedFiles);
  }

  // como eh com hooks: (soh da pra usar quando eh functional component)

// useEffect(() => {
//   async function fetchApi() {
//     const res = await api.get('posts');
//     // os nomes que voltam da api sao diferentes dos nomes que a gente deu
//     this.setState({
//       uploadedFiles: res.data.map(file => ({
//         id: file.id,
//         name: file.name,
//         readableSize: filesize(file.size),
//         preview: file.url,
//         uploaded: true,
//         url: file.url,
//       }))
//     });
//   }

//   fetchApi();

//   // vai ser chamada quando o componente der unmount
//   return () => {
//     // pra nao ficar guardando esses cashs de imagens 
//     this.state.uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview))
//   }
  
// }, []);

  async componentDidMount() {
      const res = await api.get('posts');
      // os nomes que voltam da api sao diferentes dos nomes que a gente deu
      this.setState({
        uploadedFiles: res.data.map(file => ({
          id: file._id,
          name: file.name,
          readableSize: filesize(file.size),
          preview: file.url,
          uploaded: true,
          url: file.url,
        }))
      });
  }

  componentWillUnmount() {
    this.state.uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview));
  }
                    
  render() {      
    const { uploadedFiles } = this.state;
    
    // lembrando que if else nao funciona dentro do jsx!
    return (
      <Container>
        <Content>
          <Upload onUpload={this.handleUpload}/>
          {/* com !! retorna booleano  */}
          { (!!uploadedFiles.length) && (
            <FileList files={uploadedFiles} onDelete={this.handleDelete}/>
          )}
        </Content>
        <GlobalStyle />
      </Container>
    );
  }
}

export default App;
