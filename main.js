song = "";


function preload() {
  song = loadSound("harry_potter_theme.mp3");
}

rightWristy = 0;
leftWristy = 0;
rightWristx = 0;
leftWristx = 0;
leftWristScore = 0
rightWristScore = 0

function setup() {

  canvas = createCanvas(600, 500);
  canvas.center();

  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('PoseNet Is Initialized!');
}


function gotPoses(results) {
  if (results.length > 0) {
    console.log(results);
    rightWristScore = result[0].pose.keypoints[10].score;
    console.log("Right wrist score = " + rightWristScore);
    leftWristScore = result[0].pose.keypoints[9].score;
    console.log("Left wrist score = " + leftWristScore);
    leftWristy = results[0].pose.leftWrists.y;
    rightWristy = results[0].pose.rightWrist.y;

    console.log("leftWristy  = " + floor(leftWristy) + " rightWristy = " + floor(rightWristy));
  }
}


function draw() {
  image(video, 600, 500);
  fill("#32CD32");
  stroke("#32CD32");


  if (rightWristScore > 0.2) {
    circle(rightWristx, rightWristy, 15)

    if (rightWristy > 0 && rightWristy >= 100) {
      document.getElementById(volume).innerHTML = "Speed: .5";
      rate = .5;
    }

    if (rightWristy > 100 && rightWristy >= 200) {
      document.getElementById(volume).innerHTML = "Speed: .5";
      rate = .5;
    }

    if (rightWristy > 200 && rightWristy >= 300) {
      document.getElementById(volume).innerHTML = "Speed: .5";
      rate = .5;
    }

    if (rightWristy > 300 && rightWristy >= 400) {
      document.getElementById(volume).innerHTML = "Speed: .5";
      rate = .5;
    }

    if (rightWristy > 400 && rightWristy >= 500) {
      document.getElementById(volume).innerHTML = "Speed: .5";
      rate = .5;
    }

  }

  if (leftWristScore > 0.2) {
    circle(leftWristx, leftWristy, 15)
    hi = leftWristy
    hello = floor(hi)
    volume = hello / 500

    document.getElementById("speed").innerHTML = "Volume: " + volume;
    song.setVolume(volume);

  }
}


function play() {
  song.play();
  song.setVolume(volume);
  song.rate(rate);
}


function stop() {
  song.stop();
}