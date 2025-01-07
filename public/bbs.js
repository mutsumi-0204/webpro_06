"use strict";

let number=0;
const bbs = document.querySelector('#bbs');
document.querySelector('#post').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;

    const params = {  // URL Encode
        method: "POST",
        body:  'name='+name+'&message='+message,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    console.log( params );
    const url = "/post";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        console.log( response );
        document.querySelector('#message').value = "";
    });
});

document.querySelector('#check').addEventListener('click', () => {
    const params = {  // URL Encode
        method: "POST",
        body:  '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = "/check";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        let value = response.number;
        console.log( value );

        console.log( number );
        if( number != value ) {
            const params = {
                method: "POST",
                body: 'start='+number,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'               
                }
            }
            const url = "/read";
            fetch( url, params )
            .then( (response) => {
                if( !response.ok ) {
                    throw new Error('Error');
                }
                return response.json();
            })
            .then( (response) => {
                number += response.messages.length;
                for( let mes of response.messages ) {
                    console.log( mes );  // 表示する投稿
                    let cover = document.createElement('div');
                    cover.className = 'cover';
                    let name_area = document.createElement('span');
                    name_area.className = 'name';
                    name_area.innerText = mes.name;
                    let mes_area = document.createElement('span');
                    mes_area.className = 'mes';
                    mes_area.innerText = mes.message;
                    cover.appendChild( name_area );
                    cover.appendChild( mes_area );

                    let buttonContainer = document.createElement('div');
                    buttonContainer.className = 'button-container';

                    let heartButton = document.createElement('button');
                    heartButton.innerText = '❤️';
                    heartButton.addEventListener('click', () => {
                        mes.likes = mes.likes || 0;
                        mes.likes++;
                        updateHeartCount(heartButton, mes.likes);
                    });

                    let replyButton = document.createElement('button');
                    replyButton.innerText = '返信';
                    replyButton.addEventListener('click', () => {
                        const replyMessage = prompt('返信を入力してください');
                        if (replyMessage) {
                            postReply(mes.name, replyMessage);
                        }
                    });

                    let deleteButton = document.createElement('button');
                    deleteButton.innerText = '削除';
                    deleteButton.addEventListener('click', () => {
                        if (confirm('本当に削除しますか？')) {
                            name_area.innerText = "非表示";
                            mes_area.innerText = "削除された投稿";
                            buttonContainer.innerHTML = '';
                        }
                    });

                    buttonContainer.appendChild(heartButton);
                    buttonContainer.appendChild(replyButton);
                    buttonContainer.appendChild(deleteButton);
                    cover.appendChild(buttonContainer);

                    bbs.appendChild( cover );
                }
            })
        }
    });
});

function updateHeartCount(button, count) {
    button.innerText = `❤️ ${count}`;
}

function postReply(originalName, replyMessage) {
    const name = document.querySelector('#name').value;
    const message = `>>${originalName}\n${replyMessage}`;
    document.querySelector('#message').value = message;
}