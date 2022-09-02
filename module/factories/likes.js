// import {photographer} from './Photographer2.js'

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
  
  
  
 
      
// function likeAdd(photographers){
//     for(let i =0 ; i<photographer.media.length; i ++){
//         let eachLikes = photographer.media[i].likes;
//         let likesSum = 0;
//         for(let i =0 ; i<photographer.media.length; i ++){ 
//             likesSum +=photographer.media[i].likes
//             document.querySelector('.infos_likes--count').textContent=likesSum;
//         }
//     }};
            
export{like}
// export{likeAdd}