// ROI Calculator Logic
document.getElementById('roiCalculatorForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const location = document.getElementById('location').value;
    const billType = document.getElementById('billType').value;
    const billAmount = parseFloat(document.getElementById('billAmount').value);
    const roofArea = parseFloat(document.getElementById('roofArea').value);
    const systemCapacity = parseInt(document.getElementById('systemCapacity').value);
    
    // Calculate savings (simplified calculation)
    let solarCost, savings;
    
    // Adjust savings based on bill type
    if (billType === 'summer') {
        solarCost = billAmount * 0.25; // 75% savings in summer
    } else if (billType === 'winter') {
        solarCost = billAmount * 0.35; // 65% savings in winter
    } else {
        solarCost = billAmount * 0.30; // 70% savings on average
    }
    
    // Adjust based on location (some cities get more sun)
    const locationFactors = {
        'delhi': 1.1,
        'mumbai': 1.0,
        'bangalore': 0.95,
        'hyderabad': 1.05,
        'chennai': 1.0,
        'kolkata': 0.9,
        'pune': 0.95,
        'ahmedabad': 1.1,
        'jaipur': 1.15,
        'lucknow': 1.0
    };
    
    solarCost = solarCost / locationFactors[location];
    
    // Calculate subsidy amount
    const subsidyAmount = calculateSubsidy(systemCapacity);
    const monthlySubsidyBenefit = (subsidyAmount / 120); // Spread over 10 years
    
    // Apply subsidy to solar cost
    solarCost = Math.max(0, solarCost - monthlySubsidyBenefit);
    savings = billAmount - solarCost;
    
    // Update results
    document.getElementById('currentCost').textContent = '₹' + billAmount.toFixed(2);
    document.getElementById('solarCost').textContent = '₹' + solarCost.toFixed(2);
    document.getElementById('savings').textContent = '₹' + savings.toFixed(2);
    document.getElementById('annualSavings').textContent = '₹' + (savings * 12).toFixed(2);
    
    // Show results
    document.getElementById('roiResult').style.display = 'block';
    
    // Create chart
    createSavingsChart(billAmount, solarCost);
    
    // Scroll to results
    document.getElementById('roiResult').scrollIntoView({ behavior: 'smooth' });
});

function createSavingsChart(before, after) {
    const ctx = document.getElementById('savingsChart').getContext('2d');
    
    // Destroy previous chart if exists
    if (window.savingsChart) {
        window.savingsChart.destroy();
    }
    
    window.savingsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Before Solar', 'With Solar'],
            datasets: [{
                label: 'Monthly Cost (₹)',
                data: [before, after],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₹' + value;
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return '₹' + context.raw.toFixed(2);
                        }
                    }
                }
            }
        }
    });
}

// Government Subsidy Calculation
document.getElementById('systemCapacity')?.addEventListener('change', function() {
    const capacity = parseInt(this.value);
    const subsidyAmount = calculateSubsidy(capacity);
    
    // Update subsidy rate display
    document.getElementById('subsidyRate').value = `₹${subsidyAmount.toLocaleString('en-IN')}`;
    
    // If ROI is already calculated, update it with subsidy
    if (document.getElementById('roiResult')?.style.display === 'block') {
        updateROIWithSubsidy(subsidyAmount);
    }
});

function calculateSubsidy(capacity) {
    let subsidyAmount;
    
    if (capacity <= 3) {
        subsidyAmount = capacity * 14000;
    } else if (capacity <= 10) {
        subsidyAmount = (3 * 14000) + ((capacity - 3) * 7000);
    } else {
        subsidyAmount = 94000; // Max subsidy
    }
    
    return subsidyAmount;
}

function updateROIWithSubsidy(subsidyAmount) {
    // Get existing values
    const billAmount = parseFloat(document.getElementById('billAmount').value);
    const solarCostElement = document.getElementById('solarCost');
    const savingsElement = document.getElementById('savings');
    
    // Extract numeric value from solar cost (remove ₹ symbol)
    let solarCost = parseFloat(solarCostElement.textContent.replace('₹', ''));
    
    // Calculate monthly subsidy benefit (assuming 10 year system life)
    const monthlySubsidyBenefit = (subsidyAmount / 120); // Spread over 10 years
    
    // Adjust solar cost
    solarCost = Math.max(0, solarCost - monthlySubsidyBenefit);
    const savings = billAmount - solarCost;
    
    // Update displays
    solarCostElement.textContent = '₹' + solarCost.toFixed(2);
    savingsElement.textContent = '₹' + savings.toFixed(2);
    document.getElementById('annualSavings').textContent = '₹' + (savings * 12).toFixed(2);
    
    // Update chart
    const before = billAmount;
    const after = solarCost;
    createSavingsChart(before, after);
}
// Contact Form Submission

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Collect form data
    const formData = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      interest: document.getElementById('interest').value.trim(),
      message: document.getElementById('message').value.trim(),
    };

    // Check if name and email are provided
    if (!formData.name || !formData.email) {
      alert('Name and Email are required fields.');
      return;
    }

    // Send data to the backend
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to submit the form.');
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          alert('Thank you for contacting us!');
          contactForm.reset(); // Clear the form
        } else {
          alert('Failed to submit the form: ' + data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while submitting the form.');
      });
  });
});

// Backend API for Contact Form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, interest, message } = req.body;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and Email are required fields.',
      });
    }

    // Save the contact data to the database
    const newContact = await Contact.create({
      name: name,
      email: email,
      phone: phone || 'Not provided',
      interest: interest || 'General inquiry',
      message: message || 'No message provided',
    });

    console.log('📩 New contact saved:', newContact);

    // Send success response
    res.json({
      success: true,
      message: 'Thank you for contacting us!',
      data: newContact,
    });
  } catch (error) {
    console.error('❌ Contact submission error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request.',
    });
  }
});