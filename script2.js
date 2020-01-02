$(document).ready(function () {
  maiorEMenorPrecoDaUltimaNegociacao();
  precoUnitarioDaUltimaNegociacao();
  $('select').formSelect();
});

function maiorEMenorPrecoDaUltimaNegociacao() {
  var maiorPrecoDoBitCoinKPI = 0;
  var menorPrecoDoBitCoinKPI = 0;
  return fetch('https://www.mercadobitcoin.net/api/BTC/ticker/', {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(function (response) {
      response.json().then(function (data) {
        //maior preço das ultimas 24h
        maiorPrecoDoBitCoinKPI = parseFloat(data.ticker.high).toFixed(2);
        //menor preço das ultimas 24h
        menorPrecoDoBitCoinKPI = parseFloat(data.ticker.low).toFixed(2);
        var KPIMaiorPreco = "<i class='material-icons left'></i><b>" + maiorPrecoDoBitCoinKPI + "</b> -Last 24h Highest Price Negociation of BTC"
        $("#maiorPreco").append(KPIMaiorPreco);
        var KPIMenorPreco = "<i class='material-icons left'></i><b>" + menorPrecoDoBitCoinKPI + "</b> -Last 24h Lowest Price Negociation of BTC"
        $("#menorPreco").append(KPIMenorPreco);
      });
    }).catch(function (err) {
    })
}
function convert() {
  var currency = $("select#currency option").filter(":selected").val();
  var valor = $("#icon_prefix").val();
  var soma = 0;
  console.log(valor);

  if (valor == "" || currency == "nothing") {
    alert("Moeda ou Currency vazio;")
  } else {
    if (!valor.includes(".")) {
      return alert("Digite o valor com as virgulas corretas. Ex: " + valor + ",53")
    } else {
      valor = parseFloat(valor).toFixed(2);

      return fetch("https://www.mercadobitcoin.net/api/" + currency + "/ticker/", {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      })
        .then(function (response) {
          response.json().then(function (data) {
            soma = parseFloat(data.ticker.last).toFixed(2) * valor;
            console.log($("#moedaConvertida").val());
            console.log(soma)
            $("#moedaConvertida").attr("value", soma);
          });
        }).catch(function (err) {
        })
    }
  }


}

function precoUnitarioDaUltimaNegociacao() {
  var precoUnitario = 0;
  return fetch('https://www.mercadobitcoin.net/api/BTC/ticker/', {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(function (response) {
      response.json().then(function (data) {
        //preco unitario da ultima negociação
        precoUnitario = parseFloat(data.ticker.last).toFixed(2);
      });
    }).catch(function (err) {
    })
}

function mostraItens(pedido) {
  return fetch('http://localhost:8000/itens/' + pedido, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(function (response) {
      response.json().then(function (data) {
        data.forEach(element => {
          var soma = 0;
          soma = (parseFloat(element.valor / element.quantidade)).toFixed(2);
          var item = "<li>Produto: " + element.descricao + "  R$" + (soma) + " QTD: " + element.quantidade + "</li>";
          $("#lista" + pedido).append(item);
        });
      });
    }).catch(function (err) {
    })
}


