function load(){ // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
  //hides main elements of the game
  $('.set-name').hide();  
  $('.game-elements').hide()
    // Called function to update the name, happiness, and weight of our pet in our HTML
    checkAndUpdatePetInfoInHtml();
  
    // When each button is clicked, it will "call" function for that button (functions are below)
    $('.start-button').click(clickedStartPause); 
    $('.treat-button').click(clickedTreatButton);
    $('.play-button').click(clickedPlayButton);
    $('.exercise-button').click(clickedExerciseButton);
    $('.sleep-button').click(clickedSleepButton);
    $('.submit-name').click(clickSetName);
  
  }

  
  
    // Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
    var pet_info = {name:"", weight:"15", happiness:"7", energy:"100"}; //Pet name is empty to allow user to give the pet a name. Added Energy.
    const IMAGE = document.querySelector('.pet-image'); //stores the image location on the page as a const 
    var nameSet = false; //Used to keep track if pet has beem named by user
    
    function clickSetName() {
      //Set the pet's name to the value typed in the petname input
      let name = document.querySelector('#petname');
      pet_info.name = name.value;
      //Updates the pet's info and sets nameSet to true as pet has been named
      updatePetInfoInHtml()
      nameSet = true;
      //Hides set-name section has it is not needed
      $('.set-name').hide();
      //Toggles hide/show game elements using slideDown and slideUp
      $('.game-elements').is(":hidden") ? $('.game-elements').slideDown(500) : $('.game-elements').slideUp(500);
    }

    function clickedStartPause() {
      //Changed the text on the Start/Pause button depending on current state
      if ($('.start-button').text() != "Pause"){
        $('.start-button').text("Pause");
      } else {
        $('.start-button').text("Start");
      }
      //Shows set-name section if name has not been set and set-name is hidden
      $('.set-name').is(":hidden") && nameSet != true ? $('.set-name').slideDown(500) : $('.set-name').slideUp(500);
      //Shows game-elements if game-elements is hidden and name has been set
      $('.game-elements').is(":hidden") && nameSet != false ? $('.game-elements').slideDown(500) : $('.game-elements').slideUp(500);
    }
    
    //Changes the image to the default image and removes the text in the pet=message div after 3 seconds
    function setDefaultState(){
      setTimeout(function(){
        IMAGE.src ="https://cdn.glitch.global/fb4904b6-73a4-4827-b6ef-64a38ad1c878/panda.gif?v=1668285960622";
        $('.pet-message').text("");
      }, 3000);
    }
  
    function clickedTreatButton() {
      //Adds message signaling button was pressed
      $('.pet-message').text("Yummy!");
      //Plays audio signaling button was pressed
      new Audio("https://cdn.glitch.global/fb4904b6-73a4-4827-b6ef-64a38ad1c878/eating.mp3?v=1668308654608").play();
      //Changes image 
      IMAGE.src="https://cdn.glitch.global/fb4904b6-73a4-4827-b6ef-64a38ad1c878/panda-eating.gif?v=1668285988682";
      //Updates values
      pet_info.happiness = parseInt(pet_info.happiness) + 1;
      pet_info.weight = parseFloat(pet_info.weight) + 1;
      pet_info.energy = parseInt(pet_info.energy) + 5;
      checkAndUpdatePetInfoInHtml();
      setDefaultState();
    }
    
    function clickedPlayButton() {
      //Adds message signaling button was pressed
      $('.pet-message').text("Yay!");
      //Plays audio signaling button was pressed
      new Audio("https://cdn.glitch.global/fb4904b6-73a4-4827-b6ef-64a38ad1c878/cartoon-spin.mp3?v=1668308367491").play();
      //Changes image 
      IMAGE.src="https://cdn.glitch.global/fb4904b6-73a4-4827-b6ef-64a38ad1c878/panda-rolling.gif?v=1668287890937";
      //Updates values
      pet_info.happiness = parseInt(pet_info.happiness) + 1;
      pet_info.weight = parseFloat(pet_info.weight) - 0.5;
      pet_info.energy = parseInt(pet_info.energy) - 25;
      checkAndUpdatePetInfoInHtml();
      setDefaultState();
    }
    
    function clickedExerciseButton() {
      //Adds message signaling button was pressed
      $('.pet-message').text("Ahh!");
      //Plays audio signaling button was pressed
      new Audio("https://cdn.glitch.global/fb4904b6-73a4-4827-b6ef-64a38ad1c878/running.mp3?v=1668308226412").play();
      //Changes image 
      IMAGE.src="https://cdn.glitch.global/fb4904b6-73a4-4827-b6ef-64a38ad1c878/panda-exercise.gif?v=1668288042989";
      //Updates values
      pet_info.happiness = parseInt(pet_info.happiness) - 1;
      pet_info.weight = parseFloat(pet_info.weight) - 0.5;
      pet_info.energy = parseInt(pet_info.energy) - 50;
      
      checkAndUpdatePetInfoInHtml();
      setDefaultState();
    }

    function clickedSleepButton() {
      //Adds message signaling button was pressed
      $('.pet-message').text("ZZZzzzZZZ!");
      //Plays audio signaling button was pressed
      new Audio("https://cdn.glitch.global/fb4904b6-73a4-4827-b6ef-64a38ad1c878/snoring.mp3?v=1668308141896").play();
      //Changes image 
      IMAGE.src="https://cdn.glitch.global/fb4904b6-73a4-4827-b6ef-64a38ad1c878/panda-sleeping.gif?v=1668285991527";
      //Updates values
      pet_info.energy = 100;
      checkAndUpdatePetInfoInHtml();
      setDefaultState();
    }
  
    function checkAndUpdatePetInfoInHtml() {
      checkWeightAndHappinessBeforeUpdating();  
      updatePetInfoInHtml();
    }
    
    function checkWeightAndHappinessBeforeUpdating() {
      // Add conditional so if weight is lower than zero, set it back to zero
      //Set upper limit on energy and happiness. Set lower limit on weight.
      if (pet_info.happiness > 10){
        pet_info.happiness = 10;
      } 
      if (pet_info.happiness < 0) {
        pet_info.happiness = 0;
      }
      if (pet_info.weight < 0){
        pet_info.weight = 0;
      }
      if (pet_info.energy > 100){
        pet_info.energy = 100;
      }
      if (pet_info.energy < 0){
        pet_info.energy = 0;
      }
    }
    
    // Updates your HTML with the current values in your pet_info object
    function updatePetInfoInHtml() {
      $('.name').text(pet_info['name']);
      $('.weight').text(pet_info['weight']);
      $('.happiness').text(pet_info['happiness']);
      $('.energy').text(pet_info['energy']);
      //Disable certain actions if energy is too low. Disabled shown by change and color and cursor
      if (pet_info['energy'] < 50) {
        $('.exercise-button').prop('disabled', true); 
        $('.exercise-button').css( "background-color", "gray");
        $('.exercise-button').css("cursor", "not-allowed");
      } else {
        $('.exercise-button'). prop('disabled', false);
        $('.exercise-button').css( "background-color", "black");
        $('.exercise-button').css("cursor", "pointer");
      }
      if (pet_info['energy'] < 25) { 
        $('.play-button').prop('disabled', true)
        $('.play-button').css( "background-color", "gray");
        $('.play-button').css("cursor", "not-allowed");
      } else {
        $('.play-button').prop('disabled', false);
        $('.play-button').css( "background-color", "black");
        $('.play-button').css("cursor", "pointer");
      }

    }
  