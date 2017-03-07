$(function(){
    function addNewUser() {
        let listItem;
        let avatar;
        let userName = $('#newUserName').val();
        
        if (userName) {
            listItem = $('.message-list')
                .prepend('<li>')
                .children()
                .first();
            listItem.append('<a>')
                .append('<h3>' + userName + '</h3>')
                .append('<p>');
            listItem.find("p")
                .addClass('message');
            listItem.find("a")
                .append('<img>');
            avatar = listItem.find("a")
                .children()
                .first();
            avatar.addClass('avatar')
                .attr("src", "./img/0.png")
                .attr("alt", "Profile photo");
            $('#newUserName').val(null);
        }
    }

    $('.chat .add-dlg-button').on('click', addNewUser);
})