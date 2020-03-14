const inputMaterias = document.querySelector('#qtdMaterias');
const form = document.querySelector('.inputsAutomaticos');

function pegaValor() {
  const qtdMaterias = Number(inputMaterias.value);
  
  return qtdMaterias;
}

function criaInputs() {
  form.innerHTML = '';
  const inputs = pegaValor();
  for(let i = 1; i <= inputs; i++) {
    const section = document.createElement('section');
    section.setAttribute('class', 'item');


    const labelCriado = document.createElement('label');
    labelCriado.appendChild(document.createTextNode(`Sua ${i}ª nota`));
    labelCriado.setAttribute('for', `input${i}`);

    const inputCriado = document.createElement('input');
    inputCriado.setAttribute('id', `input${i}`);
    inputCriado.setAttribute('onblur', 'pegaValores()');
    inputCriado.setAttribute('autocomplete', 'off');
    inputCriado.setAttribute('type', 'number');
    inputCriado.setAttribute('min', '0');
    inputCriado.setAttribute('max', '10');
    inputCriado.setAttribute('step', '0.01');

    section.appendChild(labelCriado);
    section.appendChild(inputCriado);

    form.appendChild(section);
  }

  const botao = document.createElement('button');
  botao.setAttribute('id', 'botao');
  botao.setAttribute('type', 'submit');
  botao.appendChild(document.createTextNode('Enviar'));
  form.appendChild(botao);
}

function pegaValores() {
  const inputs = pegaValor();
  let notaMaterias = [''];
  for(let i = 1; i <= inputs; i++) {
    let valorInputs = document.querySelector(`#input${i}`);
    notaMaterias[i - 1] = Number(valorInputs.value);
  }
  return notaMaterias;
}

function criaP() {
  const p = document.createElement('p');
  return p;
}

const setResultado = (msg) => {
  const resultado = document.querySelector('#resultado');
  resultado.innerHTML = '';
  const p = criaP();
  
  p.innerHTML = msg;
  resultado.appendChild(p);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const divisor = pegaValor();

  const valores = pegaValores();
  let resultado = valores.reduce((anterior, proximo) => anterior + proximo);
  resultado = resultado / divisor;
  resultado = resultado.toFixed(2);

  const msg = `Seu coeficiente de aprovação: ${resultado}`;

  setResultado(msg);

  console.log(resultado);
});
