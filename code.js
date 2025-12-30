const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const message=document.querySelector(".msg");
 

window.addEventListener("load",()=>{
   updateExchangeRate();


});
   
 

for(let select of dropdowns){
    for (currCode in  countryList ){
     let newOption=document.createElement("option");
     newOption.innerText=currCode; 
     newOption.value=currCode;
     if(select.name==="from" && currCode==="USD"){
        newOption.selected=true;
     }
     else if(select.name==="to" && currCode==="PKR"){
        newOption.selected=true;
     }
     select.append(newOption);
    }
select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);


});


};
const updateFlag=(element)=>{
  let currCode=element.value;
  let countryCode=countryList[currCode];
  let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png `;
  let image=element.parentElement.querySelector("img");
  image.src=newSrc;
  

};
 btn.addEventListener("click",  (evt)=>{
   evt.preventDefault();
   updateExchangeRate();
    
});
    

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;

  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const from = fromCurr.value.toLowerCase();
  const to = toCurr.value.toLowerCase();

  const url = `${BASE_URL}/${from}.json`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // ✅ Correct way to access rate
    const rate = data[from][to];  // FIXED: this is actually correct now

    if (!rate) {
      message.innerText = `❌ Exchange rate from ${from.toUpperCase()} to ${to.toUpperCase()} not available.`;
      return;
    }

    const finalAmount = (amtVal * rate).toFixed(2);

    message.innerText = `✅ ${amtVal} ${from.toUpperCase()} = ${finalAmount} ${to.toUpperCase()}`;
  } catch (error) {
    console.error("❌ Error fetching exchange rate:", error);
    message.innerText = `❌ Failed to get exchange rate.`;
  }
};