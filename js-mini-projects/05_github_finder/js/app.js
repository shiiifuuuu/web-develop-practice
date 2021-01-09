const github = new Github;
const ui = new UI;
const search = document.getElementById('user-name');

search.addEventListener('keyup', e => {
   let input = e.target.value;
   if(input !== ''){
      github.getUser(input).then(user => {
         ui.showProfile(user.profile);
         ui.showRepos(user.repos);
         // console.log(user.repos);
      });
   }else{
      //type a name in inputbox
      ui.clearProfile();
   }
});