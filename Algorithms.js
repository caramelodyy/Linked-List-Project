class Algorithms {
  constructor() {
   
  }
  
  sort() {} //sorts the LinkedList.

  calculateMatches() {} //Calculates the profile's matches with other profiles.

  filter() {} //deletes profiles that don't match in the profiles LinkedList. 

  displayMatchResults() {} //Displays the LinkedList that displays profiles that match.

  traversingTheListAndDisplay() {
    while(this.first !== null) {
      process.stdout.write(head..toString());
      if(head.next !== null) {
        process.stdout.write("->");
      }
      this.first = this.first.next
    }
    console.log();
  }
}
