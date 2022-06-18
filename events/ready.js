module.exports = (client) => {
    console.log("Casinos Open");

    setInterval(() => {
        activitiesList = [];
        index = Math.floor(Math.random() * activitiesList.length);

        // Setting activity
        client.user.setActivity(activitiesList[index]);
    }, 30000);
}