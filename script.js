const arr_game=[
    {
        img_src:"../images/IMG21.jpg",
        question:"?מה צבע הפלומה של התוכי הימני למעלה",
        arr_answer:["ירוק","כחול","אדום"],
        good_answer:3,
        id:1

    },
    {
        img_src:"../images/IMG2.png",
        question:"?כמה בקבוקים יש על המדף",
        arr_answer:["2","3","4"],
        
        good_answer:2,
        id:2
    },
    {
        img_src:"../images/IMG3.jpg",
        question:"כמה אוזניים יש לארנב",
        arr_answer:["1","2","3"],
        
        good_answer:1,
        id:3
    },
    {
        img_src:"../images/IMG5.jpg",
        question:"באיזה צבע הגג של הביניין שליד השער",
        arr_answer:["אדום","כחול","צהוב"],
       
        good_answer:3,
        id:4

    },  
    {
        img_src:"../images/IMG7.jpg",
        question:"? כמה רגליים רואים בתמונה",
        arr_answer:["12","78","10"],
        
        good_answer:3,
        id:5

    },
    {
        img_src:"../images/IMG8.jpg",
        question:"? לאיזה כיוון קופצים הדולפינים",
        arr_answer:["ימין","שמאל","קדימה"],
        
        good_answer:1,
        id:6

    },

    {
        img_src:"../images/IMG9.jpg",
        question:"? איפה הסירה עוגנת ",
        arr_answer:["אין סירה","מול הבית","ליד הבית"],
        
        good_answer:2,
        id:7

    },
    {
        img_src:"../images/IMG10.png",
        question:" ? איזה מספר כתוב על הרכבת ",
        arr_answer:["42","48","51"],
        
        good_answer:3,
        id:8

    },
    {
        img_src:"../images/IMG11.jpg",
        question:" ? באיזה צבע הגרביונים של הילדה ",
        arr_answer:["סגול","ירוק","ורוד"],
        
        good_answer:1,
        id:9

    },
    {
        img_src:"../images/IMG12.png",
        question:"? האם החלון פתוח",
        arr_answer:["לא","חצי","כן"],
        
        good_answer:1,
        id:10

    },
    {
        img_src:"../images/IMG13.png",
        question:"? כמה אנשים נראים בתמונה",
        arr_answer:["3","5","4"],
        
        good_answer:3,
        id:11

    },
    {
        img_src:"../images/IMG14.png",
        question:" האם את 2 הסרטים של הילדה רואים בתמונה",
        arr_answer:["כן","יש אפילו 3","לא "],
        good_answer:3,
        id:12

    },
    
]   
let index_random;
let prevs_img=[];
let count=0;
let points=0;
let k;//משתנה של ה10 שניות לכל תמונה
let y;//משתנה של 3 שניות לענות לכל שאלה
let flag=false;

const players_arr = [];
//שליפת ה JSON לתוך מערך
let str = localStorage.getItem("players_arr");
let arr_json = JSON.parse(str);
if (arr_json != null) {
    for (let i = 0; i < arr_json.length; i++)
        players_arr.unshift(arr_json[i]);//לדחוף לתחילת המערך

}

document.querySelector("#button_home").onclick=function(){
    document.querySelector("#button_home").style.display='none';
    document.querySelector("form").style.display='block';
}

document.querySelector("#submit").onclick=function(e) {
    e.preventDefault();//שלא ישלח ישר אלא קודם יעשה את כל הפונוקציה ואז אני ישנה את htef
        let names = document.querySelector("#fname").value;
       let family1 = document.querySelector("#lname").value;
      let flag=false;
    for (i of players_arr)
    {
        if(names==i.fname&&family1==i.lname)
          { 
            flag=true;
           alert("משתמש זה הינו קיים")
           location.href="html/game.html"
          }
    
    }
    if(flag==false)
    {
        players_arr.push({fname:names,lname:family1})
        let str= JSON.stringify(players_arr);
        localStorage.setItem("players_arr", str);
        alert("נרשמת בהצלחה!")
       location.href="html/game.html"
    }
}

function game()
{
    document.querySelector("#all_screen").innerHTML=`<img id="img_big" src=""></img><div id="ask"></div> <div id="answer3"></div>`; 
   show_img();

}
function show_img(){
    clearTimeout(y)
    flag=false;
    document.querySelector("#ask").style.display='none';
    document.querySelector("#answer3").style.display='none';
    random();
    document.querySelector("#img_big").src=arr_game[index_random].img_src;
    document.querySelector("#img_big").style.display='block';
    let second =10;
    document.querySelector("#clock").style.display='block';
    k= setInterval(function () {

            if (second == -1) { 
               procces_game();
            }
            else{
                document.querySelector("#clock").innerHTML=second--;
            }
    },1000);  
}
function random()
{
    let randomIndex;
    let flag2=false;
    do{ 
        flag2 =false;
         randomIndex = Math.floor(Math.random() * arr_game.length);
        for (i of prevs_img)
        {
            if(i.id==arr_game[randomIndex].id)
                flag2=true;
        }
    } while(flag2==true)
    index_random=randomIndex;
    prevs_img.push(arr_game[randomIndex]);


}

function show_ans(i){
    document.querySelector("#answer3").style.display='block';
    document.querySelector("#ask").style.display='block';
   let buttonim= document.querySelectorAll(".ans");
for (let j=0;j<buttonim.length;j++)
{
    buttonim[j].innerHTML=arr_game[i].arr_answer[j];
}

}

function check_answer(b_ans){
    document.querySelector("#ask").style.display='none';
    document.querySelector("#answer3").style.display='none';
    clearTimeout(y);
    flag=true;
    if(b_ans.id!=arr_game[index_random].good_answer)
    {
        points-=1;
       // b_ans.classList.add('class_red');
        alert("חצי קלאצ' אוףףףף");
       //b_ans.classList.remove('class_red');
    }
    else
    {
        
        points+=2;
       // b_ans.classList.add('class_green');
        alert("אלוףףףף תשובה נכונה!!!");
       // b_ans.classList.remove('class_green');


    }
    // document.querySelector('#points2').classList.add(`class${points}`);
     document.querySelector('#points2').style.height=(`${points}vw`);
    if(points<=0)
    {
        game_over();
    }
      
}

function procces_game(){
    clearInterval(k);
    document.querySelector("#clock").style.display='none';
    document.querySelector("#img_big").style.display='none';
    document.querySelector("#ask").innerHTML=arr_game[index_random].question;

    document.querySelector("#answer3").innerHTML=`<button id="1" class="ans"></button><button id="2" class="ans"></button><button id="3" class="ans"></button>`;
  
    show_ans(index_random);
     let click_ans= document.querySelectorAll(".ans");
        for(let i=0;i<click_ans.length;i++)
             {   
                click_ans[i].onclick=function()
                {
                     check_answer(this);

                }
            }
            count++;
            
           let y= setTimeout(function () {

               if(count<=arr_game.length-5)
               {
                if(flag==false)
                {
                    clearTimeout(y);
                    points-=1;
                    
                    if(points<=0)
                    {
                        game_over();

                    }
                    document.querySelector("#points2").innerHTML=points;
                    //document.querySelector('#points2').classList.add(`class${points}`);
                    document.querySelector('#points2').style.height=(`${points}vw`);
                   
                }
                    show_img();
                
             } 
            else
            {
                end();
            }
                
        },3000); 
          
}
function game_over(){
    // מציג תמונה וכפתור התחל משחק מחדש
    prevs_img=[];
    points=0;
    count=0;
    location.href="game_over.html";
}
function end()
{
    

     location.href="end_game.html";

} 
function bu(){
        location.href="../home.html";
    }

