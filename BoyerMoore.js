let arg = process.argv;
let fs = require('fs');

let substr = fs.readFileSync(arg[2], "utf8");
let str = fs.readFileSync(arg[3], "utf8");

let lengthSubstr = substr.length;
let lengthStr = str.length;

let array = new Array();

for (let i = 0; i < substr.length - 1; i++)
    array[substr.charAt(i)] = i + 1;

let a = new Array();
let b = new Array();

for (let i = 0; i <= lengthSubstr; i++) {
	a[i] = lengthSubstr;
    b[i] = 0; 
}

let max1 = 0;
let max2 = 0;

for (let i = 1; i < lengthSubstr; i++) {
    if (i <= max2)
        b[i] = Math.min(max2 - i + 1, b[i - max1]);
    while (i + b[i] < lengthSubstr && substr.charAt(lengthSubstr - 1 - b[i]) == substr.charAt(lengthSubstr - 1 - (i + b[i])))
        b[i]++;
    if (i + b[i] - 1 > max2) {
        max1 = i;
        max2 = i + b[i] - 1;
    }
}

for (let i = lengthSubstr - 1; i > 0; i--)
    a[lengthSubstr - b[i]] = i;

let n = 0;
for (let i = 1; i <= lengthSubstr - 1; i++){
    if ((i + b[i]) == lengthSubstr){
        for (; n <= i; n++){
            if (a[n] == lengthSubstr) {
				a[n] = i;
			}
		}
	}	
}

let mass = new Array();
let res = new Array();
let i = 0;
let k = 0;

while (i <= lengthStr - lengthSubstr) {
    m = lengthSubstr - 1
    while (m >= k && str.charAt(i + m) == substr.charAt(m)) m--
    if (m < k) {
		k = lengthSubstr - a[0];
        res.push(i + 1);
        m = -1;
        i += a[0];
    } 
	else {
        k = 0
        if (!array[str.charAt(i + lengthSubstr - 1)])
            mass[str.charAt(i + m)] = 0;
        else
            mass[str.charAt(i + m)] = array[str.charAt(i + lengthSubstr - 1)];
        i = Math.max((i + a[m + 1]), (i + m + 1 - mass[str.charAt(i + m)]));
    }
}
console.log("count:" + res.length, "beggining: " + res);

//count - количество подстрок в строке
//beggining - начало подстроки в строке
//node BoyerMoore.js substr.txt str.txt