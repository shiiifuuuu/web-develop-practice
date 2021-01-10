class UI{
   constructor(){
      this.profile = document.getElementById('profile');
      this.repos = document.getElementById('latest-repos');
      this.showError = document.querySelector('#search .show-error');
   }

   showProfile(profile){
      if(profile.message !== 'Not Found'){
         this.showError.style.display = 'none';
         this.profile.style.display = 'flex';
         this.profile.innerHTML = `
      <div id="profile-image">
            <img src="${profile.avatar_url}" alt="profile picture">
            <a href="${profile.html_url}" class="btn-profile">View Profile</a>
      </div>
      <div id="profile-details">
         <ul id="top">
            <li>Public Repos: ${profile.public_repos}</li>
            <li>Public Gists: ${profile.public_gists}</li>
            <li>Followers: ${profile.followers}</li>
            <li>Following: ${profile.following}</li>
         </ul>
         <ul id="row">
            <li>Company: ${profile.company}</li>
            <li>Website/blog: ${profile.blog}</li>
            <li>Location: ${profile.location}</li>
            <li>Member Since: ${profile.created_at}</li>
         </ul>
      </div>
      `;
      }else{
         this.clearProfile();
         this.alert(profile.message);
      }
   }

   showRepos(repos){
      this.repos.innerHTML = '';
      
      if(repos.message !== 'Not Found'){

         let h2 = document.createElement('h2');
         h2.textContent = 'Latest Repos';
   
         let ul = document.createElement('ul');
         ul.id = 'repos';

         this.showError.style.display = 'none';
         
         let output = '';
         repos.forEach((repo)=>{
            output += `
               <li class="repo-list">
                  <a href="${repo.html_url}">${repo.name}</a>
                  <div>
                     <ul>
                        <li>Stars: ${repo.stargazers_count}</li>
                        <li>Watchers: ${repo.watchers}</li>
                        <li>Forks: ${repo.forks}</li>
                     </ul>
                  </div>
               </li>
            `;
         });
         
         ul.innerHTML = output;
         
         this.repos.appendChild(h2);
         this.repos.appendChild(ul);
      }else{
         this.clearProfile();
         this.alert(profile.message);
      }
   }

   alert(message){
      this.showError.style.display = 'block';
      this.showError.innerHTML = `
      <p class="error-message">${message}</p>
      `;
   }
   clearProfile(){
      this.showError.style.display = 'none';
      this.profile.style.display = 'none';
      this.profile.innerHTML = '';
      this.repos.innerHTML = '';
   }
}