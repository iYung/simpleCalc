var state = 0;
//INFIX
//0 is empty, 1 is not, 2 is number entered, 3 is when dec entered
//4 is dec mode
//RPN
//5 is IN EMPTY, OUT EMPTY; 6 is IN LOADED, OUT EMPTY; 7 is IN EMPTY, OUT LOADED
var input = "";
var output = "";

$(document).ready(function(){
    stateUpdate();
});

function numClick(number){
    //INFIX MODE
    if (state < 5){
        input += number;
        $("#input").val( input );
        if ((state == 3)||(state == 4)){
            state = 4;
        } else {
            state = 2;
        }
    //RPN MODE
    } else {
        input += number;
        $("#input").val( input );
        //out not loaded dec mode
        if ((state == 7)||(state == 8)){
            state = 8;
        //out loaded
        } else if ((state == 9)||(state == 10)) {
            state = 10;
        //out loaded dec mode
        } else if ((state == 11)||(state == 12)) {
            state = 12;
        //out not loaded
        } else {
            state = 6;
        }
    }
    stateUpdate();
}

function opClick(opCode){
    //INFIX MODE
    if (state < 5){
        if (opCode == 'clear'){
            input = "";
            $("#input").val( input );
            state = 0;
        } else if ((opCode == '+')||(opCode == '-')||(opCode == '*')||(opCode == '/')) {
            input += opCode;
            $("#input").val( input );
            state = 1;
        } else if (opCode == ".") {
            input += opCode;
            $("#input").val( input );
            state = 3;
        } else if (opCode == "=") {
            var ans = eval(input);
            output = ans;
            $("#output").val( ans );
            input = "";
            $("#input").val( input );
            state = 0;
        }
    //RPN MODE
    }else{
        if (opCode == 'clear'){
            input = "";
            $("#input").val( input );
            state = 5;
        }else if (opCode == "="){
            var ans = eval(input);
            output = ans;
            $("#output").val( ans );
            input = "";
            $("#input").val( input );
            state = 9;
        }else if (opCode == ".") {
            input += opCode;
            $("#input").val( input );
            //enter dec mode for unloaded
            if (state == 6){
                state = 7;
            //enter dec mode for loaded
            }else{
                state = 11;
            }
        }else if (opCode == 'clear') {
            input = "";
            $("#input").val( input );
            //loaded OUT
            if (state > 8){
                state = 9;
            //empty OUT
            }else{
                state = 5;
            }
        }else{
            var ans = eval(output + opCode + input);
            output = ans;
            $("#output").val( ans );
            input = "";
            $("#input").val( input );
            state = 9;
        }
    }
    stateUpdate();
}

function modeClick(){
    if (state < 5){
        output = "";
        $("#output").val( output );
        input = "";
        $("#input").val( input );
        state = 5;
    }else{
        output = "";
        $("#output").val( output );
        input = "";
        $("#input").val( input );
        state = 0;
    }
    stateUpdate();
}

function stateUpdate(){
    //INFIX Mode
    //EMPTY STATE
    if (state == 0){
        $("#mode").attr("disabled", false);
        $("#mode").text("INFIX");
        $("[id=op]").attr("disabled", true);
        $("#equal").attr("disabled", true);
        $("#dot").attr("disabled", true);
        $("#clear").attr("disabled", true);
    //NUM ENTERED, NOT EMPTY, OPs disallowed
    }else if (state == 1){
        $("[id=op]").attr("disabled", true);
        $("#equal").attr("disabled", true);
        $("#dot").attr("disabled", true);
        $("#clear").attr("disabled", false);
    //OPs allowed
    }else if (state == 2){
        $("[id=op]").attr("disabled", false);
        $("#equal").attr("disabled", false);
        $("#dot").attr("disabled", false);
        $("#clear").attr("disabled", false);
    //DECI STATE, current value has deci, funcs allowed
    }else if (state == 3){
        $("[id=op]").attr("disabled", true);
        $("#equal").attr("disabled", true);
        $("#dot").attr("disabled", true);
        $("#clear").attr("disabled", false);
    //DECI STATE, current value has deci
    }else if (state == 4){
        $("[id=op]").attr("disabled", false);
        $("#equal").attr("disabled", false);
        $("#dot").attr("disabled", true);
        $("#clear").attr("disabled", false);
    //RPN Mode
    //EMPTY STATE
    }else if(state == 5){
        $("#mode").text("RPN");
        $("[id=op]").attr("disabled", true);
        $("#equal").attr("disabled", true);
        $("#dot").attr("disabled", true);
        $("#clear").attr("disabled", true);
    //Value entered but not loaded
    }else if (state == 6){
        $("[id=op]").attr("disabled", true);
        $("#equal").attr("disabled", false);
        $("#dot").attr("disabled", false);
        $("#clear").attr("disabled", false);
    //unloaded dec pressed
    }else if (state == 7){
        $("[id=op]").attr("disabled", true);
        $("#equal").attr("disabled", true);
        $("#dot").attr("disabled", true);
    //unloaded dec mode
    }else if (state == 8){
        $("[id=op]").attr("disabled", true);
        $("#equal").attr("disabled", false);
        $("#dot").attr("disabled", true);
    //value loaded, IN empty
    }else if(state == 9){
        $("[id=op]").attr("disabled", true);
        $("#equal").attr("disabled", true);
        $("#dot").attr("disabled", true);
        $("#clear").attr("disabled", true);
    //value loaded, IN loaded
    }else if(state == 10){
        $("#clear").attr("disabled", false);
        $("[id=op]").attr("disabled", false);
        $("#equal").attr("disabled", false);
        $("#dot").attr("disabled", false);
    //loaded dec pressed
    }else if (state == 11){
        $("[id=op]").attr("disabled", true);
        $("#equal").attr("disabled", true);
        $("#dot").attr("disabled", true);
    //unloaded dec mode
    }else if (state == 12){
        $("[id=op]").attr("disabled", false);
        $("#equal").attr("disabled", false);
        $("#dot").attr("disabled", true);
    }
}