let xMax = 700;
let yMax = 600;
let yFumo = 0;
let yNeve = 0;

function drawWindow(x, y) {
  fill(45, 30, 20);
  rect(x, y, 44, 44); // telaio della finestra

  fill(255, 210, 100);
  rect(x, y, 36, 36); // vetro con la luce accesa

  fill(45, 30, 20);
  rect(x, y, 36, 3); // traversa orizzontale
  rect(x, y, 3, 36); // traversa verticale
}

function drawHouse(x, y, scl = 1) {
  push();
  translate(x, y);
  scale(scl);
  rectMode(CENTER);

  fill(85, 60, 60);
  rect(52, -90, 20, 50); // comignolo

  fill(140, 115, 100);
  rect(0, 0, 160, 100); // casa

  fill(90, 35, 40);
  triangle(-90, -50, 90, -50, 0, -120); // tetto
  fill(140, 155, 190);
  triangle(-45, -85, 45, -85, 0, -120);

  fill(60, 40, 25);
  rect(0, 25, 30, 50); // porta

  drawWindow(-42, -12); // finestra a sinistra
  drawWindow(42, -12);  // finestra a destra

  fill(255, 210, 100, 50); //glow delle finestre
  ellipse(-42, -12, 55);
  ellipse(42, -12, 55);

  pop();
}

function drawTree(x, y, scl = 1) {
  push();
  translate(x, y);
  scale(scl);
  rectMode(CENTER);

  fill(60, 40, 25);
  rect(0, 0, 10, 30);                      // tronco

  fill(25, 55, 45);
  triangle(-38, -5, 38, -5, 0, -60);       // triangolo 3 (basso) verde
  fill(150, 165, 195);
  triangle(-32, -15, 32, -15, 0, -60);     // triangolo 3 neve dalla punta

  fill(25, 55, 45);
  triangle(-28, -35, 28, -35, 0, -85);     // triangolo 2 (medio) verde
  fill(150, 165, 195);
  triangle(-22, -47, 22, -47, 0, -85);     // triangolo 2 neve dalla punta

  fill(25, 55, 45);
  triangle(-18, -65, 18, -65, 0, -98);     // triangolo 1 (cima) verde, piu piccolo
  fill(150, 165, 195);
  triangle(-14, -73, 14, -73, 0, -98);     // triangolo 1 neve dalla punta

  pop();
}

function drawCloud(x, y, scl = 1) {
  push();
  translate(x, y);
  scale(scl);

  fill(50, 60, 90);
  ellipse(0, 10, 120, 40); //base
  ellipse(-30, -5, 60, 50); //lato sx
  ellipse(10, -15, 70, 60); //centrale
  ellipse(40, -2, 55, 45); //lato dx

  pop();
}

function drawSnowman(x, y, scl = 1) {
  push();
  translate(x, y);
  scale(scl);

  push();
  translate(15, -46);
  rotate(-35);
  fill(80, 55, 35);
  rect(0, -2, 28, 4);   // braccio dx
  pop();

  push();
  translate(-15, -46);
  rotate(190);
  fill(80, 55, 35);
  rect(0, -2, 30, 4);   // braccio sx
  pop();

  fill(205, 215, 235);
  ellipse(0, 0, 60);      // corpo in basso
  ellipse(0, -42, 44);   // corpo centrale
  ellipse(0, -74, 30);   // testa

  fill(240, 130, 40);
  triangle(0, -76, 0, -71, 14, -73.5) //naso 

  pop();
}

function setup() {
  createCanvas(xMax, yMax);
  frameRate(30);
  angleMode(DEGREES);
}

function draw() {
  background("#0B1226"); // cielo di notte

  noStroke();

  drawCloud(40, 56, 1.1); //in ordine da sx a dx
  drawCloud(187, 93, 0.8);
  drawCloud(323, 26, 1.3);
  drawCloud(460, 105, 0.8); //nuvola sopra la casa
  drawCloud(570, 37, 1.2);
  drawCloud(680, 130, 1.3);
  drawCloud(88, 130, 0.5);
  drawCloud(320, 140, 1);
  

  fill(170, 185, 215);
  rect(0, yMax * 0.7, xMax, yMax * 0.3); // terreno innevato

  drawTree(360, 420, 0.6); //albero vicino casa sx
  drawTree(290, 450, 1); 
  drawTree(75, 435, 0.8); //albero fondo sx
  drawTree(568, 434, 0.7); //albero vicino casa dx
  drawTree(680, 470, 1);
  drawTree(150, 485, 1.1); //albero centro sx
  drawTree(30, 530, 1.4);
  drawTree(610, 550, 1.7); //albero davanti dx
  drawTree(237, 560, 1.7); //albero davanti sx
  push();

  translate(xMax * 0.64, 455);
  rotate(35);
  fill(140, 155, 190);
  rect(6.6, 0, 35, 170); //stradina
  pop();

  yFumo = yFumo + 0.4;
  if(yFumo >= 180) {
    yFumo = 0;
  }
  for (let i = 0; i < 6; i++) { //uscita fumo
    let salita = (yFumo + i * 30) % 180;
    fill(100, 100, 110, 170 - salita * 0.8);
    ellipse(490 + salita * 0.3, 375 - salita, 5 + salita * 0.28, 4 + salita * 0.26);
  }
  
  drawHouse(xMax * 0.65, yMax * 0.75, 0.7);
  drawSnowman(370, 489, 0.4);

  fill(215, 225, 240, 220);
  yNeve = yNeve + 0.7;
  for(let i = 0; i < 120; i++) { //caduta neve
    let grandezza = 2 + (i % 3) * 2;
    let velocita = 0.5 + (i % 5) * 0.25;
    let deriva = 0.1 + (i % 4) * 0.1;
    let x = (i * i * 6 + (i % 7) * 23 + yNeve * velocita * deriva) % xMax; 
    let y = (i * 18 + yNeve * velocita) % yMax;
    ellipse(x, y, grandezza)
  }
}
