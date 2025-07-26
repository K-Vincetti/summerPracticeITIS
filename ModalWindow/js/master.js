let friendCount = 0;
const maxFriends = 3;
let currentFriendId = null;
const friendsData = {};

function addFriend(){
    friendCount++;

    const friendId = "friend-" + friendCount;
    const friendBlock = document.createElement('button');
    friendBlock.className = 'friend-block';
    friendBlock.id = friendId;
    friendBlock.addEventListener('dblclick', () => editFriend(friendId));
    friendBlock.innerHTML = "Друг";

    let holdTimer;
    let isHolding = false;
    const holdDuration = 1000;

    friendBlock.addEventListener('mousedown', function() {
        isHolding = true;
        this.style.transition = `background-color ${holdDuration/1000}s linear`;
        this.style.backgroundColor = '#ff0000';

        holdTimer = setTimeout(() => {
            if (isHolding) {
                removeFriend(this);
            }
        }, holdDuration);
    });

    friendBlock.addEventListener('mouseup', function() {
        clearTimeout(holdTimer);
        isHolding = false;
        this.style.transition = 'background-color 0.3s ease';
        this.style.backgroundColor = '';
    });

    friendBlock.addEventListener('mouseleave', function() {
        clearTimeout(holdTimer);
        if (isHolding) {
            isHolding = false;
            this.style.transition = 'background-color 0.3s ease';
            this.style.backgroundColor = '';
        }
    });


    document.getElementById('friends').appendChild(friendBlock);

    friendsData[friendId] = {
    name: "",
    email: "",
    phone: ""
    };

    if(friendCount >= maxFriends){
        document.querySelector('.add-friend').disabled = true;
    }
}

function closeButton() {
    const modal = document.querySelector('.modal');
    const newButton = document.querySelector('.new');

    modal.classList.add('hidden');

    setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.remove('hidden');

        newButton.style.display = 'inline';
        setTimeout(() => {
            newButton.classList.remove('hidden');
        }, 100);
    }, 300);
}

function editFriend(friendId) {
    currentFriendId = friendId;

    document.querySelector('.modal').style.display = 'none';

    const editModal = document.createElement('div');
    editModal.className = 'modal edit-modal';
    editModal.innerHTML = `
        <div class="modal-content">
            <div class="header"><span class="header-text">Редактирование данных друга</span></div>
            <div class="list">
                <div class="field-form">
                    <label>ФИО <span class="star">*</span></label>
                    <input type="text" id="friend-name" placeholder="Введите ФИО" required>
                </div>
                <div class="field-form">
                    <label>Имейл <span class="star">*</span></label>
                    <input type="email" id="friend-email" placeholder="Введите имейл" required>
                </div>
                <div class="field-form">
                    <label>Телефон <span class="star">*</span></label>
                    <input type="tel" id="friend-phone" placeholder="+7 777 77 77" required>
                </div>
            </div>
            <div class="footer"><div class="left-group">
                <button class="back-button" onclick="backToMain()">Назад</button>
                <button class="save-button" onclick="saveFriend()">Сохранить</button>
        </div>
    `;

    const friendData = friendsData[currentFriendId];
    setTimeout(() => {
        document.getElementById('friend-name').value = friendData.name;
        document.getElementById('friend-email').value = friendData.email;
        document.getElementById('friend-phone').value = friendData.phone;
    }, 0);

    document.body.appendChild(editModal);
}

function saveFriend() {
    const name = document.getElementById('friend-name').value;
    const email = document.getElementById('friend-email').value;
    const phone = document.getElementById('friend-phone').value;

    friendsData[currentFriendId] = { name, email, phone };
}

function backToMain() {
    document.querySelector('.edit-modal').remove();
    document.querySelector('.modal').style.display = 'flex';
}

function removeFriend(friendBlock) {
    const friendId = friendBlock.id;
    delete friendsData[friendId];
    friendBlock.remove();
    friendCount--;
    document.querySelector('.add-friend').disabled = false;
}

function newApplication() {
    const modal = document.querySelector('.modal');
    const newButton = document.querySelector('.new');

    newButton.classList.add('hidden');

    setTimeout(() => {
        newButton.style.display = 'none';
        newButton.classList.remove('hidden');

        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.remove('hidden');
        }, 250);
    }, 300);
}
