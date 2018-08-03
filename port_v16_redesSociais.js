
var estado = 1;



var num = 18;

var imgs;
var bot_imgs;

var intro;

var rec_pos = 0;
var rec_tam = 0;

var tempo_texto = 0;
var texto_intro = "THIS";

var som_intro;

var n = null;


var lynes;
var numLines = 30;

var pos_img = 0;

var projetos;
var sobre;
var ver_video;

var video_atual;


var rosto;
var descricao;

var show_descricao = false;
var proj_titulos;
var proj_textos;
var video_links;
var timer_texto = 0;
var contar_tempo = false;


 var tam_fonte;

 var insta;
 var link;


function preload() {



  descricao = loadStrings('data/descricao.txt');


   insta = createImg("data/insta.png");
   link  = createImg("data/link.png");

}

function setup() {
  createCanvas(windowWidth, windowHeight, P2D);



  rectMode(CENTER);
insta.hide();
    link.hide();

  imgs = new Array();
  bot_imgs = new Array();




  projetos = createButton("PROJETOS", 1);
  projetos.position(50, 0);
  projetos.size(120, 50);
  projetos.style("font-family", "Helvetica");
  projetos.hide();
  projetos.style("font-size", "17px");
  projetos.style("border", color(0, 0));
  projetos.style("background-color", color(0, 0));
  projetos.mousePressed(menu_superior);
  projetos.mouseOver(muda_botao);
  projetos.mouseOut(desmuda_botao);

  sobre = createButton("SOBRE", 2);
  sobre.position(175, 0);
  sobre.size(120, 50);
  sobre.style("font-family", "Helvetica");
  sobre.style("font-size", "17px");
  sobre.style("border", color(0, 0));
  sobre.style("background-color", color(0, 0));
  sobre.hide();
  sobre.mousePressed(menu_superior);
  sobre.mouseOver(muda_botao);
  sobre.mouseOut(desmuda_botao);

  ver_video = createButton("Video", 3);
  ver_video.position((width/2)-85, height/1.15);
  ver_video.size(170, 60);
  ver_video.style("font-family", "Helvetica");
  ver_video.style("font-size", "17px");
  ver_video.style("border", color(0,0));
  ver_video.style("background-color", color(0,0));
  //ver_video.style("margin-left", -85);
  ver_video.hide();
  ver_video.mousePressed(assistir);
  ver_video.mouseOver(muda_botao);
  ver_video.mouseOut(desmuda_botao);



  //Imagens Projetos

  for (var i = 1; i <= num; i++) {

    imgs[i] = loadImage("data/frame("+i+").png");
    append(imgs, imgs[i]);

    bot_imgs[i] = createImg("data/bot("+i+").png");
    bot_imgs[i].value(i);
    bot_imgs[i].hide();
    bot_imgs[i].mouseOver(selec);
    bot_imgs[i].mouseOut(noSelec);

    bot_imgs[i].style("margin-left", -40);
    bot_imgs[i].style("margin-top", -30);
    // imgs[i] = img;

    append(bot_imgs, bot_imgs[i]);
  }



  carregar_descricoes();




   link.position(width-130,10);
  link.size(40,40);
   link.value(8);

   link.mousePressed(abrir_janela);

   insta.position(width-80,10);
   insta.size(40,40);
   insta.value(9);

   insta.mousePressed(abrir_janela);

   video_atual = createDiv("");


}




function draw() {
//console.log(timer_texto);

    insta.position(width-80,10);
    link.position(width-130,10);

  background(255);


  //image(img,0,0);
  if (estado==0) {
    fill(0);
    rect(width/2, height/2, width, height);

    fill(255);

    rect(width/2, rec_pos, 10+(rec_tam*1.2), 10+rec_tam);

    if (rec_pos < height/2) {
      rec_pos = rec_pos + 5;
    } else {


      if (rec_tam<width) {
        rec_tam = rec_tam + 20;
      }

      fill(0);
      noStroke();
      //textFont(intro, 100);
      textSize(200);
      textAlign(CENTER, CENTER);
      if (tempo_texto <= 80) {
        texto_intro = "DATA";
      } else if (tempo_texto > 80 && tempo_texto <= 110) {
        texto_intro = "IS";
      } else if (tempo_texto > 110 && tempo_texto <= 140) {
        texto_intro = "BEAUTIFULL";
      } else if (tempo_texto > 140 && tempo_texto <= 190) {
        texto_intro = "DBLab";
      } else {
        estado = 2;

        projetos.show();
    sobre.show();
      }


      text(texto_intro, width/2, height/2);

      tempo_texto++;
    }
  } else if (estado==1) {







/*
    var tam_X_ret_men = 80;
    var tam_Y_ret_men = 40;

    var tam_X_ret_mai = width/1.5;
    var tam_Y_ret_mai = height/1.5;

  */



    for (var i = 1; i <= num; i++) {

      // buttons[i].show();
      bot_imgs[i].show();

      if (i<=num/2) {
        var a = map(i, 0, num/2, 0.1, 0.6);
        bot_imgs[i].position(width/3, (height/2));
      } else {
        var a = map(i, 0, num/2, 0.1, 0.6);
        bot_imgs[i].position(width/1.5, (height/2));
      }


      // buttons[i].position(width/3,(height/2));

      bot_imgs[i].style("translate", height/4, height/4);

      bot_imgs[i].style("rotate", (360*a));
      bot_imgs[i].attribute("rotate", "center");
    }

    if (n!=null) {

      ver_video.position((width/2)-85, height/1.15);


      imageMode(CENTER);

      for (var i = 1; i <= num; i++) {
        if(i == n){
           bot_imgs[i].style("opacity", 1);
        } else {
           bot_imgs[i].style("opacity", 0.3);
        }

      }

      if ( pos_img  > height/2) {
        pos_img = pos_img - 30;
      } else {
        pos_img = height/2;
      }

      var b = map(pos_img, height, height/2, 0, 150);
      var d = map(pos_img, height, height/2, 0, 255);
      tint(255, d);
      image(imgs[n], width/2, pos_img, width/4 + b, width/4 + b);
      tint(255, 255);

      if(timer_texto < 100){
        if( contar_tempo){
       timer_texto++;
        }
      } else {
        contar_tempo = false;
      }

      if( timer_texto > 50){



        var transp = map(timer_texto,50,100,0,200);

     fill(255, transp);
     ellipse(width/2, height/2, width/4 + b, width/4 + b);

       fill(0);
      noStroke();
       textFont("Helvetica", 20);
        textSize(20);
      textAlign(CENTER, CENTER);
      text(proj_textos[n], width/2, height/2, width/4, width/4);
      }



      //if (show_descricao) {
        fill(0);
        //strokeWeight(1);
        noStroke(0);
        textFont("Helvetica", 20);
        textSize(20);
          textAlign(CENTER, CENTER);
          text( proj_titulos[n], width/2, height/7, 300, 100);

     // }
     // strokeWeight(1);


    } else {
      fill(0, 50);
      noStroke();
      textFont("Helvetica", 25);
        textSize(25);
      textAlign(CENTER, BOTTOM);
      text("Escolha", width/2, height/2);
      text("um projeto.", width/2, (height/2) + 25);
    }




  //SOBRE



  } else if (estado==2) {

    n = null;




     link.show();
     insta.show();




    for (var i = 1; i <= num; i++) {
      bot_imgs[i].hide();
    }


    imageMode(CENTER);
    image(rosto, width/2, height/2, width/3.7, width/3.7);

    tam_fonte = map(width, 500, 1920,14,17);
    //for(var i = 0; i < descricao.length; i++){
    fill(0);
    noStroke();
    textFont("Helvetica", 17);
    textSize(tam_fonte);
    textAlign(CENTER,CENTER);
    text(descricao, width/5.5, height/2, width/3.5, height+200);

     textSize(17);
    // textAlign(CENTER);
     text("Sócio-Fundador da Goga Tecnologia", width/1.25, height/2.3);
     text("Inventor do Holotab", width/1.25, height/1.8);
    //}
  } else if (estado==3) {

  //VIDEO GALERI


     //n = null;



  video_atual.show();
  //video_atual.position((width/2)-320,(height/2)-200);
  video_atual.position((width/2),height/2);

  fill(0, 50);
      noStroke();
      textFont("Helvetica", 25);
        textSize(25);
      textAlign(CENTER, BOTTOM);
      text("loading...", width/2, height/2);
     // text("um projeto.", width/2, (height/2) + 25);

   }

console.log(n);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
/*
function keyPressed() {

  if (keyCode = ENTER) {
    estado = 1;
  }
}
*/

function menu_superior () {

  estado = this.value();

    ver_video.hide();

   video_atual.hide();
    video_atual.remove();

}




  function muda_botao(){

    if(this.value()==3){
 ver_video.style("border", color(0,100));
  ver_video.style("background-color", color(240,150));
    }   else if (this.value() == 1) {
      projetos.style("border", color(0,100));
  projetos.style("background-color", color(240,150));
    } else if (this.value()==2){
      sobre.style("border", color(0,100));
  sobre.style("background-color", color(240,150));
    }

  }

   function desmuda_botao(){
     if(this.value()==3){
 ver_video.style("border", color(0,0));
  ver_video.style("background-color", color(0,0));
   }   else if (this.value() == 1) {
       projetos.style("border", color(0,0));
  projetos.style("background-color", color(0,0));
    } else if (this.value()==2){
       sobre.style("border", color(0,0));
  sobre.style("background-color", color(0,0));
    }

  }


function assistir() {

  //ver_video.hide();
  n = this.value();


  video_atual = createDiv(video_links[n]);
  //video_atual.attribute("align","center");


   estado = 3;

}


function abrir_janela(){
 if(this.value() == 8){
    window.open("https://br.linkedin.com/in/jos%C3%A9-rodolfo-masiero-161a8131");
  } else if(this.value() == 9){
    window.open("https://www.instagram.com/jrmasiero/");
  }


}


function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
