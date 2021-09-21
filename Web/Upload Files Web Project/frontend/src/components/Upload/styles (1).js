import styled, { css } from 'styled-components';

const dragActive = css`
  border-color: #78e5d5
`;

const dragReject = css`
  border-color: #e57878;
`;

export const DropContainer = styled.div.attrs({
  className:  "dropzone"
})`
  border: 1px dashed #ddd;
  border-radius: 4px;
  cursor: pointer;

  transition: height 0.2s ease-out;

  ${props => props.isDragActive && dragActive};
  ${props => props.isDragReject && dragReject};

`;

// obs: aqui tem q colocar aspas pq nao 'tem css dentro'
const messageColors = {
  default: '#999',
  error: '#57878',
  success: '#78e5d5'
};

export const UploadMessage = styled.p`
  display: flex;
  color: ${props => messageColors[props.type || 'default']};
  justify-content: center;
  align-items: center;
  padding: 15px 0;
`;