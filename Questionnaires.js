class Questionnaires
  {
    constructor() {
    this.name = "";
    this.age = 0;
    this.hobby = "";
    this.placeOfResidence = "";

    this.minAge = 0;
    this.maxAge = 100;
    this.preferredLocation = "";
  }

  displayQuestions() {
     let y = 60;
     fill(255);
      textSize(24);

      this.name = text("What is your name?", 50, y)
      y += 40;
      this.age = text("How old are you?", 50, y)
      y += 40;
      this.hobbies = text("What are your hobbies?", 50, y)
      y += 40;
      this.location = text("Where do you live?", 50, y)
      y += 40;
      this.preferredAgeRange = text("What is your preferred age range for a pen pal?", 50, y)
      y += 40;
      this.preferredLocation =text("What is your preferred location for a pen pal?", 50, y)
      y += 40;
  }

  recordAnswer(question, answer) {
    // Store an answer
    if (
      this.name == "" ||
      this.age <= 0 ||
      this.hobby == "" ||
      this.placeOfResidence == "" ||
      this.minAge <= 0 ||
      this.maxAge < this.minAge
    ) {
      return false;
    }

    return true;
  }

  validateAnswers() {
    // Check required answers
    if(this.name == ""||this.age<=0||this.hobby==""||this.placeOfResidence==""||this.minAge<=0||this.maxAge<this.minAge)
    {
      return false;
    }
    return true;
  }

  submitQuestionnaire() {
    // Submit answers and update profiles
    if(this.validateAnswers())
    {
      profile.name = this.name;
      profile.age = this.age;
      profile.hobby = this.hobby;
      profile.placeOfResidence = this.placeOfResidence;

      profile.preferences = {
        minAge: this.minAge, maxAge: this.maxAge, preferredLocation: this.preferredLocation};
      print("Profile Updated");
      }
    else {
      print("Please fill all information")
    }
  }
}