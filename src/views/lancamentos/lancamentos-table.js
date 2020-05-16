import React from 'react'
import formatter from 'currency-formatter'

export default props => {

    const rows = props.lancamentos.map(lancamento => {
        /* o que vem aqui, é o LancamentoDto */
        return (
            <tr key={lancamento.id}>
                <td scope='col'>{lancamento.descricao}</td>
                <td scope='col'>{formatter.format(lancamento.valor, { locale: 'pt-BR' })}</td>
                <td scope='col'>{lancamento.tipo}</td>
                <td scope='col'>{lancamento.mes}</td>
                <td scope='col'>{lancamento.status}</td>
                <td scope='col'>
                    <button type="button" className="btn btn-success" title="Efetivar"
                        disable={lancamento.status !== 'PENDENTE'}
                        onClick={e => props.alterarStatus(lancamento, 'EFETIVADO')}>
                        <i className="pi pi-check"></i>
                    </button>
                    <button type="button" className="btn btn-warning" title="Cancelar"
                        disable={lancamento.status !== 'PENDENTE'}
                        onClick={e => props.alterarStatus(lancamento, 'CANCELADO')}>
                        <i className="pi pi-times"></i>
                    </button>
                    <button type="button" className="btn btn-primary" title="Editar"
                        onClick={e => props.editAction(lancamento.id)}>
                        <i className="pi pi-pencil"></i>
                    </button>
                    <button type="button" className="btn btn-danger" title="Excluir"
                        onClick={e => props.deleteAction(lancamento)}>
                        <i className="pi pi-trash"></i>
                    </button>
                </td>
            </tr>

        )
    })

    return (
        <table className='table table-hover'>
            <thead>
                <tr>
                    <th scope='col'>Descrição</th>
                    <th scope='col'>Valor</th>
                    <th scope='col'>Tipo</th>
                    <th scope='col'>Mês</th>
                    <th scope='col'>Situação</th>
                    <th scope='col'>Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>

        </table>
    )
}