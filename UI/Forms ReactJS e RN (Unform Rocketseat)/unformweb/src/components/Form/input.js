import React, {useEffect, useRef} from 'react';
import{useField} from '@unform/core';

function Input ({name, ...rest}) {
    const inputRef = useRef(null);
    const {fieldName, registerField, defaultValue, error} = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            // path eh a propriedade da ref que vai conter o nosso valor 
            path: 'value'
        })
    }, [fieldName, registerField]);

    return (
        <div>
            <input {...rest} ref={inputRef} /*defaultValue={defaultValue}*/ />
            {/* // se o error tiver sido setado ele vai exbir em vermelho */}
            {error && <span style={{color: '#f00'}}>{error}</span>}
        </div>
    );
}


export default Input;


