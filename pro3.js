document.addEventListener("DOMContentLoaded", () => {
    const interestTypeSelect = document.getElementById("interest-type");
    const compoundFrequencyDiv = document.getElementById("compound-frequency-div");

    // Show/Hide compound frequency options based on interest type
    interestTypeSelect.addEventListener("change", () => {
        if (interestTypeSelect.value === "compound") {
            compoundFrequencyDiv.style.display = "block";
        } else {
            compoundFrequencyDiv.style.display = "none";
        }
    });
});

function calculateInterest() {
    // Get form values
    const principal = parseFloat(document.getElementById("principal").value);
    const rate = parseFloat(document.getElementById("rate").value);
    const rateType = document.getElementById("rate-type").value;
    const startDate = new Date(document.getElementById("start-date").value);
    const endDate = new Date(document.getElementById("end-date").value);
    const interestType = document.getElementById("interest-type").value;

    // Calculate the time difference
    const timeDiff = endDate - startDate;
    const days = timeDiff / (1000 * 60 * 60 * 24);
    const months = days / 30.4375;
    const years = days / 365.25;

    let effectiveRate = rate;
    if (rateType === "monthly") {
        effectiveRate = rate * 12; // Convert monthly rate to annual rate
    }

    let interest = 0;

    if (interestType === "simple") {
        interest = principal * (effectiveRate / 100) * years;
    } else if (interestType === "compound") {
        const compoundFrequency = document.getElementById("compound-frequency").value;
        let n;
        switch (compoundFrequency) {
            case "annually":
                n = 1;
                break;
            case "semiannually":
                n = 2;
                break;
            case "quarterly":
                n = 4;
                break;
            case "monthly":
                n = 12;
                break;
            case "daily":
                n = 365;
                break;
        }
        interest = principal * (Math.pow((1 + (effectiveRate / 100) / n), n * years) - 1);
    }

    // Display the result
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `
        <h3>Results</h3>
        <p>Principal Amount: ${principal.toFixed(2)}</p>
        <p>Interest Rate: ${effectiveRate.toFixed(2)}% (${rateType})</p>
        <p>Time Period: ${days.toFixed(0)} days (${months.toFixed(2)} months or ${years.toFixed(2)} years)</p>
        <p>Total Interest: ${interest.toFixed(2)}</p>
        <p>Total Amount: ${(principal + interest).toFixed(2)}</p>
    `;
}
