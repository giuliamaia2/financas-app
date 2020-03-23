import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import { withRouter } from 'react-router-dom'


class CadastroUsuario extends React.Component {


    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    cadastrar = () => {
        console.log(this.state)
    }

    cancelar = () => {
        this.props.history.push('/login')
    }

    render() {
        return (
            <Card title="Cadastro de Usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <fieldset>
                                <FormGroup label="Nome: *" htmlFor="inputNome">
                                    <input type="text"
                                        className="form-control"
                                        id="inputNome"
                                        name="nome"
                                        onChange={e => this.setState({ nome: e.target.value })}
                                        placeholder="Digite o Nome" />
                                </FormGroup>
                                <FormGroup label="Email: *" htmlFor="inputEmail">
                                    <input type="email"
                                        className="form-control"
                                        id="inputEmail"
                                        name="email"
                                        onChange={e => this.setState({ email: e.target.value })}
                                        placeholder="Digite o Email" />
                                </FormGroup>
                                <FormGroup label="Senha: *" htmlFor="inputSenha">
                                    <input type="password"
                                        className="form-control"
                                        id="inputSenha"
                                        name="senha"
                                        onChange={e => this.setState({ senha: e.target.value })}
                                        placeholder="Digite a Senha" />
                                </FormGroup>
                                <FormGroup label="Confirme a Senha: *" htmlFor="inputRepitaSenha">
                                    <input type="password"
                                        className="form-control"
                                        id="inputRepitaSenha"
                                        name="senha"
                                        onChange={e => this.setState({ senhaRepeticao: e.target.value })}
                                        placeholder="Digite novamente a senha" />
                                </FormGroup>
                            </fieldset>
                            <button onClick={this.cadastrar} type="button" className="btn btn-success">Salvar</button>
                            <button onClick={this.cancelar} type="button" className="btn btn-danger">Cancelar</button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroUsuario)