let stage = 0;

let usernameInput;
let passwordInput;
let loginMessage = "";
let q = new Questionnaires();
let profileManager = new ProfileManager();
let algorithms = new Algorithms();
let currentUserProfile = null;
let allProfiles = new LinkedList();
let profileData = [];
let matchedProfiles = [];
let currentMatchIndex = 0;
let acceptedHistory = [];
let rejectedHistory = [];
let matchStatusMessage = "";
let acceptButton = null;
let rejectButton = null;
let historyButton = null;
let backToMatchesButton = null;

function setup() {
  createCanvas(windowWidth, windowHeight);
  loadProfiles();
}

function draw() {
  if (stage == 0) {
    drawTitleScreen();
  } else if (stage == 1) {
    drawLoginScreen();
  } else if (stage == 2) {
    q.displayQuestions();
  } else if (stage == 3) {
    drawCalculatingScreen();
  } else if (stage == 4) {
    drawMatchedProfiles();
  } else if (stage == 5) {
    drawHistoryScreen();
  }
}

function drawTitleScreen() {
  background(0);
  textSize(60);
  fill(255);
  text("Find a PenPal", 125, 250);

  fill(0);
  strokeWeight(5);
  stroke(255);
  rect(125, 325, 400, 150);

  textSize(40);
  strokeWeight(1);
  fill(255);
  text("Click to LOGIN", 190, 410);
}

function drawLoginScreen() {
  background(255);

  fill(0);
  textSize(50);
  text("Login", 330, 100);

  textSize(25);
  text("Username:", 180, 200);
  text("Password:", 180, 300);

  stroke(0);
  strokeWeight(2);
  fill(0);
  rect(300, 420, 200, 70);

  fill(255);
  textSize(30);
  text("ENTER", 355, 465);
  fill(0);
  textSize(25);
  text(loginMessage, 250, 550);
}

function drawCalculatingScreen() {
  background(255);
  fill(0);
  textSize(42);
  textAlign(LEFT, CENTER);
  text("Calculating matches...", 80, height / 2 - 30);

  textSize(26);
  text("Please wait while we sort and filter your potential pen pals.", 80, height / 2 + 30);
}

function drawMatchedProfiles() {
  background(255);

  if (matchedProfiles.length === 0) {
    fill(0);
    textSize(36);
    text("No matches found.", 80, 120);
    return;
  }

  fill(0);
  textSize(30);
  text("Matches calculated!", 80, 40);

  let profile = matchedProfiles[currentMatchIndex];

  fill(0);
  textSize(40);
  text(profile.name, 80, 80);

  textSize(24);
  text("Age: " + profile.age, 80, 130);
  text("Location: " + profile.placeOfResidence, 80, 170);
  text("Hobbies: " + profile.hobby1 + ", " + profile.hobby2 + ", " + profile.hobby3, 80, 210);
  text("Likes: " + profile.likes, 80, 250);
  text("Compatibility: " + profile.Compatibility + "%", 80, 290);

  fill(0, 128, 0);
  rect(80, height - 120, 180, 60);
  fill(255);
  textSize(28);
  text("Accept", 135, height - 83);

  fill(180, 0, 0);
  rect(310, height - 120, 180, 60);
  fill(255);
  text("Reject", 365, height - 83);

  fill(0);
  textSize(20);
  text("Profile " + (currentMatchIndex + 1) + " of " + matchedProfiles.length, 80, height - 150);

  if (historyButton) {
    historyButton.remove();
  }
  historyButton = createButton("View History");
  historyButton.position(width - 190, height - 120);
  historyButton.mousePressed(() => {
    stage = 5;
    if (historyButton) historyButton.remove();
    if (acceptButton) acceptButton.remove();
    if (rejectButton) rejectButton.remove();
  });
}

function drawHistoryScreen() {
  background(255);
  fill(0);
  textSize(40);
  text("History", 80, 70);

  textSize(24);
  text("Accepted:", 80, 130);
  for (let i = 0; i < acceptedHistory.length; i++) {
    text("- " + acceptedHistory[i].name, 100, 170 + i * 30);
  }

  text("Rejected:", 480, 130);
  for (let i = 0; i < rejectedHistory.length; i++) {
    text("- " + rejectedHistory[i].name, 500, 170 + i * 30);
  }

  if (backToMatchesButton) {
    backToMatchesButton.remove();
  }
  backToMatchesButton = createButton("Back to Matches");
  backToMatchesButton.position(80, height - 80);
  backToMatchesButton.mousePressed(() => {
    stage = 4;
    if (backToMatchesButton) backToMatchesButton.remove();
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  if (stage == 0) {
    if (mouseX >= 125 && mouseX <= 525 && mouseY >= 325 && mouseY <= 475) {
    
      stage = 1;
      usernameInput = createInput();
      usernameInput.position(180, 215);
      usernameInput.size(390, 40);

      passwordInput = createInput();
      passwordInput.position(180, 315);
      passwordInput.size(390, 40);
      passwordInput.attribute("type", "text");
    }
  } else if (stage == 1) {
    if (mouseX >= 300 && mouseX <= 500 && mouseY >= 420 && mouseY <= 490) {
      checkLogin();
    }
  } else if (stage == 4) {
    if (mouseX >= 80 && mouseX <= 260 && mouseY >= height - 120 && mouseY <= height - 60) {
      storeDecision("accepted");
    }

    if (mouseX >= 310 && mouseX <= 490 && mouseY >= height - 120 && mouseY <= height - 60) {
      storeDecision("rejected");
    }
  }
}

function checkLogin() {
  let correctUsername = "User";
  let correctPassword = "1234";

  let username = usernameInput.value();
  let password = passwordInput.value();

  if (username == correctUsername && password == correctPassword) {
    loginMessage = "Correct!";
    setTimeout(function() {
      stage = 2;
      loginMessage = "";
      usernameInput.remove();
      passwordInput.remove();
    }, 2000);
  } else {
    loginMessage = "Username or password incorrect";
  }
}

function loadProfiles() {
  loadStrings("profiles.txt", function(lines) { //line loads the profiles.txt file. When the file is ready, it gives each line of the file to the function as lines, so the program can use the profile information.
    profileData = profileManager.loadProfilesFromText(lines);
    allProfiles = profileManager.allProfiles;
  });
}

function startMatchCalculation() {
  profileManager.saveCurrentUser(currentUserProfile);
  stage = 3;
  matchStatusMessage = "Calculating matches...";

  setTimeout(function() {
    calculateMatches();
    stage = 4;
    matchStatusMessage = "Matches calculated!";
  }, 1200);
}

function calculateMatches() {
  matchedProfiles = algorithms.calculateMatches(currentUserProfile, profileData);
  currentMatchIndex = 0;
}

function storeDecision(decision) { 
  if (currentMatchIndex >= matchedProfiles.length) {
    return;
  }

  let chosenProfile = matchedProfiles[currentMatchIndex];

  if (decision === "accepted") {
    acceptedHistory.push(chosenProfile);
  } else {
    rejectedHistory.push(chosenProfile);
  }

  currentMatchIndex++;

  if (currentMatchIndex >= matchedProfiles.length) {
    stage = 5;
    if (historyButton) historyButton.remove();
    if (acceptButton) acceptButton.remove();
    if (rejectButton) rejectButton.remove();
    return;
  }
}
