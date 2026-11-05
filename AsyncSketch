//this aims to create all profiles before the program starts.

async function initializeList() {
  let lines;

  lines = await loadStrings('./Data/profiles.txt');
  for (let line of lines) {
    let values = line.split(",");
    let userProfile = new Profile(
      values[0],
      values[1],
      values[2],
      values[3],
      values[4],
      values[5],
      values[6],
      values[7],
      values[8]
    );
    allProfiles.add(userProfile)
}
   console.log(lines);
}
