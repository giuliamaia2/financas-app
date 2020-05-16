import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import LancamentoService from '../../app/service/lancamento-service'
import LocalStorageService from '../../app/service/localStorageService'

import * as messages from '../../components/toastr'

class CadastroLancamentos extends React.Component {

    state = {
        id: null,
        descricao: '',
        mes: '',
        ano: '',
        valor: '',
        tipo: '',
        status: '',
        usuario: null,
        atualizando: false,
    }

    constructor() {
        super();
        this.service = new LancamentoService();
    }

    //método sobrescrito que carrega-se após o render
    componentDidMount() {
        //pegando o id da rota
        const params = this.props.match.params
        if (params.id) {
            this.service.obterPoId(params.id)
                .then(response => {
                    this.setState({ ...response.data, atualizando: true })
                }).catch(err => {
                    messages.mensagemErro(err.response.data)
                })
        }
    }

    submit = () => {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        const { descricao, valor, mes, ano, tipo } = this.state;
        const lancamento = { descricao, valor, mes, ano, tipo, usuario: usuarioLogado.id }

        try {
            this.service.validar(lancamento)
        } catch (erro) {
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => messages.mensagemErro(msg));
            return false;
        }

        this.service
            .salvar(lancamento)
            .then(response => {
                this.props.history.push('/consulta-lancamentos');
                messages.mensagemSucesso('Lançamento cadastrado');

            }).catch(erro => {
                messages.mensagemErro(erro.response.data);
            })
    }

    atualizar = () => {
        //o id é o id do lancamento
        const { descricao, valor, mes, ano, tipo, status, usuario, id } = this.state;
        const lancamento = { descricao, valor, mes, ano, tipo, usuario, status, id }

        this.service
            .atualizar(lancamento)
            .then(response => {
                this.props.history.push('/consulta-lancamentos');
                messages.mensagemSucesso('Lançamento atualizado com sucesso');

            }).catch(erro => {
                messages.mensagemErro(erro.response.data);
            })
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name]: value });
    }

    render() {
        const tipos = this.service.obterListaTipos();
        const meses = this.service.obterListaMeses();
        return (
            <Card title={this.state.atualizando ? 'Atualização de Lancamento' : 'Cadastro de Lancamento'}>
                <div className='row'>
                    <div className="col-md-12">
                        <FormGroup id="imputDescricao" label="Descricao: *">
                            <input type="text" className="form-control"
                                name="descricao"
                                value={this.state.descricao}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        <FormGroup id="inputAno" label="Ano: *">
                            <input id="inputAno" type="text" className="form-control"
                                name="ano"
                                value={this.state.ano}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                    </div>
                    <div className='col-md-6'>
                        <FormGroup id="inputMes" label="Mês: *">
                            <SelectMenu className='form-control' lista={meses}
                                name="mes"
                                value={this.state.mes}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-4'>
                        <FormGroup id="inputValor" label="Valor: *">
                            <input id="inputValor" type="text" className="form-control"
                                name="valor"
                                value={this.state.valor}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                    </div>
                    <div className='col-md-4'>
                        <FormGroup id="inputTipo" label="Tipo: *">
                            <SelectMenu lista={tipos} className='form-control'
                                name="tipo"
                                value={this.state.tipo}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                    </div>
                    <div className='col-md-4'>
                        <FormGroup id="inputStatus" label="Status: *">
                            <input type="text" className="form-control" disabled
                                name="status"
                                value={this.state.status}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                    </div>

                </div>

                <div className='row'>
                    <div className='col-md-6'>
                        {this.state.atualizando ?
                            (
                                <button className='btn btn-primary'
                                    onClick={this.atualizar}>
                                    <i className="pi pi-refresh"></i> Atualizar
                                </button>
                            ) : (
                                <button className='btn btn-success'
                                    onClick={this.submit}>
                                    <i className="pi pi-save"></i> Salvar
                                </button>
                            )
                        }

                        <button className='btn btn-danger'
                            onClick={e => this.props.history.push('/consulta-lancamentos')}>
                            <i className="pi pi-times"></i> Cancelar
                        </button>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroLancamentos);