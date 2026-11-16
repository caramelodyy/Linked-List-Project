//Represents a suggested match between two users
class Match{
  constructor(id,user1,user2,compatibilityScore)
  {
    this.id = id;
    this.user1 = user1;
    this.user2 = user2;
    this.compatibilityScore = compatibilityScore;
    this.status = "Suggested";
  }

  updateStatus() //Updates the status of the match to either "Accepted" or "Rejected" and records the interaction between the two users.
  {
    if(newStatus !== "Accepted" && newStatus !== "Rejected")
      return;

    if(newStatus !== "Accepted")
      return;

    this.status = newStatus; //shows up a message to the user indicating that they have matched with the other user and the status of the match. 
    //It also records the interaction between the two users and their profiles in local storage.


    storeItem("match_" + this.id, { //storing a history of the matches made.
      id: this.id,
      user1Id: this.user1.id,
      user2Id: this.user2.id,
      compatibilityScore: this.compatibilityScore,
      dateTime: this.dateTime,
      status: this.status
    });
  }
  
}