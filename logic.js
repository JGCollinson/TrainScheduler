var config = {
  apiKey: "AIzaSyCGCkrDSGAlgn7ta7qmSlqPcewuWTugcmY",
  authDomain: "jgcollinson-159019.firebaseapp.com",
  databaseURL: "https://jgcollinson-159019.firebaseio.com",
  projectId: "jgcollinson-159019",
  storageBucket: "",
  messagingSenderId: "57457702432"
};
firebase.initializeApp(config);
var database = firebase.database();
$("#addTrainButton").on("click", function(event) {
  event.preventDefault();
  var trainName = $("#trainNameInput")
    .val()
    .trim();
  var trainDestination = $("#destinationInput")
    .val()
    .trim();
  var firstTrainTime = $("#firstTrainTimeInput")
    .val()
    .trim();
  var trainFrequency = $("#frequencyInput")
    .val()
    .trim();

  var newTrain = {
    name: trainName,
    destination: trainDestination,
    trainTime: firstTrainTime,
    frequency: trainFrequency
  };
  database.ref().push(newTrain);
  alert("Train succesfully added");

  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#firstTrainTimeInput").val("");
  $("#frequencyInput").val("");
});
function refreshData() {
$("#trainTable > tbody").empty()
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var firstTrainTime = childSnapshot.val().trainTime;
  var trainFrequency = childSnapshot.val().frequency;
  var currentTime = moment().format("hh:mm A");
  var firstTrainTimeConvert = moment(firstTrainTime, "hh:mm A").subtract(
    1,
    "years"
  );
  var diffTime = moment().diff(moment(firstTrainTimeConvert), "minutes");
  var remainder = diffTime % trainFrequency;
  var minutesAway = trainFrequency - remainder;
  var nextArrival = moment()
    .add(minutesAway, "minutes")
    .format("hh:mm");
    $("#trainTable > tbody").append(
      "<tr><td>" +
        trainName +
        "</td><td>" +
        trainDestination +
        "</td><td>" +
        trainFrequency +
        "</td><td>" +
        nextArrival +
        "</td><td id='minaway'>" +
        minutesAway +
        "</td></tr>"
    )
  }
)}
  refreshData();
  intervalId = setInterval(refreshData, 1000);

  // $("#trainTable > tbody").append(
  //   "<tr><td>" +
  //     trainName +
  //     "</td><td>" +
  //     trainDestination +
  //     "</td><td>" +
  //     trainFrequency +
  //     "</td><td>" +
  //     nextArrival +
  //     "</td><td>" +
  //     minutesAway +
  //     "</td></tr>"
  // );
