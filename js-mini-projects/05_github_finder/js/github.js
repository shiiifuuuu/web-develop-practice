class Github{
   constructor(){
      this.repo_sort_desc = 'created:desc';
      this.repo_count = 5;
   }
   async getUser(user){
      let profileRes = await fetch(`https://api.github.com/users/${user}`);
      let profile = await profileRes.json();

      let reposRes = await fetch(`https://api.github.com/users/${user}/repos?sort=${this.repo_sort_desc}&per_page=${this.repo_count}`);
      let repos = await reposRes.json();

      return {
         profile: profile,
         repos: repos
      };
   }
}