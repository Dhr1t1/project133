status="";
results=[];
label="";
confidence=0;
height=0;
width=0;
ob_x=0;
ob_y=0;
length_of_objects=0;

function preload(){
    img=loadImage('table.jpg');
}

function setup(){
    canvas=createCanvas(400,300);
    canvas.center();

    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded");
    status=true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    console.log("worked");
    length_of_objects=results.length;
    console.log(length_of_objects);
}

function draw(){
    image(img,0,0,400,300);
    if(status!=""){
        for(i=0;i<length_of_objects;i++){
            label=results[i].label;
            confidence=floor(results[i].confidence*100)+"%";
            text(label+" "+confidence,results[i].x+15,results[i].y+15);
            ob_x=results[i].x;
            ob_y=results[i].y;
            width=results[i].width;
            height=results[i].height;
            rect(ob_x,ob_y,width,height);
        }
    }
}