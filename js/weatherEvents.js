$(function(){
    
    function createCities(){
        let zagora = new City('Zagora, Greece','img/Zagora.jpg');
        zagora.setTemperature(73);
        let vileyka = new City('Vileyka, Belarus','img/Vileyka.jpg');
        vileyka.setTemperature(26);
        let mozyr = new City('Mozyr, Belarus','img/Mozyr.jpg');
        mozyr.setTemperature(30);

        cities.add(zagora)
            .add(vileyka)
            .add(mozyr);
        addNewPointCity();
    }

    function addNewPointCity() {
        $('.weather .slider').empty();
        $('.weather .checkList').empty();
        for (let i = 0; i < cities.count; ++i) {
            $('.weather .slider').append('<li>');
            $('.weather .checkList')
                .append('<li>'+ cities.list[i].name +'</li>');
        }
    }

    function addCityAtTheList() {
        let name = $('.addCity #zone').val();
        let temperature = $('.addCity #temperature').val();
        let link = $('.addCity #link').val();
        
        if (name && temperature && link) {
            let newZone = new City(name, link);
            newZone.setTemperature(temperature);
            cities.add(newZone);
            addNewPointCity();
        }
    }
    
    //move a degree sign
    function degreeMove(length) {
        $('p.degree').animate({left: length*34 + 'px'}, 0);
    }

    function slide(idIndex) {
        let name = $('.weather-info .zone');
        let temperature = $('.weather-info .temperature');
        let time = $('.weather-info .time');
        let temperatureValue = cities.list[idIndex].getTemperature(cities.typeOfDegree);

        temperature.text(temperatureValue);
        name.text(cities.list[idIndex].name);
        time.text(cities.list[idIndex].getTime());
        $('.slideFoto').css('background-image', 'url("' + cities.list[idIndex].fotoURL + '")');
        degreeMove((temperatureValue + '').length); 
    }

    function findElement(event, container){
        let sliderItems = Array.from(container.children());
        sliderItems.map((item, index) => {
            if (item === event.target) {
                cities.currentCity = index;
                slide(index);    
            } 
        });
    }

    function resetAddCityForm(){
        $('.addCity').children().each(function(index, element) {
           if (index < 3) {
                $( element ).val(null);
            }
        });
    }

    let cities = new CitiesList();

    $('.weather').ready( () => {
        createCities();
        $('.addCity').hide();
        $('.checkList').hide();
        slide(0);  
    });


    $('.slider').on('click', function(event) {
        findElement(event, $(this));
    });


    $('.checkList').on('click', function(event) {
        findElement(event, $(this));
        $(this).hide();
    });


    $('.weather-menu #fahrenheit').click(function() {
        cities.typeOfDegree = true;
        slide(cities.currentCity);
        $(this).addClass('checkedScale');
        $('.weather-menu #celsius').removeClass('checkedScale');
    })


    $('.weather-menu #celsius').click(function() {
        cities.typeOfDegree = false;
        slide(cities.currentCity);
        $(this).addClass('checkedScale');
        $('.weather-menu #fahrenheit').removeClass('checkedScale');
    })

   

    $('.add-place-button').click(function() { 
        $('.addCity').show();
        $('.checkList').hide();
    });


    $('.list-view-button').click(function() { 
        $('.checkList').show();
        $('.addCity').hide();
    });


    $('#addNewCity').click( function() {
        addCityAtTheList();
        $('.addCity').hide();
        resetAddCityForm();
    });

    $('.checkList').on('mouseleave blur', function(){
        $('.checkList').hide();
    });
    

    $('.addCity').on('mouseleave blur', function(){
        $('.addCity').hide();
    });


})
