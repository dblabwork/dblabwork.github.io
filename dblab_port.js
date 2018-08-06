//tela_menu
var estado = 1;

//variavel do canvas
var canvas_sketch;
//numero de conteudos/trabalhos
var conteudos = 6;

//pagina scroll
var offsetY = 15.0;

var intro;

var rec_pos = 0;
var rec_tam = 0;

var tempo_texto = 0;
var texto_intro = "THIS";

var logo;

var img;

var ver_video;

var n;

var projetos;
var sobre;

var voltar;
var b_voltar;
var show_video = false;

var video_atual;


var institucional;


let w = null;
//let h = 2100;  //se começar no 2
let h;


var insta;
var link;

var play_video;

var janela_y = -100;

//var deviceOrientation = undefined;
//var paisagem = false;


//só para carregar os gif, dps nao é usado
var r;
var b;
var strength = 600.0;
var step = 30;
var noiseScale = 0.0027;

var fonte;

function setup() {


  w = windowWidth;
  if(estado==1 && windowHeight > 900 ){
    h = windowHeight;
  } else {
    h = 900;
  }
  canvas_sketch = createCanvas(w, h);
  canvas_sketch.parent('sketch_here');

  imageMode(CENTER);

logo = loadImage("data/logo.png");
play_video = loadImage("data/playm.png");
b_voltar = loadImage("data/close.png");

  ver_video = new Array();

    img = new Array();

//  bot_imgs = new Array();

for (var i = 1; i <= conteudos; i++) {

  img[i] = loadImage("data/img("+ i +").png");
  append(img, img[i]);

  ver_video[i] = createButton("", i);
  ver_video[i].size(300, 300);
  ver_video[i].style("font-family", "Helvetica");
  ver_video[i].style("font-size", "14px");
  //ver_video[i].style("z-index", 1);
  ver_video[i].style("border","none");
  ver_video[i].style("background-color", color(0,0));
  ver_video[i].touchEnded(assistir);
//  ver_video[i].touchEnded(assistir);
}




  projetos = createButton("PROJETOS", 2);
  projetos.position((w/2)-(projetos.width/2), 150);
  projetos.size(120, 50);
  projetos.style("font-family", "Helvetica");
  projetos.hide();
  projetos.style("font-size", "17px");
  projetos.style("border", color(0, 0));
  projetos.style("background-color", color(0, 0));
  projetos.mousePressed(menu_superior);
  projetos.mouseOver(muda_botao);
  projetos.mouseOut(desmuda_botao);

  sobre = createButton("SOBRE", 1);
  sobre.position((w/2)+(sobre.width), 150);
  sobre.size(120, 50);
  sobre.style("font-family", "Helvetica");
  sobre.style("font-size", "17px");
  sobre.style("border", color(0, 0));
  sobre.style("background-color", color(0, 0));
  sobre.hide();
  sobre.mousePressed(menu_superior);
  sobre.mouseOver(muda_botao);
  sobre.mouseOut(desmuda_botao);


  voltar = createButton("", 2);
  voltar.size(80, 80);
  voltar.position((w/2)+280,(h/2) - 210);
  voltar.style("font-family", "Helvetica");
  voltar.style("font-size", "25px");
  //ver_video[i].style("z-index", 1);
  voltar.style("border","none");
  voltar.style("background-color", color(0,0));
  voltar.touchEnded(fechar_video);
  voltar.hide();





  insta = createImg("data/insta.png");
  link  = createImg("data/link.png");

  link.position((w/2)-120,750);
 link.size(80,80);
  link.value(8);
  link.hide();

  link.mousePressed(abrir_janela);

  insta.position((w/2)+40,750);
  insta.size(80,80);
  insta.value(9);
  insta.hide()
  insta.mousePressed(abrir_janela);


   //video_atual = createDiv("");
   //video_atual.hide();

carregar_descricoes();

 institucional = createDiv(video_links[0]);
 institucional.hide();

 //fonte = loadFont("data/ubuntu.ttf");
 //textFont(fonte);

}


function draw() {

  background(255);
  strokeWeight(1);
  stroke(45,146,208,50);

    noFill();
  	var noi;
  	var xScale = 70.0;
    for (var j = -h/1.2; j < h/1.2; j += step) {
      beginShape();
      for (var i = -step * xScale; i <= windowWidth + step * xScale * 2; i += step * xScale) {
        noi = noise(i * noiseScale, j * noiseScale + frameCount / 300.0) * strength;
        curveVertex(i, j + noi);
      }
      endShape();
    }

  fill(52,74,148);
  noStroke();
  rect(0, h - 50,width, 50);


  fill(255);
  noStroke();
  rect(0,0,w,200);
  image(logo, w/2, logo.height/2,logo.width*0.7,logo.height*0.7);




 if (estado==1) {

   projetos.show();
   sobre.show();

    link.show();
  insta.show()
  link.position((w/2)-90,750);
  insta.position((w/2)+10,750);

    for (var i = 1; i <= conteudos; i++) {
      ver_video[i].hide();
    }

    institucional.show();
    institucional.position((w/2) - 280 ,400);

    fill(0);
    noStroke();
    textSize(20);

    textAlign(CENTER,CENTER);
    text(proj_textos[0], (w/2) - 280,200, 560, 200);


  } else if (estado==2) {

    institucional.hide();
    institucional.remove();
    projetos.show();
    sobre.show();

    //projetos.position((w/2)-(projetos.width/2), logo.height*0.7);
    //sobre.position((w/2)+(sobre.width/2), logo.height*0.7);
    link.hide();
  insta.hide()



    push();

    translate(-100,offsetY);

    for (var i = 1; i <= conteudos; i++) {

      ver_video[i].show();


      image(img[i],w/2,(img[i].height*i) + 50);
      image(play_video,w/2,(img[i].height*i) + 50);
      fill(0);
      noStroke();
      line(w/2,(img[i].height*i) + 50)
    //  textAlign(RIGHT, CENTER);
      textSize(25);
      textAlign(LEFT, CENTER);
      text(proj_titulos[i],(w/2)+(img[i].width/2)*1.1,(img[i].height)*i);
      textSize(17);
      textAlign(LEFT, CENTER);
      text(proj_textos[i], (w/2)+(img[i].width/2)*1.1,(img[i].height*i), 300, 100);

      //botão assisteir video
      ver_video[i].position((w/2)-(img[i].width*0.84),((img[i].height*i)-80));
      strokeWeight(15);
      fill(0);
      stroke(255);
      line((w/2) - (img[i].width/2),(img[i].height*i)-100, (w/2) + (img[i].width/2), (img[i].height*i)-100 );
    }
    pop();

    if (show_video) {



      for (var i = 1; i <= conteudos; i++) {

        ver_video[i].hide();
      }

      if(n == 1){
        janela_y = 100;
      } else if (n == conteudos){
        janela_y = -300;
      } else {
        janela_y = -100;
      }

      fill(0,210);
      rect(0,0,w,h);

      strokeWeight(2);
      stroke(0);
      fill(255);
      rect((w/2)-350,(img[n].height*n) - 190 + janela_y,700,500);

      noStroke();
      fill(0);
      textSize(30);
      textAlign(LEFT, CENTER);
      text(proj_titulos[n],(w/2)-285,(img[n].height*n) - 140 + janela_y);

   video_atual.show();
   video_atual.position((w/2)-280,(img[n].height*n) -80 + janela_y);
   voltar.position((w/2)+265,(img[n].height*n) - voltar.height - 110 + janela_y);
   image(b_voltar, (w/2)+306,(img[n].height*n) - voltar.height - 66 + janela_y,90,90);
  // voltar.position((w/2)+260, scrollTop + voltar.height + 140);


   projetos.hide();
sobre.hide();


    }


  } //VIDEO GALERI


//checando quanto foi scrollado
//qnt_scroll();

}

function windowResized() {

  w = windowWidth;
//  h = 1000;
  if(estado==1 && windowHeight > 900 ){
    h = windowHeight;
  } else if(estado==1 && windowHeight <= 900 ){
    h = 900;

  } else if(estado==2){
  h = 2100;
}

  resizeCanvas(w, h);

  projetos.position((w/2)-(projetos.width/2), 150);
  sobre.position((w/2)+(sobre.width/2), 150);
  //voltar.position((w/2)+280,(img[1].height*1) - voltar.height);

}



  function muda_botao(){

    if(this.value()==3){
 ver_video.style("border", color(0,100));
  ver_video.style("background-color", color(240,150));
}   else if (this.value() == 2) {
      projetos.style("border", color(0,100));
  projetos.style("background-color", color(240,150));
} else if (this.value()==1){
      sobre.style("border", color(0,100));
  sobre.style("background-color", color(240,150));
    }

  }

   function desmuda_botao(){
     if(this.value()==3){
 ver_video.style("border", color(0,0));
  ver_video.style("background-color", color(0,0));
}   else if (this.value() == 2) {
       projetos.style("border", color(0,0));
  projetos.style("background-color", color(0,0));
} else if (this.value()==1){
       sobre.style("border", color(0,0));
  sobre.style("background-color", color(0,0));
    }

  }


function assistir() {

  n = this.value();
  //ver_video.hide();
  video_atual = createDiv(video_links[n]);
  video_atual.hide();

  //video_atual.attribute("align","center");
  //fechar = true;
   show_video = true;

   voltar.show();

   redraw();
   //console.log(n);

}

function menu_superior () {

  estado = this.value();

  if(estado==1 && windowHeight > 900 ){
    h = windowHeight;

  } else if(estado==1 && windowHeight <= 900 ){
    h = 900;

  } else if(estado==2){
  //  institucional.hide();


  h = 2100;
}

if(estado == 1){
  institucional = createDiv(video_links[0]);
}


    windowResized();

}


function fechar_video(){

  show_video = false;
    //ver_video.hide();

   video_atual.hide();

    video_atual.remove();

    voltar.hide();

}

/*
function mouseDragged(){
    offsetX += (mouseY - pmouseY)/2;
}
*/



function abrir_janela(){
 if(this.value() == 8){
    window.open("https://www.facebook.com/dblab.dbserver/");
  } else if(this.value() == 9){
    window.open("https://www.instagram.com/_dblab/");
  }


}
