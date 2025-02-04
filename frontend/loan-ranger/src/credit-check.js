/*
PH = Payment History (on-time payments percentage, weighted heavily)
CU = Credit Utilization Ratio (total credit used / total credit limit, inversely proportional)
LCH = Length of Credit History (average account age and age of oldest account)
CM = Credit Mix (diversity of credit types, higher diversity = better score)
RI = Recent Inquiries (number of hard credit inquiries, inversely proportional)
AA = Active Accounts (number of active, well-maintained accounts)
N = Negative Records Penalty (defaults, bankruptcies, accounts in collections)
*/

/* weights assoicated with specfic paramater we will define these*/

/*CreditScore=(0.35⋅95)+(0.30⋅(100−25))+(0.15⋅10)+(0.10⋅3)+(0.10⋅(10−2))+(0.05⋅5)−50
CreditScore=33.25+22.5+1.5+0.3+0.8+0.25−50=108.6*/


/* FinalCreditScore=Min+( RawMax−RawMin / RawScore−RawMin)⋅(Max−Min)*/

// calculating the payement history

async function fetchCreditData(userId) {
    try {
        const response = await fetch(`/credit/getCreditScore/${userId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch credit data: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Fetched credit data:", data);
        return data.data; // Return the `data` field from the response
    } catch (error) {
        console.error("Error fetching credit data:", error);
        throw error;
    }
}

async function fetchCreditHistory(userId) {
    try {
        const response = await fetch(`/users/getCreditHistory/${userId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch credit history: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Fetched credit history:", data);
        return data; // Directly return the array from the response
    } catch (error) {
        console.error("Error fetching credit history:", error);
        throw error;
    }
}

export async function calculateCreditScoreFromAPI(userId) {
    try {
        // Fetch data from the APIs
        const creditData = await fetchCreditData(userId);
        const creditHistory = await fetchCreditHistory(userId);

        console.log("Calculating credit score with fetched data:");
        console.log("Credit Data:", creditData);
        console.log("Credit History:", creditHistory);

        // Validate the structure of creditHistory
        if (!Array.isArray(creditHistory)) {
            throw new Error("Invalid credit history format: Expected an array.");
        }

        // Map the data to match what `calculateCreditScore` expects
        const transactions = creditHistory.map(transaction => ({
            payment_status: transaction.payment_status,
            outstanding_balance: transaction.outstanding_balance,
            amount: transaction.amount,
            interest_rate: transaction.interest_rate,
        }));

        // Call `calculateCreditScore` using the mapped data
        const finalScore = calculateCreditScore(
            transactions, // Transactions array
            creditData.totalCreditUsed,
            creditData.totalCreditLimit,
            creditData.accountAges,
            creditData.accountTypes,
            creditData.hardInquiries,
            creditData.activeAccounts,
            creditData.negativeRecords
        );

        console.log("Final calculated credit score:", finalScore);
        return finalScore;
    } catch (error) {
        console.error("Error calculating credit score from API:", error);
        throw error;
    }
}




function calculatePaymentHistory(transactions) {
    let onTimePayments = 0;
    let totalPayments = 0;
    let totalAmountPaid = 0;
    let totalOutstandingBalance = 0;
    let totalInterestRate = 0;

    console.log("Input to calculatePaymentHistory:", transactions);
    if (!transactions || !Array.isArray(transactions)) {
        throw new Error("Invalid transactions data. Expected an array.");
    }

    transactions.forEach(transaction => {
        // Count on-time payments
        if (transaction.payment_status === "On Time") {
            onTimePayments++;
        }

        // Count total payments
        totalPayments++;

        // Sum total payment amounts
        totalAmountPaid += transaction.amount || 0;

        // Sum outstanding balances
        totalOutstandingBalance += transaction.outstanding_balance || 0;

        // Sum interest rates
        totalInterestRate += transaction.interest_rate || 0;
    });

    // Calculate metrics
    const paymentHistoryScore = (onTimePayments / totalPayments) * 100; // On-time payment percentage
    const averageOutstandingBalance = totalOutstandingBalance / totalPayments; // Average balance
    const averageInterestRate = totalInterestRate / totalPayments; // Average interest rate

    // Normalize metrics to percentages
    const normalizedBalanceScore = 100 - Math.min((averageOutstandingBalance / 10000) * 100, 100); // Lower is better
    const normalizedInterestRateScore = 100 - Math.min((averageInterestRate / 20) * 100, 100); // Lower is better

    // Weights for metrics
    const weights = {
        paymentHistoryScore: 0.5,  // 50% weight
        normalizedBalanceScore: 0.2, // 20% weight
        normalizedInterestRateScore: 0.2, // 20% weight
    };

    // Calculate final Payment History percentage
    const finalPH = (
        (paymentHistoryScore * weights.paymentHistoryScore) +
        (normalizedBalanceScore * weights.normalizedBalanceScore) +
        (normalizedInterestRateScore * weights.normalizedInterestRateScore) 
    );

    return finalPH.toFixed(2); // Return as a percentage rounded to two decimals
}

function calculateCreditUtilization(totalCreditUsed, totalCreditLimit) {
    if (totalCreditLimit === 0) {
        throw new Error("Total credit limit cannot be zero."); // Handle division by zero
    }

    // Calculate Credit Utilization Ratio
    const utilizationRatio = (totalCreditUsed / totalCreditLimit) * 100;

    // Normalize CU score: Lower utilization is better
    const normalizedCUScore = 100 - Math.min(utilizationRatio, 100);

    return normalizedCUScore.toFixed(2); // Return normalized CU score as a percentage
}

function calculateLengthOfCreditHistory(accountAges) {
    if (!Array.isArray(accountAges) || accountAges.length === 0) {
        throw new Error("Account ages must be a non-empty array.");
    }

    // Calculate the average account age
    const totalAccountAge = accountAges.reduce((sum, age) => sum + age, 0);
    const averageAccountAge = totalAccountAge / accountAges.length;

    // Find the age of the oldest account
    const oldestAccountAge = Math.max(...accountAges);

    // Normalize LCH score: Higher values are better
    const normalizedLCHScore = (averageAccountAge * 0.5) + (oldestAccountAge * 0.5);

    return normalizedLCHScore.toFixed(2); // Return LCH score as a percentage
}

function calculateCreditMix(accountTypes) {
    if (!Array.isArray(accountTypes) || accountTypes.length === 0) {
        throw new Error("Account types must be a non-empty array.");
    }

    // Define the weight for each credit type (adjustable based on importance)
    const creditTypeWeights = {
        "credit_card": 1.0, // Credit cards
        "mortgage": 1.5,    // Mortgages
        "auto_loan": 1.2,   // Auto loans
        "personal_loan": 1.0, // Personal loans
        "student_loan": 1.0, // Student loans
        "home_equity_loan": 1.3, // Home equity loans
        "retail_account": 0.8 // Retail accounts (store credit)
    };

    // Count occurrences of each credit type in the user's accounts
    const accountTypeCount = accountTypes.reduce((counts, type) => {
        if (creditTypeWeights[type]) {
            counts[type] = (counts[type] || 0) + 1;
        }
        return counts;
    }, {});

    // Calculate the total diversity score
    let totalScore = 0;
    Object.keys(accountTypeCount).forEach(type => {
        totalScore += creditTypeWeights[type];
    });

    // Normalize CM score: Higher diversity = better score, capped at 100
    const normalizedCMScore = Math.min((totalScore / Object.keys(creditTypeWeights).length) * 100, 100);

    return normalizedCMScore.toFixed(2); // Return CM score as a percentage
}

function calculateRecentInquiriesScore(hardInquiries, maxAllowedInquiries = 10) {
    if (typeof hardInquiries !== "number" || hardInquiries < 0) {
        throw new Error("The number of hard inquiries must be a non-negative number.");
    }

    // Normalize RI score: Fewer inquiries result in a higher score
    const normalizedRIScore = Math.max(0, ((maxAllowedInquiries - hardInquiries) / maxAllowedInquiries) * 100);

    return normalizedRIScore.toFixed(2); // Return RI score as a percentage
}

function calculateActiveAccountsScore(activeAccounts, maxIdealAccounts = 10) {
    if (typeof activeAccounts !== "number" || activeAccounts < 0) {
        throw new Error("The number of active accounts must be a non-negative number.");
    }

    // Normalize AA score: More active accounts (up to the ideal max) result in a higher score
    const normalizedAAScore = Math.min((activeAccounts / maxIdealAccounts) * 100, 100);

    return normalizedAAScore.toFixed(2); // Return AA score as a percentage
}

function calculateNegativeRecordsPenalty(negativeRecords, penaltyWeights = { defaults: 20, bankruptcies: 50, collections: 15 }) {
    if (!negativeRecords || typeof negativeRecords !== "object") {
        throw new Error("Negative records must be provided as an object.");
    }

    const { defaults = 0, bankruptcies = 0, collections = 0 } = negativeRecords;

    if (defaults < 0 || bankruptcies < 0 || collections < 0) {
        throw new Error("Negative record counts must be non-negative numbers.");
    }

    // Calculate the total penalty based on weights
    const totalPenalty =
        (defaults * penaltyWeights.defaults) +
        (bankruptcies * penaltyWeights.bankruptcies) +
        (collections * penaltyWeights.collections);

    return totalPenalty; // Return total penalty as a negative value
}

export function calculateCreditScore(transactions, totalCreditUsed, totalCreditLimit, accountAges, accountTypes, hardInquiries, activeAccounts, negativeRecords) {
    // Calculate Payment History (PH)
    const PH = calculatePaymentHistory(transactions);

    // Calculate Credit Utilization (CU)
    const CU = calculateCreditUtilization(totalCreditUsed, totalCreditLimit);

    // Calculate Length of Credit History (LCH)
    const LCH = calculateLengthOfCreditHistory(accountAges);

    // Calculate Credit Mix (CM)
    const CM = calculateCreditMix(accountTypes);

    // Calculate Recent Inquiries Score (RI)
    const RI = calculateRecentInquiriesScore(hardInquiries);

    // Calculate Active Accounts Score (AA)
    const AA = calculateActiveAccountsScore(activeAccounts);

    // Calculate Negative Records Penalty (N)
    const N = calculateNegativeRecordsPenalty(negativeRecords);

    // Weights for each parameter
    const weights = {
        PH: 0.35, // Payment History (35%)
        CU: 0.30, // Credit Utilization (30%)
        LCH: 0.15, // Length of Credit History (15%)
        CM: 0.10, // Credit Mix (10%)
        RI: 0.10, // Recent Inquiries (10%)
        AA: 0.05  // Active Accounts (5%)
    };

    // Calculate the raw score
    const rawScore = (weights.PH * PH) +
                     (weights.CU * CU) +
                     (weights.LCH * LCH) +
                     (weights.CM * CM) +
                     (weights.RI * RI) +
                     (weights.AA * AA) - N;

    // Normalize raw score to the final credit score range (300-850)
    const minScore = 300; // Minimum credit score
    const maxScore = 850; // Maximum credit score
    const rawMin = 0;     // Minimum possible raw score
    const rawMax = 100;   // Maximum possible raw score

    const finalCreditScore = minScore + ((rawScore - rawMin) / (rawMax - rawMin)) * (maxScore - minScore);

    return finalCreditScore.toFixed(2); // Return the final credit score rounded to two decimals
}


