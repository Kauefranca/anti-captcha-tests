const axios = require('axios');


;(async() => {
    var target = 'casimiro';

    var data = await reqData(target);
    console.log(data);
})();

async function reqData(user) {
    const req = await axios({
        method: 'get',
        url: `https://instagram.com/${user}`
    })
    .then((res) => res.data)
    .catch(({ response }) => console.log(response));

    var { entry_data } = JSON.parse(req.split('_sharedData = ')[1].split(';</script>')[0]);

    return {
        name: entry_data.ProfilePage[0].graphql.user.full_name,
        username: entry_data.ProfilePage[0].graphql.user.username,
        biography: entry_data.ProfilePage[0].graphql.user.biography,
        followers: entry_data.ProfilePage[0].graphql.user.edge_followed_by.count,
        following: entry_data.ProfilePage[0].graphql.user.edge_follow.count,
        pfp: entry_data.ProfilePage[0].graphql.user.profile_pic_url,
        pfp_hd: entry_data.ProfilePage[0].graphql.user.profile_pic_url_hd
    }
}