async function converte(){

     // Definição das moedas e matriz de cotação inicial
	var moedas = ['BRL', 'PEN'];
	var cotacao = [[1, 0], [0, 1]];//Matriz BRL X PEN

    // Variável para armazenar o valor do imposto
    var imposto;

    // Obtenção da cotação PEN-BRL da API e atualização da matriz de cotação
    var response = await fetch("https://economia.awesomeapi.com.br/last/PEN-BRL");//vai na API e guarda os dados no response
    var jsonData = await response.json();//Pegamos os dados do response tratamos como JSON e guardamos em JsonData
    cotacao[1][0] = await jsonData ['PENBRL'] ['bid'];//Colhe o dados que foi trabalhado no JSON e coloca na matriz de cotacao

    // Obtenção da cotação BRL-PEN da API e atualização da matriz de cotação
    response = await fetch("https://economia.awesomeapi.com.br/last/BRL-PEN");
    jsonData = await response.json();
    cotacao[0][1] = await jsonData ['BRLPEN']['bid'];

	// Obtenção dos valores selecionados pelo usuário
	var moedaEntrada = $('#moedaentrada').val();
    if(moedaEntrada == 1) {
        moedaSaida = 2;
    } else {
        moedaSaida = 1;
    }
	var moedaSaida = $('#moedasaida').val();
    var valorEntrada = $('#valorentrada').val();
	
    // Exibição da matriz de cotação no console
    console.log(cotacao);
	
    // Cálculo do valor de saída
	var valorSaida = await (cotacao[moedaEntrada-1] [moedaSaida-1] * valorEntrada);

    // Definição do valor do imposto com base na moeda de entrada
    if(moedaEntrada == 1) {
        imposto = 0.0038;
    } else {
        imposto = 0.00005;
    }

    // Aplicação do imposto ao valor de saída
    valorSaida = valorSaida -(valorSaida * imposto);

    // Exibição do resultado na página
	await $('#resposta').html("Com as taxas aplicadas, IOF e a conversão da moeda de "+moedas[moedaEntrada-1]
                                +" para "+moedas[moedaSaida-1]
                                +" o valor é: <br><br> PAYSEND: "+(valorSaida -9).toFixed(2)+ 
                                "<br><a href='https://paysend.com' target='_blank'>Paysend</a>"
                                + "<br> WESTERNUNION: "+(valorSaida -9.9).toFixed(2)+
                                "<br><a href='https://www.westernunion.com/br/pt/web/send-money/start' target='_blank'>WesternUnion</a>"
                                + "<br> MONEYGRAM: "+(valorSaida -10).toFixed(2)+
                                "<br><a href='https://online.moneygram.com.br/moneygram' target='_blank'>Moneygram</a>");
                                
}


