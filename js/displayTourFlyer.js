function showFlyer(displayTime, flyerContainer, interval){
  if(displayTime <= new Date()){
    flyerContainer.style.display='flex';
    clearInterval(interval);
  }
  console.log("Checked");
}

const displayTime = new Date('2025-11-18T09:00:00');
const flyerContainer = document.querySelector('.tour-flyer-container');
if(displayTime < new Date()){
  flyerContainer.style.display='flex';
}else{
  const interval = setInterval(()=>{
    showFlyer(displayTime, flyerContainer, interval);
  }, 60 * 1000);
}