import React from 'react'
import {Route, Switch, HashRouter} from 'react-router-dom'
import Home from '../views/home'
import Login from '../views/login'
import CadastroUsuario from '../views/cadastro-usuario'

function Rotas(){
    return(
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuarios" component={CadastroUsuario} />
                <Route path="/home" component={Home} />
            </Switch>
        </HashRouter>
    )
}

export default Rotas