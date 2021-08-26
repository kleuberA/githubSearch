(function() {
    const search = document.getElementById("search")
    const profile = document.getElementById("profile")
    const url = "https://api.github.com/users"
    const client_id = "9d71a8c4106f4ea74ef9"
    const client_secret = "f9ff9a14fad8c26a809624c6bd2007690311b4af"    
    const count = 7
    const sort = "created: ascs"

    async function getUser(user) {
        const profileResponse = await fetch(
            `${url}/${user}`
            )

        const reposResponse = await fetch(
            `${url}/${user}/repos?per_page=${count}&sort=${sort}&client_id=${client_id}&client_secret=${client_secret}`
            )
    
        const profile = await profileResponse.json()
        const repos = await reposResponse.json()
        
        return {profile, repos}
    }

    function showProfile(user) {
        profile.innerHTML = `
            <div class="cardContainerGrid">
                <div class="cardContainer">
                    <img src="${user.avatar_url}" class="imagePerfil">
                    <button class="verPerfil"><a href="${user.html_url}" target="_blank" class="btnPerfil">Ver Perfil</a></button>
                </div>
                <div class="cardContainerInfos">
                    <ul class="lista">
                        <li class="itemLista">Repositórios:  <span class="">${user.public_repos}</span></li>
                        <li class="itemLista">Seguidores:  <span class="">${user.followers}</span></li>
                        <li class="itemLista">Seguindo:  <span class="">${user.following}</span></li>
                    </ul>
                </div>
            </div>`
    }

    search.addEventListener("keyup", e => {
        const user = e.target.value

        if (user.length > 0) {
            getUser(user).then(res => {
                showProfile(res.profile)

            })
        }

    })
})()
$('.pesquisar').click(event => {
    $('.cardSearchPrincipal').hide();
    $('#profile').toggle();
    $('.voltar').show();
    $('#search').val('');
})
$('.voltar').click(function(event) {
    $('.cardSearchPrincipal').show();
    $('#profile').toggle();
    $(this).hide();
});