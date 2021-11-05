/////////////////////MODAL////////////////////////
var msg = ""

$("input[class='obrigatorio']").blur(function () {
  if (!$(this).val()){
    msg = this.id + " vazio"
    $(this).css("border", "3px solid red").focus()
    console.log(this.id, "vazio")
  }else{
    listaInputs++
    console.log(listaInputs)
    $(this).css("border", "none")
    console.log(this.id, "preenchido")
  }
})

var listaInputs = 0

$("#btnEnviar").click(function () {
  if(listaInputs < 6){
    $("#caixaMaior").css("display", "block")
    $("#cabecalhoCaixa").html("Atenção!")
    $("#mensagemCaixa").html("Preencha os campos obrigatórios.")
  }else{
    $("#caixaMaior").css("display", "block")
    $("#cabecalhoCaixa").html("Obrigado por se cadastrar.")
    $("#mensagemCaixa").html("Formulário enviado.")
    $("input[class='obrigatorio']").val("")
  }
})

$("#reset").click(function () {
  $("#nome").focus()
})

$("#botaoOk").click(function () {
  $("#caixaMaior").css("display", "none")
})

const apresentaDados = (resultado) => {
  for(let campo in resultado){
      if(document.querySelector("#"+campo)){
          console.log(campo)
          document.querySelector("#"+campo).value = resultado[campo]
      }
  }
}

function consultaCep() {
  let cepDigitado = document.getElementById('cep')
  
  if(cepDigitado.value == ""){
      cepDigitado.style.border = "1px solid red"
  }else{
      let cepProcurado = cepDigitado.value.replace('-', '')
      console.log(cepProcurado)

      fetch(`http://viacep.com.br/ws/${cepProcurado}/json`)
      .then(response => {response.json()
      .then(data => console.log(apresentaDados(data)))
      })
      .catch(x => console.log("CEP não encontrado"))
  }
}


///////////////////////////////SCRIPT BANNER///////////////////////////

let vetorB = ['img/alex.jpeg', 'img/Caio.jpg', 'img/rafa.jpg', 'img/kenia.jpg'];

let max = vetorB.length - 1;
let i = 0;

$('#banner').css('backgroundImage', 'url(' + vetorB[0] + ')');

$('#btnLeft').click(function () {
  trocar(-1);
});
$('#btnRight').click(function () {
  trocar(1);
});

setInterval(() => trocar(1), 5000);

function trocar(op) {
  $('#banner')
    .css('backgroundImage', 'url(' + vetorB[i] + ')')
    .fadeOut(500, function () {
      i += op;
      if (i > max) {
        i = 0;
      } else if (i < 0) {
        i = max;
      }
      $('#banner')
        .css('backgroundImage', 'url(' + vetorB[i] + ')')
        .fadeIn(500);
    });
}

/////////////////////////////////SCRIPT OO//////////////////////////////////

class Cadastro {
  constructor() {
    this.id = 1;
    this.arrayCadastro = [];
    this.testeBtn = 0;
  }

  salvar() {
    let servico = this.lerDados();

    if (this.validarCampos(servico)) {
      if (this.testeBtn == 0) {
        this.adicionar(servico);
      } else {
        this.atualizar(this.testeBtn);
      }
      this.listaNomes();
      this.cancelar();
    }
  }

  listaNomes() {
    let tbody = document.getElementById('tBody');
    tbody.innerText = '';

    for (let i = 0; i < this.arrayCadastro.length; i++) {
      let novaLinha = tbody.insertRow();

      let td_nome = novaLinha.insertCell();
      let td_dog = novaLinha.insertCell();
      let td_acoes = novaLinha.insertCell();

      td_nome.innerText = this.arrayCadastro[i].nome;
      td_dog.innerText = this.arrayCadastro[i].dog;

      let imgEdit = document.createElement('img');
      imgEdit.src = 'img/edit.png';
      imgEdit.style = 'cursor:pointer';
      td_acoes.appendChild(imgEdit);

      let imgDelete = document.createElement('img');
      imgDelete.src = 'img/delete.png';
      imgDelete.style = 'cursor:pointer';
      td_acoes.appendChild(imgDelete);

      imgEdit.setAttribute(
        'onclick',
        'servico.mostrarDados(' + JSON.stringify(this.arrayCadastro[i]) + ')'
      );

      imgDelete.setAttribute(
        'onclick',
        'servico.deletar(' + this.arrayCadastro[i].id + ')'
      );
    }
  }

  adicionar(servico) {
    this.arrayCadastro.push(servico);
    this.id++;
  }

  cancelar() {
    document.getElementById('nomePessoa').value = '';
    document.getElementById('nomeDog').value = '';

    document.getElementById('btnSalvar').innerText = 'Salvar';
    this.testeBtn = 0;
  }

  lerDados() {
    let servico = {};
    servico.nome = document.querySelector('#nomePessoa').value;
    servico.dog = document.querySelector('#nomeDog').value;
    servico.id = this.id;

    return servico;
  }

  validarCampos(servico) {
    let msg = '';
    if (servico.nome == '') {
      msg += ' - Informe o nome da pessoa \n';
    }
    if (servico.dog == '') {
      msg += ' - Informe o nome do dog \n';
    }
    if (msg != '') {
      alert(msg);
      return false;
    }
    return true;
  }

  deletar(idProcurado) {
    if (confirm('Deseja deletar ? ' + idProcurado)) {
      for (let i = 0; i < this.arrayCadastro.length; i++) {
        if (this.arrayCadastro[i].id == idProcurado) {
          this.arrayCadastro.splice(i, 1);
          tBody.deleteRow(i);
        }
      }
    }
  }

  mostrarDados(dados) {
    document.getElementById('nomePessoa').value = dados.nome;
    document.getElementById('nomeDog').value = dados.dog;

    document.getElementById('btnSalvar').innerHTML = 'Atualizar';
    this.testeBtn = dados.id;
  }

  atualizar(id) {
    for (let i = 0; i < this.arrayCadastro.length; i++) {
      if (id == this.arrayCadastro[i].id) {
        this.arrayCadastro[i].nome =
          document.getElementById('nomePessoa').value;
        this.arrayCadastro[i].dog = document.getElementById('nomeDog').value;
      }
    }
    this.testeBtn = 0;
  }
}
var servico = new Cadastro();

/////////////////////////////////SCRIPT CALC////////////////////////////////

var memoria = [];
var digitos = [];
var float1;
var float2;
var nome;
var valor = 0;
var op; // Recebe o operador matemático
var resultado;
// Método para reconhecer as operações matemáticas
var res = {
  ' + ': (a, b) => {
    return a + b;
  },
  ' - ': (a, b) => {
    return a - b;
  },
  ' * ': (a, b) => {
    return a * b;
  },
  ' / ': (a, b) => {
    return a / b;
  },
  'x²': a => {
    return Math.pow(a, 2);
  },
  'x³': a => {
    return Math.pow(a, 3);
  },
  'raiz²': a => {
    return Math.sqrt(a);
  }
};
// "event" foi a melhor forma que encontrei para capturar as entradas de clique
$('input').click(event => {
  nome = event.target.name;
  valor = event.target.value;
  // Tratamento do botão "Calculadora Científica"
  if (valor == 'C.C') {
    null;
    // Tratamento do botão "C" para zerar a calculadora
  } else if (valor == 'C') {
    valor = '';
    digitos = '';
    memoria = '';
    op = '';
    resultado = '';
    $('#memoria').html(memoria);
    $('#entrada-saida').html(valor);
    // Impressões no console para testes
    // console.log("IF valor:", valor)
    // console.log("IF digitos:", digitos)
    // console.log("IF memoria:", memoria)
    // Captura dos operadores matemáticos
  } else if (nome == 'op') {
    // NECESSÁRIO AJUSTE PARA ACUMULO DE OPERAÇÕES
    if (resultado > 0) {
      // Tratamento da "memória".
      float1 = parseFloat(resultado);
      op = valor;
      memoria += ' = ';
      memoria += resultado;
      memoria += op;
      memoria += digitos;
      $('#memoria').html(memoria);
      $('#entrada-saida').html(resultado);
      // Impressões no console para testes
      // console.log("IF OP - float1:", float1)
      // console.log("IF OP - op:", op)
      // console.log("IF OP - float2:", float2)
      // console.log("IF OP - resultado:", resultado)
    } else {
      memoria += digitos;
      memoria += valor;
      float1 = parseFloat(digitos); // Grava os números em variável
      op = valor; // Recebe o operador
      digitos = ''; // Libera a variável para reutilização
      $('#memoria').html(memoria);
      $('#entrada-saida').html(digitos);
    }
    // Impressões no console para testes
    // console.log("ELSE IF", op, "memoria:", memoria)
    // console.log("ELSE IF", op, "digitos:", digitos)
    // Tratamento do resultado
  } else if (valor == ' =') {
    memoria += digitos;
    float2 = parseFloat(digitos); // Digitos depois do operador vão aqui
    // Aqui a operação é reconhecida e efetuada com os parâmetros gerando o resultado
    resultado = res[op](float1, float2);
    // Impressões no console para testes
    // console.log("ELSE IF = float1:", float1)
    // console.log("ELSE IF = op:", op)
    // console.log("ELSE IF = float2:", float2)
    // console.log("ELSE IF = resultado:", resultado)
    valor = '';
    digitos = '';
    op = '';
    $('#memoria').html(memoria);
    $('#entrada-saida').html(resultado);
    // Tratamento geral para o restante dos botões
  } else {
    digitos += valor;
    $('#entrada-saida').html(digitos);
    // Impressões no console para testes
    // console.log("ELSE digitos:", digitos)
    // console.log("ELSE memoria:", memoria)
  }
});
// Sério que precisa explicar isso?
$("[name='CC']").click(() => {
  $('#cientifica').slideToggle('slow');

});

// ///////////////////////////////////// Menu /////////////////////////////
const btnMenu = document.getElementById('btnMenu');

function toq() {
  const ul = document.getElementById('lista-nav');
  ul.classList.toggle('active');
}
btnMenu.addEventListener('click', toq);


/ ///////////////////////////////////// Botao de aumentar /////////////////////////////

let aAumentar = document.getElementById('btnAum');
      let aDiminui = document.getElementById('btnDim');
      let fontBody = document.querySelector('html');
      let bodyFont = 16;
      let fontIncremento = 1;

      aAumentar.addEventListener('click', function (event) {
        bodyFont = bodyFont + fontIncremento;
        fontBody.style.fontSize = bodyFont + 'px';
        console.log(fontBody);
      });
      aDiminui.addEventListener('click', function (event) {
        bodyFont = bodyFont - fontIncremento;
        fontBody.style.fontSize = bodyFont + 'px';
        console.log(fontBody);
      });
