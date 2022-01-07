function setup() {
  canvas = createCanvas(300, 300);
  canvas.position(550,260) 
  video = createCapture(VIDEO);
  video.hide();
  classifier=ml5.imageClassifier('mobileNet', modelLoaded)
}

function modelLoaded() 
{
  console.log("model is loaded")
}

function draw()
{
  image(video,0,0,300,300)
  classifier.classify(video,gotResult)
}

previous_result="";

function gotResult(error,result)
{
  if(error)
  {
    console.error(error)
  }
  else
  {
    if((result[0].confidence>0.5)&&(previous_result!=result[0].label))
    {
      previous_result=result[0].label
      var synth=window.speechSynthesis
      speakData=" Object Detected Is " +result[0].label
      var utterThis=new SpeechSynthesisUtterance(speakData)
      synth.speak(utterThis)
      document.getElementById("e").innerHTML=result[0].label
      document.getElementById("r").innerHTML=result[0].confidence.toFixed(2)
    }
  }
}











