import React from 'react'
import Rotas from './rotas'
import Navbar from '../components/navbar'

import 'bootswatch/dist/flatly/bootstrap.css'
import 'toastr/build/toastr.min.js'

import '../custom.css'
import 'toastr/build/toastr.css'

class App extends React.Component {

  render() {
    return (
      <>
        <Navbar />
        <div className="container">
          <Rotas />
        </div>
      </>
    )

  }
}

//exportando o componente para outros arquivos!
export default App;
