document.addEventListener("DOMContentLoaded", () => {
    const interestTypeSelect = document.getElementById("interest-type");
    const compoundFrequencyDiv = document.getElementById("compound-frequency-div");

    
    interestTypeSelect.addEventListener("change", () => {
        if (interestTypeSelect.value === "compound") {
            compoundFrequencyDiv.style.display = "block";
        } else {
            compoundFrequencyDiv.style.display = "none";
        }
    });
});

function calculateInterest() {
    const principal = document.getElementById("principal").value;
    const rate = document.getElementById("rate").value;
    const startDate = document.getElementById("start-date").value;
    const endDate = document.getElementById("end-date").value;

    // If any fields are empty, return and show no result
    if (!principal || !rate || !startDate || !endDate) {
        alert("Please fill in all the fields before calculating.");
        return;
    }

    // Get form values and proceed with the calculation if all fields are valid
    const rateType = document.getElementById("rate-type").value;
    const interestType = document.getElementById("interest-type").value;

    const principalValue = parseFloat(principal);
    const rateValue = parseFloat(rate);
    const start = new Date(startDate);
    const end = new Date(endDate);

    const timeDiff = end - start;
    const days = timeDiff / (1000 * 60 * 60 * 24);
    const months = days / 30.4375;
    const years = days / 365.25;

    let effectiveRate = rateValue;
    if (rateType === "monthly") {
        effectiveRate = rateValue * 12;
    }

    let interest = 0;
    if (interestType === "simple") {
        interest = principalValue * (effectiveRate / 100) * years;
    } else if (interestType === "compound") {
        const compoundFrequency = document.getElementById("compound-frequency").value;
        let n;
        switch (compoundFrequency) {
            case "annually": n = 1; break;
            case "semiannually": n = 2; break;
            case "quarterly": n = 4; break;
            case "monthly": n = 12; break;
            case "daily": n = 365; break;
        }
        interest = principalValue * (Math.pow((1 + (effectiveRate / 100) / n), n * years) - 1);
    }

    // Display the result
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `
        <h3>Results</h3>
        <p>Principal Amount: ${principalValue.toFixed(2)}</p>
        <p>Interest Rate: ${effectiveRate.toFixed(2)}% (${rateType})</p>
        <p>Time Period: ${days.toFixed(0)} days (${months.toFixed(2)} months or ${years.toFixed(2)} years)</p>
        <p>Total Interest: ${interest.toFixed(2)}</p>
        <p>Total Amount: ${(principalValue + interest).toFixed(2)}</p>
    `;
}
