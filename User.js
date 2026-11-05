//A User owns a Profile and keeps track of matches
class User{
  constructor(id,username,proifle){
    this.id = id;
    this.username = username;
    this.profile = profile;
    this.matches = new LinkedList();

     this.interactionHistory = new LinkedList();

  let savedHistory = getItem("userHistory_" + this.id);

    if(savedHistory !==null){
      for (let i = 0; i<savedHistory.length; i++){
        this.interactionHistory.add(savedHistory[i])
  }
  }
  }

 recordInteraction(message) {
  let interaction = {
    dateTime: new Date().toLocaleString(),
    message: message
  };

  this.interactionHistory.add(interaction);

  let historyData = [];
  let current = this.interactionHistory.first;

  while (current != null) {
    historyData.push(current.data);
    current = current.next;
  }

  storeItem("userHistory_" + this.id, historyData);
}
}