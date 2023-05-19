$("#moedaentrada").on("change",function(){
    //if(this.val()){

    //}
    alert($("ssss").val());
});


async function converte(){

	var moedas = ['BRL', 'PEN'];
	var cotacao = [[1, 0.74], [1.35, 1]];
    var imposto;

    var response = await fetch("https://economia.awesomeapi.com.br/last/PEN-BRL");
            var jsonData = await response.json();
            cotacao[1][0] = await jsonData ['PENBRL'] ['bid'];
            response = await fetch("https://economia.awesomeapi.com.br/last/BRL-PEN");
            jsonData = await response.json();
            cotacao[0][1] = await jsonData ['BRLPEN']['bid'];
	
	var moedaEntrada = $('#moedaentrada').val();
    if(moedaEntrada == 1) {
        moedaSaida = 2;
    } else {
        moedaSaida = 1
    }
	var moedaSaida = $('#moedasaida').val();
    var valorEntrada = $('#valorentrada').val();
	
    console.log(cotacao);
	
	var valorSaida = await (cotacao[moedaEntrada-1] [moedaSaida-1] * valorEntrada);
    if(moedaEntrada == 1) {
        imposto = 0.0038;
    } else {
        imposto = 0.00005;
    }
    valorSaida = valorSaida -(valorSaida * imposto);
	await $('#resposta').html("Com as taxas aplicadas, incluindo IOF e a conversão da moeda "+moedas[moedaEntrada-1]+" para a moeda "+moedas[moedaSaida-1]+" o valor é: <br> PAYSEND: "+(valorSaida -9).toFixed(2) + "<br> WESTERUNION: "+(valorSaida -9.9).toFixed(2) + "<br> MONEYGRAM: "+(valorSaida -8).toFixed(2) + "<br> SEM BANCOS, APENAS IOF: "+(valorSaida).toFixed(2));
}


