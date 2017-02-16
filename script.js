var state = 0; 
//0 is empty or func entered, 1 is number entered, 2 is period entered
//3 is when currently in dec
var input = "";

$(document).ready(function(){
    stateUpdate();
});

function numClick(number){
    input += number;
    $("#input").val( input );
    if ((state == 2)||(state == 3)){
        state = 3;
    } else {
        state = 1;
    }
    stateUpdate();
}

function opClick(opCode){
    if (opCode == 'clear'){
        input = "";
        $("#input").val( input );
        state = 0;
        stateUpdate();
    } else if ((opCode == '+')||(opCode == '-')||(opCode == '*')||(opCode == '/')) {
        input += opCode;
        $("#input").val( input );
        state = 0;
        stateUpdate();
    } else if (opCode == ".") {
        input += opCode;
        $("#input").val( input );
        state = 2;
        stateUpdate();
    } else if (opCode == "=") {
        var ans = eval(input);
        $("#output").val( ans );
        input = "";
        $("#input").val( input );
        state = 0;
        stateUpdate();
    }
}

function modeClick(){
    $("#mode").text("P");
}

function stateUpdate(){
    if (state == 0){
        $("[id=op]").attr("disabled", true);
        $("[id=dot]").attr("disabled", true);
    }else if (state == 1){
        $("[id=op]").attr("disabled", false);
        $("[id=dot]").attr("disabled", false);
    }else if (state == 2){
        $("[id=op]").attr("disabled", true);
        $("[id=dot]").attr("disabled", true);
    }else if (state == 3){
        $("[id=op]").attr("disabled", false);
        $("[id=dot]").attr("disabled", true);
    }
}