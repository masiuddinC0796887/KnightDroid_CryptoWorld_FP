$(function () {


    $(`#togglepaswd`).on('click', function (e) {
        console.log("sdfwreuihsdj");

        if ( $(`#togglepaswd`).prop('checked') ) {
           $(`#passWord`).prop('type','text');
        }else{
            $(`#passWord`).prop('type','password');
        }
    });

    $(`#togglecnfpaswd`).on('click', function (e) {
        console.log("sdfwreuihsdj");

        if ( $(`#togglecnfpaswd`).prop('checked') ) {
           $(`#confirmPassword`).prop('type','text');
        }else{
            $(`#confirmPassword`).prop('type','password');
        }
    });

    var form = true;
    console.log("ready");

   $(`#firstName`).focusout(function (e) { 
       checkname()
   });

   $(`#lastName`).focusout(function (e) { 
    checklastname()
    });

    $(`#email`).focusout(function (e) { 
        checkemail()
    });



function checkemail() {
    var v = $(`#email`).val();
    if (v == '' ) {
        $(`#erroremail`).html("please enter valid last name");
        $(`#email`).css('border-bottom', '1px solid red');
        $(`#erroremail`).css("color","red");
        form = false

    }else{
     $(`#erroremail`).hide();
     $(`#email`).css('border-bottom', '1px solid green');
     var form = true;
    }
}

function checklastname() {
    var v = $(`#lastName`).val();
    if (v == '') {
        $(`#errorlastName`).html("please enter valid last name");
        $(`#lastName`).css('border-bottom', '1px solid red');
        $(`#errorlastName`).css("color","red");
        form =false
    }else{
     $(`#errorlastName`).hide();
     $(`#lastName`).css('border-bottom', '1px solid green');
     var form = true;
    }
}

   function checkname() {
       var v = $(`#firstName`).val();
       if (v == '') {
           $(`#errorFirstName`).html("please enter valid name");
           $(`#firstName`).css('border-bottom', '1px solid red');
           $(`#errorFirstName`).css("color","red");
            form = false
       }else{
        $(`#errorFirstName`).hide();;
        $(`#firstName`).css('border-bottom', '1px solid green');
        var form = true;
       }
   }


    $("#formbtn").on("click", function () {
       console.log("sdfsfds");
       checkname();
       checklastname();
       checkemail();
       if (form) {
        //    registor();
        registor();
       }
        
    });

    var api_key = "AIzaSyAtHSQ6WaSr0XPEI9c9UTs0pokbwguB8RU"


    function adduser(id) {
        var email = $(`#email`).val();
        var name = $(`#firstName`).val();
        var lastname = $(`#lastName`).val();
        var data = {
            email:email,
            name:name,
            lastname:lastname
        };

        $.ajax({
            type: "PUT",
            url: `https://crytoworld-ad40f-default-rtdb.firebaseio.com/users/${id}/data.json`,
            data: JSON.stringify(data),
            success: function (response) {
                console.log(response);
                
            },
            error: function(e){
                console.log(e);
                alert(` something went wrong : ${e.responseJSON.error.message}`);
            }
        });
    }

    function registor() {
        var email = $(`#email`).val();
        var password = $(`#passWord`).val();
        var data = {
            email:email,
            password:password,
            returnSecureToken:true
        };
        $.ajax({
            type: "POST",
            url: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${api_key}`,
            data: JSON.stringify(data),
            dataType: "json",
            contentType:"application/json",
            success: function (response) {
                console.log(response);
                adduser(response.localId)
            },
            error:function (error) {
                console.log(error);
                alert(` something went wrong : ${error.responseJSON.error.message}`)
              }
            
        });
    }
});