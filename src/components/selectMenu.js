import React from 'react'

/* Componente como uma arrow function */
export default (props) => {

    const options = props.lista.map((option, index) => {
        /* a key é obrigatória, e serve para o dom do react
            não se perder entre os componentes */
        return (
            <option key={index} value={option.value}>{option.label}</option>
        )
    })

    return (
        /* spread operator: distribui pelo componente as 
            propriedades não utilizadas por funções antes */
        <select {...props}>
            {options}
        </select>
    )
}