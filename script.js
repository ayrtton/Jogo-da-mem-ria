var vet = []
const TAM = 12
var cartasViradas = 0
var aux = 0

function iniciar() {
    gerarValores()
    renderizar()
}

function existe2x(v) {
    var c = 0

    for(let i=0; i<vet.length; i++) {
        if(v == vet[i])
            c++
    }
    
    if(c == 2)
        return true
    else 
        return false
}

function gerarValores() {
    var valorAleatorio = 0
    for(let i=0; i<TAM; i++) {
        valorAleatorio = Math.floor(Math.random() * 6 + 1)
        while(existe2x(valorAleatorio))
            valorAleatorio = Math.floor(Math.random() * 6 + 1)
        vet[i] = valorAleatorio
    }
}

function renderizar() {
    let html = '<ul id="imagens">'
    
    for(let i=0; i<TAM; i++) {
        html += `<li id="i${i}" alt="${vet[i]}" title="desvirado" onclick="virar(${i})"></li>`
    }

    html += '</ul>'
    
    document.getElementById('canvas').innerHTML = html
}

function virar(indice) {
    var elemento = document.getElementById('i' + indice)
    if(elemento.title == "desvirado") {
        elemento.style.background = "url(" + vet[indice] + ".jpg)"
        elemento.style.backgroundPosition = "50% 50%"
        elemento.style.backgroundSize = "200px 200px"
        elemento.title = "virado"
        
        cartasViradas++
        if(cartasViradas % 2 != 0) {
            aux = indice
        } else if(cartasViradas % 2 == 0 && vet[aux] != vet[indice]) {
            document.getElementById('corpo').onmousemove = function(){desvirar(aux, indice)}
        }
    }

    if(cartasViradas == 12) {
        var escolha = confirm("Você ganhou. Jogar novamente?")
        if(escolha == true) {
            document.location.reload()
        }
    }
}

function desvirar(a, b) {
    document.getElementById('i' + a).style.background = "url(bg.jpg)"
    document.getElementById('i' + b).style.background = "url(bg.jpg)"
    document.getElementById('i' + a).title = "desvirado"
    document.getElementById('i' + b).title = "desvirado"
    document.getElementById('corpo').onmousemove = function(){}
    cartasViradas-=2
}

iniciar()