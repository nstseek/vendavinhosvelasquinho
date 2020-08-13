import React from 'react';
import './Lista.scss';
import { isString, isNumber } from 'util';

interface Props {
    data: any[][];
    tituloColunas: string[];
}

const Lista: React.FC<Props> = (props) => (
  <div className='Lista'>
    <table>
      <thead>
        <tr>
          {props.tituloColunas.map((titulo, index) => (
            <th key={index}>{titulo}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.data.map((linha, index) => (
          <tr key={index}>
            {linha.map((coluna, index) =>
              isString(coluna) || isNumber(coluna) ? (
                <td key={index}>{coluna}</td>
              ) : (
                null
              )
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Lista;
