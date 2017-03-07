$(function(){
    function sum(arr){
        return arr.reduce(function(a, b) {
            return a + b.value;
        }, 0);
    }

    function drawThirdDiagramm(arr) {
        let className;
        let bottomValue = 0;
        let heigthValue;
        
        for (let i = 0; i < arr.length; ++i) {
            className =  '.circle-straight-' + i + '-value';
            heigthValue = arr[i].value / 100 * 160;
            $(className).css({
                height: heigthValue + 'px',
                bottom: bottomValue + 'px',
                backgroundColor: arr[i].background
            });
            bottomValue += heigthValue;
        }
    }

    function drawDiagramm(arr, id) {
        let drawingCanvas = document.getElementById(id);
        let canvas = drawingCanvas.getContext('2d');
        let startPoint = - Math.PI / 2;
        let stopPoint;
        
        canvas.clearRect(0, 0, 160, 160);

        for (let i = 0; i < arr.length; ++i) {
            stopPoint = startPoint + Math.PI * 2 * arr[i].value / 100;        
            canvas.fillStyle = arr[i].background;
            canvas.beginPath();
            canvas.moveTo(80, 80);
            canvas.arc(80, 80, 80, startPoint, stopPoint , false);
            canvas.closePath();
            canvas.fill();
            startPoint = stopPoint;
        }
    }

    $('.circle-button').click(function(){

        let blueInput = +$('.circles .circle-input-first-value').val();
        let greenInput = +$('.circles .circle-input-second-value').val();
        let redInput = +$('.circles .circle-input-third-value').val();
        let arr = [];

        arr.push({name:'circle-red', value:redInput,  background: '#ec747d'});
        arr.push({name:'circle-blue', value:blueInput, background: '#56e5f6'});
        arr.push({name:'circle-green', value:greenInput, background: '#4cd9c0'});

        arr = arr.sort(function(a, b) {
            return a.value - b.value;
        });

        if (sum(arr) > 100 || blueInput < 0 || greenInput < 0 || redInput < 0) {
            alert('Проверьте введенные данные!');
        }
        
        else {    
            drawDiagramm(arr,'circle-fill-diagramm');
            drawDiagramm(arr,'circle-around-diagramm');
            drawThirdDiagramm(arr);
        }
    })
})