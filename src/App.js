import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import React, { useEffect, useState } from 'react';
import './App.css';
import ProdutoService from './service/ProdutoService';

function App() {

  const [produtos, setProdutos] = useState([]);
  const produtoService = new ProdutoService();

  const [categoria, setCategoria] = useState('');
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    produtoService.getProdutos().then(data => {
      console.log("array ", data)
      setProdutos(data)
    });
  }, []);

  const [cadastro, setCadastro] = useState();
  const [edicao, setEdicao] = useState(false);
  const [busca, setBusca] = useState('');

  function salvarProduto(nome, categoria, descricao, preco) {
    let obj = { nome: nome, categoria: categoria, descricao: descricao, preco: parseInt(preco) };
    console.log(obj)
    produtoService.salvarProdutos(obj).then(data => {
      console.log("salvar", data)
      produtos.push(data)
      setProdutos(produtos)
      setCadastro(false)
      document.location.href = document.location.href;
    });
  }

  function excluirProduto(produto) {
    produtoService.excluirProduto(produto._id).then(data => {
      console.log("excluir", data);
      document.location.href = document.location.href;
    })
  }

  function editarProduto(nome, categoria, descricao, preco) {
    let obj = { _id: id, nome: nome, categoria: categoria, descricao: descricao, preco: parseInt(preco) };
    console.log("editar ", obj);
    produtoService.editarProduto(obj).then(data => {
      console.log(data);
      document.location.href = document.location.href;
    })
  }

  function prepararEdicao(produto) {
    setId(produto._id)
    setCategoria(produto.categoria)
    setNome(produto.nome)
    setDescricao(produto.descricao)
    setPreco(produto.preco)
    setEdicao(true)
    setCadastro(true)
  }


  const acoes = (rowData) => {
    return (
      <div>
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" title="excluir" onClick={() => { excluirProduto(rowData) }} />
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-pencil" title="editar" onClick={() => { prepararEdicao(rowData) }} style={{ marginLeft: "10px" }} />
      </div>
    )
  }

  const cadastrarOuEditar = (nome, categoria, descricao, preco) => {
    if (edicao !== true) {
      salvarProduto(nome, categoria, descricao, preco)
    } else {
      editarProduto(nome, categoria, descricao, preco)
    }
  }

  function buscar(e) {
    setBusca(e.target.value);
    let array = []
    for (let index = 0; index < produtos.length; index++) {
      let x = produtos[index]['nome'];
      if (x.includes(busca)) {

        array.push(produtos[index])
      }
    }
    setProdutos(array)

    if (busca.length === 1) {
      produtoService.getProdutos().then(data => {
        console.log("array ", data)
        setProdutos(data)
      });
    }
    console.log(busca.length);
  }

  function limparGeral(){
    setNome('')
    setCategoria('')
    setDescricao('')
    setPreco('')
    setEdicao(false)
    setCadastro(false)
  }

  return (
    <div className="App">
      <div className="p-text-center" style={{ fontSize: "40pt", marginTop: "50px" }}>iShop</div>
      <br /> <br />
      <div style={{ marginBottom: "20px" }}>
        <Button label="Cadastrar" style={{ marginRight: "10px" }} onClick={() => setCadastro(true)} />
        <InputText id="firstname1" style={{ width: "900px" }} value={busca} type="text" placeholder="Digite alguma coisa" onChange={(e) => { buscar(e) }} />
      </div>

      <div className="card" style={{ height: "300px", width: "1000px", marginLeft: "29%" }}>
        <DataTable value={produtos}>
          <Column field="categoria" header="Categoria"></Column>
          <Column field="nome" header="Nome"></Column>
          <Column field="descricao" header="Descrição"></Column>
          <Column field="preco" header="Preço"></Column>
          <Column body={acoes} header="Açoes"></Column>
        </DataTable>
      </div>

      <Dialog header="Cadastrar Produto" visible={cadastro} style={{ width: '50vw' }} onHide={() => setCadastro(false)} closable={false} closeOnEscape={false}>

        <div className="p-fluid" >
          <div className="p-field">
            <label htmlFor="firstname1" style={{ marginRight: "1100px" }}>Categoria</label>
            <InputText id="firstname1" type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
          </div>
          <div className="p-field">
            <label htmlFor="lastname1" style={{ marginRight: "1100px" }}>Nome</label>
            <InputText id="lastname1" type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>
          <div className="p-field">
            <label htmlFor="firstname1" style={{ marginRight: "1100px" }}>Descricao</label>
            <InputText id="firstname1" type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
          </div>
          <div className="p-field">
            <label htmlFor="lastname1" style={{ marginRight: "1100px" }}>Preço</label>
            <InputText id="lastname1" type="text" value={preco} onChange={(e) => setPreco(e.target.value)} />
          </div>
          <Button style={{right:"1%", width:"20%"}} label={edicao ? 'Editar Produto' : 'Salvar Produto'} onClick={() => { cadastrarOuEditar(nome, categoria, descricao, preco) }} />
          <Button label="Cancelar" style={{backgroundColor:"red", width:"20%"}} onClick={() => limparGeral() } />
        </div>

      </Dialog>

    </div>
  );
}
export default App;
