class Github{
   constructor(){
      this.client_id = '060df574b7edc384ad5c';
      this.client_secret = '6991aefd437d732923415060022d9ad97ea80858';
      this.repo_sort_desc = 'created:desc';
      this.repo_count = 5;
   }
   async getUser(user){
      let profileRes = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);
      let profile = await profileRes.json();

      let reposRes = await fetch(`https://api.github.com/users/${user}/repos?sort=${this.repo_sort_desc}&per_page=${this.repo_count}&client_id=${this.client_id}&client_secret=${this.client_secret}`);
      let repos = await reposRes.json();

      return {
         profile: profile,
         repos: repos
      };
   }

   //testing rate limit exceed
   async rateLimit(){
      let apiRateLimit = await fetch(`https://api.github.com/rate_limit?client_id=${this.client_id}&client_secret=${this.client_secret}`);

      return await apiRateLimit.json();
   }
}