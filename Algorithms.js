class Algorithms {
  constructor() {
    this.age = 0;
    this.hobby = "";
    this.areaOfResidence = "";
  }

  sortProfiles(profiles) {
    return [...profiles].sort((a, b) => (b.Compatibility || 0) - (a.Compatibility || 0));
  }

  filterProfiles(profiles, userProfile) {
    return profiles.filter((profile) => {
      const ageMatch = profile.age >= userProfile.preferences.minAge && profile.age <= userProfile.preferences.maxAge;
      const locationMatch = userProfile.preferences.preferredLocation === "" || profile.placeOfResidence === userProfile.preferences.preferredLocation;
      const hobbyMatch = [profile.hobby1, profile.hobby2, profile.hobby3].includes(userProfile.hobby);

      return ageMatch && locationMatch && hobbyMatch;
    });
  }

  calculateMatches(userProfile, profiles) {
    const results = profiles.map((profile) => {
      let score = 0;

      if (profile.age >= userProfile.preferences.minAge && profile.age <= userProfile.preferences.maxAge) {
        score += 30;
      }

      if (profile.placeOfResidence === userProfile.preferences.preferredLocation) {
        score += 35;
      }

      if (profile.placeOfResidence === userProfile.placeOfResidence) {
        score += 10;
      }

      if ([profile.hobby1, profile.hobby2, profile.hobby3].includes(userProfile.hobby)) {
        score += 25;
      }

      const profileHobbies = [profile.hobby1, profile.hobby2, profile.hobby3].map((hobby) => hobby.toLowerCase());
      if (profileHobbies.includes(userProfile.hobby.toLowerCase())) {
        score += 20;
      }

      return {
        ...profile,
        Compatibility: score
      };
    });

    return this.sortProfiles(results.filter((profile) => profile.Compatibility > 0));
  }

  displayMatchResults(matches) {
    return matches;
  }
}
