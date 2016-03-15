///////////////////////////////////////////////////////////////////////////////////
//                               SERVICES
///////////////////////////////////////////////////////////////////////////////////

app.factory('userData', function(){

    var currentUser = {
        username: ''
    };

    var setUser = function(username){
        currentUser.username = username;
        changeNavLinks();
    };

    var setPassword = function(password){
        currentUser.password = password;
    };

    return {
        currentUser: currentUser,
        setUser: setUser,
        setPassword: setPassword
    };
});