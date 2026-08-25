// questions.js

const questions = [

  // ============================================================
  // QUANTITATIVE - 20 QUESTIONS
  // ============================================================

  {
    id: 1,
    category: "Quantitative",
    difficulty: "Easy",
    question: "A salary is increased by 20% and then decreased by 10%. What is the overall percentage change?",
    options: ["8% increase", "10% increase", "8% decrease", "2% increase"],
    answer: 0
  },

  {
    id: 2,
    category: "Quantitative",
    difficulty: "Medium",
    question: "The ratio of A:B is 3:5. If 24 is added to both, the ratio becomes 5:7. Find A and B.",
    options: [
      "36 and 60",
      "42 and 70",
      "30 and 50",
      "48 and 80"
    ],
    answer: 0
  },

  {
    id: 3,
    category: "Quantitative",
    difficulty: "Easy",
    question: "A product marked at ₹2,000 is sold at a 15% discount. What is the selling price?",
    options: ["₹1,600", "₹1,700", "₹1,750", "₹1,800"],
    answer: 1
  },

  {
    id: 4,
    category: "Quantitative",
    difficulty: "Medium",
    question: "The average age of 5 friends is 22 years. When a sixth friend joins, the average becomes 21. What is the sixth friend's age?",
    options: ["15 years", "16 years", "17 years", "18 years"],
    answer: 1
  },

  {
    id: 5,
    category: "Quantitative",
    difficulty: "Hard",
    question: "A train 180 m long crosses a platform 270 m long in 18 seconds. Find the speed of the train.",
    options: ["72 km/h", "80 km/h", "90 km/h", "100 km/h"],
    answer: 2
  },

  {
    id: 6,
    category: "Quantitative",
    difficulty: "Easy",
    question: "If 40% of a number is 72, what is the number?",
    options: ["160", "180", "200", "220"],
    answer: 1
  },

  {
    id: 7,
    category: "Quantitative",
    difficulty: "Medium",
    question: "A can complete a job in 12 days and B can complete it in 18 days. How many days will they take working together?",
    options: ["6 days", "7.2 days", "8 days", "9 days"],
    answer: 1
  },

  {
    id: 8,
    category: "Quantitative",
    difficulty: "Hard",
    question: "A shopkeeper marks an item 40% above cost price and gives a 15% discount. What is his profit percentage?",
    options: ["15%", "19%", "21%", "25%"],
    answer: 1
  },

  {
    id: 9,
    category: "Quantitative",
    difficulty: "Medium",
    question: "A sum becomes ₹13,310 in 3 years at 10% compound interest annually. Find the principal.",
    options: ["₹9,000", "₹10,000", "₹11,000", "₹12,000"],
    answer: 1
  },

  {
    id: 10,
    category: "Quantitative",
    difficulty: "Easy",
    question: "A car travels 240 km in 4 hours. What is its average speed?",
    options: ["50 km/h", "55 km/h", "60 km/h", "65 km/h"],
    answer: 2
  },

  {
    id: 11,
    category: "Quantitative",
    difficulty: "Hard",
    question: "Two numbers are in the ratio 4:7. If their difference is 51, find the larger number.",
    options: ["102", "119", "136", "153"],
    answer: 1
  },

  {
    id: 12,
    category: "Quantitative",
    difficulty: "Medium",
    question: "A person spends 75% of their income. If their income increases by 20% and expenditure increases by 10%, by what percentage does their saving increase?",
    options: ["40%", "50%", "60%", "70%"],
    answer: 2
  },

  {
    id: 13,
    category: "Quantitative",
    difficulty: "Easy",
    question: "What is the probability of getting an even number when a fair die is rolled once?",
    options: ["1/6", "1/3", "1/2", "2/3"],
    answer: 2
  },

  {
    id: 14,
    category: "Quantitative",
    difficulty: "Medium",
    question: "A boat travels 30 km downstream in 2 hours and the same distance upstream in 3 hours. Find the speed of the boat in still water.",
    options: ["10 km/h", "12.5 km/h", "15 km/h", "20 km/h"],
    answer: 2
  },

  {
    id: 15,
    category: "Quantitative",
    difficulty: "Hard",
    question: "A mixture contains milk and water in the ratio 5:2. If 14 litres of water are added, the ratio becomes 5:4. Find the original quantity of the mixture.",
    options: ["35 litres", "42 litres", "49 litres", "56 litres"],
    answer: 2
  },

  {
    id: 16,
    category: "Quantitative",
    difficulty: "Easy",
    question: "If 3 pens cost ₹45, how much will 8 pens cost?",
    options: ["₹100", "₹110", "₹120", "₹125"],
    answer: 2
  },

  {
    id: 17,
    category: "Quantitative",
    difficulty: "Medium",
    question: "A number is increased by 25% and then by another 20%. By what percentage has it increased overall?",
    options: ["40%", "45%", "50%", "55%"],
    answer: 2
  },

  {
    id: 18,
    category: "Quantitative",
    difficulty: "Hard",
    question: "A person invests ₹20,000 partly at 8% and partly at 12% simple interest. If the total annual interest is ₹2,000, how much was invested at each rate?",
    options: [
      "₹8,000 at 8% and ₹12,000 at 12%",
      "₹10,000 at 8% and ₹10,000 at 12%",
      "₹12,000 at 8% and ₹8,000 at 12%",
      "₹15,000 at 8% and ₹5,000 at 12%"
    ],
    answer: 1
  },

  {
    id: 19,
    category: "Quantitative",
    difficulty: "Medium",
    question: "A and B have incomes in the ratio 5:7 and expenses in the ratio 3:4. If both save ₹2,000, find their incomes.",
    options: [
      "₹5,000 and ₹7,000",
      "₹6,000 and ₹8,400",
      "₹7,000 and ₹9,800",
      "₹8,000 and ₹11,200"
    ],
    answer: 2
  },

  {
    id: 20,
    category: "Quantitative",
    difficulty: "Hard",
    question: "A clock gains 5 minutes every hour. If it is set correctly at 8:00 AM, what time will it show at actual 8:00 PM?",
    options: ["8:30 PM", "8:45 PM", "9:00 PM", "9:05 PM"],
    answer: 2
  },


  // ============================================================
  // LOGICAL REASONING - 20 QUESTIONS
  // ============================================================

  {
    id: 21,
    category: "Logical",
    difficulty: "Easy",
    question: "Find the next number: 3, 6, 12, 24, __.",
    options: ["36", "42", "48", "54"],
    answer: 2
  },

  {
    id: 22,
    category: "Logical",
    difficulty: "Medium",
    question: "Find the odd one out: 16, 25, 36, 49, 63, 81.",
    options: ["25", "36", "63", "81"],
    answer: 2
  },

  {
    id: 23,
    category: "Logical",
    difficulty: "Easy",
    question: "If CAT is coded as DBU, how will DOG be coded?",
    options: ["EPH", "EOG", "FPH", "DPH"],
    answer: 0
  },

  {
    id: 24,
    category: "Logical",
    difficulty: "Medium",
    question: "A is the brother of B. B is the sister of C. C is the father of D. How is A related to D?",
    options: ["Father", "Uncle", "Brother", "Grandfather"],
    answer: 1
  },

  {
    id: 25,
    category: "Logical",
    difficulty: "Hard",
    question: "Five people P, Q, R, S and T sit in a row. P is to the left of Q but right of R. S is to the right of Q. T is between Q and S. Who sits in the middle?",
    options: ["P", "Q", "R", "T"],
    answer: 1
  },

  {
    id: 26,
    category: "Logical",
    difficulty: "Easy",
    question: "Find the missing number: 2, 5, 10, 17, 26, __.",
    options: ["35", "36", "37", "38"],
    answer: 2
  },

  {
    id: 27,
    category: "Logical",
    difficulty: "Medium",
    question: "All roses are flowers. Some flowers fade quickly. Can we conclude that some roses fade quickly?",
    options: [
      "Yes, definitely",
      "No, the conclusion does not necessarily follow",
      "Only if all flowers are roses",
      "Only if roses are red"
    ],
    answer: 1
  },

  {
    id: 28,
    category: "Logical",
    difficulty: "Hard",
    question: "A person walks 10 m north, 6 m east, 10 m south and 4 m west. How far is the person from the starting point?",
    options: ["2 m", "4 m", "6 m", "10 m"],
    answer: 1
  },

  {
    id: 29,
    category: "Logical",
    difficulty: "Medium",
    question: "Complete the series: AZ, BY, CX, DW, __.",
    options: ["EV", "FU", "EW", "EX"],
    answer: 0
  },

  {
    id: 30,
    category: "Logical",
    difficulty: "Easy",
    question: "If yesterday was Monday, what day will it be 100 days from today?",
    options: ["Wednesday", "Thursday", "Friday", "Saturday"],
    answer: 1
  },

  {
    id: 31,
    category: "Logical",
    difficulty: "Hard",
    question: "Six people A, B, C, D, E and F have different heights. A is taller than B but shorter than C. D is shorter than B. E is taller than C. Who is definitely the tallest among A, B, C, D and E?",
    options: ["A", "B", "C", "E"],
    answer: 3
  },

  {
    id: 32,
    category: "Logical",
    difficulty: "Medium",
    question: "All managers are graduates. Some graduates are entrepreneurs. Which statement definitely follows?",
    options: [
      "All managers are entrepreneurs",
      "Some managers are entrepreneurs",
      "All managers are graduates",
      "No graduates are managers"
    ],
    answer: 2
  },

  {
    id: 33,
    category: "Logical",
    difficulty: "Easy",
    question: "Find the missing term: 1, 4, 9, 16, 25, __.",
    options: ["30", "32", "36", "49"],
    answer: 2
  },

  {
    id: 34,
    category: "Logical",
    difficulty: "Medium",
    question: "If MOBILE is coded as ELIBOM, how will TABLET be coded?",
    options: ["TELBAT", "TELBAT", "TBALTE", "ELBAT"],
    answer: 0
  },

  {
    id: 35,
    category: "Logical",
    difficulty: "Hard",
    question: "Four people A, B, C and D each like a different colour: red, blue, green and yellow. A does not like red or blue. B likes green. C does not like yellow. If C likes blue, which colour does D like?",
    options: ["Red", "Blue", "Green", "Yellow"],
    answer: 0
  },

  {
    id: 36,
    category: "Logical",
    difficulty: "Medium",
    question: "Find the next pair: AB, DE, HI, MN, __.",
    options: ["RS", "ST", "TU", "QR"],
    answer: 0
  },

  {
    id: 37,
    category: "Logical",
    difficulty: "Easy",
    question: "If all laptops are devices and some devices are expensive, which statement is definitely true?",
    options: [
      "All laptops are expensive",
      "Some laptops are expensive",
      "All laptops are devices",
      "No laptops are expensive"
    ],
    answer: 2
  },

  {
    id: 38,
    category: "Logical",
    difficulty: "Hard",
    question: "A man says, 'The woman in the photograph is the daughter of the only daughter of my mother.' How is the woman related to the man?",
    options: ["Sister", "Daughter", "Niece", "Mother"],
    answer: 2
  },

  {
    id: 39,
    category: "Logical",
    difficulty: "Medium",
    question: "Arrange these in the most logical order: Interview, Application, Joining, Selection, Advertisement.",
    options: [
      "Advertisement → Application → Interview → Selection → Joining",
      "Application → Advertisement → Interview → Selection → Joining",
      "Advertisement → Interview → Application → Selection → Joining",
      "Application → Interview → Advertisement → Selection → Joining"
    ],
    answer: 0
  },

  {
    id: 40,
    category: "Logical",
    difficulty: "Hard",
    question: "Seven people are standing in a line. A is 3rd from the left and B is 2nd from the right. If C stands exactly halfway between A and B, what position does C occupy?",
    options: ["3rd", "4th", "5th", "6th"],
    answer: 1
  },


  // ============================================================
  // VERBAL ABILITY - 20 QUESTIONS
  // ============================================================

  {
    id: 41,
    category: "Verbal",
    difficulty: "Easy",
    question: "Choose the synonym of 'Abundant'.",
    options: ["Scarce", "Plentiful", "Weak", "Limited"],
    answer: 1
  },

  {
    id: 42,
    category: "Verbal",
    difficulty: "Medium",
    question: "Choose the grammatically correct sentence.",
    options: [
      "Neither of the answers are correct.",
      "Neither of the answers is correct.",
      "Neither of the answers were correct.",
      "Neither answers is correct."
    ],
    answer: 1
  },

  {
    id: 43,
    category: "Verbal",
    difficulty: "Easy",
    question: "Choose the antonym of 'Reluctant'.",
    options: ["Unwilling", "Hesitant", "Willing", "Doubtful"],
    answer: 2
  },

  {
    id: 44,
    category: "Verbal",
    difficulty: "Medium",
    question: "She has been working here ___ 2022.",
    options: ["for", "since", "from", "by"],
    answer: 1
  },

  {
    id: 45,
    category: "Verbal",
    difficulty: "Hard",
    question: "Choose the word closest in meaning to 'Pragmatic'.",
    options: ["Idealistic", "Practical", "Emotional", "Traditional"],
    answer: 1
  },

  {
    id: 46,
    category: "Verbal",
    difficulty: "Easy",
    question: "Identify the correctly spelt word.",
    options: [
      "Accomodation",
      "Accommodation",
      "Acommodation",
      "Accommadation"
    ],
    answer: 1
  },

  {
    id: 47,
    category: "Verbal",
    difficulty: "Medium",
    question: "Identify the error in: 'Each of the students have submitted their assignment.'",
    options: [
      "'Each' should be 'Every'",
      "'have' should be 'has'",
      "'students' should be 'student'",
      "There is no error"
    ],
    answer: 1
  },

  {
    id: 48,
    category: "Verbal",
    difficulty: "Hard",
    question: "A person who can speak many languages is called a:",
    options: ["Linguist", "Polyglot", "Orator", "Translator"],
    answer: 1
  },

  {
    id: 49,
    category: "Verbal",
    difficulty: "Easy",
    question: "What does the idiom 'Break the ice' mean?",
    options: [
      "Start a conversation",
      "End an argument",
      "Become angry",
      "Avoid someone"
    ],
    answer: 0
  },

  {
    id: 50,
    category: "Verbal",
    difficulty: "Medium",
    question: "The new policy will ___ the way employees work.",
    options: ["effect", "affect", "effected", "affecting"],
    answer: 1
  },

  {
    id: 51,
    category: "Verbal",
    difficulty: "Hard",
    question: "Choose the most appropriate sentence for a professional email.",
    options: [
      "Send me the document ASAP.",
      "I need the document right now.",
      "Could you please share the document at your earliest convenience?",
      "Give me the document quickly."
    ],
    answer: 2
  },

  {
    id: 52,
    category: "Verbal",
    difficulty: "Easy",
    question: "Choose the antonym of 'Transparent'.",
    options: ["Clear", "Obvious", "Opaque", "Visible"],
    answer: 2
  },

  {
    id: 53,
    category: "Verbal",
    difficulty: "Medium",
    question: "Arrange the following sentences logically: P. He decided to investigate the issue. Q. Several customers reported the same problem. R. The company initially ignored the complaints. S. Eventually, the problem attracted management's attention.",
    options: [
      "Q → R → S → P",
      "R → Q → P → S",
      "P → Q → R → S",
      "Q → P → R → S"
    ],
    answer: 0
  },

  {
    id: 54,
    category: "Verbal",
    difficulty: "Hard",
    question: "Choose the best meaning of 'Ambiguous'.",
    options: [
      "Very clear",
      "Having multiple possible meanings",
      "Completely false",
      "Extremely detailed"
    ],
    answer: 1
  },

  {
    id: 55,
    category: "Verbal",
    difficulty: "Medium",
    question: "Despite ___ tired, she completed the presentation.",
    options: ["being", "been", "be", "was"],
    answer: 0
  },

  {
    id: 56,
    category: "Verbal",
    difficulty: "Easy",
    question: "Choose the synonym of 'Brief'.",
    options: ["Lengthy", "Concise", "Complicated", "Detailed"],
    answer: 1
  },

  {
    id: 57,
    category: "Verbal",
    difficulty: "Hard",
    question: "Read the statement: 'Remote work offers flexibility, but without proper communication, teams may experience delays and misunderstandings.' What is the central idea?",
    options: [
      "Remote work is always better.",
      "Remote work has benefits but requires effective communication.",
      "Communication is unnecessary in remote work.",
      "Teams should avoid remote work."
    ],
    answer: 1
  },

  {
    id: 58,
    category: "Verbal",
    difficulty: "Medium",
    question: "Choose the grammatically correct sentence.",
    options: [
      "If I would have known, I would have helped.",
      "If I had known, I would have helped.",
      "If I knew, I would had helped.",
      "If I have known, I would help."
    ],
    answer: 1
  },

  {
    id: 59,
    category: "Verbal",
    difficulty: "Hard",
    question: "His explanation was so ___ that even a complex concept seemed easy to understand.",
    options: ["obscure", "lucid", "vague", "contradictory"],
    answer: 1
  },

  {
    id: 60,
    category: "Verbal",
    difficulty: "Medium",
    question: "Employees who receive regular feedback tend to improve their performance faster. What is the best conclusion?",
    options: [
      "Feedback guarantees promotion.",
      "Regular feedback can contribute to faster improvement.",
      "Employees without feedback cannot improve.",
      "Performance depends only on feedback."
    ],
    answer: 1
  }

];

export default questions;
