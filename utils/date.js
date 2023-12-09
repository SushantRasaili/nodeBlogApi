const tagsAllowed = (postCreatedAt) => {
    const hours = 1000*60*60;

    const postTime = new Date(postCreatedAt)/hours;

    const currentTime = new Date()/hours;

    if(currentTime - postTime > 1) 
    return false;

    return true;
}



const isAfterTime = () => {
    const time = new Date();
    // time.setHours(2,0,0,0);
    const currentTime = time.getHours();
    console.log(currentTime)
    if(currentTime >= 5) 
    return true;

    return false;
}


module.exports = {tagsAllowed,isAfterTime};