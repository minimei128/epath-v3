(function () 
{
   var questionList = [{
     quizQuestion: "What is the capital city of Australia?",
     quizOption: ["Sydney", "Canberrra", "Perth", "Brisbane"],
     correctAnswer: 1
   },{
     quizQuestion: "The nearest planet from Sun is",
     quizOption: ["Earth", "Mars", "Mercury", "Venus"],
     correctAnswer: 2
   }];
 
 
 var counterForQuestion = 0;
 var optionSelected = [];
 var quizBtn = $('#quizButton');
   
 followUpQuestion();
   
 $('#next').click(function () 
   {
       answerSelectedCheck();
       if (isNaN(optionSelected[counterForQuestion])) 
       {
           alert('Do not forget to select an answer !');
       } 
       else 
       {
         counterForQuestion++;
         followUpQuestion();
       }
   });
 
 $('#prev').click(function () 
   {
       answerSelectedCheck();
       counterForQuestion--;
       followUpQuestion();
   });
 
 function optionCreater(index) 
   {
       var createdOptions = $('<div>',{id: 'question'});
       var header = $('<h2>Question Number ' + (index + 1) + ' :</h2>');
       createdOptions.append(header);

       var question = $('<p>').append(questionList[index].quizQuestion);
       createdOptions.append(question);

       var optionsInRadio = displayRadioOptions(index);
       createdOptions.append(optionsInRadio);

       return createdOptions;
   }
 
 function displayRadioOptions(index) 
   {
       var radioOptions = $('<ul>');
       var radioItems;
       var input = '';
       for (var i = 0; i < questionList[index].quizOption.length; i++) {
         radioItems = $('<li>');
         input = '<input type="radio" name="answer" value=' + i + ' />';
         input += questionList[index].quizOption[i];
         radioItems.append(input);
         radioOptions.append(radioItems);
       }
       return radioOptions;
 }
 
 function answerSelectedCheck() 
   {
       optionSelected[counterForQuestion] = +$('input[name="answer"]:checked').val();
   }
  
 function followUpQuestion() 
   {
       quizBtn.fadeOut(function() 
           {
             $('#question').remove();
             if(counterForQuestion < questionList.length)
               {
                   var nextQuestion = optionCreater(counterForQuestion);
                   quizBtn.append(nextQuestion).fadeIn();
                   if (!(isNaN(optionSelected[counterForQuestion]))) 
                   {
                     $('input[value='+optionSelected[counterForQuestion]+']').prop('checked', true);
                   }
                   if(counterForQuestion === 1)
                   {
                     $('#prev').show();
                   } 
                   else if(counterForQuestion === 0)
                   {
                     $('#prev').hide();
                     $('#next').show();
                   }
               }
             else 
               {
                   var scoreRslt = displayResult();
                   quizBtn.append(scoreRslt).fadeIn();
                   $('#next').hide();
                   $('#prev').hide();
               }
       });
   }
 
 function displayResult() 
   {
       var score = $('<p>',{id: 'question'});
       var correct = 0;
       for (var i = 0; i < optionSelected.length; i++) 
       {
         if (optionSelected[i] == questionList[i].correctAnswer) 
         {
           correct++;
         }
       }
       score.append('Your score is ' + correct + ' out of ' +questionList.length);
       return score;
 }
})();



