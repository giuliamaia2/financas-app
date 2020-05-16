import ApiService from '../apiservice';
import ErroValidacao from './../exception/ErroValidacao'

class UsuarioService extends ApiService {

    constructor() {
        super('/api/usuarios');
    }

    autenticar(credenciais) {
        return this.post('/autenticar', credenciais);
    }

    obterSaldoPorUsuario(id) {
        return this.get(`/saldo/${id}`);
    }

    salvar(usuario) {
        return this.post('/cadastrar', usuario)
    }

    validar(usuario){
        const erros = []

        if (!usuario.nome) {
            erros.push("O campo nome é obrigatório!")
        }

        if (!usuario.email) {
            erros.push("O email é obrigatório!")
        } else if (!usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
            erros.push("Informe um e-mail válido")
        }

        if (!usuario.senha) {
            erros.push("O campo senha é obrigatório")
        }
        
        if (!usuario.senha || !usuario.senhaRepeticao) {
            erros.push("Digite a senha duas vezes!")
        } else if (usuario.senha !== usuario.senhaRepeticao) {
            erros.push("As senhas não coincidem")
        }

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros)
        }
    }





}

export default UsuarioService;