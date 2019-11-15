var ready = true;
var x = 0;
var y = 0;
var zielx = Math.floor(Math.random()*28)*20+20; //Eimer auf der x-Achse
var ziely = 440; //Eimer auf der y-Achse
var punkte = 0;

var gegenerspeed = 2;
var gegnerpositionen = [1, 10, 60, 100, 150, 296]; 
var gegnerbewegung = [2, 3, -2, 4, 5, 8];
console.log(gegnerpositionen);
$(document).ready(function()
{
        takt = window.setInterval(taktung, 50);

        var spielbrett = document.getElementById('leinwand');
        spielfeld = spielbrett.getContext('2d');

        var spielfigur = new Image();
        spielfigur.src = 'bilder/bat1.png';
        var batAnim = 1;
    

        spielfigur.onload=function()
        {
            spielfeld.drawImage(spielfigur,x,y);
        }

        function zeichneZielfeld() //Ziel
        {
            var zielfeld = new Image();
            zielfeld.src='bilder/eimer.png';
            zielfeld.onload=function() 
            {
                spielfeld.drawImage(zielfeld, zielx, ziely);
            }
        }
        zeichneZielfeld();
    
    	function zielfelderreicht()
        {
            //console.log("x: "+x+ "|Ziel x:"+ zielx);
            //console.log("y: "+y+ "|Ziel y:"+ ziely);

            if(x == zielx && y == ziely) {
                // Ziel erreicht!
                console.log("Ziel erreicht! Bei y:" + ziely);
                
                // neues Ziel erzeugen
                if (ziely == 440){
                    ziely = 80;
                }
                else if(ziely == 80){
                    ziely = 440;
                }
                zielx = Math.floor(Math.random()*28)*20+20; // x wechsel
                punkte++;
                $('#punktestand').html('Eimer gesammelt: ' + punkte);
                
                //Gegner bekommen alle 5 Eimer(bei Modulo 0) mehr Speed!
                if (punkte %5 == 0)
                    {
                        gegenerspeed++ ; 
                        $('#gegnerspeedaktuell').html('Gegner-Geschwindigkeit: ' + gegenerspeed);
                        console.log("GegnerSpeed: " + gegenerspeed);
                    }
                
                //Gegner kommt neu hinzu ab 8 Punkten.
                if(punkte == 8)
                    {
                        gegnerpositionen.push(298);
                        gegnerbewegung.push(9);
                    }
            }
        }
        
        function taktung()
        {
            //console.log('50 millisekunden');
            spielfeld.clearRect(0, 0, 600, 480); //Clear sonst bleibt Figur.
            zeichneZielfeld(); // Ziel Random auf Canvas setzen
            spielfeld.drawImage(spielfigur,x,y); //Bewegt sich zur Taktung.
            zielfelderreicht(); // Kollisionskontrolle Player und Ziel
            setzeGegner();
            kollisionspruefungGegner();
            
        }
    
        function setzeGegner() {
        for (nr = 0; nr < gegnerpositionen.length; nr++) {
                gegnerpositionen[nr] += gegnerbewegung[nr] * gegenerspeed ; //speed
            if (gegnerpositionen[nr] > 580 || gegnerpositionen[nr] < 0) {
                gegnerbewegung[nr] *= -1;
            }
            erzeugeGegner(gegnerpositionen[nr], 360-(nr*40));
            }
        }
    
        function erzeugeGegner(gx, gy) {
            var img = new Image();
            img.src = 'bilder/gegnerfigur.png';
            img.onload = function() {
                spielfeld.drawImage(img, gx, gy);
            }
        }
    
        function kollisionspruefungGegner() {
        for (nr = 0; nr < gegnerpositionen.length; nr++) {
            var ygeg = 360-(nr*40);
            if ( Math.abs(x - gegnerpositionen[nr]) < 20 && y == ygeg ) {
                // Zusammenstoß
                console.warn("Zusammenstoß");
                console.log( Math.abs(x - gegnerpositionen[nr]) );
                console.log( " | y: "+ y );
                console.log( " | y: "+ ygeg  + " berechnet ");
                
                kollisionGegner();
                
                }
            }
        }
    
        function kollisionGegner() {
            clearInterval(takt);
            $('#gameover').show();
            $('#gameover').html('Game Over Man. Neues Spiel = Seite Neu Laden. <p>Oder: <a href="regenwasser.html">Reload</a></p> Und BTW deine Eimer waren: <h3>' + punkte + '</h3>');
            ready = false;
            gegenerspeed = 2;
        }

    // Furchtbar schlechter Versuch zu ANIMIEREN:
        var Anim = setInterval(animTakt, 200);
        function animTakt(){
            if(batAnim == 1)
            {
                spielfigur.src = 'bilder/bat2.png';
                batAnim = 2;
            }
        }
    
        var Anim2 = setInterval(animTakt2, 330);
        function animTakt2(){
            if(batAnim == 2)
            {
                spielfigur.src = 'bilder/bat3.png';
                batAnim = 3;
            }
        }
    
        var Anim3 = setInterval(animTakt3, 440);
        function animTakt3(){
            if(batAnim == 3)
            {
                spielfigur.src = 'bilder/bat1.png';
                batAnim = 1;
            }
        }
    // OMG.
    
    //Steuerung:
        $(document).bind('keydown', function (evt) //Bewegen
        {
            if(ready == true){
                
            console.log("Tastaturcode: " + evt.keyCode);
            if(evt.keyCode == 37)
                {
                    console.log("LINKS");
                    x -= 20;
				    console.log("Wert x: "+x);
                    
                    if (x <= -20) {
				        x = 0;
                        console.info("WAND LINKS ERREICHT");
				    }
                }
            else if(evt.keyCode == 39)
                {
                    console.log("RECHTS");
                    x += 20;
				    console.log("Wert x: "+x);
                    
                    if (x >= 600) {
				        x = 580;
                        console.info("WAND RECHTS ERREICHT");
				    }
                }
            else if(evt.keyCode == 38)
                {
                    console.log("OBEN");
                    y -= 20;
				    console.log("Wert y: "+y);
                    
                    if (y <= -20) {
					   y = 0;
                        console.info("WAND OBEN ERREICHT");
				    }
                }
            else if(evt.keyCode == 40)
                {
                    console.log("UNTEN");
                    y += 20;
				    console.log("Wert y: "+y);
                    
                    if (y >= 480) {
					   y = 460;
                        console.info("WAND UNTEN ERREICHT");
				    }
                }
            }
            else{
                console.warn("game not ready! (or Over)");
            }
        });
    
    
});


