PennController.ResetPrefix(null)

// definitions of spr style
showWord = (arrayOfWords,showIndex) => "<p>" + 
  arrayOfWords.map( (word,n) => {
    const letters = word;  
    if (n==showIndex) return "<span>"+letters+"</span>";
    else return "<span style=\'border-bottom:solid 1px black;\'><span style='visibility: hidden;'>"+letters+"</span></span>";
  } ).join(" ") + "</p>"; 

dashed = (name, sentence) => {
    const words = sentence.split(" ");  
    return [  
        [ newText(name,showWord(words)).print("center at 40%", "center at 40%").center().css("font-family", "Courier").css("font-size","20px") ], 
        ...words.map( (word,index) => [
            newKey(name+"-"+index+"-"+word," ").log().wait(), 
            getText(name).text(showWord(words,index) ) 
        ]),
        [ newKey(name+"-last"," ").log().wait() ]
    ].flat(1);
}

//Sequence("consent",  "instruction","instruction2", "practice", randomizeNoMoreThan(anyOf("Match","Mismatch","Non-binary","Incongruent", "Congruent"),2), "surveyscreen", "survey", "bye",SendResults(),"exit")
Sequence("instruction1")
newTrial("instruction1",
    newText("<p>The survey is temporarily closed. Please close your browser to exit.</p>")
        .print()
        .center()
        .css("font-size","19px")
        .wait()
)


newTrial("consent",
    newHtml("consent form", "consent.html")
        .print()
,
 
    newText("   ")
        .print("center at 50%", "center at 130%")
        
,
    newButton("consent button", "By clicking this button I indicate my consent")
        .print()
        .center()
        .css("font-size","16px")
        .wait()
        .log()
        
        
).setOption("hideProgressBar", true)



// instruction block
newTrial("instruction",
    newText("<p>Welcome!</p>")
        .print()
        .center()
        .css("font-size","19px")
        
    ,
    newText("This is a reading experiment using a technique known as self-paced reading.")
        .print()
        .center()
        .css("font-size","19px")
    , 
    newText("<p>You will see a series of dashes representing the words, with spaces showing the gaps between them.</p>")
        .print()
        .center()
        .css("font-size","19px")
    ,
     newText("When you press the <b>Space</b> bar, the first word will replace the corresponding dash. ")
        .print()
        .center()
        .css("font-size","19px")
    ,
 
     newText("<p> Each press of the Space bar shows the next word and the previous word is hidden. </p> You will continue pressing the Space bar to finish the sentence. <p> ")
        .print()
        .center()
        .css("font-size","19px")
    ,
    
    
    newText('<p><p>Before you click on "Continue Reading", make sure you have entered full screen.</p></p>')
        .print()
        .center()
        .css("font-size","19px")
    ,

     newButton("Continue reading")
        .print()
        .center()
        .css("font-size","15px")
        .wait()
   
)


newTrial("instruction2",

    newText("<p>Your task is to read the sentence as quickly as possible while understanding it.</p>")
        .print()
        .center()
        .css("font-size","19px")
        ,
        
    newText("Occasionally, you will be asked a simple question about the sentence to check your <u>comprehension</u>, to which <p> you respond either <b>YES</b> by pressing the F key on your keyboard or <b>NO</b> by pressing the J key.</p>")
        .print()
        .center()
        .css("font-size","19px")
    ,
    //newText("The more correct responses you make, the more you will get paid.")
      //  .print()
    //    .center()
     //   .css("font-size","19px")
    //,
    
    newText("<p><p>We will begin with some practice sentences to get warmed up!</p></p>")
        .print()
        .center()
        .css("font-size","19px")
    , 
     newButton("Start practicing")
        .print()
        .center()
        .css("font-size","15px")
        .wait()
   
)

// practice trials (6 sents)
newTrial("practice",
    dashed("practice1", "Someone needs to stop procrastinating and get his act together.")
    ,
    getText("practice1").remove()
    ,
    dashed("practice2", "Everyone was feeling a bit under the weather that day.")
    ,
    getText("practice2").remove()
    ,
    newText("q1", "Was everyone feeling well that day?")
        .print("center at 47%","center at 40%")
        //.center()
        .css("font-size","22px")
    ,
    
    newText("yes", "Yes (F)").css("font-size","20px").print("center at 40%", "center at 50%")
    ,
    newText("no", "No (J)").css("font-size","20px").print("center at 60%", "center at 50%")
    ,
     
    newKey("keyQ", "FJ").wait()
    ,
    
    getText("q1").remove()
    ,
    getText("yes").remove()
    ,
    getText("no").remove()
  ,
    
    dashed("practice3", "I think that pizza is almost everyone's comfort food.")
    ,
    getText("practice3").remove()
    ,
    dashed("practice4", "Ideally, one should sleep for 8 hours a day.")
    ,
    getText("practice4").remove()
    ,
    newText("q2", "Is 8 hours of sleep good?")
        .print("center at 47%","center at 40%")
        .center()
        .css("font-size","22px")
    ,

    newText("yes1", "Yes (F)").css("font-size","20px").print("center at 40%", "center at 50%")
    ,
    newText("no1", "No (J)").css("font-size","20px").print("center at 60%", "center at 50%")
    ,    
  
    newKey("keyQ", "FJ").wait()
    ,
    
    getText("q2").remove()
    ,
    getText("yes1").remove()
    ,
    getText("no1").remove()
  ,
    dashed("practice5", "All people entitled to act according to their own free will.")
    ,
    getText("practice5").remove()
    
    ,
    newText("That's it! Now let's start the real experiment. <p/>")
        .print()
        .center()
        .css("font-size","19px")
    ,
    
    newText("The whole experiment takes about 20 minutes to finish. <p>Please try to complete it in one sitting (there will be breaks in between).</p>")
        .print()
        .center()
        .css("font-size","19px")
    ,

    newButton("Start the experiment")
        .print()
        .center()
        .css("font-size","15px")
        .wait()
)


// real experiment
Template("expfiller.csv" , row => 
  newTrial(row.Condition,
    newVar("breaks", 0).global().set(v=>v+1) // We will use this global Var element to insert a break (every 8 trials)
        .test.is(v => v%25 == 0 ) // tests the value of the Var element (insert a break at every 24th trial)
        .success(newText("break","<p>Please take a break now!</p> <p> When you are ready, press the button to continue. </p>") 
                .css("font-size","20px")
                .print()
                .log()
                .center()
            ,
         newButton("cont","Continue the experiment")
            .print()
            .center()
            .css("font-size","15px")
            .wait()
        ,
            
        getButton("cont").remove() // remove the break instruction and the button from the screen
        ,
        getText("break").remove()
        
        )
        ,
    newText("CompQ",row.Question).css("font-size","22px")
    ,
    newKey("keyQ", "FJ")
    ,
    newText("yes", "Yes (F)").css("font-size","20px")
    ,
    newText("no", "No (J)").css("font-size","20px")
    ,
    newText("Moveon", "Press the space bar to proceed.").css("font-size","20px")
    ,
    dashed("sentence", row.Sentence)
    ,
    getText("sentence").remove()
    , 
    (row.CompYN=="Y"? [ // if the item is associated with a comprehesion question, the question will be presented after the sentence
        getText("CompQ")
            .print("center at 50%", "center at 40%")
        ,
        getText("yes")
            .print("center at 40%", "center at 50%")
        ,
        getText("no")
            .print("center at 60%", "center at 50%")
        ,
        getKey("keyQ")
            .wait()
            .log()
        ]:[
         // if not, the next sentence will be shown
        ])

    )
    .log("Group",row.Group)
  //  .log("Condition" ,row.Condition)
    .log("Antecedent", row.Antecedent)
    .log("Gender", row.Gender)
    .log("Description", row.Description)
    .log("CompYN", row.CompYN)
    .log("CompR", row.CompR)
    .log("Filler", row.Filler)

)

newTrial("surveyscreen",
    newText("Congratulations! You have finished the sentence reading experiment. <p>Next, you will complete a short survey before we validate your participation.</p><p>The survey is anonymous so please answer honestly. </p>")
        .print()
        .css("font-size", "18px")
        .css("font-family", "Helvetica Neue")
        .center()
    ,
    
    newButton("surveybutton", "Start the survey")
        .print()
        .center()
        .css("font-size","18px")
        .css("font-family", "Helvetica Neue")
        .wait()
        .log()
        
)



newTrial("survey",
    newText("1", "<p><b>1. Did you learn any languages other than English before the age of 5? If yes, please list them </b></p>")
        .print()
        .css("font-size", "16px")
        .css("font-family", "Helvetica Neue")
    ,
    newTextInput("language", " ")
        .log()
        .print()
        .size(300,20)

    ,
    newText("2", "<p><b>2. What are your preferred gender pronouns?</b><div>(<i>Preferred gender pronoun is the pronoun that people choose to use for themselves. Please check everything that is relevant.</i>)</div></p>")
        .print()
        .css("font-size", "16px")
        .css("font-family", "Helvetica Neue")
    ,
    
     newTextInput("other","")
        .log()
        .before( newText("Other: ") )
        .size(150,20)
   ,
    newScale("pronouns", "He/Him/His", "She/Her/Hers", "They/Them/Theirs", "Ze/Hir", "Other:")
        .log()
        .vertical()
        .print()
        .css({"font-size": "16px", "font-family": "Helvetica Neue", "line-height": "2em"})
        .label(4, getTextInput("other"))
    
    ,
    
     newFunction( ()=> $(".PennController-pronouns input").each(function(i,e){
        $(e).attr("name","pronouns-"+i);
        $(e).click( ()=>{
            if ($(e).attr("toggle")==1) $(e).removeAttr("checked");
            $(e).attr("toggle", 1-($(e).attr("toggle")==1));
        });
    }) ).call()
    
    ,
    
     newText("knowledge", "<p><b>3. Do you know what gender neutral pronouns are? If yes, what are the ones you are familiar with?</b></p>")
        .print()
        .css("font-size", "16px")
        .css("font-family", "Helvetica Neue")
    ,
    
    newTextInput("pronounknowledge","")
        .log()
        .print()
        .size(300,20)
    ,
    
    newText("usage", "<p><b>4. On a scale of 1 to 5 how frequently do you use gender neutral pronouns in day to day conversations? </b></p>")
        .print()
        .css("font-size", "16px")
        .css("font-family", "Helvetica Neue")
    ,
    
    newScale("Ratingfreq", 5)
        .log()
        .vertical()
        .labelsPosition("right")
        .print()
        .css({"font-size": "16px", "font-family": "Helvetica Neue", "line-height": "2em"})
  
    ,
    
    newText("friends", "<p><b>5. How many people in your friend circle use gender neutral pronouns?</b></p>")
        .print()
        .css("font-size", "16px")
        .css("font-family", "Helvetica Neue")
    ,
    newScale("friendsuse", "Almost none",  "A few", "A lot", "Almost everyone")
        .log()
        .labelsPosition("right")
        .print()
        .vertical()
        .css({"font-size": "16px", "font-family": "Helvetica Neue", "line-height": "2em"})
        
    ,
    newText("interaction", "<p><b>6. How many of the people you interact with on a weekly basis (when school was in session) use gender neutral pronouns?</b></p>")
        .print()
        .css("font-size", "16px")
        .css("font-family", "Helvetica Neue")
    ,
    
    newScale("interaction", "Almost none",  "A few", "A lot", "Almost everyone")
        .log()
        .labelsPosition("right")
        .print()
        .vertical()
        .css({"font-size": "16px", "font-family": "Helvetica Neue", "line-height": "2em"})
    ,
    
    newButton("wait", "Next")
        .print()
        .center()
        .css("font-size","15px")
        .wait()
    ,
      newVar("selections")
        .set( v => new Array(...document.querySelectorAll(".PennController-pronouns input"))
            .filter(e=>e.checked)
            .map(e=>e.value)
            .join("+") 
        )
        .log()
        
  
        
)


newTrial("bye", 
    newText("Thank you for your participation. <p>Click the button to validate your participation!</p>")
        .center()
        .print()
        .css("font-size","18px")
    ,
      newButton("validate", "Validate")
        .print()
        .center()
        .css("font-size","18px")
        .wait()
        .log()
  
    )


newTrial("exit", 
    newText("<p>Please close your browser to exit the study.</p>")
        .center()
        .print()
        .css("font-size","18px")
    ,
      newButton("validate", "Validate")
        .wait()
        
  
    )
    
PennController.DebugOff()
