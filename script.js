const checkButton = document.getElementById("checkButton");
checkButton?.addEventListener("click", checkStrength);

// Function to handle button click event
function checkStrength() {
  const passwordInput = document.getElementById("password");
  const resultElement = document.getElementById("result");

  const password = passwordInput.value;
  const minSteps = strongPasswordChecker(password);

  resultElement.textContent = `Minimum steps required: ${minSteps}`;
}

// Function to calculate the minimum steps to make a password strong
function strongPasswordChecker(password) {
  const n = password.length;

  // Initialize variables to keep track of required modifications
  let insertions = 0;
  let deletions = 0;
  let replacements = 0;

  // Initialize variables to keep track of character types
  let hasLower = false;
  let hasUpper = false;
  let hasDigit = false;

  // Initialize variable to keep track of repeating characters
  let repeatCount = 0;

  for (let i = 0; i < n; ) {
    const currChar = password[i];
    let count = 0;

    // Count repeating characters
    while (i < n && password[i] === currChar) {
      i++;
      count++;
    }

    // Update character type flags
    if (/[a-z]/.test(currChar)) hasLower = true;
    if (/[A-Z]/.test(currChar)) hasUpper = true;
    if (/[0-9]/.test(currChar)) hasDigit = true;

    // Calculate replacements needed for repeating characters
    replacements += Math.floor(count / 3);
    repeatCount += Math.floor(count / 3);
  }

  const typesMissing =
    (hasLower ? 0 : 1) + (hasUpper ? 0 : 1) + (hasDigit ? 0 : 1);

  if (n < 6) {
    const diff = 6 - n;
    return Math.max(diff, typesMissing);
  } else {
    if (n > 20) {
      const deleteCount = n - 20;
      replacements -= Math.min(deleteCount, repeatCount);
      deletions = deleteCount;
    }
    return deletions + Math.max(typesMissing, replacements);
  }
}

var minimumDifference = function (nums) {
  let mid = Math.floor(nums.length / 2);
  let firstHalf = nums.slice(0, mid),
    secondHalf = nums.slice(mid);
  let firstHalfSum = firstHalf.reduce((a, c) => a + c);
  let secondHalfSum = secondHalf.reduce((a, c) => a + c);

  // Find all combinations of sums of subsets made up of k integers
  function sumK(arr, set, idx, sum, k) {
    if (k === 0) return set.add(sum);
    if (idx === arr.length) return;
    sumK(arr, set, idx + 1, sum, k);
    sumK(arr, set, idx + 1, sum + arr[idx], k - 1);
  }

  function populateArray(dp, arr, isFirstArray) {
    for (let i = 1; i <= arr.length; i++) {
      let set = new Set();
      sumK(arr, set, 0, 0, i);
      set = [...set.values()];
      if (!isFirstArray) {
        // Sort the secondDP array for binary searching
        set.sort((a, b) => a - b);
      }
      // i === a subset of i integers
      dp[i] = set;
    }
  }

  let firstDP = [[0]],
    secondDP = [[0]];
  populateArray(firstDP, firstHalf, true);
  populateArray(secondDP, secondHalf, false);

  let min = Infinity;
  // i === subset of length i
  for (let i = 1; i < firstDP.length; i++) {
    for (let num1 of firstDP[i]) {
      let remainingNum1 = firstHalfSum - num1;

      // i + remainingSubsetLen must equal length n since our goal is to create two arrays of length n
      let remainingSubsetLen = secondHalf.length - i;

      let l = 0,
        r = secondDP[remainingSubsetLen].length - 1;
      while (l <= r) {
        let mid = l + Math.floor((r - l) / 2);
        let num2 = secondDP[remainingSubsetLen][mid];
        let remainingNum2 = secondHalfSum - num2;
        // arr1Sum === sum of subsets of length n and arr2Sum === sum of subsets of length n
        // thereby creating two arrays of length n
        let arr1Sum = num1 + num2,
          arr2Sum = remainingNum1 + remainingNum2;
        if (arr1Sum === arr2Sum) return 0;

        min = Math.min(min, Math.abs(arr1Sum - arr2Sum));
        if (arr1Sum > arr2Sum) r = mid - 1;
        else l = mid + 1;
      }
    }
  }
  return min;
};

console.log(minimumDifference([3, 9, 7, 3]));
console.log(minimumDifference([-36, 36]));
console.log(minimumDifference([2, -1, 0, 4, -2, -9]));

module.exports = { strongPasswordChecker, minimumDifference };
