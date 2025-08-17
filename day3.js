// ============================================================
// Creative Practice — Loops & Functions (Day 2)
// You now know: console.log, data types, string methods,
// arrays (no map/filter/forEach), objects (assign/create/keys/values),
// if / else if / else, logical operators (&&, ||, !),
// AND: while loops, for loops, functions with parameters.
// ------------------------------------------------------------
// Rules:
// - Prefer while / for loops. Do NOT use map/filter/forEach/reduce.
// - You may use: push/pop/shift/unshift/slice/splice/concat/indexOf/includes/sort
// - Use string methods (trim, toLowerCase, toUpperCase, includes, slice, split, etc.).
// - Keep each solution inside the function body marked with TODO.
// - Use the demo calls at the bottom to test your work.
// ============================================================


// ------------------------------------------------------------
// Task 1 — countVowels(str)
// Return how many vowels are inside str (a, e, i, o, u).
// Make it case-insensitive (e.g., "A" counts). Use a loop, no regex.
// ------------------------------------------------------------
function countVowels(str) {
    str = str.toLowerCase();
    const vowels = "aeiou";
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (vowels.includes(str[i])) {
            count++;
        }
    }
    return count;
}



// ------------------------------------------------------------
// Task 2 — invertCase(str)
// Build and return a new string where each letter changes case:
// 'Hello' -> 'hELLO'. Use a loop and string methods, not regex.
// ------------------------------------------------------------
function invertCase(str) {
    let result = "";
    for (let i = 0; i < str.length; i++) {
        const ch = str[i];
        if (ch === ch.toUpperCase() && ch !== ch.toLowerCase()) {
            result += ch.toLowerCase();
        } else if (ch === ch.toLowerCase() && ch !== ch.toUpperCase()) {
            result += ch.toUpperCase();
        } else {
            result += ch;
        }
    }
    return result;
}



// ------------------------------------------------------------
// Task 3 — uniqueMerge(a, b)
// Merge arrays a and b into a single array without duplicates,
// preserving the order of first appearance. No Set, no map/filter/forEach.
// ------------------------------------------------------------
function uniqueMerge(a, b) {
    const result = [];
    const combined = a.concat(b);
    for (let i = 0; i < combined.length; i++) {
        if (!result.includes(combined[i])) {
            result.push(combined[i]);
        }
    }
    return result;
}


// ------------------------------------------------------------
// Task 4 — findFirstIndexDivisibleBy(nums, x, y)
// Return the INDEX of the first number divisible by BOTH x and y.
// If none, return -1. Use a for loop and logical operators.
// ------------------------------------------------------------
function findFirstIndexDivisibleBy(nums, x, y) {
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] % x === 0 && nums[i] % y === 0) {
            return i;
        }
    }
    return -1;
}


// ------------------------------------------------------------
// Task 5 — allTruthy(values)
// Return true only if EVERY element in 'values' is truthy.
// Use a loop and logical operators (no .every).
// ------------------------------------------------------------
function allTruthy(values) {
    for (let i = 0; i < values.length; i++) {
        if (!values[i]) {
            return false;
        }
    }
    return true;
}



// ------------------------------------------------------------
// Task 6 — pickEveryNth(arr, n)
// Return a NEW array containing items at indices 0, n, 2n, 3n, ...
// Stop when you pass the end of the array. Use a for loop (step by n).
// ------------------------------------------------------------
function pickEveryNth(arr, n) {
    const result = [];
    for (let i = 0; i < arr.length; i += n) {
        result.push(arr[i]);
    }
    return result;
}


// ------------------------------------------------------------
// Task 7 — ticketPrice(customer)
// customer = { age, isStudent (bool), hasCoupon (bool) }
// Rules (in order):
//   1) If age < 6: price = 0
//   2) Else if age <= 18 OR isStudent is true: price = 8
//   3) Else if age >= 65: price = 6
//   4) Else: price = 12
// After that, if hasCoupon is true, subtract 2 (but not below 0).
// Return the final price.
// ------------------------------------------------------------
function ticketPrice(customer) {
    let price;
    if (customer.age < 6) {
        price = 0;
    } else if (customer.age <= 18 || customer.isStudent) {
        price = 8;
    } else if (customer.age >= 65) {
        price = 6;
    } else {
        price = 12;
    }
    if (customer.hasCoupon) {
        price -= 2;
    }
    return price < 0 ? 0 : price;
}


// ------------------------------------------------------------
// Task 8 — normalizeNames(names)
// Given an array of messy names, return a NEW array in the same order
// where each name is trimmed and converted to: First-letter uppercase + rest lowercase.
// Example: "   aMMaR massOUD " -> "Ammar massoud"
// Use loops + basic string methods. No map.
// ------------------------------------------------------------
function normalizeNames(names) {
    const result = [];
    for (let i = 0; i < names.length; i++) {
        let clean = names[i].trim().toLowerCase();
        if (clean.length > 0) {
            clean = clean[0].toUpperCase() + clean.slice(1);
        }
        result.push(clean);
    }
    return result;
}

// ------------------------------------------------------------
// Task 9 — buildProductCatalog(rawItems)
// rawItems: [{name:"Mouse", brand:"Logi", stock:10}, {name:"SSD", stock:0}, ...]
// Use Object.create to make each product inherit from 'productProto' below.
// productProto provides two methods:
//   - isAvailable(): returns true if this.stock > 0
//   - label(): returns (this.brand || "Generic") + " " + this.name
// Return an array of product instances. Use a loop (no map).
// ------------------------------------------------------------
const productProto = {
    isAvailable: function () { return this.stock > 0; },
    label: function () { return (this.brand || "Generic") + " " + this.name; }
};

function buildProductCatalog(rawItems) {
    const result = [];
    for (let i = 0; i < rawItems.length; i++) {
        const item = rawItems[i];
        const obj = Object.create(productProto);
        obj.name = item.name;
        obj.brand = item.brand;
        obj.stock = item.stock;
        result.push(obj);
    }
    return result;
}

// ------------------------------------------------------------
// Task 10 (while challenge) — sumUntilLimit(nums, limit)
// Add numbers from 'nums' in order using a WHILE loop until
// the running sum would EXCEED 'limit' — then stop and return the sum that
// does NOT exceed the limit. Example: nums=[5,7,4], limit=12 => 5+7=12 (stop) -> 12
// ------------------------------------------------------------
function sumUntilLimit(nums, limit) {
    let sum = 0;
    let i = 0;
    while (i < nums.length) {
        if (sum + nums[i] > limit) {
            break;
        }
        sum += nums[i];
        i++;
    }
    return sum;
}

// ------------------------------------------------------------
// Task 11 (logic puzzle) — safeLogin(user, policy)
// user = { email, password }
// policy = { minLen, mustIncludeNumber (bool), blockWord } // blockWord example: "password"
// Return true if ALL rules pass:
//   - password length >= minLen
//   - if mustIncludeNumber is true, password must contain any digit 0-9
//   - password lowercased DOES NOT include blockWord lowercased
// Use loops, string methods, and logical operators (no regex).
// ------------------------------------------------------------
function safeLogin(user, policy) {
    const pwd = user.password;
    if (pwd.length < policy.minLen) return false;

    if (policy.mustIncludeNumber) {
        let hasNumber = false;
        for (let i = 0; i < pwd.length; i++) {
            if ("0123456789".includes(pwd[i])) {
                hasNumber = true;
                break;
            }
        }
        if (!hasNumber) return false;
    }

    if (pwd.toLowerCase().includes(policy.blockWord.toLowerCase())) {
        return false;
    }

      return true;
}

// ============================================================
// DEMO CALLS (Uncomment to test as you solve)
// ============================================================

console.log("\n--- Task 1 ---");
console.log(countVowels("Ammar Massoud")); // expect > 0

console.log("\n--- Task 2 ---");
console.log(invertCase("HeLLo 123!")); // "hEllO 123!"

console.log("\n--- Task 3 ---");
console.log(uniqueMerge([1,2,3,2],[3,4,1,5])); // [1,2,3,4,5]

console.log("\n--- Task 4 ---");
console.log(findFirstIndexDivisibleBy([2,7,9,10,12,15,22], 3, 5)); // index of 15

console.log("\n--- Task 5 ---");
console.log(allTruthy([1, "x", {}, []])); // true
console.log(allTruthy([1, 0, "x"])); // false

console.log("\n--- Task 6 ---");
console.log(pickEveryNth(["a","b","c","d","e","f"], 2)); // ["a","c","e"]

console.log("\n--- Task 7 ---");
console.log(ticketPrice({ age: 4, isStudent: false, hasCoupon: false }));  // 0
console.log(ticketPrice({ age: 15, isStudent: false, hasCoupon: true }));  // 6
console.log(ticketPrice({ age: 20, isStudent: true, hasCoupon: true }));   // 6
console.log(ticketPrice({ age: 70, isStudent: false, hasCoupon: true }));  // 4
console.log(ticketPrice({ age: 30, isStudent: false, hasCoupon: true }));  // 10

console.log("\n--- Task 8 ---");
console.log(normalizeNames(["   aMMaR massOUD  ", " SARA ", "oMaR"]));

console.log("\n--- Task 9 ---");
const items = [
  { name: "Mouse", brand: "Logi", stock: 10 },
  { name: "SSD", stock: 0 },
  { name: "Keyboard", brand: "KeyCo", stock: 3 },
];
const catalog = buildProductCatalog(items);
console.log(catalog.map(p => ({ label: p.label(), available: p.isAvailable() })));

console.log("\n--- Task 10 ---");
console.log(sumUntilLimit([5, 7, 4], 12)); // 12
console.log(sumUntilLimit([6, 6, 6], 10)); // 6

console.log("\n--- Task 11 ---");
console.log(safeLogin(
  { email: "a@b.com", password: "He11oWorld" },
  { minLen: 8, mustIncludeNumber: true, blockWord: "password" }
)); // true
console.log("\n--- Task 12 ---");
console.log(safeLogin(
  { email: "a@b.com", password: "He11oWorld" },
  { minLen: 8, mustIncludeNumber: true, blockWord: "password" }
)); // true or false depending on rules

// ============================================================
// End — Have fun!
// ============================================================
