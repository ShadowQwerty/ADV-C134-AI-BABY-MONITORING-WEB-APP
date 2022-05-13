var Wolf=""
var Flag=""
Objecto= [];
var R=0
var G=0
var B=0

//function preload() {
//Wolf=loadSound("Minecraft Wolf Death Sound 1 HOU.wav")
 //}

function setup() {
    CanV=createCanvas(380,380)
    CanV.center()
    Vid=createCapture(VIDEO);
    Vid.hide()
    Vid.size(380,380)
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("stat").innerHTML="Processing...."
}

function modelLoaded() {
   console.log("Ready Set GOOOOO") 
   Flag=true;
}

function gotResults(error,results) {
    if (error) {
        console.error(error)
    }
        console.log(results)
    Objecto=results;
}

function draw() {
    image(Vid,0,0,380,380)
    if (Flag != "") {
        R=random(255)
        G=random(255)
        B=random(255)
        objectDetector.detect(Vid,gotResults)
        for (var i = 0; i < Objecto.length; i++) {
            if (Objecto[i].label=="person") {
                document.getElementById("magic").innerHTML="Baby Found!! :)"
            } else {
                document.getElementById("magic").innerHTML="Baby Not Found!!! :("
                //Wolf.play()
               // Wolf.rate(2.5)
            }
            per=Math.floor(Objecto[i].confidence*100)
            document.getElementById("stat").innerHTML="Done!!!"
            fill(R,G,B)
            stroke(R,G,B)
            text(Objecto[i].label + per + "%",Objecto[i].x , Objecto[i].y)
            noFill()
            rect(Objecto[i].x,Objecto[i].y,Objecto[i].width,Objecto[i].height)
       
        }
    }

}
