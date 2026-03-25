function showFlyer(displayTime, flyerContainer, interval){
  if(displayTime <= new Date()){
    flyerContainer.style.display='flex';
    clearInterval(interval);
  }
  console.log("Checked");
}

const displayTime = new Date('2026-03-25T10:00:00');
const flyerContainer = document.querySelector('.tour-flyer-container');
if(displayTime < new Date()){
  flyerContainer.style.display='flex';
}else{
  const interval = setInterval(()=>{
    showFlyer(displayTime, flyerContainer, interval);
  }, 60 * 1000);
}