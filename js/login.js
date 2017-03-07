class Validator {
    constructor(logPattern, passPattern){
        this.logPattern = logPattern;
        this.passPattern = passPattern;
        this.passValid = false;
        this.logValid = false;
        this.isValid = false;
    }
    checkPass(pass) {
        this.passValid = (pass.search(this.passPattern) === 0) ? true : false;
        return this;
    }   
    
    checkLog(log) {
        this.logValid = (log.search(this.logPattern) === 0) ? true : false;
        return this;
    }   

}

$(function () {
    const LOG_PATTERN = /^[a-zA-Z0-9_-]+@[a-z0-9-]+\.[a-z]{2,6}$/;
    const PASS_PATTERN = /^[a-zA-Z0-9]{8,}$/;
    const VALID_STYLE = 'validInput'; 
    const BUTTON_STYLE = 'activeButton';
    let checker = new Validator(LOG_PATTERN, PASS_PATTERN );
    let log = $('.login-block  #email');
    let pass = $('.login-block  #password');
    let buttonsFlag = false;

    $('.login-block').bind('keyup change click', function() {
        checker.checkPass(pass.val()).checkLog(log.val());
        checker.passValid ? $('.password-block').addClass(VALID_STYLE) :
            $('.password-block').removeClass(VALID_STYLE);
        checker.logValid ? $('.email-block').addClass(VALID_STYLE) :
            $('.email-block').removeClass(VALID_STYLE);
        
        if (checker.logValid && checker.passValid) {
            buttonsFlag = true;
            $('.login-block button').addClass(BUTTON_STYLE);
        }
        else {
            buttonsFlag = false;
            $('.login-block button').removeClass(BUTTON_STYLE);
        }
    }); 

    $('.login-block nav').click(function(e) {
        if ($(e.target).hasClass('signup-button') && buttonsFlag) {
            $('.login-block .tooltipe').text('Success! SIGN UP').show();
        }
        if ($(e.target).hasClass('signin-button') && buttonsFlag) {
            $('.login-block .tooltipe').text('Success! SIGN IN').show();
        }
    })
    
    $('.login-block button').on('blur', function(){
            $('.login-block .tooltipe').hide();
    })
})