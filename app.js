$(function () {
    $("#serch_btn").click(function () {
        console.log('called');

        // 入力された値を取得
        var val = $('#zipcode').val();
        console.log(val);
        
        // urlを設定
        var url = "https://zipcloud.ibsnet.co.jp/api/search";

        // 送るデータを成形する
        var param = { zipcode: val };

        // サーバーと通信(Ajax)
        
        $.ajax({
            type: "GET", 
            cache: false,
            data: param,
            url: "https://zipcloud.ibsnet.co.jp/api/search",
            dataType: "jsonp"
        })
        .done(function (res) {
            console.table(res);
            if (res.status != 200) {
                // 通信には成功。APIの結果がエラー
                // エラー内容を表示
                $('#zip_result').html(res.message);

            } else {
                console.table(res)
                //住所を表示
                $('#zip_result').append('<p>' + "都道府県コード：" + res.results[0].prefcode + '</p>')
                $('#zip_result').append('<p>' + "郵便番号：" + res.results[0].zipcode + '</p>')
                $('#zip_result').append('<p>' + "都道府県："  + res.results[0].address1 + '</p>')
                $('#zip_result').append('<p>' + "市区町村："  + res.results[0].address2 + '</p>')
                $('#zip_result').append('<p>' + "町域　　："  + res.results[0].address3 + '</p>')
                $('#zip_result').append('<p>' + "都道府県(ｶﾅ)："  + res.results[0].kana1 + '</p>')
                $('#zip_result').append('<p>' + "市区町村(ｶﾅ)："  + res.results[0].kana2 + '</p>')
                $('#zip_result').append('<p>' + "町域(ｶﾅ)　　："  + res.results[0].kana3 + '</p>')

            }

        })
        .fail(function (error) {
            console.log(error);
            $('#zip_result').html("<p>通信エラーです。時間をおいてお試しください</p>");
        });
    });
});