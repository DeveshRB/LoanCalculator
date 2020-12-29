const load = document.getElementById('loading');
const result = document.getElementById('results');

// Submit loan calculator
document.getElementById('loan-form').addEventListener('submit', function(e){


    load.style.display = 'block';
    result.style.display = 'none';

    setTimeout(calculateResults, 2000);

    

    e.preventDefault();
});

// Get UI elements
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');



function calculateResults(){

    
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
    result.style.display = 'block';
    load.style.display = 'none';
  } else {
    showError('Please check your numbers');

    setInterval(function(){
        document.querySelector('.alert').remove();
    },3000);
  }

}


function showError(error){
    result.style.display = 'none';
    load.style.display = 'none';
    // create class
    const errorDiv  = document.createElement('div');

    // vars
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    
    // Add class 
    errorDiv.className = "alert alert-danger";

    // create text node
    errorDiv.appendChild(document.createTextNode(error));

    // insert div above heading
    card.insertBefore(errorDiv, heading);
}

