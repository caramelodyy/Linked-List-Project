class Questionnaires {
  constructor() {
    this.name = "";
    this.age = 0;
    this.hobby = "";
    this.placeOfResidence = "";

    this.minAge = 18;
    this.maxAge = 80;
    this.preferredLocation = "";

    this.hobbyOptions = [];
    this.locationOptions = [];
    this.ageOptions = [];
    this.formBuilt = false;
    this.optionsLoaded = false;
  }

  loadProfileOptions() {
    if (this.optionsLoaded) {
      return;
    }

    loadStrings("profiles.txt", (lines) => {
      const hobbySet = new Set();
      const locationSet = new Set();
      const ageSet = new Set();

      for (let line of lines) {
        if (!line.trim()) {
          continue;
        }

        let values = line.split(",");
        values = values.map((value) => value.trim().replace(/^"|"$/g, ""));

        if (values.length >= 8) {
          hobbySet.add(values[4]);
          hobbySet.add(values[5]);
          hobbySet.add(values[6]);
          locationSet.add(values[7]);
        }

        if (values.length >= 4 && Number(values[3])) {
          ageSet.add(Number(values[3]));
        }
      }

      this.hobbyOptions = [...hobbySet].filter(Boolean).sort();
      this.locationOptions = [...locationSet].filter(Boolean).sort();
      this.ageOptions = [...ageSet].filter(Number.isFinite).sort((a, b) => a - b);

      this.optionsLoaded = true;
      this.buildForm();
    });
  }

  buildForm() {
    if (this.formBuilt || typeof createSelect !== "function") {
      return;
    }

    this.nameInput = createInput();
  this.nameInput.position(60, 80);
  this.nameInput.size(320, 40);
  this.nameInput.style("font-size", "22px");
  this.nameInput.input(() => {
    this.name = this.nameInput.value();
  });

  this.ageSelect = createSelect();
  this.ageSelect.position(60, 180);
  this.ageSelect.size(180, 40);
  this.ageSelect.style("font-size", "20px");
  this.ageSelect.option("Choose age");
  for (let age of this.ageOptions) {
    this.ageSelect.option(String(age));
  }
  this.ageSelect.changed(() => {
    this.age = Number(this.ageSelect.value()) || 0;
  });

  this.hobbySelect = createSelect();
  this.hobbySelect.position(60, 280);
  this.hobbySelect.size(360, 40);
  this.hobbySelect.style("font-size", "20px");
  this.hobbySelect.option("Choose a hobby");
  for (let hobby of this.hobbyOptions) {
    this.hobbySelect.option(hobby);
  }
  this.hobbySelect.changed(() => {
    this.hobby = this.hobbySelect.value();
  });

  this.locationSelect = createSelect();
  this.locationSelect.position(60, 380);
  this.locationSelect.size(360, 40);
  this.locationSelect.style("font-size", "20px");
  this.locationSelect.option("Choose a location");
  for (let location of this.locationOptions) {
    this.locationSelect.option(location);
  }
  this.locationSelect.changed(() => {
    this.placeOfResidence = this.locationSelect.value();
  });

  this.minAgeSelect = createSelect();
  this.minAgeSelect.position(60, 480);
  this.minAgeSelect.size(140, 40);
  this.minAgeSelect.style("font-size", "20px");
  this.minAgeSelect.option("Min");
  for (let age of this.ageOptions) {
    this.minAgeSelect.option(String(age));
  }
  this.minAgeSelect.changed(() => {
    this.minAge = Number(this.minAgeSelect.value()) || 0;
  });

  this.maxAgeSelect = createSelect();
  this.maxAgeSelect.position(240, 480);
  this.maxAgeSelect.size(140, 40);
  this.maxAgeSelect.style("font-size", "20px");
  this.maxAgeSelect.option("Max");
  for (let age of this.ageOptions) {
    this.maxAgeSelect.option(String(age));
  }
  this.maxAgeSelect.changed(() => {
    this.maxAge = Number(this.maxAgeSelect.value()) || 0;
  });

  this.preferredLocationSelect = createSelect();
  this.preferredLocationSelect.position(60, 580);
  this.preferredLocationSelect.size(360, 40);
  this.preferredLocationSelect.style("font-size", "20px");
  this.preferredLocationSelect.option("Choose a preferred location");
  for (let location of this.locationOptions) {
    this.preferredLocationSelect.option(location);
  }
  this.preferredLocationSelect.changed(() => {
    this.preferredLocation = this.preferredLocationSelect.value();
  });

  this.formBuilt = true;
}

displayQuestions() {
  if (!this.optionsLoaded) {
    this.loadProfileOptions();
    return;
  }

  if (!this.formBuilt) {
    this.buildForm();
  }

  background(255);
  fill(0);
  textSize(30);

  text("What is your name?", 60, 60);
  text("How old are you?", 60, 160);
  text("What are your hobbies?", 60, 260);
  text("Where do you live?", 60, 360);
  text("What is your preferred age range?", 60, 460);
  text("What is your preferred location?", 60, 560);
}

  recordAnswer(question, answer) {
    if (question === "name") {
      this.name = answer;
    } else if (question === "age") {
      this.age = Number(answer) || 0;
    } else if (question === "hobby") {
      this.hobby = answer;
    } else if (question === "placeOfResidence") {
      this.placeOfResidence = answer;
    } else if (question === "preferredLocation") {
      this.preferredLocation = answer;
    }

    return this.validateAnswers();
  }

  validateAnswers() {
    if (this.name === "" || this.age <= 0 || this.hobby === "" || this.placeOfResidence === "" || this.minAge <= 0 || this.maxAge < this.minAge) {
      return false;
    }
    return true;
  }

  submitQuestionnaire() {
    if (this.validateAnswers()) {
      profile.name = this.name;
      profile.age = this.age;
      profile.hobby = this.hobby;
      profile.placeOfResidence = this.placeOfResidence;

      profile.preferences = {
        minAge: this.minAge,
        maxAge: this.maxAge,
        preferredLocation: this.preferredLocation
      };
      print("Profile Updated");
    } else {
      print("Please fill all information");
    }
  }
}