import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import  { MdCheckCircle, MdError, MdLink } from 'react-icons/md';

import { Container, FileInfo, Preview } from './styles';
import '../../styles/custom.css';

export default FileList = ({ files, onDelete }) => (
  <Container>
    {files.map(uploadedFile => (
      <li key={uploadedFile.id}>
      <FileInfo>
        {/* <Preview src="http://localhost:3000/files/e51689d6c9c544d6abbd183bb4a090e6-casa do ted.jpg"/> */}
        <Preview src={uploadedFile.preview}/>
        <div>
          <strong>{uploadedFile.name}</strong>
          <span>
            {uploadedFile.readableSize}{" "}
            {!!uploadedFile.url && (
              <button onClick={() => onDelete(uploadedFile.id)}>Excluir</button>
            )}
          </span> 
        </div>
      </FileInfo>

      <div>
        {!uploadedFile.uploaded && !uploadedFile.error && (
          <CircularProgressbar 
            styles = {{
              //div que encapsula o progress bar
              root: {  width: 24 },
              path: { stroke: '#7159c1' }
            }}
            strokeWidth= {10}
            value={uploadedFile.progress}
          />
        )}

        {/* // usar o Link eh melhor acho */}
        
        
        {uploadedFile.url && (
          <a 
            href={uploadedFile.url}
            // nova aba
            target="_blank"
            rel="noopener_noreferrer"
          >
            <MdLink style={{ marginRight: 8}} size={24} color="#222" />
          </a>
        )}
        
        {/* se tiver feito upload jah */}
        {uploadedFile.uploaded && (
          <MdCheckCircle size={24} color="#78e5d5" />
        )}

        { uploadedFile.error && <MdError size={24} color="#e57878" />}
      </div>
    </li>
    ))}
  </Container>
)