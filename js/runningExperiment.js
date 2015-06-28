function showPriceOnPayment(productId,path,value, productName){
  var temp = JSON.parse(sessionStorage.getItem("product"+productId));
  var showPricesDialog = document.getElementById('showPricesDialog');
  showPricesDialog.showModal();

  document.getElementById('showPricesYesBTN').onclick = function() {    
    if((sessionStorage.getItem("wallet") - value) > 0){
      //Updating Wallet and setting product to be avilable
      window.open(path, '_blank');
      sessionStorage.setItem("wallet", (sessionStorage.getItem("wallet") - value).toFixed(2));
      document.getElementById("wallet").innerHTML = sessionStorage.getItem("wallet");

      temp["avilable"] = true;
      temp["paid_price"] = value;
      sessionStorage.setItem("product"+productId, JSON.stringify(temp));

      question["numOfProducts"]++;
      question["products"].push(temp);
      sessionStorage.setItem("question"+questionNum, JSON.stringify(question));

      document.getElementById('product'+productId).className = 'productBought';
    }
    else {
      notEnoughMoney();
    }  
    showPricesDialog.close();  
  };  
  document.getElementById('showPricesNoBTN').onclick = function() { 
    showPricesDialog.close();    
  };  
}

//Open negotiation is on
function openNegPop(productId, path, productName, value) {  

  var openNegotiationDialog = document.getElementById('openNegotiationDialog');
  openNegotiationDialog.showModal();
  
  document.getElementById('openNegotiationBidBTN').onclick = function() { 
    var price = document.getElementById('openNegotiationPrice').value;
    if (price === ""){console.log("price is empty");}

    else{
      if (price !== null) {
        if((sessionStorage.getItem("wallet") - price) > 0)
        {
          //Updating wallet and setting product to be avilabe
          window.open(path, '_blank');
          sessionStorage.setItem("wallet", (sessionStorage.getItem("wallet") - price).toFixed(2));
          document.getElementById("wallet").innerHTML = sessionStorage.getItem("wallet");

          var temp = JSON.parse(sessionStorage.getItem("product"+productId));
          temp["avilable"] = true;
          temp["subjective_price"] = price;
          temp["paid_price"] = price;

          sessionStorage.setItem("product"+productId, JSON.stringify(temp));

          question["products"].push(temp);
          question["numOfProducts"]++;
          sessionStorage.setItem("question"+questionNum, JSON.stringify(question));

          document.getElementById('product'+productId).className = 'productBought';

        }
        else {
          notEnoughMoney();
        }
      }
      else {}
    }
    openNegotiationDialog.close();    
  };

  document.getElementById('openNegotiationCancelBTN').onclick = function() {   
    openNegotiationDialog.close();    
  };  
  document.getElementById('openNegotiationPrice').value = "";
}

//Open negotiation off + use min price on
function useMinPriceOn(productId, path, value, productName, max_tries){
  console.log("useMinPriceOn");
  var count = max_tries;
  var done = false;
  var tempProduct;

  if (count == 0 && done == false)
  {
    document.getElementById('useMinimumOnPrice').value = "";
    document.getElementById('sg_NextButton').click();
  }

  var useMinimumOnDialog = document.getElementById('useMinimumOnDialog');
  useMinimumOnDialog.showModal();

  document.getElementById('useMinimumOnBidBTN').onclick = function() {
    var price = document.getElementById('useMinimumOnPrice').value;
    if (price =="") {
      console.log("Price empty");
    }
    else {
      if (price !== null) {
        if(price >= value) {
            if((sessionStorage.getItem("wallet") - value) > 0)
            {
              //Updating wallet and setting product to be avilabe
              window.open(path, '_blank');
              sessionStorage.setItem("wallet", (sessionStorage.getItem("wallet") - value).toFixed(2));
              document.getElementById("wallet").innerHTML = sessionStorage.getItem("wallet");

              tempProduct = JSON.parse(sessionStorage.getItem("product"+productId));
              tempProduct["avilable"] = true;
              tempProduct["subjective_price"].push(price);
              tempProduct["paid_price"] = value;

              sessionStorage.setItem("product"+productId, JSON.stringify(tempProduct));
                                    
              question["numOfProducts"]++;
              question["products"].push(tempProduct);
              sessionStorage.setItem("question"+questionNum, JSON.stringify(question));
              done = true;

              document.getElementById('product'+productId).className = 'productBought';

              document.getElementById('useMinimumOnPrice').value = "";
              useMinimumOnDialog.close(); 
            }
            else {
              notEnoughMoney();
            }
        }
        else {
          count--;
          useMinimumOnDialog.close(); 
          
          tempProduct = JSON.parse(sessionStorage.getItem("product"+productId));
          tempProduct["subjective_price"].push(price);

          sessionStorage.setItem("product"+productId, JSON.stringify(tempProduct));
          
          useMinPriceOn(productId, path, value, productName, count);
          priceLow();
        }
      }
      else {}
    }
  };

  document.getElementById('useMinimumOnCancelBTN').onclick = function() {   
    useMinimumOnDialog.close();    
  };  

  
  document.getElementById('useMinimumOnPrice').value = "";
}

function useMinPriceOff(productId, path, value, productName, max_tries){
  console.log("useMinPriceOn");
  var count = max_tries;
  var done = false;
  var tempProduct;

  if (count == 0 && done == false)
  {
    document.getElementById('useMinimumOffPrice').value = "";
    document.getElementById('sg_NextButton').click();
  }

  var useMinimumOffDialog = document.getElementById('useMinimumOffDialog');
  useMinimumOffDialog.showModal();

  document.getElementById('useMinimumOffBidBTN').onclick = function() {
    var price = document.getElementById('useMinimumOffPrice').value;
    if (price =="") {
      console.log("Price empty");
    }
    else {
      if (price !== null) {
        if(price >= value) {
            if((sessionStorage.getItem("wallet") - value) > 0)
            {
              //Updating wallet and setting product to be avilabe
              window.open(path, '_blank');
              sessionStorage.setItem("wallet", (sessionStorage.getItem("wallet") - price).toFixed(2));
              document.getElementById("wallet").innerHTML = sessionStorage.getItem("wallet");

              tempProduct = JSON.parse(sessionStorage.getItem("product"+productId));
              tempProduct["avilable"] = true;
              tempProduct["subjective_price"].push(price);
              tempProduct["paid_price"] = value;

              sessionStorage.setItem("product"+productId, JSON.stringify(tempProduct));
                                    
              question["numOfProducts"]++;
              question["products"].push(tempProduct);
              sessionStorage.setItem("question"+questionNum, JSON.stringify(question));
              done = true;

              document.getElementById('product'+productId).className = 'productBought';

              document.getElementById('useMinimumOffPrice').value = "";
              useMinimumOffDialog.close(); 
            }
            else {
              notEnoughMoney();
            }
        }
        else {
          count--;
          useMinimumOffDialog.close(); 
          
          tempProduct = JSON.parse(sessionStorage.getItem("product"+productId));
          tempProduct["subjective_price"].push(price);

          sessionStorage.setItem("product"+productId, JSON.stringify(tempProduct));
          
          useMinPriceOff(productId, path, value, productName, count);
          priceLow();
        }
      }
      else {}
    }
  };

  document.getElementById('useMinimumOffCancelBTN').onclick = function() {   
    useMinimumOffDialog.close();    
  };  

  document.getElementById('useMinimumOffPrice').value = "";
}

