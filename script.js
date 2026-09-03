/*
    Meow34 Calculator Engine
    Version: 1.1

    Features:
    - Safe math parser
    - Keyboard controls
    - Secret combinations
    - Error protection
*/



const expressionDisplay =
document.getElementById("expression");

const resultDisplay =
document.getElementById("result");



let expression = "";

let secretBuffer = [];

// Following secretcommands are for opening quality maths algebra and graph worksheets

const secretCommands = { // 1M

    "1,2,0,6,+,ENTER":

    function(){

        window.open(
            "/homework/W1206.html",
            "_blank"
        );

    },
    
    "1,1,4,4,+,ENTER":

    function(){

        window.open(
            "./homework/W1144.html",
            "_blank"
        );

    },

    "1,1,+,ENTER":

    function(){

        window.open(
            "./homework/PW1122.html",
            "_blank"
        );

    },

    "1,2,+,ENTER":

    function(){

        window.open(
            "./homework/Resent51.html",
            "_blank"
        );

    },

    "1,3,+,ENTER":

    function(){

        window.open(
            "./homework/TBS.html",
            "_blank"
        );

    },

    "1,4,+,ENTER":

    function(){
        

        window.open(
            "./homework/Tuff14.html",
            "_blank"
        );

    },
    "1,5,+,ENTER":

    function(){

        window.open(
            "./homework/WModern.html",
            "_blank"
        );

    },

    "1,9,9,ENTER":

    function(){

        resultDisplay.textContent =
        "Developer Mode";

        console.log(
            "Meow34 Maths Check success - Maths operational!"
        );

    },



    /*
        Space theme - Maths
    */

    "1,6,6,2,5,ENTER":

    function(){

        alert("Systems Working ;)")

    }

};





function registerSecret(input){


    secretBuffer.push(input);



    let current =
    secretBuffer.join(",");



    for(
        let code in secretCommands
    ){


        if(
            current.endsWith(code)
        ){


            secretCommands[code]();



            // clean everything
            secretBuffer = [];


            return;

        }


    }




    /*
        Prevent memory buildup
    */

    if(secretBuffer.length > 20){

        secretBuffer.shift();

    }

}






/*
================================================
DISPLAY
================================================
*/


function updateDisplay(){


    expressionDisplay.textContent =
    expression;


    resultDisplay.textContent =
    expression || "0";


}






/*
================================================
INPUT
================================================
*/


function addValue(value){



    const operators =
    [
        "+",
        "-",
        "*",
        "/"
    ];



    const last =
    expression.slice(-1);




    // prevent double operators

    if(
        operators.includes(value)
        &&
        operators.includes(last)
    ){

        expression =
        expression.slice(0,-1);

    }



    // prevent multiple decimals

    if(value === "."){


        let parts =
        expression.split(/[\+\-\*\/]/);


        let currentNumber =
        parts[parts.length-1];



        if(
            currentNumber.includes(".")
        ){

            return;

        }


    }




    expression += value;



    updateDisplay();


}






function clearCalculator(){


    expression = "";


    updateDisplay();


}






function deleteLast(){


    expression =
    expression.slice(0,-1);


    updateDisplay();


}







/*
================================================
SAFE CALCULATOR BRAIN
================================================
*/


function calculate(){


    try{


        if(!expression){

            return;

        }




        let input =
        expression;



        // percent conversion

        input =
        input.replace(
            /(\d+(\.\d+)?)%/g,
            "($1/100)"
        );




        const tokens =
        tokenize(input);



        const answer =
        parse(tokens);




        if(
            !Number.isFinite(answer)
        ){

            throw Error();

        }




        expressionDisplay.textContent =
        expression + " =";



        resultDisplay.textContent =
        formatNumber(answer);



        expression =
        String(
            formatNumber(answer)
        );



    }

    catch{


        expression = "";


        resultDisplay.textContent =
        "Error";


        setTimeout(()=>{

            updateDisplay();

        },1200);


    }


}






function formatNumber(number){


    return Number(
        number.toFixed(10)
    );


}







function tokenize(input){


    const tokens =
    input.match(
        /\d*\.?\d+|[+\-*/]/g
    );



    if(!tokens){

        throw Error();

    }



    return tokens;


}







function parse(tokens){



    let index = 0;



    function primary(){


        let value =
        tokens[index++];



        if(
            value === undefined
        ){

            throw Error();

        }



        return Number(value);


    }







    function multiply(){


        let value =
        primary();



        while(

            tokens[index] === "*"

            ||

            tokens[index] === "/"

        ){


            let operator =
            tokens[index++];



            let next =
            primary();



            if(operator === "*"){

                value *= next;

            }

            else{


                if(next === 0){

                    throw Error();

                }


                value /= next;


            }


        }



        return value;


    }







    function add(){


        let value =
        multiply();




        while(

            tokens[index] === "+"

            ||

            tokens[index] === "-"

        ){



            let operator =
            tokens[index++];



            let next =
            multiply();




            if(operator === "+"){

                value += next;

            }

            else{

                value -= next;

            }



        }




        return value;


    }




    return add();


}









/*
================================================
BUTTON EVENTS
================================================
*/


document
.querySelectorAll("button")
.forEach(button=>{


    button.addEventListener(
    "click",
    ()=>{


        const value =
        button.dataset.value;


        const action =
        button.dataset.action;



        if(value){


            addValue(value);


            registerSecret(value);


        }




        if(action==="clear"){


            clearCalculator();


        }




        if(action==="delete"){


            deleteLast();


        }




        if(action==="calculate"){


            registerSecret(
                "ENTER"
            );


            calculate();


        }


    });


});









/*
================================================
KEYBOARD EVENTS
================================================
*/


document.addEventListener(
"keydown",
event=>{


    const key =
    event.key;



    if(
        /^[0-9]$/.test(key)
    ){


        addValue(key);


        registerSecret(key);


    }




    else if(
        ["+","-","*","/"].includes(key)
    ){


        addValue(key);


        registerSecret(key);


    }




    else if(key === "."){


        addValue(".");


        registerSecret(".");


    }





    else if(key==="Enter"){


        registerSecret(
            "ENTER"
        );


        calculate();


    }




    else if(key==="Backspace"){


        deleteLast();


    }




    else if(key==="Escape"){


        clearCalculator();


    }





    else if(
        key.toLowerCase()===" "
    ){

        registerSecret(
            "SPACE"
        );

    }


});






updateDisplay();
