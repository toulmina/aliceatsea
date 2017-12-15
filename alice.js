var readings = {
    "titles": [   
        {
            "name": "Dee Dee Wanted Her Daughter To Be Sick, Gypsy Wanted Her Mom To Be Murdered",
            "url": "https://www.buzzfeed.com/michelledean/dee-dee-wanted-her-daughter-to-be-sick-gypsy-wanted-her-mom?utm_term=.rmM2G3Z7a#.kgGAymxZJ",
        },  

        {
           "name": "4chan: The Skeleton Key to the Rise of Trump",
            "url": "https://medium.com/@DaleBeran/4chan-the-skeleton-key-to-the-rise-of-trump-624e7cb798cb#.egqhi4qcr",
        },
        {
           "name": "The Secret Life of Urban Crows",
            "url": "https://www.seattlemet.com/articles/2017/5/17/the-secret-life-of-urban-crows",
        },
        {
           "name": "Playing the Workaholic on Social Media",
            "url": "https://www.theatlantic.com/technology/archive/2016/11/playing-the-workaholic-on-social-media/507830/",
        },
        {
           "name": "Internetting with Amanda Hess",
            "url": "https://www.nytimes.com/interactive/2017/11/28/arts/internetting-with-amanda-hess.html",
        },
        {
           "name": "Long Live the Group Chat",
            "url": "https://theoutline.com/post/2315/long-live-the-group-chat",
        },
        {
           "name": "Everybody lies: how Google search reveals our darkest secrets",
            "url": "https://www.theguardian.com/technology/2017/jul/09/everybody-lies-how-google-reveals-darkest-secrets-seth-stephens-davidowitz?utm_source=esp&utm_medium=Email&utm_campaign=GU+Today+USA+-+Collections+2017&utm_term=234308&subid=17283803&CMP=GT_US_collection",
        },
        {
           "name": "Metamorphosis:The Late Style of Chuck Close",
            "url": "http://reprints.longform.org/metamorphosis",
        },
        {
           "name": "Folk Models of Home Computer Security",
            "url": "https://drive.google.com/file/d/1thtgOUGXQUycj6NOt11iG3zXfQf5SzF8/view?usp=sharing",
        },
        {
           "name": "The Best ‘Ask Polly’ Advice Columns of 2017",
            "url": "https://www.thecut.com/2017/12/9-best-ask-polly-advice-columns-of-2017.html",
        },
        ]
}

var affirmations = ["You are the craftiest person I know!", 
"You are amazing at taking care of people", 
"You are wicked smart. I feel I can ask you anything!", 
"Your hair is the most beautiful hair in the world", 
"You learn so quickly. I can play any board game with you and you will whip my butt", 
"You are an incredibly thoughtful person",
"You are so good at keeping correspondence with people",
"You are a masterful maker and a conscious consumer", 
"You are extremely capable. If I could bring one thing to a desert island, it would be an Alice", 
"You always have the best book and candy recommendations!", 
"You aren't afraid of lots of hugs! I love seeing your lovey side"]


/*** Functions ***/
// get a random index for an array from 0 to maxIndex
function getRandomIndex(maxIndex) {
  return Math.floor(Math.random() * maxIndex);
}


function generateRandomReading() {
  var randomIdx = getRandomIndex(readings['titles'].length);
  return readings['titles'][randomIdx];
}


function generateRandomAffirmation() {
  var randomIdx = getRandomIndex(affirmations.length);
  return affirmations[randomIdx];
}


$(document).on('click','#readings-button',function(){
    var randomReading = generateRandomReading();
        $("#reading-link").text(randomReading.name);
        $("#reading-link").attr("href", randomReading.url);
    });

$(document).on('click','#affirmations-button',function(){
        $("#affirmations-text").text(generateRandomAffirmation);
    });


$(document).ready(function(){
    var chosenItems = JSON.parse(localStorage.getItem("itemsArray"));
    if (chosenItems == null) {
    } else {
        var numItems = chosenItems.length;     
      /* Go through every item in the array */
      for (i=0; i<numItems; i++) {
        console.log(chosenItems);
        $("#confirmation-text").append(chosenItems[i]);
        $("#confirmation-text").append('<button class=remove-item id=' + [i] +'> Remove </button>' + "</br>");
        }
    }


    /* Triggered when someone clicks the remove item button */
      $(".remove-item").click(function() { // bind handler for click event

        /* Get the item ID for the button, which is tied to it's position in the array */
        var itemID = $(this).attr('id')
        /* Remove this item from the added to cart array */
        chosenItems.splice(itemID, 1);
        /* Save new array back to local Storage */
        localStorage.setItem("itemsArray", JSON.stringify(chosenItems));
        $(this).remove();
        location.reload();
    });


    $("#submit-button").click(function(){
        var selectedItem = $("#input-text").val();
        var chosenItems = JSON.parse(localStorage.getItem("itemsArray")) || [];
        chosenItems.push(selectedItem);
        localStorage.setItem("itemsArray", JSON.stringify(chosenItems));
        location.reload();
    });

});

/*bubble animation thanks to https://drewnoakes.com/code/javascript/bubbles.html */
// relative URL path to the image
var imageSrc = "bubble.png"
// the height of the image in use
var imageHeight = 5;
// number of images to display
var imageCount = 5;
// -1 for up, 1 for down
var imageDirection = -1;

// time to wait before queueing the next screen update
var TIMEOUT_INTERVAL_MILLIS = 10;

// browser sniffer
var ns4up = (document.layers) ? 1 : 0;
var ie4up = (document.all) ? 1 : 0;
var ns6up = (document.getElementById&&!document.all) ? 1 : 0;

// coordinate and position arrays
var thetaRadians = new Array();
var xPosition = new Array();
var yPosition = new Array();

// amplitude and step arrays
var xAmplitude = new Array();
var thetaStep = new Array();
var yStep = new Array();

// window size variables, set by function detectWindowSize()
var windowWidth, windowHeight;

// create DIVs and start the function
function initialiseFloatingImages()
{
    detectWindowSize();

    for (var i = 0; i < imageCount; i++) {
        // set coordinate variables
        thetaRadians[i] = 0;
        // set position variables
        xPosition[i] = Math.random()*(windowWidth-50);
        yPosition[i] = Math.random()*windowHeight;
        // set amplitude variables
        xAmplitude[i] = Math.random()*20;
        // set step variables
        thetaStep[i] = 0.02 + Math.random()/10;
        // set step variables
        yStep[i] = 0.7 + Math.random();
        // write layers etc...
        if (ns4up) {
            document.write('<layer name="dot'+i+'" left="15" top="15" visibility="show"><img src="'+imageSrc+'" alt="Floating image"/></layer>');
        } else if (ie4up||ns6up) {
            document.write('<div id="dot'+i+'" style="POSITION:absolute; Z-INDEX:'+i+'; VISIBILITY:visible; TOP:15px; LEFT:15px;"><img src="'+imageSrc+'" alt="Floating image"/></div>');
        }
    }

    moveFloatingImages();
}

// this is the main function
function moveFloatingImages()
{
    // for each image...
    for (var i = 0; i < imageCount; i++) {
        // recalculate y position
        yPosition[i] += imageDirection * yStep[i];
        // ensure not off top or bottom of visible screen
        if (yPosition[i] > windowHeight+getPageYOffset()) {
            // downwards-heading image is at the bottom...  reset it
            xPosition[i] = Math.random()*(windowWidth-xAmplitude[i]-30);
            yPosition[i] = -imageHeight;
            thetaStep[i] = 0.02 + Math.random()/10;
            yStep[i] = 0.7 + Math.random();
            detectWindowSize();
        } else if (yPosition[i] < getPageYOffset()-imageHeight) {
            // upwards-heading image is at the top...  reset it
            xPosition[i] = Math.random()*(windowWidth-xAmplitude[i]-30);
            yPosition[i] = getPageYOffset() + windowHeight;
            thetaStep[i] = 0.02 + Math.random()/10;
            yStep[i] = 0.7 + Math.random();
            detectWindowSize();
        }
        thetaRadians[i] += thetaStep[i];
        // move each image
        var newXPosition = xPosition[i] + xAmplitude[i]*Math.sin(thetaRadians[i]);
        if (ns4up) {
            document.layers["dot"+i].top = yPosition[i] + "px";
            document.layers["dot"+i].left = newXPosition + "px";
        } else if (ie4up) {
            document.all["dot"+i].style.pixelTop = yPosition[i];
            document.all["dot"+i].style.pixelLeft = newXPosition;
        } else if (ns6up) {
            document.getElementById("dot"+i).style.top = yPosition[i] + "px";
            document.getElementById("dot"+i).style.left = newXPosition + "px";
        }
    }
    setTimeout("moveFloatingImages()", TIMEOUT_INTERVAL_MILLIS);
}

// return the page's offset due to vertical scrolling
function getPageYOffset()
{
    var yOffset = 0;
    if (ns4up) {
        yOffset = window.pageYOffset;
    } else if (ie4up||ns6up) {
        yOffset = document.body.scrollTop;
    }
    return yOffset;
}

// detect information about the window's size
function detectWindowSize()
{
    if (ns6up) {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
    } else if (ns4up) {
        windowWidth = document.body.clientWidth;
        windowHeight = document.body.clientHeight;
    } else if (ie4up) {
        windowWidth = document.body.clientWidth;
        windowHeight = document.body.clientHeight;
    } else {
        windowWidth = 800;
        windowHeight = 600;
    }
}

initialiseFloatingImages();
