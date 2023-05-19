var qtdColunas = 3;
var qtdLinhas = 3;

criaTabela();

function criaTabela() {
    var fundo = document.querySelector("#fundo");
    var quadrado = document.querySelector("#quadrado");

    for (let l = 0; l < qtdLinhas; l++) {
        let linha = document.createElement('tr');

        for (let c = 0; c < qtdColunas; c++) {
            let coluna = document.createElement('td');
            let id = (l * qtdColunas + c + 1);

            coluna.innerHTML = `<input type='text' maxlength="1" onclick="Apagar(${id})" oninput="VerificaJogo(${qtdLinhas},${qtdColunas},${id})" onkeypress="return SomenteNumeros(event)" id='input_${(l * qtdColunas + c + 1)}' class='numResposta'>`;

            coluna.id = id;

            linha.appendChild(coluna);
        }
        quadrado.appendChild(linha);
        fundo.appendChild(quadrado);
    }
}

function Apagar(id) {
    var elemento = document.querySelector(`#input_${id}`);
    elemento.value = "";
}

var valores = [];
var cont = 0;

function VerificaJogo(id) {

    for (let linha = 0; linha < qtdLinhas; linha++) {
        for (let coluna = 0; coluna < qtdColunas; coluna++) {
            var Input = document.querySelector("#input_" + (linha * qtdColunas + coluna + 1));
            if (!valores.includes(Input.value) && Input.value != "") {
                valores.push(Input.value);
            } else if (valores.includes(Input.value) && Input.value != "") {
                Input.value = "";
            }
        }

    }
    var soma = 0;
    verificarQuadrados();


    soma = soma + Number(VerificaVitoria(1, 2, 3, 0));
    soma = soma + Number(VerificaVitoria(4, 5, 6, 0));
    soma = soma + Number(VerificaVitoria(7, 8, 9, 0));
    soma = soma + Number(VerificaVitoria(1, 4, 7, 0));
    soma = soma + Number(VerificaVitoria(2, 5, 8, 0));
    soma = soma + Number(VerificaVitoria(3, 6, 9, 0));
    soma = soma + Number(VerificaVitoria(1, 5, 9, 0));
    soma = soma + Number(VerificaVitoria(7, 5, 3, 0));
    debugger
    if (soma == 8) {
        var placar = document.querySelector("#numPlacarId");
        cont++;
        placar.innerHTML = cont;
    }

}

function verificarQuadrados() {
    var quadrados = document.querySelectorAll('.numResposta'); // Seleciona todos os quadrados do jogo
    var numerosQuadrados = [];

    for (var i = 0; i < quadrados.length; i++) {
        var valor = quadrados[i].value.trim();

        if (valor !== '') {
            numerosQuadrados.push(valor);
        }
    }

    // Comparar a lista de números nos quadrados com o array valores
    for (var j = 0; j < valores.length; j++) {
        if (numerosQuadrados.includes(valores[j])) {
            valores.splice(j, 1); // Remove o número do array valores
            j--; // Atualiza o índice após a remoção
        }
    }
}

function SomenteNumeros(e) {
    var charCode = e.charCode ? e.charCode : e.keyCode;
    if (charCode != 8 && charCode != 9) {
        if (charCode < 48 || charCode > 57) {
            return false;
        }
    }
}
var contCompleto;

function VerificaVitoria(q1, q2, q3, contador) {
    debugger
    var q1 = document.querySelector(`#input_${q1}`).value;
    var q2 = document.querySelector(`#input_${q2}`).value;
    var q3 = document.querySelector(`#input_${q3}`).value;
    var soma = Number(q1) + Number(q2) + Number(q3);

    if (soma == 15) {
        // contCompleto = contCompleto < 0 ? 0 : 0+1;
        contador = 1;
    } else {
        // contCompleto = contCompleto < 0 ? 0 : 0-1;
        contador = 0;
    }
    return contador;
}

function Atualizar() {
    for (let linha = 0; linha < qtdLinhas; linha++) {
        for (let coluna = 0; coluna < qtdColunas; coluna++) {
            var Input = document.querySelector("#input_" + (linha * qtdColunas + coluna + 1));
            Input.value = "";
        }

    }
}

function Resetar() {
    Atualizar();
    var placar = document.querySelector("#numPlacarId");
    placar.innerHTML = cont = 0;
}