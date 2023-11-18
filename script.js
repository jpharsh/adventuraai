const questions = [
    "Are you ready?",
    "Do you like traveling?",
    "Have you ever been to Europe?",
    "Do you enjoy trying new foods?",
    "Is coding fun for you?",
    "Have you ever climbed a mountain?",
  ];
  
  let currentQuestionIndex = 0;
  
  function answerQuestion(answer) {
    // Process the answer if needed (not implemented in this example)
    
    // Display the next question
    displayNextQuestion();
  }
  
  function displayNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      document.getElementById('question-text').innerText = questions[currentQuestionIndex];
    } else {
      // End of questions
      document.getElementById('question-container').innerHTML = '<p>Thank you for answering all the questions!</p>';
    }
  }
  