$(function(){
    function convert(currency, mainCurrency ,rate) {
        let result = Math.round(mainCurrency.val()/rate);
        currency.val(result);
        return result;
    }


    function addNewCurrency() {  
        $('.currency-list').append('<li>');
        let listItem = $('.currency-list')
            .children()
            .last();
        listItem.append('<div>')
            .append('<input id = "cny" maxlength="5">')
            .append('<label>&#165</label>');
        listItem.find("div")
            .append('<p>CNY</p>')
            .addClass('currency-name');
        listItem.find("label")
            .attr("for", "cny");
        listItem.find("input")
            .addClass('currency-input cny')
            .attr("type", "text")
    }

    function newCurrencyInit(currency, rate) {
        convert(currency, $('#usd'), rate);
        let outputLength = currency.val().length;
        if (currency.val() > 99999) {
            currency.val('99999+')
        }
        currency.width(outputLength * 25);
    }
    
    function undateValuesUSD() {
        let outputLengthGBR;
        let outputLengthCNY;
        let inputLength = $('#usd').val().length;

        convert($('#gbr'), $('#usd'), 0.8);
        outputLengthGBR = $('#gbr').val().length;
        
        if ($('#gbr').val() > 99999) {
            $('#gbr').val('99999+')
        }

        if ($('#cny').val()) {
            convert($('#cny'), $('#usd'), 0.69);
            outputLengthCNY = $('#cny').val().length;
            if ($('#cny').val() > 99999) {
                $('#cny').val('99999+')
            }
            $('#cny').width(outputLengthCNY * 25);
        }

        $('#usd').width(inputLength * 25);
        $('#gbr').width(outputLengthGBR * 25);
    }
    
    function undateValuesCNY() {
        let LengthGBR;
        let LengthCNY = $('#cny').val().length;
        let LengthUSD;

        convert($('#gbr'), $('#cny'), 1.16);
        LengthGBR = $('#gbr').val().length;
        
        convert($('#usd'), $('#cny'), 1.45);
        LengthUSD = $('#usd').val().length;

        if ($('#gbr').val() > 99999) {
            $('#gbr').val('99999+')
        }
        
        if ($('#usd').val() > 99999) {
            $('#usd').val('99999+')
        }

        $('#usd').width(LengthUSD * 25);
        $('#gbr').width(LengthGBR * 25);
        $('#cny').width(LengthCNY * 25);
    }
    

    function undateValuesGBR() {
        let LengthGBR = $('#gbr').val().length;
        let LengthCNY;
        let LengthUSD;

        if ($('#cny').val()) {
            convert($('#cny'), $('#gbr'), 0.862);
            outputLengthCNY = $('#cny').val().length;
            if ($('#cny').val() > 99999) {
                $('#cny').val('99999+')
            }
            $('#cny').width(outputLengthCNY * 25);
        }
        
        convert($('#usd'), $('#gbr'), 1.25);
        LengthUSD = $('#usd').val().length;

        if ($('#usd').val() > 99999) {
            $('#usd').val('99999+')
        }

        $('#usd').width(LengthUSD * 25);
        $('#gbr').width(LengthGBR * 25);
        $('#cny').width(LengthCNY * 25);
    }

    $('.currency-list').keyup(function(e) {
        if ($(e.target).hasClass('usd')) {
            undateValuesUSD();
        }
        if ($(e.target).hasClass('gbr')) {
            undateValuesGBR();
        }
        if ($(e.target).hasClass('cny')) {
            undateValuesCNY();
        }
    })

    

    $('.currency-list').on('mouseleave blur', function(){
        if (!$('#usd').val().length ||  
            !$('#gbr').val().length   ) {
    
            $('.currency-input').width(25);
            $('#usd').val(0);
            $('#gbr').val(0);
        }    
    });

    $('.converter-menu .add-currency').on('click', function() {
        if (!$(this).hasClass('delete-currency')) {
            addNewCurrency();
            newCurrencyInit($('#cny'), 0.69);
        }
        else {
            $('.currency-list').children().last().remove();
        }
        $(this).toggleClass('delete-currency');
    });


    $('.converter').ready(function() {
        convert($('#gbr'), $('#usd'), 0.8);
    });
})