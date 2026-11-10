class ProfileManager {
  constructor() {
    this.allProfiles = new LinkedList();
    this.acceptedProfiles = new LinkedList();
    this.rejectedProfiles = new LinkedList();
    this.currentUserProfile = null;
    this.nextId = 1;
  }



  loadProfilesFromText(lines) { //getting profile data from the txt file.
    this.allProfiles = new LinkedList();
    console.log("Loading profiles from text...");
    for (let line of lines) {
      if (!line.trim()) continue;
   
      let values = line.split(",");
      values = values.map((value) => {
        value = value.trim(); //trim removes whitespace from both ends of a string.
     //console.log("Processing value:", value);
        if (value.startsWith('"')) {
          value = value.substring(1); //substring takes the text from the first character to the last character of the string.
        }

        if (value.endsWith('"')) {
          value = value.substring(0, value.length - 1);
        }

        return value;
      });

      if (values.length >= 9) {
        const profile = new Profile(
          values[0],
          values[1],
          values[2],
          Number(values[3]) || 0,
          values[4],
          values[5],
          values[6],
          values[7],
          values[8]
        );

        this.allProfiles.add(profile);
        console.log("Profile added:", profile.name);
        console.log("Current number of profiles:", this.allProfiles.size);
      }
    }
  }

  addNewProfile(profileData) {
    const profile = new Profile(
      this.nextId,
      "default",
      profileData.name,
      profileData.age,
      profileData.hobby,
      "",
      "",
      profileData.placeOfResidence,
      profileData.preferences.preferredLocation
    );

    this.nextId++;
    this.allProfiles.add(profile);
    return profile;
  }

  saveCurrentUser(profileData) {
    this.currentUserProfile = profileData;
  }

  validateProfile(profile) {
    if (!profile) return false;
    if (!profile.name || profile.name === "") return false;
    if (!profile.age || profile.age <= 0) return false;
    if (!profile.hobby || profile.hobby === "") return false;
    if (!profile.placeOfResidence || profile.placeOfResidence === "") return false;
    if (!profile.preferences) return false;
    if (!profile.preferences.preferredLocation || profile.preferences.preferredLocation === "") return false;
    return true;
  }

  getAllProfiles() {
    return this.allProfiles.getFromArray();
  }

  addAccepted(profile) {
    this.acceptedProfiles.add(profile);
  }

  addRejected(profile) {
    this.rejectedProfiles.add(profile);
  }
}
