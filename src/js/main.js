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
    labelCriado.appendChild(document.createTextNode(`Sua ${i}ª nota(entre 0 e 10).`));
    labelCriado.setAttribute('for', `input${i}`);

    const inputCriado = document.createElement('input');
    inputCriado.setAttribute('id', `input${i}`);
    inputCriado.setAttribute('onblur', 'pegaValores()');
    inputCriado.setAttribute('placeholder', `Digite sua ${i}ª nota aqui...`);
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

const setResultado = (msg, msgMedia, isValid) => {
  const resultado = document.querySelector('#resultado');
  resultado.innerHTML = '';
  const p = criaP();
  const pMedia = criaP();

  if(isValid) pMedia.classList.add('acima_media');
  if(!isValid) pMedia.classList.add('abaixo_media');
  
  p.innerHTML = msg;
  pMedia.innerHTML = msgMedia;

  resultado.appendChild(p);
  resultado.appendChild(pMedia);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const divisor = pegaValor();

  const valores = pegaValores();
  let resultado = valores.reduce((anterior, proximo) => anterior + proximo);
  resultado = resultado / divisor;
  resultado = resultado.toFixed(2);

  const msg = `Seu coeficiente de aprovação: ${resultado}`;
  let msgMedia = 'Acima da média';

  if(resultado < 6) {
    msgMedia = 'Abaixo da média';
    setResultado(msg, msgMedia, false);
    return
  }

  if(resultado === 6) {
    msgMedia = 'Na média';
    setResultado(msg, msgMedia, true);
    return
  }

  setResultado(msg, msgMedia, true);

  console.log(resultado);
});
