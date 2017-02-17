var state = 0;
//INFIX
//0 is empty, 1 is not, 2 is number entered, 3 is period entered
//4 is when currently in dec
//RPN
//5 is empty, 6 is not
var input = "";

$(document).ready(function(){
    stateUpdate();
});

function numClick(number){
    //INFIX MODE
    if (state < 4){
        input += number;
        $("#input").val( input );
        if ((state == 3)||(state == 4)){
            state = 4;
        } else {
            state = 2;
        }
        stateUpdate();
    } else {
        
    }
}

function opClick(opCode){
    //INFIX MODE
    if (state < 4){
        if (opCode == 'clear'){
            input = "";
            $("#input").val( input );
            state = 0;
            stateUpdate();
        } else if ((opCode == '+')||(opCode == '-')||(opCode == '*')||(opCode == '/')) {
            input += opCode;
            $("#input").val( input );
            state = 1;
            stateUpdate();
        } else if (opCode == ".") {
            input += opCode;
            $("#input").val( input );
            state = 3;
            stateUpdate();
        } else if (opCode == "=") {
            var ans = eval(input);
            $("#output").val( ans );
            input = "";
            $("#input").val( input );
            state = 0;
            stateUpdate();
        }
    }else{
        
    }
}

function modeClick(){
    if (state == '0'){
        state = 5;
    }else{
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
        $("[id=dot]").attr("disabled", true);
    //NUM ENTERED, NOT EMPTY, OPs disallowed
    }else if (state == 1){
        $("#mode").attr("disabled", true);
        $("[id=op]").attr("disabled", true);
        $("[id=dot]").attr("disabled", true);
    //OPs allowed
    }else if (state == 2){
        $("#mode").attr("disabled", true);
        $("[id=op]").attr("disabled", false);
        $("[id=dot]").attr("disabled", false);
    //DECI STATE, current value has deci, funcs allowed
    }else if (state == 3){
        $("#mode").attr("disabled", true);
        $("[id=op]").attr("disabled", true);
        $("[id=dot]").attr("disabled", true);
    //DECI STATE, current value has deci
    }else if (state == 4){
        $("#mode").attr("disabled", true);
        $("[id=op]").attr("disabled", false);
        $("[id=dot]").attr("disabled", true);
    //RPN Mode
    //EMPTY STATE
    }else if(state == 5){
        $("#mode").attr("disabled", false);
        $("#mode").text("RPN");
        $("[id=op]").attr("disabled", true);
        $("[id=dot]").attr("disabled", true);
    }
}