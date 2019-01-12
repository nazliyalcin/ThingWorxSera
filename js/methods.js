AFRAME.registerComponent('iot', {
    schema: { 
        changingValues: {type: 'array',default:[2,1.3,1.5,1,0.5]},
      offset:{type:'int',default:0},
        numberOfBox:{type:'int',default:4},
        posXOfBoxes:{type:'array',default:[0,0.2,0.4,0.6]},
        posXOfTexts:{type:'array',default:[-0.1,0.1,0.3,0.5]},
        idOfLines:{type:'array',default:['graph_line0','graph_line1','graph_line2','graph_line3','graph_line4','graph_line5','graph_line6']},
        idOfLines2:{type:'array',default:['graph_line0','graph_line1','graph_line2','graph_line3','graph_line4','graph_line5','graph_line6']},
        idOfBoxes:{type:'array',default:['box0','box1','box2','box3']},
        idOfBoxes2:{type:'array',default:['box0','box1','box2','box3']},
        idOfTexts:{type:'array',default:['text0','text1','text2','text3']},
        idOfTexts2:{type:'array',default:['text0','text1','text2','text3']},
        idOfTextHeights:{type:'array',default:['text_height0','text_height1','text_height2','text_height3','text_height4']},
        idOfTextHeights2:{type:'array',default:['text_height0','text_height1','text_height2','text_height3','text_height4']}
     },
 
    init: function () {
    var text_temparature = document.querySelector('#text_temparature');
    var text_illuminance = document.querySelector('#text_illuminance');
    var text_loudness = document.querySelector('#text_loudness');
    var text_humidity = document.querySelector('#text_humidity');
    var url = 'json/values.json'  
    
    


    $.getJSON( url, function( response ) {
      text_temparature.setAttribute('value',response.iotValues[0].temperature);
      //text_illuminance.setAttribute('value',response.iotValues[0].illuminance);
      text_loudness.setAttribute('value',response.iotValues[0].loudness);
      text_humidity.setAttribute('value',response.iotValues[0].humidity);
 
     }); 

     var url = "https://lab.api.iot-accelerator.ericsson.net/ddm/api/v3/resources/f03720c9-46b2-43a1-baa6-e4bdc37ed9b4";

     this.httpGetAsync(url);
    
    var camera = document.getElementById("camera");


    var marker_vuforia = document.getElementById("vuforia");
 
    var m = document.querySelector("a-marker");


    
    m.addEventListener("markerFound", (e)=>{
        var switchlabel = document.querySelector("#switch");
        var text = document.querySelector("#text");
        var banner = document.querySelector("#banner");
        var logo = document.querySelector("#logo");
        var inputcheck = document.querySelector("input");
        var flag = false;
        logo.style.display = "block";
        switchlabel.style.display = "block";
        text.style.display = "block"
        banner.style.display = "block";
        var x = marker_vuforia.getAttribute("position");
        camera.setAttribute('position',"1.8 0 0");
        console.log("marker_vuforia-------------",marker_vuforia.getAttribute("position"));
        console.log("CAMERA-----------------",camera.getAttribute("position"));
        
        inputcheck.addEventListener("change",(e)=>{
          if(inputcheck.checked)
          {
              flag = true;
             
              this.graphDesign(flag);
          }else
          {
              flag = false;

              this.graphDesign(flag);
          }
        });
       console.log("found")
    });
    
    m.addEventListener("markerLost", (e)=>{
        
        var switchlabel = document.querySelector("#switch");
        var text = document.querySelector("#text");
        var banner = document.querySelector("#banner");
        var logo = document.querySelector("#logo");
        logo.style.display = "none";
        switchlabel.style.display = "none";
        text.style.display = "none"
        banner.style.display = "none";


       console.log("lost")
    });
            
    },
    tick: function()
    {
       
    },
    httpGetAsync(theUrl)
    {
        var xmlHttp = new XMLHttpRequest();
        
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            var json_data = JSON.parse(xmlHttp.responseText);
            text_illuminance.setAttribute('value',json_data.LatestMeasurement.v);
        }
       xmlHttp.open("GET", theUrl, true); // true for asynchronous 
        xmlHttp.setRequestHeader("Authorization","Basic NWNjYTdkZjEtNjk2Ny00MWE0LTliODctYTVjNDdjNzg3NGM3QGMwOGJiMzMwLWUyMzEtNDBhYy04MDY1LTdhNWU5ZjJhMDk0NTpjdkpBMEw2ZWszSWpDcjMy");
        xmlHttp.setRequestHeader("X-DeviceNetwork","45ceb524-a924-4ff4-ac6b-d25468d9d8ba");
        
        xmlHttp.send(null);
    },

    graphDesign(flag)
    {
        var background = document.querySelector("#background");
        
        if(flag=== true)
        {
            background.setAttribute('opacity','0.4');
        }   else
        {
            background.setAttribute('opacity','0');
        } 
        

            for(var t = 0; t< this.data.idOfLines.length; t++)
            {
                this.data.idOfLines2[t] = document.getElementById(this.data.idOfLines[t]);
                    if(flag === true)
                    {
                        this.data.idOfLines2[t].setAttribute("line","opacity:0.2");
                    }else
                    {
                        this.data.idOfLines2[t].setAttribute("line","opacity:0");
                    }
                    
                    
                
            }
          
            
            for(var k = 0; k< this.data.changingValues.length; k++)
            {
              this.data.idOfTextHeights2[k] = document.getElementById(this.data.idOfTextHeights[k]);
              this.initTextHeightAttributes(this.data.idOfTextHeights2[k],this.data.changingValues[k])
              if(flag === true)
              {
                this.data.idOfTextHeights2[k].setAttribute('opacity','1')
              }else{
                this.data.idOfTextHeights2[k].setAttribute('opacity','0')
              }
              
            }
    
            var x = 0;
            for(var i= 0; i< this.data.numberOfBox;i++)
            {
              this.data.idOfBoxes2[i] = document.getElementById(this.data.idOfBoxes[i]);
              
              this.data.idOfTexts2[i] = document.getElementById(this.data.idOfTexts[i]);
              
              this.initTextAttributes(this.data.idOfTexts2[i] ,this.data.posXOfTexts[i])

              if(flag===true)
              {
                this.data.idOfBoxes2[i].setAttribute('opacity','1');
                this.data.idOfTexts2[i].setAttribute('opacity','1');
              }else
              {
                this.data.idOfBoxes2[i].setAttribute('opacity','0');
                this.data.idOfTexts2[i].setAttribute('opacity','0');
              }
            }
    
        
            
            for(var j = 0 ; j < this.data.numberOfBox ; j++)
            {
               
               x = Math.floor(Math.random() * this.data.changingValues.length);
               this.changeValues(x,box0,this.data.posXOfBoxes[0]);
               x = Math.floor(Math.random() * this.data.changingValues.length);
               this.changeValues(x,box1,this.data.posXOfBoxes[1]);
               x = Math.floor(Math.random() * this.data.changingValues.length);
               this.changeValues(x,box2,this.data.posXOfBoxes[2]);
               x = Math.floor(Math.random() * this.data.changingValues.length);
               this.changeValues(x,box3,this.data.posXOfBoxes[3]);
    
            }
          
          
           
        
      
    },
    changeValues: function(index2,boxx,poss){
        var a = this.data.changingValues;
        var index = index2;
        var box = boxx;
        var pos = poss;
        setInterval(function() {
              
              box.setAttribute('height',a[index]);
              box.setAttribute('position',{x:pos,y:1.5,z:(-a[index]/2)+0.9});
              
             }, 500+ this.data.offset)
             this.data.offset += 500;
      },
      initTextAttributes: function(text,textXPos)
      {
           text.setAttribute('position',{x:textXPos,y:1.5,z:1});
      },
      initTextHeightAttributes: function(textHeight,textHeightYPos)
      {
        textHeight.setAttribute('position',{x:-0.8,y:1.5,z:-(textHeightYPos)+0.9});
        textHeight.setAttribute('color','red');
        textHeight.setAttribute('rotation','-90 0 0');
        textHeight.setAttribute('value',textHeightYPos);
       
      }
     
    
   
  });

