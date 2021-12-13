$(function () {
    console.log("on ready");
    var form = true;

    $(`#email`).focusout(function (e) {
        checkemail()
    });

    $(`#password`).focusout(function (e) {
        checkpassword()
    });



    
    islogin()

    function islogin(params) {
        
    var api_key = "AIzaSyAtHSQ6WaSr0XPEI9c9UTs0pokbwguB8RU"


    var mystorage = window.localStorage;
    mytoken = mystorage.getItem("refreshToken");

    var somedata = {
        "grant_type":"refresh_token",
        "refresh_token":mytoken
    }
    $.ajax({
        type: "POST",
        url: `https://securetoken.googleapis.com/v1/token?key=${api_key}`,
        data: `grant_type=refresh_token&refresh_token=${mytoken}`,
        dataType: "json",
        ContentType: `application/x-www-form-urlencoded`,
        success: function (response) {
            console.log(mytoken);
            console.log("login");
            console.log(response);
            $(`.islogin`).show()
            // $(`.navlogin`).hide();
            // $(`.navregister`).hide();
            $(`#loginform`).html(" you are already login");
            
        },
        error:function (error) {
            console.log(error);
            $(`.islogin`).hide();
            $(`.navlogin`).show();
            $(`.navregister`).show();
          }
    });


    }



    $(`#togglepaswd`).on('click', function (e) {
        console.log("sdfwreuihsdj");

        if ( $(`#togglepaswd`).prop('checked') ) {
           $(`#password`).prop('type','text');
        }else{
            $(`#password`).prop('type','password');
        }
    });


    function checkemail() {
        var v = $(`#email`).val();
        if (v == '') {
            $(`#erroremail`).html("please enter valid last name");
            $(`#email`).css('border-bottom', '1px solid red');
            $(`#erroremail`).css("color", "red");
            form = false

        } else {
            $(`#erroremail`).hide();
            $(`#email`).css('border-bottom', '1px solid green');
            var form = true;
        }
    }


    function checkpassword() {
        var v = $(`#password`).val();
        if (v == '') {
            $(`#errorpassword`).html("please enter valid last name");
            $(`#password`).css('border-bottom', '1px solid red');
            $(`#errorpassword`).css("color", "red");
            form = false

        } else {
            $(`#errorpassword`).hide();
            $(`#password`).css('border-bottom', '1px solid green');
            var form = true;
        }
    }



    $("#loginbtn").on("click", function (e) {
        console.log("sdfsfds");
        checkemail();
        checkpassword();
        if (form) {
            //    registor();
            login();
        }

    });

    var api_key = "AIzaSyAtHSQ6WaSr0XPEI9c9UTs0pokbwguB8RU"

    var form;
    console.log("ready");


    $(`#emailid`).focusout(function (e) { 
        checkemail()
        checkemail1()
    });

    $(`#pass`).focusout(function (e) {
        checkpassword()
        checkpassword1()
    });


    function emailIsValid(email) {
        let pattern = /\S+@\S+\.\S+/;
        return pattern.test(email);
      }

    function checkemail1() {
    var v = $(`#emailid`).val();
    if (!emailIsValid(v)) {
        $(`#erroremail`).html("please enter a valid email");
        $(`#emailid`).css('border-bottom', '1px solid red');
        $(`#erroremail`).css("color","red");
        form = false

    }else{
     $(`#erroremail`).hide();
     $(`#emailid`).css('border-bottom', '1px solid green');
     var form = true;
    }
}

function checkpassword1() {
    var v = $(`#pass`).val();
    if (v = null || v == '' || v.length < 6) {
        $(`#errorpassword`).html("please enter a valid password");
        $(`#pass`).css('border-bottom', '1px solid red');
        $(`#errorpassword`).css("color","red");
         form = false
    }else{
     $(`#errorpassword`).hide();;
     $(`#pass`).css('border-bottom', '1px solid green');
     var form = true;
    }
}




    $("#signin").on("click", function () {
        console.log("sdfsfds");
        checkemail();
        checkpassword();
        if (form) {
         login();
        }
         
     });

    function login() {
        var email = $(`#email`).val();
        var password = $(`#password`).val();
        var data = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        $.ajax({
            type: "POST",
            url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${api_key}`,
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            success: function (response) {
                console.log(response);
                var mystorage = window.localStorage;

                mystorage.setItem("User", response.email);
                mystorage.setItem("expiresIn", response.expiresIn);
                mystorage.setItem("idToken", response.idToken,);
                mystorage.setItem("localId", response.localId,);
                mystorage.setItem("refreshToken", response.refreshToken); 
            },
            error: function (error) {
                console.log(error);
                alert(` something went wrong : ${error.responseJSON.error.message}`)
            }

        });
    }


});