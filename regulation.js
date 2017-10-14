const eventLoad = function(id,data){
//console.log("id="+id);
high=0;
low=0;
switch (id){
 case "1":
          high=250;
          if(data>=high){
          console.log("il pleut, faut-il fermer la veranda: V?");
          }
          break;

 case "2": high=80;
            if(data>=high){
            console.log("L'humidité est importante doit on aerer ou isoler? A/I?");
          }
            break;

 case "3": high=20;
            low=18;
            if(data>=high){
             console.log("il fait trop chaud, doit on activer l'air froid? F");
           }else if (data<=low) {
             console.log("il fait trop froid, doit on activer l'air chaud? C");
           }
            break;

 case "4":  high=300;
            low=135;
            if(data<=low){
              console.log("il fait nuit doit on allumer les lampes led basse energie (Up)? U");
            }else if (data>=high) {
              console.log("il fait jour doit on eteindre les lampes (Down)? D");

            }
          break;

       };


};
