/**
 * MindMetrics — IQ Challenge Engine
 * Vanilla JavaScript implementation for interactive testing, timer management,
 * answer persistence, category analytics, and results computation.
 */

// ==========================================
// 1. QUESTION BANK (20 Original Questions)
// ==========================================
const questions = [
  {
    id: 1,
    category: "Number Sequences",
    prompt: "Find the next number in the following sequence: 3, 7, 15, 31, 63, ?",
    options: ["124", "127", "129", "131"],
    correctIndex: 1, // 127
    explanation: "Each number doubles and adds 1: (3×2)+1=7, (7×2)+1=15, ..., (63×2)+1 = 127."
  },
  {
    id: 2,
    category: "Verbal Reasoning",
    prompt: "ARCHITECT is to BUILDING as COMPOSER is to:",
    options: ["Symphony", "Orchestra", "Piano", "Conductor"],
    correctIndex: 0, // Symphony
    explanation: "An architect originates and designs a building; a composer originates and scores a symphony."
  },
  {
    id: 3,
    category: "Logical Reasoning",
    prompt: "All bloops are razzies. All razzies are lizzies. Some lizzies are zoppies. Which statement MUST be true?",
    options: [
      "All bloops are definitely zoppies",
      "All bloops are lizzies",
      "No bloops are zoppies",
      "All zoppies are razzies"
    ],
    correctIndex: 1, // All bloops are lizzies
    explanation: "By transitive deduction: Bloops ⊆ Razzies ⊆ Lizzies. Hence, all bloops must be lizzies."
  },
  {
    id: 4,
    category: "Mathematical Reasoning",
    prompt: "A train travels at 60 mph for 2 hours, then travels at 90 mph for 1 hour. What is its average speed for the entire journey?",
    options: ["70 mph", "75 mph", "80 mph", "85 mph"],
    correctIndex: 0, // 70 mph
    explanation: "Total distance = (60×2) + (90×1) = 210 miles. Total time = 3 hours. Average speed = 210 / 3 = 70 mph."
  },
  {
    id: 5,
    category: "Pattern Recognition",
    prompt: "Which of the following geometric figures does NOT belong with the others?",
    options: ["Pentagon", "Hexagon", "Cylinder", "Octagon"],
    correctIndex: 2, // Cylinder
    explanation: "Pentagon, hexagon, and octagon are 2D regular polygons. A cylinder is a 3D curved solid."
  },
  {
    id: 6,
    category: "Number Sequences",
    prompt: "Which number completes the pattern? 2, 6, 12, 20, 30, 42, ?",
    options: ["52", "54", "56", "60"],
    correctIndex: 2, // 56
    explanation: "The consecutive differences increase by 2 (+4, +6, +8, +10, +12, +14). 42 + 14 = 56 (or n × (n+1) where 7×8 = 56)."
  },
  {
    id: 7,
    category: "Basic Analytical Thinking",
    prompt: "Five siblings: Liam is older than Noah. Noah is older than Oliver. Emma is older than Liam but younger than Sophia. Who is the middle child in age?",
    options: ["Noah", "Emma", "Liam", "Oliver"],
    correctIndex: 2, // Liam
    explanation: "Descending age order: Sophia > Emma > Liam > Noah > Oliver. Liam is third out of five."
  },
  {
    id: 8,
    category: "Verbal Reasoning",
    prompt: "Choose the pair that best mirrors the relationship: PENCIL : GRAPHITE",
    options: [
      "Pen : Eraser",
      "Candle : Wax",
      "Car : Road",
      "Book : Cover"
    ],
    correctIndex: 1, // Candle : Wax
    explanation: "Graphite is the essential internal consumable material of a pencil, just as wax is for a candle."
  },
  {
    id: 9,
    category: "Mathematical Reasoning",
    prompt: "If 5 automated machines take 5 minutes to fabricate 5 widgets, how many minutes will 100 machines take to fabricate 100 widgets?",
    options: ["100 minutes", "20 minutes", "5 minutes", "1 minute"],
    correctIndex: 2, // 5 minutes
    explanation: "Each machine takes 5 minutes to make 1 widget. With 100 machines working in parallel, 100 widgets take 5 minutes."
  },
  {
    id: 10,
    category: "Logical Reasoning",
    prompt: "Premise: If it rains, the grass is wet. Fact: The grass is NOT wet. What conclusion is logically required?",
    options: [
      "It rained lightly",
      "It did not rain",
      "The sun is shining",
      "Rain is due tomorrow"
    ],
    correctIndex: 1, // It did not rain
    explanation: "Modus Tollens (contrapositive logic): P → Q. ¬Q is true, therefore ¬P (It did not rain) must be true."
  },
  {
    id: 11,
    category: "Pattern Recognition",
    prompt: "In a cryptographic code, CAT = 24 and DOG = 26. What is the value of BAT?",
    options: ["22", "23", "25", "27"],
    correctIndex: 1, // 23
    explanation: "Each letter's position is summed: B(2) + A(1) + T(20) = 23."
  },
  {
    id: 12,
    category: "Number Sequences",
    prompt: "Identify the next term in this sequence: 4, 7, 11, 18, 29, 47, ?",
    options: ["68", "74", "76", "82"],
    correctIndex: 2, // 76
    explanation: "Each term is the sum of the two preceding numbers: 29 + 47 = 76."
  },
  {
    id: 13,
    category: "Basic Analytical Thinking",
    prompt: "In a running race: Brian beat Chloe. Dave finished after Brian but before Alex. Alex did not finish last. Who won the race?",
    options: ["Alex", "Brian", "Chloe", "Dave"],
    correctIndex: 1, // Brian
    explanation: "Order: Brian > Dave > Alex. Since Alex did not finish last, Chloe must be last (Brian > Dave > Alex > Chloe). Brian won."
  },
  {
    id: 14,
    category: "Mathematical Reasoning",
    prompt: "An item originally listed at $150 is discounted by 20%. What is the final sale price?",
    options: ["$110", "$120", "$125", "$130"],
    correctIndex: 1, // $120
    explanation: "20% of $150 = $30. $150 - $30 = $120."
  },
  {
    id: 15,
    category: "Verbal Reasoning",
    prompt: "Select the word that represents the clearest ANTONYM of 'CANDID':",
    options: ["Deceptive", "Frank", "Sincere", "Blunt"],
    correctIndex: 0, // Deceptive
    explanation: "'Candid' denotes honest, straightforward transparency. Its exact opposite is 'deceptive'."
  },
  {
    id: 16,
    category: "Logical Reasoning",
    prompt: "Some artists are dreamers. All dreamers are innovators. Which deduction MUST follow?",
    options: [
      "All innovators are artists",
      "Some artists are innovators",
      "No artist can be an innovator",
      "All artists are innovators"
    ],
    correctIndex: 1, // Some artists are innovators
    explanation: "The artists who are dreamers must also belong to the set of innovators. Thus, some artists are innovators."
  },
  {
    id: 17,
    category: "Pattern Recognition",
    prompt: "Follow the dual progression: AZ, BY, CX, DW, ?",
    options: ["EV", "FU", "EU", "FV"],
    correctIndex: 0, // EV
    explanation: "The first letter advances (A, B, C, D, E), while the second steps backward (Z, Y, X, W, V)."
  },
  {
    id: 18,
    category: "Number Sequences",
    prompt: "Which number replaces the question mark? 1, 8, 27, 64, 125, ?",
    options: ["196", "216", "225", "343"],
    correctIndex: 1, // 216
    explanation: "Sequence of consecutive cubes: 1³=1, 2³=8, 3³=27, 4³=64, 5³=125, 6³ = 216."
  },
  {
    id: 19,
    category: "Mathematical Reasoning",
    prompt: "An analog clock shows exactly 3:15. What is the angle between the hour hand and the minute hand?",
    options: ["0°", "5°", "7.5°", "15°"],
    correctIndex: 2, // 7.5°
    explanation: "At 3:15, the minute hand is at 90°. The hour hand advances 0.5° per minute (15 × 0.5° = 7.5° past 90°). The angle is 7.5°."
  },
  {
    id: 20,
    category: "Basic Analytical Thinking",
    prompt: "You have 8 coins, one of which is slightly lighter than the others. What is the minimum number of balance weighings guaranteed to find the counterfeit?",
    options: ["1", "2", "3", "4"],
    correctIndex: 1, // 2
    explanation: "Weigh 3 coins against 3 (weighing 1). If balanced, weigh the remaining 2 against each other (weighing 2). If unbalanced, weigh 1 against 1 from the lighter group of 3 (weighing 2). Only 2 weighings are needed."
  }
];

// ==========================================
// 2. STATE MANAGEMENT
// ==========================================
const TEST_DURATION_SECONDS = 15 * 60; // 900 seconds (15 minutes)

let currentQuestionIndex = 0;
let userAnswers = new Array(questions.length).fill(null);
let timeRemaining = TEST_DURATION_SECONDS;
let timerInterval = null;
let isSubmitted = false;
let testStartTime = null;
let testEndTime = null;

// ==========================================
// 3. DOM ELEMENT REFERENCES
// ==========================================
const views = {
  home: document.getElementById("view-home"),
  instructions: document.getElementById("view-instructions"),
  quiz: document.getElementById("view-quiz"),
  results: document.getElementById("view-results"),
  review: document.getElementById("view-review")
};

// Controls & Buttons
const startTestBtn = document.getElementById("start-test-btn");
const navActionBtn = document.getElementById("nav-action-btn");
const instructionBackBtn = document.getElementById("instruction-back-btn");
const beginTestBtn = document.getElementById("begin-test-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const clearAnswerBtn = document.getElementById("clear-answer-btn");
const finishBtn = document.getElementById("finish-btn");
const brandLogo = document.getElementById("brand-logo");

// Quiz Display Elements
const questionTracker = document.getElementById("question-tracker");
const categoryTag = document.getElementById("category-tag");
const questionPrompt = document.getElementById("question-prompt");
const optionsContainer = document.getElementById("options-container");
const progressBarFill = document.getElementById("progress-bar-fill");
const paletteGrid = document.getElementById("palette-grid");
const answeredCounter = document.getElementById("answered-counter");
const timerDisplay = document.getElementById("timer-display");
const timerBadge = document.getElementById("timer-badge");

// Confirmation Modal Elements
const confirmModal = document.getElementById("confirm-modal");
const modalSummaryText = document.getElementById("modal-summary-text");
const modalCancelBtn = document.getElementById("modal-cancel-btn");
const modalConfirmBtn = document.getElementById("modal-confirm-btn");

// Results Elements
const feedbackHeading = document.getElementById("feedback-heading");
const feedbackMessage = document.getElementById("feedback-message");
const scorePercentageText = document.getElementById("score-percentage-text");
const scoreCirclePath = document.getElementById("score-circle-path");
const scoreFraction = document.getElementById("score-fraction");
const metricCorrectNum = document.getElementById("metric-correct-num");
const metricIncorrectNum = document.getElementById("metric-incorrect-num");
const metricUnansweredNum = document.getElementById("metric-unanswered-num");
const metricTimeSpent = document.getElementById("metric-time-spent");
const categoryBarsList = document.getElementById("category-bars-list");
const reviewAnswersBtn = document.getElementById("review-answers-btn");
const retakeTestBtn = document.getElementById("retake-test-btn");
const returnHomeBtn = document.getElementById("return-home-btn");

// Review Elements
const reviewList = document.getElementById("review-list");
const backToResultsBtn = document.getElementById("back-to-results-btn");
const bottomBackResultsBtn = document.getElementById("bottom-back-results-btn");

// ==========================================
// 4. VIEW SWITCHING ROUTINE
// ==========================================
function switchView(targetViewKey) {
  Object.keys(views).forEach(key => {
    if (key === targetViewKey) {
      views[key].classList.add("active");
    } else {
      views[key].classList.remove("active");
    }
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ==========================================
// 5. TEST INITIALIZATION & RESET
// ==========================================
function resetQuizState() {
  clearInterval(timerInterval);
  timerInterval = null;
  currentQuestionIndex = 0;
  userAnswers = new Array(questions.length).fill(null);
  timeRemaining = TEST_DURATION_SECONDS;
  isSubmitted = false;
  testStartTime = null;
  testEndTime = null;

  timerBadge.classList.remove("warning");
  timerDisplay.textContent = formatTime(TEST_DURATION_SECONDS);
  progressBarFill.style.width = "0%";
}

function startTestSession() {
  resetQuizState();
  testStartTime = new Date();
  buildPalette();
  loadQuestion(0);
  switchView("quiz");
  startTimer();
}

// ==========================================
// 6. QUESTION DISPLAY & SELECTION LOGIC
// ==========================================
function loadQuestion(index) {
  currentQuestionIndex = index;
  const q = questions[index];

  // Update Top Bar
  questionTracker.textContent = `Question ${index + 1} of ${questions.length}`;
  categoryTag.textContent = q.category;
  questionPrompt.textContent = `${index + 1}. ${q.prompt}`;

  // Update Progress Bar
  const answeredCount = userAnswers.filter(ans => ans !== null).length;
  const progressPercent = ((index + 1) / questions.length) * 100;
  progressBarFill.style.width = `${progressPercent}%`;

  // Render Options
  optionsContainer.innerHTML = "";
  const optionLabels = ["A", "B", "C", "D"];

  q.options.forEach((optText, optIndex) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    if (userAnswers[index] === optIndex) {
      btn.classList.add("selected");
    }

    btn.innerHTML = `
      <span class="option-tag">${optionLabels[optIndex]}</span>
      <span class="option-text">${optText}</span>
    `;

    btn.addEventListener("click", () => handleSelectOption(optIndex));
    optionsContainer.appendChild(btn);
  });

  // Manage Nav Button States
  prevBtn.disabled = index === 0;
  if (index === questions.length - 1) {
    nextBtn.style.display = "none";
    finishBtn.style.display = "inline-flex";
  } else {
    nextBtn.style.display = "inline-flex";
    finishBtn.style.display = "inline-flex"; // allow finishing anytime
  }

  updatePaletteHighlight();
}

function handleSelectOption(optionIndex) {
  userAnswers[currentQuestionIndex] = optionIndex;
  loadQuestion(currentQuestionIndex); // re-render options and status
  updatePaletteHighlight();
}

function clearCurrentAnswer() {
  userAnswers[currentQuestionIndex] = null;
  loadQuestion(currentQuestionIndex);
  updatePaletteHighlight();
}

// ==========================================
// 7. QUESTION PALETTE NAVIGATION
// ==========================================
function buildPalette() {
  paletteGrid.innerHTML = "";
  questions.forEach((_, idx) => {
    const item = document.createElement("button");
    item.className = "palette-btn";
    item.textContent = idx + 1;
    item.setAttribute("aria-label", `Jump to Question ${idx + 1}`);

    item.addEventListener("click", () => {
      loadQuestion(idx);
    });

    paletteGrid.appendChild(item);
  });
  updatePaletteHighlight();
}

function updatePaletteHighlight() {
  const buttons = paletteGrid.querySelectorAll(".palette-btn");
  let answeredCount = 0;

  buttons.forEach((btn, idx) => {
    btn.className = "palette-btn"; // reset classes

    if (userAnswers[idx] !== null) {
      btn.classList.add("answered");
      answeredCount++;
    }

    if (idx === currentQuestionIndex) {
      btn.classList.add("current");
    }
  });

  answeredCounter.textContent = `${answeredCount}/${questions.length} Answered`;
}

// ==========================================
// 8. COUNTDOWN TIMER SYSTEM
// ==========================================
function formatTime(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeRemaining--;

    timerDisplay.textContent = formatTime(timeRemaining);

    // Visual warning when less than 2 minutes remain (120s)
    if (timeRemaining <= 120 && !timerBadge.classList.contains("warning")) {
      timerBadge.classList.add("warning");
    }

    // Auto-submission at zero
    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      timeRemaining = 0;
      autoSubmitTest();
    }
  }, 1000);
}

function autoSubmitTest() {
  closeModal();
  alert("Time has expired! Your test is being submitted automatically.");
  finalizeTest();
}

// ==========================================
// 9. SUBMISSION & CONFIRMATION MODAL
// ==========================================
function openConfirmationModal() {
  const answeredTotal = userAnswers.filter(a => a !== null).length;
  const unansweredTotal = questions.length - answeredTotal;

  modalSummaryText.innerHTML = `You have answered <strong>${answeredTotal}</strong> of <strong>${questions.length}</strong> questions.<br>` +
    (unansweredTotal > 0 
      ? `<span style="color: var(--danger);">⚠️ ${unansweredTotal} question(s) remain unanswered.</span>`
      : `<span style="color: var(--success);">✓ You have answered all questions.</span>`);

  confirmModal.classList.add("active");
}

function closeModal() {
  confirmModal.classList.remove("active");
}

function finalizeTest() {
  if (isSubmitted) return; // Prevent duplicate submissions
  isSubmitted = true;
  clearInterval(timerInterval);
  testEndTime = new Date();

  closeModal();
  computeAndRenderResults();
  switchView("results");
}

// ==========================================
// 10. SCORING & RESULTS CALCULATION
// ==========================================
function computeAndRenderResults() {
  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;

  // Track category performance: { [category]: { total: 0, correct: 0 } }
  const categoryStats = {};

  questions.forEach((q, idx) => {
    if (!categoryStats[q.category]) {
      categoryStats[q.category] = { total: 0, correct: 0 };
    }
    categoryStats[q.category].total++;

    const userPick = userAnswers[idx];
    if (userPick === null) {
      unansweredCount++;
    } else if (userPick === q.correctIndex) {
      correctCount++;
      categoryStats[q.category].correct++;
    } else {
      incorrectCount++;
    }
  });

  // Calculate percentage
  const percentage = Math.round((correctCount / questions.length) * 100);

  // Time taken
  const secondsSpent = TEST_DURATION_SECONDS - timeRemaining;
  const spentMins = Math.floor(secondsSpent / 60);
  const spentSecs = secondsSpent % 60;

  // Populate Metric Cards
  metricCorrectNum.textContent = correctCount;
  metricIncorrectNum.textContent = incorrectCount;
  metricUnansweredNum.textContent = unansweredCount;
  metricTimeSpent.textContent = `${spentMins}m ${spentSecs}s`;
  scoreFraction.textContent = `${correctCount} of ${questions.length} Correct`;

  // Animate Circular Progress
  scorePercentageText.textContent = `${percentage}%`;
  // SVG circumference stroke-dasharray (dash, gap)
  setTimeout(() => {
    scoreCirclePath.setAttribute("stroke-dasharray", `${percentage}, 100`);
  }, 100);

  // Qualitative Feedback
  if (percentage >= 90) {
    feedbackHeading.textContent = "Exceptional Analytical Intelligence!";
    feedbackMessage.textContent = "You exhibited flawless deductive precision, numerical sequence mastery, and high-level reasoning.";
  } else if (percentage >= 75) {
    feedbackHeading.textContent = "Strong Cognitive Capability!";
    feedbackMessage.textContent = "You demonstrated robust problem-solving abilities and strong conceptual pattern agility.";
  } else if (percentage >= 50) {
    feedbackHeading.textContent = "Good Logical Foundation!";
    feedbackMessage.textContent = "You solved a majority of questions correctly. Targeted practice in complex sequences will elevate your score.";
  } else {
    feedbackHeading.textContent = "Practice Makes Progress!";
    feedbackMessage.textContent = "Review each solution below to reinforce deductive rules, analogy relationships, and math shortcuts.";
  }

  // Render Category Breakdown Bars
  categoryBarsList.innerHTML = "";
  Object.keys(categoryStats).forEach(cat => {
    const data = categoryStats[cat];
    const catPercent = Math.round((data.correct / data.total) * 100);

    const row = document.createElement("div");
    row.className = "category-row";
    row.innerHTML = `
      <div class="category-row-head">
        <span>${cat}</span>
        <span>${data.correct}/${data.total} (${catPercent}%)</span>
      </div>
      <div class="category-bar-bg">
        <div class="category-bar-fill" style="width: ${catPercent}%"></div>
      </div>
    `;
    categoryBarsList.appendChild(row);
  });
}

// ==========================================
// 11. REVIEW ANSWERS VIEW
// ==========================================
function renderReviewView() {
  reviewList.innerHTML = "";
  const optionLabels = ["A", "B", "C", "D"];

  questions.forEach((q, idx) => {
    const userPick = userAnswers[idx];
    const isCorrect = userPick === q.correctIndex;
    const isUnanswered = userPick === null;

    let verdictClass = "incorrect";
    let verdictText = "✗ Incorrect";

    if (isCorrect) {
      verdictClass = "correct";
      verdictText = "✓ Correct (+1)";
    } else if (isUnanswered) {
      verdictClass = "unanswered";
      verdictText = "― Unanswered (0)";
    }

    const card = document.createElement("div");
    card.className = `review-card ${verdictClass}`;

    let optionsMarkup = "";
    q.options.forEach((optText, optIdx) => {
      let pillClass = "review-option-pill";
      let statusTag = "";

      if (optIdx === q.correctIndex) {
        pillClass += " correct-pick";
        statusTag = " <strong>[Correct Answer]</strong>";
      }

      if (optIdx === userPick && !isCorrect) {
        pillClass += " user-pick";
        statusTag = " <strong>[Your Choice]</strong>";
      } else if (optIdx === userPick && isCorrect) {
        statusTag = " <strong>[Your Choice - Correct]</strong>";
      }

      optionsMarkup += `
        <div class="${pillClass}">
          <span>${optionLabels[optIdx]}. ${optText}</span>
          ${statusTag}
        </div>
      `;
    });

    card.innerHTML = `
      <div class="review-card-head">
        <span class="review-category">${idx + 1}. Category: ${q.category}</span>
        <span class="verdict-badge ${verdictClass}">${verdictText}</span>
      </div>
      <p class="review-question-text">${q.prompt}</p>
      <div class="review-options-summary">
        ${optionsMarkup}
      </div>
      <div class="explanation-box">
        <strong>Explanation:</strong> ${q.explanation}
      </div>
    `;

    reviewList.appendChild(card);
  });

  switchView("review");
}

// ==========================================
// 12. EVENT LISTENERS & HOOKS
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  // Navigation & Cta Triggers
  startTestBtn.addEventListener("click", () => switchView("instructions"));
  navActionBtn.addEventListener("click", () => switchView("instructions"));
  instructionBackBtn.addEventListener("click", () => switchView("home"));
  beginTestBtn.addEventListener("click", startTestSession);

  // Logo Return
  brandLogo.addEventListener("click", () => {
    if (timerInterval && !isSubmitted) {
      const confirmLeave = confirm("A test is currently underway. Do you want to leave and forfeit your current progress?");
      if (confirmLeave) {
        resetQuizState();
        switchView("home");
      }
    } else {
      switchView("home");
    }
  });

  // Quiz Interaction Buttons
  prevBtn.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
      loadQuestion(currentQuestionIndex - 1);
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
      loadQuestion(currentQuestionIndex + 1);
    }
  });

  clearAnswerBtn.addEventListener("click", clearCurrentAnswer);
  finishBtn.addEventListener("click", openConfirmationModal);

  // Modal Controls
  modalCancelBtn.addEventListener("click", closeModal);
  modalConfirmBtn.addEventListener("click", finalizeTest);

  // Results Controls
  reviewAnswersBtn.addEventListener("click", renderReviewView);
  retakeTestBtn.addEventListener("click", () => switchView("instructions"));
  returnHomeBtn.addEventListener("click", () => {
    resetQuizState();
    switchView("home");
  });

  // Review Screen Controls
  backToResultsBtn.addEventListener("click", () => switchView("results"));
  bottomBackResultsBtn.addEventListener("click", () => switchView("results"));

  // Keyboard accessibility: ESC closes modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && confirmModal.classList.contains("active")) {
      closeModal();
    }
  });
});