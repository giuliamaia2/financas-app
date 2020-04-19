import ApiService from '../apiservice';

class UsuarioService extends ApiService{

    constructor(){
        super('/api/usuarios');
    }

    autenticar(credenciais){
        return this.post('/autenticar', credenciais);
    }

    obterSaldoPorUsuario(id){
        return this.get(`/saldo/${id}`);
    }

    salvar(usuario){
        return this.post('/cadastrar', usuario)
    }





}

export default UsuarioService;