document.addEventListener('DOMContentLoaded', function() {
    const nameInput = document.getElementById('name');
    const submitBtn = document.getElementById('submitBtn');
    const outputDiv = document.getElementById('output');
    const nameOutput = document.getElementById('nameOutput');
    const locationOutput = document.getElementById('locationOutput');

    nameInput.addEventListener('input', function() {
        if (nameInput.value.trim() !== '') {
            submitBtn.disabled = false;
        } else {
            submitBtn.disabled = true;
        }
    });

    submitBtn.addEventListener('click', function() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                
                // 入力された名前と位置情報を表示
                nameOutput.textContent = "名前: " + nameInput.value;
                locationOutput.textContent = "位置情報: 緯度 " + latitude + ", 経度 " + longitude;

                // 表示用のコンテナを表示
                outputDiv.classList.remove('hidden');

                // 位置情報をサーバーに送信
                const data = {
                    name: nameInput.value,
                    latitude: latitude,
                    longitude: longitude
                };

                fetch('http://your-server-url.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                .then(response => response.text())
                .then(data => {
                    console.log(data);
                    // 送信成功時の処理をここに記述
                })
                .catch((error) => {
                    console.error('Error:', error);
                    // エラー時の処理をここに記述
                });
            });
        } else {
            alert("位置情報が取得できません");
        }
    });
});
