import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import LancamentosTable from './lancamentos-table'
import LancamentoService from './../../app/service/lancamento-service'
import LocalStorageService from './../../app/service/localStorageService'

import * as messages from '../../components/toastr'

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

class ConsultaLancamentos extends React.Component {

    constructor() {
        super();
        this.service = new LancamentoService();
    }

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        showConfirmDialog: false,
        lancamentoDeletar: {},
        lancamentos: [],
    }

    buscar = () => {
        if (!this.state.ano) {
            messages.mensagemErro("Ano é obrigatório")
            return false;
        }

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id,
        }

        this.service
            .consultar(lancamentoFiltro)
            .then(response => {
                const lista = response.data
                if (lista < 1) {
                    messages.mensagemAlerta("Nenhum resultado encontrado")
                }
                this.setState({ lancamentos: lista })
            }).catch(error => {
                console.log('ERRO')
            })
    }

    editar = (id) => {
        this.props.history.push(`/cadastro-lancamentos/${id}`)
    }

    deletar = () => {
        this.service
            .deletar(this.state.lancamentoDeletar.id)
            .then(response => {
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(this.lancamentoDeletar);
                lancamentos.splice(index, 1);
                this.setState({ lancamentos: lancamentos, showConfirmDialog: false })
                messages.mensagemSucesso("Lançamento deletado")
            }).catch(err => {
                messages.mensagemErro("Erro ao deletar lançamento")
            })
    }

    abrirConfirmacao = (lancamento) => {
        this.setState({ showConfirmDialog: true, lancamentoDeletar: lancamento })
    }

    cancelarExclusao = () => {
        this.setState({ showConfirmDialog: false })
    }

    preparaFormularioCadastro = () => {
        this.props.history.push('/cadastro-lancamentos');
    }

    alterarStatus = (lancamento, status) => {
        this.service.alterarStatus(lancamento.id, status)
            .then(response => {
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(lancamento);
                if (index !== -1) {
                    lancamento['status'] = status;
                    lancamentos[index] = lancamento;
                    this.setState({ lancamentos })
                }
                messages.mensagemSucesso("Atualizado com sucesso!")
            }).catch(erro => {
                messages.mensagemErro(erro.response.data)
            })
    }

    render() {
        const meses = this.service.obterListaMeses();
        const tipos = this.service.obterListaTipos();

        const confirmDialogFooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Cancelar" icon="pi pi-times" className="p-button-secondary" onClick={this.cancelarExclusao} />
            </div>
        )

        return (
            <Card title='Consulta Lancamentos'>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='bs-component'>
                            <FormGroup htmlFor='inputAno' label='Ano: '>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    placeholder="Digite o Ano"
                                    value={this.state.ano}
                                    onChange={e => this.setState({ ano: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup htmlFor='inputDescricao' label='Descrição: '>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    placeholder="Descreva:"
                                    value={this.state.descricao}
                                    onChange={e => this.setState({ descricao: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup htmlFor='comboMes' label='Mês: '>
                                <SelectMenu
                                    className='form-control'
                                    lista={meses}
                                    value={this.state.mes}
                                    onChange={e => this.setState({ mes: e.target.value })}

                                />
                            </FormGroup>


                            <FormGroup htmlFor='inputTipo' label='Tipo de Lançamento: '>
                                <SelectMenu
                                    className='form-control'
                                    lista={tipos}
                                    value={this.state.tipo}
                                    onChange={e => this.setState({ tipo: e.target.value })}
                                />
                            </FormGroup>

                            <button type="button"
                                onClick={this.buscar} className="btn btn-success">
                                <i className="pi pi-search"></i> Buscar</button>
                            <button type="button"
                                onClick={this.preparaFormularioCadastro} className="btn btn-danger" >
                                <i className="pi pi-plus"></i> Cadastrar</button>


                        </div>
                    </div>
                </div>

                < br />
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='bs-component'>
                            <LancamentosTable
                                lancamentos={this.state.lancamentos}
                                deleteAction={this.abrirConfirmacao}
                                editAction={this.editar}
                                alterarStatus={this.alterarStatus}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog header="Confirmar Exclusão"
                        visible={this.state.showConfirmDialog}
                        style={{ width: '50vw' }}
                        modal={true}
                        footer={confirmDialogFooter}
                        onHide={() => this.setState({ showConfirmDialog: false })}>
                        Confirma a exclusão deste lançamento?
                    </Dialog>

                </div>


            </Card>
        )
    }
}

export default withRouter(ConsultaLancamentos);