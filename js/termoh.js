// Horizontal Termometer Indicator (on Canvas Object)
// by: Jorge Girbau

var canvas = document.getElementById("termoh");
var valor1 = canvas.getAttributeNode("data-valor").value;
var maxim = canvas.getAttributeNode("data-max").value;
var valorx = 0;
var valor = valor1 / maxim;
var increme = parseInt(valor1 / 40);
if (increme == 0) { increme = 1; };
var ctx = canvas.getContext("2d");
var grad;
var medio = canvas.height / 2;
var centrado = canvas.width / 2;
var radio = medio / 2;
var lado = radio / 2;
var largo = radio * 6;
var largo2 = parseInt(largo - (radio * 1.1));
var medida;

ctx.translate(radio*1.2, medio);
var AA = setInterval(Dibuja1, 60);

function Dibuja1() {
	ctx.clearRect(-radio*4, -medio, centrado*3, medio*2);
	DibujaTerm();
	DibujaTexto();
	valorx += increme;
	if (valorx >= valor1) {
		valorx = valor1;
		DibujaTerm();
		DibujaTexto();
		clearInterval(AA);
	};
};

function DibujaTerm() {
	
	valor = valorx / maxim;
	
	// Barra de Vacia
	grad = ctx.createLinearGradient(0, -lado, 0, lado);
	grad.addColorStop(0, "#ddd");
	grad.addColorStop(0.5, "#fff");
	grad.addColorStop(1, "#ddd");
    ctx.fillStyle = grad;
	ctx.fillRect(0, -lado, largo, lado*2);
	
	// calcula medida
	medida = parseInt((radio*1.1) + (largo2 * valor));
	if (valor == 1) { medida = largo };
		
	// Barra de Color
	grad = ctx.createLinearGradient(0, -lado, 0, lado);
	grad.addColorStop(0, "#d00");
	grad.addColorStop(0.5, "#f86");
	grad.addColorStop(1, "#d00");
    ctx.fillStyle = grad;
	ctx.fillRect(0, -lado, medida, lado*2);
	
	// Dibuja la Bola
	ctx.beginPath();
	grad = ctx.createRadialGradient(radio*0.3, -radio*0.3, 0, radio*0.3, -radio*0.3, radio);
	grad.addColorStop(0, "#f86");
	grad.addColorStop(1, "#d00");
	ctx.arc(0,0, radio, 0, 2*Math.PI);
	ctx.fillStyle = grad;
	ctx.closePath();
	ctx.fill();
	
	// Cúpula de punta
	ctx.beginPath();
	grad = ctx.createRadialGradient(largo, 0, 0, largo, 0, lado);
	grad.addColorStop(0, "#fff");
	grad.addColorStop(1, "#ddd");
	ctx.fillStyle = grad;
	ctx.arc(largo, 0, lado, 0.5*Math.PI, 1.5*Math.PI, true);
	ctx.closePath();
	ctx.fill();
	
};

function DibujaTexto() {
	
	// Linea de Borde
	ctx.beginPath();
	ctx.strokeStyle = "#000";
	ctx.lineWidth = parseInt(radio * 0.05);
	ctx.arc(0,0, radio*1.1, 0.2*Math.PI, -0.2*Math.PI);
	ctx.lineTo(largo, -lado*1.25);
	ctx.arc(largo, 0, lado*1.25, -0.5*Math.PI, 0.5*Math.PI);
	ctx.closePath();
	ctx.stroke();
	
	// Marcas
	var x = parseInt(radio * 1.1);
	ctx.font = radio * 0.3 + "px arial";
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";
	ctx.fillStyle = "#000";
	var monto = 0;
	var k = x;
	for (var i=0; i<=10; i++) {
		k = x + ((largo2/10) * i);
		ctx.beginPath();
		ctx.moveTo(k, -lado*1.25);
		ctx.lineTo(k, -lado*0.5);
		ctx.stroke();
		monto = parseInt((maxim / 10) * i);
		ctx.translate(k,-lado*1.25);
		ctx.rotate(0.4*Math.PI);
		ctx.fillText(monto + "%",-lado*0.9, 0);
		ctx.rotate(-0.4*Math.PI);
		ctx.translate(-k, lado*1.25);
	};
	
	// Escribe Valor
    ctx.font = radio * 0.7 + "px arial";
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";
	ctx.fillStyle = "#000";
	ctx.fillText(valorx + "%", 0,0);
	
	// Texto
	ctx.font = radio * 0.6 + "px arial";
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";
	ctx.fillStyle = "#000";
	ctx.fillText("KPI - % Completed", centrado-radio, radio*1.5);
};

