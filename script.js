import { questions } from "./questions.js";

/* =========================================================
   MINDMETRIX - MAIN JAVASCRIPT
   Works with the existing index.html
   ========================================================= */

let testQuestions = [];
let userAnswers = [];
let markedQuestions = [];
let currentQuestion = 0;
let timerSeconds = 20 * 60;
let timerInterval = null;
let testFinished = false;

let student = JSON.parse(
  localStorage.getItem("mmStudent") || "null"
) || {};

/* =========================================================
   HELPER
   ========================================================= */

const $ = (id) => document.getElementById(id);

function getHistory() {
  try {
    return JSON.parse(
      localStorage.getItem("mindmetrixHistory") || "[]"
    );
  } catch {
    return [];
  }
}

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* =========================================================
   PAGE NAVIGATION
   ========================================================= */

function go(pageId) {
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.add("hidden");
  });

  const page = $(pageId);

  if (!page) {
    console.error(`Page "${pageId}" not found.`);
    return;
  }

  page.classList.remove("hidden");

  document
    .querySelectorAll(".nav button[data-page]")
    .forEach((button) => {
      button.classList.toggle(
        "active",
        button.dataset.page === pageId
      );
    });

  if (pageId === "dashboard") renderDashboard();
  if (pageId === "history") renderHistory();
  if (pageId === "leaderboard") renderLeaderboard();
  if (pageId === "admin") renderAdmin();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

window.go = go;

/* Navbar */

document
  .querySelectorAll(".nav button[data-page]")
  .forEach((button) => {
    button.addEventListener("click", () => {
      go(button.dataset.page);
    });
  });

/* =========================================================
   DARK MODE
   ========================================================= */

$("themeBtn").addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const darkMode = document.body.classList.contains("dark");

  localStorage.setItem(
    "mmDark",
    darkMode ? "true" : "false"
  );

  $("themeBtn").textContent = darkMode ? "☀️" : "🌙";
});

if (localStorage.getItem("mmDark") === "true") {
  document.body.classList.add("dark");
  $("themeBtn").textContent = "☀️";
}

/* =========================================================
   AUTH
   ========================================================= */

$("authBtn").addEventListener("click", () => {
  go("auth");
});

$("loginTab").addEventListener("click", () => {
  $("loginTab").classList.add("active");
  $("signupTab").classList.remove("active");

  $("loginForm").classList.remove("hidden");
  $("signupForm").classList.add("hidden");
});

$("signupTab").addEventListener("click", () => {
  $("signupTab").classList.add("active");
  $("loginTab").classList.remove("active");

  $("signupForm").classList.remove("hidden");
  $("loginForm").classList.add("hidden");
});

window.fakeAuth = function (type) {
  if (type === "signup") {
    const name = $("signupName").value.trim();
    const email = $("signupEmail").value.trim();
    const password = $("signupPassword").value;

    if (!name) {
      toast("Please enter your name.");
      return;
    }

    if (!email) {
      toast("Please enter your email.");
      return;
    }

    if (password.length < 6) {
      toast("Password must contain at least 6 characters.");
      return;
    }

    localStorage.setItem("mmUser", name);

    toast("Account created successfully!");

    setTimeout(() => {
      go("dashboard");
    }, 500);

    return;
  }

  const email = $("loginEmail").value.trim();
  const password = $("loginPassword").value;

  if (!email || !password) {
    toast("Please enter email and password.");
    return;
  }

  localStorage.setItem(
    "mmUser",
    email.split("@")[0]
  );

  toast("Login successful!");

  setTimeout(() => {
    go("dashboard");
  }, 500);
};

/* =========================================================
   CATEGORY SELECTION
   ========================================================= */

function selectCategory(category) {
  go("student");

  $("category").value = category;
}

window.selectCategory = selectCategory;

/* =========================================================
   STUDENT FORM
   ========================================================= */

$("studentForm").addEventListener("submit", (event) => {
  event.preventDefault();

  clearErrors();

  const name = $("name").value.trim();
  const roll = $("roll").value.trim();
  const branch = $("branch").value;
  const email = $("email").value.trim();

  let valid = true;

  if (!name) {
    $("nameErr").textContent = "Please enter your name.";
    valid = false;
  }

  if (!roll) {
    $("rollErr").textContent =
      "Please enter your roll number.";
    valid = false;
  }

  if (!branch) {
    $("branchErr").textContent =
      "Please select your branch.";
    valid = false;
  }

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    $("emailErr").textContent =
      "Please enter a valid email.";
    valid = false;
  }

  if (!valid) return;

  student = {
    name,
    roll,
    branch,
    year: $("year").value,
    college: $("college").value.trim(),
    email,
    difficulty: $("difficulty").value,
    category: $("category").value
  };

  localStorage.setItem(
    "mmStudent",
    JSON.stringify(student)
  );

  startTest();
});

function clearErrors() {
  ["nameErr", "rollErr", "branchErr", "emailErr"]
    .forEach((id) => {
      if ($(id)) $(id).textContent = "";
    });
}

/* =========================================================
   GET QUESTION BANK
   ========================================================= */

function getAllQuestions() {
  let all = [];

  Object.keys(questions).forEach((category) => {
    if (!Array.isArray(questions[category])) return;

    questions[category].forEach((question) => {
      all.push({
        ...question,
        category
      });
    });
  });

  return all;
}

/* =========================================================
   START TEST
   ========================================================= */

function startTest() {
  let pool = getAllQuestions();

  const selectedDifficulty = student.difficulty;
  const selectedCategory = student.category;

  /* First filter by category */

  if (
    selectedCategory &&
    selectedCategory !== "All"
  ) {
    pool = pool.filter(
      (q) => q.category === selectedCategory
    );
  }

  /* Then filter by difficulty */

  const difficultyPool = pool.filter(
    (q) => q.difficulty === selectedDifficulty
  );

  /*
     IMPORTANT:
     We only use selected difficulty.
     We never mix Easy + Medium + Hard.
  */

  pool = difficultyPool;

  /*
     Current questions.js does NOT contain 20 unique
     questions for every category/difficulty combination.

     Therefore, if fewer than 20 exist, show a clear
     message instead of silently mixing difficulties.
  */

  if (pool.length < 20) {
    toast(
      `${selectedCategory} has only ${pool.length} ${selectedDifficulty} questions. Add more questions to make 20.`
    );

    return;
  }

  testQuestions = shuffle(pool).slice(0, 20);

  userAnswers = Array(20).fill(null);
  markedQuestions = Array(20).fill(false);

  currentQuestion = 0;
  timerSeconds = 20 * 60;
  testFinished = false;

  $("testStudent").textContent =
    `${student.name} • ${student.branch} • ${student.difficulty} • ${student.category}`;

  go("test");

  renderQuestion();
  startTimer();
}

window.startTest = startTest;

/* =========================================================
   TIMER
   ========================================================= */

function startTimer() {
  clearInterval(timerInterval);

  updateTimer();

  timerInterval = setInterval(() => {
    timerSeconds--;

    updateTimer();

    if (timerSeconds <= 0) {
      clearInterval(timerInterval);

      toast(
        "Time is up! Your test has been submitted."
      );

      finishTest(true);
    }
  }, 1000);
}

function updateTimer() {
  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;

  $("timer").textContent =
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  $("timer").classList.toggle(
    "warn",
    timerSeconds <= 300 &&
    timerSeconds > 60
  );

  $("timer").classList.toggle(
    "danger",
    timerSeconds <= 60
  );
}

/* =========================================================
   RENDER QUESTION
   ========================================================= */

function renderQuestion() {
  if (!testQuestions.length) return;

  const question = testQuestions[currentQuestion];

  $("qCounter").textContent =
    `Question ${currentQuestion + 1} of ${testQuestions.length}`;

  $("qCategory").textContent =
    `${question.category} • ${question.difficulty}`;

  $("questionText").textContent =
    question.question;

  $("options").innerHTML =
    question.options
      .map((option, index) => {

        const selected =
          userAnswers[currentQuestion] === index;

        return `
          <label class="option ${selected ? "selected" : ""}">
            <input
              type="radio"
              name="answer"
              value="${index}"
              ${selected ? "checked" : ""}
            >

            <span>
              <b>${String.fromCharCode(65 + index)}.</b>
              ${escapeHTML(option)}
            </span>
          </label>
        `;
      })
      .join("");

  document
    .querySelectorAll("#options .option")
    .forEach((optionElement, index) => {

      optionElement.addEventListener(
        "click",
        () => {

          userAnswers[currentQuestion] = index;

          renderQuestion();
        }
      );
    });

  $("reviewBtn").textContent =
    markedQuestions[currentQuestion]
      ? "⭐ Remove Review"
      : "⭐ Mark for Review";

  $("prevBtn").disabled =
    currentQuestion === 0;

  $("nextBtn").textContent =
    currentQuestion === testQuestions.length - 1
      ? "Finish Test"
      : "Next →";

  renderQuestionNavigation();
  updateProgress();
}

/* =========================================================
   QUESTION NAVIGATION
   ========================================================= */

function renderQuestionNavigation() {

  $("qnav").innerHTML =
    testQuestions
      .map((_, index) => {

        let classes = "qbtn ";

        if (userAnswers[index] !== null) {
          classes += "answered ";
        }

        if (markedQuestions[index]) {
          classes += "review ";
        }

        if (index === currentQuestion) {
          classes += "current ";
        }

        return `
          <button
            class="${classes}"
            data-question="${index}"
          >
            ${index + 1}
          </button>
        `;
      })
      .join("");

  document
    .querySelectorAll("#qnav .qbtn")
    .forEach((button) => {

      button.addEventListener(
        "click",
        () => {

          currentQuestion =
            Number(button.dataset.question);

          renderQuestion();
        }
      );
    });
}

/* =========================================================
   PROGRESS
   ========================================================= */

function updateProgress() {

  const answered =
    userAnswers.filter(
      (answer) => answer !== null
    ).length;

  const percentage =
    Math.round(
      (answered / testQuestions.length) * 100
    );

  $("testProgress").style.width =
    `${percentage}%`;

  $("answeredCount").textContent =
    `${answered} answered`;

  $("percentText").textContent =
    `${percentage}%`;
}

/* =========================================================
   PREVIOUS
   ========================================================= */

$("prevBtn").addEventListener(
  "click",
  () => {

    if (currentQuestion > 0) {
      currentQuestion--;
      renderQuestion();
    }
  }
);

/* =========================================================
   NEXT
   ========================================================= */

$("nextBtn").addEventListener(
  "click",
  () => {

    if (
      currentQuestion <
      testQuestions.length - 1
    ) {

      currentQuestion++;
      renderQuestion();

    } else {

      finishTest(false);
    }
  }
);

/* =========================================================
   MARK FOR REVIEW
   ========================================================= */

$("reviewBtn").addEventListener(
  "click",
  () => {

    markedQuestions[currentQuestion] =
      !markedQuestions[currentQuestion];

    renderQuestion();
  }
);

/* =========================================================
   SUBMIT TEST
   ========================================================= */

$("submitBtn").addEventListener(
  "click",
  () => {

    const unanswered =
      userAnswers.filter(
        (answer) => answer === null
      ).length;

    if (unanswered > 0) {

      const confirmSubmit = confirm(
        `You have ${unanswered} unanswered question(s).\n\nAre you sure you want to submit?`
      );

      if (!confirmSubmit) return;
    }

    finishTest(false);
  }
);

/* =========================================================
   FINISH TEST
   ========================================================= */

function finishTest(autoSubmit = false) {

  if (testFinished) return;

  testFinished = true;

  clearInterval(timerInterval);

  let score = 0;

  const categoryResults = {};

  testQuestions.forEach((question, index) => {

    const category = question.category;

    if (!categoryResults[category]) {
      categoryResults[category] = {
        correct: 0,
        total: 0
      };
    }

    categoryResults[category].total++;

    if (
      userAnswers[index] ===
      question.answer
    ) {

      score++;

      categoryResults[category].correct++;
    }
  });

  const total =
    testQuestions.length;

  const percentage =
    Math.round((score / total) * 100);

  const level =
    percentage >= 90
      ? "🏆 Excellent"
      : percentage >= 75
      ? "⭐ Very Good"
      : percentage >= 60
      ? "👍 Good"
      : percentage >= 40
      ? "📚 Needs Improvement"
      : "💪 Keep Practicing";

  /* Result header */

  $("finalScore").textContent =
    `${score}/${total} • ${percentage}%`;

  $("finalLevel").textContent =
    level;

  $("finalStudent").textContent =
    `${student.name} • ${student.branch}`;

  /* Category result */

  setCategoryResult(
    "quant",
    categoryResults.Quantitative
  );

  setCategoryResult(
    "logical",
    categoryResults.Logical
  );

  setCategoryResult(
    "verbal",
    categoryResults.Verbal
  );

  setCategoryResult(
    "btech",
    categoryResults["B.Tech Technical"]
  );

  /* Analysis */

  renderAnalysis(
    categoryResults,
    percentage
  );

  /* Answer review */

  renderAnswerReview();

  /* Save history */

  const history = getHistory();

  history.push({
    id: Date.now(),
    name: student.name,
    roll: student.roll,
    branch: student.branch,
    year: student.year,
    college: student.college,
    email: student.email,
    difficulty: student.difficulty,
    category: student.category,
    score,
    total,
    pct: percentage,
    date: new Date().toLocaleString(),
    data: categoryResults
  });

  localStorage.setItem(
    "mindmetrixHistory",
    JSON.stringify(history)
  );

  go("result");

  if (autoSubmit) {
    setTimeout(() => {
      toast("Test submitted automatically.");
    }, 300);
  }
}

/* =========================================================
   CATEGORY RESULT
   ========================================================= */

function setCategoryResult(
  prefix,
  result
) {

  const scoreElement =
    $(`${prefix}Score`);

  const barElement =
    $(`${prefix}Bar`);

  const fractionElement =
    $(`${prefix}Fraction`);

  if (!result || result.total === 0) {

    scoreElement.textContent = "N/A";

    barElement.style.width = "0%";

    fractionElement.textContent =
      "Not attempted";

    return;
  }

  const percentage =
    Math.round(
      (result.correct / result.total) * 100
    );

  scoreElement.textContent =
    `${percentage}%`;

  barElement.style.width =
    `${percentage}%`;

  fractionElement.textContent =
    `${result.correct}/${result.total}`;
}

/* =========================================================
   PERFORMANCE ANALYSIS
   ========================================================= */

function renderAnalysis(
  results,
  overallPercentage
) {

  const entries =
    Object.entries(results);

  if (!entries.length) {
    $("analysisText").innerHTML =
      "<p>No result data available.</p>";
    return;
  }

  const percentages =
    entries.map(([category, result]) => {

      const percentage =
        Math.round(
          (result.correct / result.total) * 100
        );

      return {
        category,
        percentage
      };
    });

  percentages.sort(
    (a, b) =>
      b.percentage - a.percentage
  );

  const strongest =
    percentages[0];

  const weakest =
    percentages[percentages.length - 1];

  let message;

  if (overallPercentage >= 90) {
    message =
      "Excellent performance. You are ready for challenging aptitude problems.";
  } else if (overallPercentage >= 75) {
    message =
      "Very good performance. Focus on your weaker areas to reach an advanced level.";
  } else if (overallPercentage >= 60) {
    message =
      "Good attempt. More timed practice can improve your accuracy.";
  } else {
    message =
      "Keep practicing. Review the explanations and try another assessment.";
  }

  $("analysisText").innerHTML = `
    <p>
      🟢 <b>Strongest Area:</b>
      ${escapeHTML(strongest.category)}
      (${strongest.percentage}%)
    </p>

    <p>
      🔴 <b>Focus Area:</b>
      ${escapeHTML(weakest.category)}
      (${weakest.percentage}%)
    </p>

    <p>
      🎯 <b>Overall Score:</b>
      ${overallPercentage}%
    </p>

    <p>
      💡 ${message}
    </p>
  `;
}

/* =========================================================
   ANSWER REVIEW
   ========================================================= */

function renderAnswerReview() {

  $("reviewResults").innerHTML =
    testQuestions
      .map((question, index) => {

        const selected =
          userAnswers[index];

        const isCorrect =
          selected === question.answer;

        const yourAnswer =
          selected === null
            ? "Not answered"
            : question.options[selected];

        const correctAnswer =
          question.options[
            question.answer
          ];

        return `
          <div class="review-item">

            <b>
              ${isCorrect ? "✅" : "❌"}
              Q${index + 1}.
              ${escapeHTML(question.question)}
            </b>

            <p>
              <b>Your answer:</b>
              ${escapeHTML(yourAnswer)}
            </p>

            <p>
              <b>Correct answer:</b>
              ${escapeHTML(correctAnswer)}
            </p>

            ${
              question.explanation
                ? `
                  <p style="color:var(--muted)">
                    <b>Explanation:</b>
                    ${escapeHTML(question.explanation)}
                  </p>
                `
                : ""
            }

          </div>
        `;
      })
      .join("");
}

/* =========================================================
   RETAKE
   ========================================================= */

function retake() {

  if (!student.name) {
    go("student");
    return;
  }

  startTest();
}

window.retake = retake;

/* =========================================================
   DASHBOARD
   ========================================================= */

function renderDashboard() {

  const history = getHistory();

  const last =
    history[history.length - 1];

  const name =
    student.name ||
    last?.name ||
    localStorage.getItem("mmUser") ||
    "Student";

  $("dashWelcome").textContent =
    `Welcome, ${name} 👋`;

  $("dTests").textContent =
    history.length;

  if (!history.length) {

    $("dLatest").textContent = "--";
    $("dConsistency").textContent = "--";
    $("dAccuracy").textContent = "--";

    $("chart").innerHTML = `
      <div style="color:var(--muted)">
        Take a test to see your progress.
      </div>
    `;

    $("subjectPerformance").innerHTML =
      "<p style='color:var(--muted)'>No test data yet.</p>";

    $("focusAreas").innerHTML =
      "<p>🎯 Complete a test to get focus areas.</p>";

    return;
  }

  $("dLatest").textContent =
    `${last.pct}%`;

  const average =
    Math.round(
      history.reduce(
        (sum, test) => sum + test.pct,
        0
      ) / history.length
    );

  $("dConsistency").textContent =
    `${average}%`;

  $("dAccuracy").textContent =
    `${last.pct}%`;

  /* Chart */

  $("chart").innerHTML =
    history
      .slice(-8)
      .map((test, index) => {

        const height =
          Math.max(
            18,
            test.pct * 1.4
          );

        return `
          <div class="bar-col">

            <i
              style="height:${height}px"
            ></i>

            ${test.pct}%

            <br>

            Test ${index + 1}

          </div>
        `;
      })
      .join("");

  /* Subject performance */

  const aggregate = {};

  history.forEach((test) => {

    Object.entries(
      test.data || {}
    ).forEach(([category, data]) => {

      if (!aggregate[category]) {
        aggregate[category] = {
          correct: 0,
          total: 0
        };
      }

      aggregate[category].correct +=
        data.correct;

      aggregate[category].total +=
        data.total;
    });
  });

  $("subjectPerformance").innerHTML =
    Object.entries(aggregate)
      .map(([category, data]) => {

        const percentage =
          data.total
            ? Math.round(
                (data.correct /
                  data.total) *
                  100
              )
            : 0;

        return `
          <div style="margin:13px 0">

            <div
              style="
                display:flex;
                justify-content:space-between
              "
            >

              <span>
                ${escapeHTML(category)}
              </span>

              <b>
                ${percentage}%
              </b>

            </div>

            <div class="bar">
              <div
                style="width:${percentage}%"
              ></div>
            </div>

          </div>
        `;
      })
      .join("");

  /* Focus areas */

  const sorted =
    Object.entries(aggregate)
      .map(([category, data]) => ({
        category,
        percentage: data.total
          ? Math.round(
              (data.correct /
                data.total) *
                100
            )
          : 0
      }))
      .sort(
        (a, b) =>
          a.percentage -
          b.percentage
      );

  if (sorted.length) {

    const weakest =
      sorted[0];

    const strongest =
      sorted[sorted.length - 1];

    $("focusAreas").innerHTML = `
      <p>
        🔴 ${escapeHTML(weakest.category)}
        — ${weakest.percentage}%
        needs practice
      </p>

      <p>
        🟢 ${escapeHTML(strongest.category)}
        — ${strongest.percentage}%
        is your strongest
      </p>

      <p>
        💡 Recommended:
        practice ${escapeHTML(
          weakest.category
        )} questions today.
      </p>
    `;
  }
}

/* =========================================================
   HISTORY
   ========================================================= */

function renderHistory() {

  const history = getHistory();

  if (!history.length) {

    $("historyTable").innerHTML = `
      <tr>
        <td colspan="6">
          No attempts yet.
        </td>
      </tr>
    `;

    return;
  }

  $("historyTable").innerHTML =
    history
      .map((test, index) => {

        const level =
          test.pct >= 90
            ? "Excellent"
            : test.pct >= 75
            ? "Very Good"
            : test.pct >= 60
            ? "Good"
            : test.pct >= 40
            ? "Needs Improvement"
            : "Keep Practicing";

        return `
          <tr>

            <td>${index + 1}</td>

            <td>
              ${escapeHTML(test.date)}
            </td>

            <td>
              ${escapeHTML(test.name)}
            </td>

            <td>
              ${test.score}/${test.total}
            </td>

            <td>
              ${test.pct}%
            </td>

            <td>
              ${level}
            </td>

          </tr>
        `;
      })
      .join("");
}

window.clearHistory = function () {

  const confirmed =
    confirm(
      "Clear all test history?"
    );

  if (!confirmed) return;

  localStorage.removeItem(
    "mindmetrixHistory"
  );

  renderHistory();
  renderDashboard();

  toast("History cleared.");
};

/* =========================================================
   LEADERBOARD
   ========================================================= */

function renderLeaderboard() {

  const demo = [
    ["🥇", "Student A", "Mixed", "95%"],
    ["🥈", "Student B", "Logical", "92%"],
    ["🥉", "Student C", "Quantitative", "89%"],
    ["4", "Student D", "Verbal", "86%"],
    ["5", "Student E", "Mixed", "82%"]
  ];

  const history = getHistory();

  if (history.length) {

    const best =
      [...history].sort(
        (a, b) =>
          b.pct - a.pct
      )[0];

    demo.push([
      "★",
      best.name,
      best.category,
      `${best.pct}%`
    ]);
  }

  demo.sort(
    (a, b) =>
      parseInt(b[3]) -
      parseInt(a[3])
  );

  $("leaderTable").innerHTML =
    demo
      .map((row, index) => {

        return `
          <tr>

            <td>
              ${row[0] || index + 1}
            </td>

            <td>
              ${escapeHTML(row[1])}
            </td>

            <td>
              ${escapeHTML(row[2])}
            </td>

            <td>
              <b>${row[3]}</b>
            </td>

          </tr>
        `;
      })
      .join("");
}

/* =========================================================
   ADMIN
   ========================================================= */

function renderAdmin() {

  const allQuestions =
    getAllQuestions();

  $("adminQuestions").textContent =
    allQuestions.length;

  $("adminQuant").textContent =
    questions.Quantitative?.length || 0;

  $("adminLogical").textContent =
    questions.Logical?.length || 0;

  $("adminVerbal").textContent =
    questions.Verbal?.length || 0;
}

/* =========================================================
   TOAST
   ========================================================= */

function toast(message) {

  $("toast").textContent =
    message;

  $("toast").classList.remove(
    "hidden"
  );

  setTimeout(() => {

    $("toast").classList.add(
      "hidden"
    );

  }, 3000);
}

window.toast = toast;

/* =========================================================
   ADMIN BUTTONS
   ========================================================= */

window.printReport = function () {
  window.print();
};

/* =========================================================
   INITIAL LOAD
   ========================================================= */

const savedStudent =
  localStorage.getItem(
    "mmStudent"
  );

if (savedStudent) {

  try {
    student =
      JSON.parse(savedStudent);
  } catch {
    student = {};
  }
}

renderAdmin();

go("home");
