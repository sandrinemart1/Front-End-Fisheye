import {photographer} from './Photographer2.js'
const stock = JSON.parse(localStorage.getItem('photographerStock'))

function like(){
    document.addEventListener('click',(e)=> {
      const likesSum = document.querySelector('.infos_likes--count')    
      let heart =e.target
      let heartParent = heart.parentNode;
      let likeP = heartParent.parentNode.querySelector('p')
     
      if (e.target.tagName == 'I' && heartParent.className !=='clicked' ){        
       likeP.textContent ++
       likesSum.textContent++
    // pour ne cliquer qu 'une seule fois par image'
       heartParent.className='clicked';
     }
    })
  }
  
  
  
 
/////            injecter likes totaux  et prix dans le footer //////////      
function likeAdd(stock){
 
    // for(let i =0 ; i<stock.length; i ++){
    //     let eachLikes = stock[i].likes;
    //     let likesSum = 0;
    //     for(let i =0 ; i<stock[i].likes; i ++){ 
    //         likesSum +=stock[i].likes
    //         document.querySelector('.infos_likes--count').textContent=likesSum;
    //     }
    // }
    // document.querySelector('.infos_price').textContent = `${photographer.price}€/j`;
  };
            
export{like}
export{likeAdd}