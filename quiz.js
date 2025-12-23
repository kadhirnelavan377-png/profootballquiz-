let username = localStorage.getItem("footballUser");
if(!username){ window.location.href="index.html"; }
document.getElementById("user").innerText = username;

const quizzes={
  easy:[
    {q:"Players in a team?",o:["9","10","11","12"],a:2},
    {q:"Who can use hands?",o:["Striker","Defender","Goalkeeper","Midfielder"],a:2},
    {q:"Football shape?",o:["Cube","Sphere","Oval","Square"],a:2},
    {q:"Which country is famous for football?",o:["India","Brazil","Canada","China"],a:1},
    {q:"Match duration?",o:["60 min","70 min","80 min","90 min"],a:3},
    {q:"FIFA stands for?",o:["Federation International Football Association","Football International Federation Association","Federation International Futsal Association","Football In FIFA Association"],a:0},
    {q:"Substitutions allowed?",o:["2","3","4","5"],a:1},
    {q:"Yellow card meaning?",o:["Goal","Warning","Penalty","Red"],a:1},
    {q:"Who wears gloves?",o:["Defender","Striker","Goalkeeper","Referee"],a:2},
    {q:"2014 WC winner?",o:["Brazil","Germany","Argentina","Spain"],a:1},
    {q:"CR7 refers to?",o:["Messi","Ronaldo","Neymar","Mbappe"],a:1},
    {q:"Goalkeeper number?",o:["1","7","10","11"],a:0},
    {q:"Corners per pitch?",o:["4","2","3","5"],a:0},
    {q:"2018 WC winner?",o:["France","Brazil","Germany","Argentina"],a:0},
    {q:"Pitch surface?",o:["Grass","Clay","Sand","Concrete"],a:0},
    {q:"Referees?",o:["1","2","3","4"],a:2},
    {q:"Goal-line tech?",o:["Yes","No","Sometimes","Depends"],a:0},
    {q:"Ball material?",o:["Leather","Wood","Plastic","Metal"],a:0},
    {q:"Halves per match?",o:["1","2","3","4"],a:1},
    {q:"Penalty distance?",o:["10m","11m","12m","15m"],a:1},
    {q:"Throw-in uses?",o:["Feet","Hands","Head","Knee"],a:1},
    {q:"Offside rule?",o:["Yes","No","Sometimes","Depends"],a:0},
    {q:"Goal net color?",o:["White","Yellow","Red","Blue"],a:0},
    {q:"Referee color?",o:["Black","White","Red","Green"],a:0},
    {q:"Half-time duration?",o:["10 min","15 min","20 min","25 min"],a:1},
    {q:"Number of substitutes per team?",o:["1","2","3","4"],a:2}
  ],
  medium:[
    {q:"WC 2018 winner?",o:["Brazil","France","Germany","Argentina"],a:1},
    {q:"VAR stands for?",o:["Video Assistant Referee","Virtual Assistant Referee","Video Auto Ref","Visual Assistant Ref"],a:0},
    {q:"Most UCL titles?",o:["Barca","AC Milan","Man United","Real Madrid"],a:3},
    {q:"Messi 2023 club?",o:["PSG","Inter Miami","Barcelona","City"],a:1},
    {q:"EPL stands for?",o:["England Premier League","European Premier League","Elite Premier League","European Pro League"],a:0},
    {q:"Fastest goal PL?",o:["Mane","Salah","Aguero","Messi"],a:2},
    {q:"Euro 2020 host?",o:["France","Italy","England","Portugal"],a:1},
    {q:"Hand of God scorer?",o:["Maradona","Messi","Ronaldo","Pele"],a:0},
    {q:"Extra time?",o:["10 min","15 min","20 min","30 min"],a:1},
    {q:"Red Devils club?",o:["Liverpool","Man United","Chelsea","Arsenal"],a:1},
    {q:"Bundesliga country?",o:["Germany","Italy","Spain","England"],a:0},
    {q:"Top scorer WC 2022?",o:["Mbappe","Messi","Ronaldo","Haaland"],a:0},
    {q:"Never won WC?",o:["Portugal","Brazil","Germany","Italy"],a:0},
    {q:"UCL started?",o:["1955","1960","1965","1970"],a:0},
    {q:"Euro 2016 winner?",o:["Portugal","France","Spain","Germany"],a:0},
    {q:"CR7 nationality?",o:["Argentina","Portugal","Brazil","Spain"],a:1},
    {q:"Messi nationality?",o:["Argentina","Portugal","Brazil","Spain"],a:0},
    {q:"WC 2022 teams?",o:["32","24","28","36"],a:0},
    {q:"2018 WC host?",o:["Russia","Brazil","Qatar","Germany"],a:0},
    {q:"Oldest club?",o:["Sheffield FC","Real Madrid","Barcelona","Man United"],a:0},
    {q:"FIFA founded?",o:["1904","1920","1930","1890"],a:0},
    {q:"Goal-line tech?",o:["2010","2012","2014","2016"],a:2},
    {q:"Copa America 2021 winner?",o:["Brazil","Argentina","Uruguay","Chile"],a:1},
    {q:"UCL 2023 winner?",o:["Man City","Real Madrid","Chelsea","Bayern"],a:0}
  ],
  hard:[
    {q:"Most Ballon d'Or?",o:["Ronaldo","Messi","Zidane","Cruyff"],a:1},
    {q:"Fastest hat-trick PL?",o:["Mane","Salah","Aguero","Messi"],a:2},
    {q:"Treble winner 2009?",o:["Barca","Bayern","Inter","United"],a:0},
    {q:"Top scorer WC?",o:["Muller","Klose","Ronaldo","Messi"],a:1},
    {q:"Longest unbeaten?",o:["49","37","45","42"],a:0},
    {q:"Coach Man City treble?",o:["Pep","Klopp","Ancelotti","Mourinho"],a:0}
  ],
  extreme:[
    {q:"Fastest WC goal?",o:["Hakan Sukur","Mbappe","Messi","Ronaldo"],a:0},
    {q:"Most goals single WC?",o:["Fontaine","Klose","Ronaldo","Messi"],a:0},
    {q:"First WC host?",o:["Uruguay","Brazil","Italy","France"],a:0},
    {q:"Youngest WC winner?",o:["Pele","Mbappe","Messi","Owen"],a:0}
  ]
};

function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
let current=[], index=0, score=0, timer, time=60;

function startQuiz(level){
  current=shuffle([...quizzes[level]]);
  index=0; score=0;
  document.getElementById("menu").style.display="none";
  document.getElementById("quiz").style.display="block";
  loadQ();
}

function loadQ(){
  clearInterval(timer);
  time=60;
  const q=current[index];
  document.getElementById("quiz").innerHTML=`
    <h2>${q.q}</h2>
    <p>⏱ <span id="t">60</span>s</p>
    <div id="opts"></div>
    <p>Score: ${score}</p>
  `;
  const opts=document.getElementById("opts");
  q.o.forEach((o,i)=>{const d=document.createElement("div");d.className="option";d.innerText=o;d.onclick=()=>ans(i);opts.appendChild(d);});
  timer=setInterval(()=>{time--;document.getElementById("t").innerText=time;if(time<=0){clearInterval(timer);next();}},1000);
}

function ans(i){clearInterval(timer);if(i===current[index].a) score++;next();}
function next(){index++;if(index<current.length) loadQ();else{document.getElementById("quiz").innerHTML=`<h1>Finished</h1><p>${username}, Score ${score}/${current.length}</p><button onclick="location.reload()">Menu</button>`;}}
function logout(){localStorage.removeItem("footballUser");window.location.href="index.html";}
