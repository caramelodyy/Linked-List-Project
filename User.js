//A User owns a Profile and keeps track of matches
class User{
  constructor(id,username,proifle){
    this.id = id;
    this.username = username;
    this.profile = profile;
    this.matches = new LinkedList();

    this.interactionHistory = getItem("userHistory" + id);
  }

  recordInteraction(message)
  {
    const event = {
      dateTime: new Date().toLocaleString(), message:message
    };

    this.interactionHistory.push(event);

    storeItem("userHistory" + this.id, this.interactionHistory);
  }
}