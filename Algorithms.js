class Algorithms {
  sortProfiles(profiles) { //slice() = creates an empty copy of the array for it to sort.
    return profiles.slice().sort((first, second) => {
      return (second.Compatibility || 0) - (first.Compatibility || 0);
    });
  }

  filterProfiles(profiles, userProfile) { //filtering the profiles based on the user's preferences, such as age range, location, and hobbies.
    const matches = [];

    console.log("In Filter Profiles");

    for (const profile of profiles) {
      const age = Number(profile.age);
      const ageMatches =
        age >= userProfile.preferences.minAge &&
        age <= userProfile.preferences.maxAge;

      const locationMatches =
        userProfile.preferences.preferredLocation === "" ||
        profile.placeOfResidence === userProfile.preferences.preferredLocation;

      const hobbies = [profile.hobby1, profile.hobby2, profile.hobby3];
      const hobbyMatches = [userProfile.hobby1, userProfile.hobby2, userProfile.hobby3];

      if (ageMatches && locationMatches && hobbyMatches) {
        matches.push(profile);
      }
    }

    return matches;
  }

  calculateMatches(userProfile, profiles) { //calclating the compatibility score for each profile based on the user's preferences and the profile's attributes. The compatibility score is calculated based on age, location, and hobbies.
    const matches = [];
    console.log("In Calculate Matches in Algoristhms.js");
    console.log("User profile is:", userProfile.name);
    console.log("How many profiles are there to check against?:", profiles.size);
    let CurrentNode = profiles.first;
    while(CurrentNode !== null) {
      let compatibility = 0;
      console.log("Checking against profile:", CurrentNode.data.name);

      const age = Number(CurrentNode.data.age);
      const hobbies = [CurrentNode.data.hobby1, CurrentNode.data.hobby2, CurrentNode.data.hobby3];

      if (
        age >= userProfile.preferences.minAge &&
        age <= userProfile.preferences.maxAge
      ) {
        compatibility += 30;
      }

      if (CurrentNode.data.placeOfResidence === userProfile.preferences.preferredLocation) {
        compatibility += 30;
      }

      if (CurrentNode.data.placeOfResidence === userProfile.placeOfResidence) {
        compatibility += 10;
      }

      if (hobbies.includes(userProfile.hobby)) {
        for(const hobby of hobbies) {
          if(hobby === userProfile.hobby) {
        compatibility += 10;
      }
        }
      }

      matches.push({
        ...CurrentNode.data,
        Compatibility: compatibility
      });

      CurrentNode = CurrentNode.next;
    }

    return this.sortProfiles(matches);
  }

  displayMatchResults(matches) {
    return matches;
  }
}
