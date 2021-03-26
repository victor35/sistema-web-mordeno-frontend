import axios from 'axios';

export default class ProdutoService {

    getProdutos() {
        return axios.get('http://localhost:4000/produtos').then(res => res.data);
    }

    salvarProdutos(body) {
        return axios.post('http://localhost:4000/produtos',body).then(res => res);
    }

    excluirProduto(id){
        return axios.delete('http://localhost:4000/produtos/'+id).then(res => res);
    }

    editarProduto(obj){
        return axios.put('http://localhost:4000/produtos/'+obj._id,obj).then(res => res);
    }

    getProdutoById(id){
        return axios.get('http://localhost:4000/produtos/'+id).then(res => res.data);
    }

}