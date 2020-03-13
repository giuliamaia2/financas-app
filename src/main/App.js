import React from 'react'
import Rotas from './rotas'

import 'bootswatch/dist/flatly/bootstrap.css'
import '../custom.css'

class App extends React.Component {

  render() {
    return (
      <div>
        <Rotas />
      </div>
    )

  }
}

//exportando o componente para outros arquivos!
export default App;
