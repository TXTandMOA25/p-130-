
//draw function

songleft = "";
extra="";
songright = "" ;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist=0;
scoreRightWrist=0;
status="";

function preload(){
    songleft = loadSound("jungle.mp3");
    songright = loadSound("Seizure.mps");
}

function setup(){
 canvas = createCanvas(600, 500);
 canvas.center();

 video = createCapture(VIDEO);
 video.hide();

 poseNet = ml5.poseNet(video, modelLoaded);
 poseNet.on('pose', gotPoses);

}

function modelLoaded(){
    console.log('PoseNet Is Initialized');
}

function play(){
    songleft.play();
    songleft.setVolume(1);
    songleft.rate(1);
    songright.play();
    songright.setVolume(1);
    songright.rate(1);
}

function gotPoses(results){
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log( "scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);
       
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill("#fc2323");
    stroke("#000000");

    songleft_status = songleft.isPlaying();
    songright_status = songright.isPlaying();
   if (scoreRightWrist > 0.2){
       circle(rightWristX, rightWristY, 20);
       songright.stop();

       if(songleft_status == false){
        songleft.play();
        document.getElementById("song").innerHTML = "Playing: Jungle";

   }

   }
   

   if (scoreLeftWrist > 0.2){
    circle(leftWristX, leftWristY, 20);
    songleft.stop();
    
    if(songright_status== false){
        songright.play();
        document.getElementById("song").innerHTML = "Playing: Seizure";
   
   }
}

}

    





















function rc(){
    
}