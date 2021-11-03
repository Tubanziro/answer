 (function($){
    //画像関連
    var img;
    var img2;
    var img3;
    var img4;
    //回答は箱を作ってその大きさを変えてと仕様としたがうまく行かなかったため線と裏に白い画像を置くことにした
    // var box1;
    // var box2;
    // var box3;
    // var box4;
    var back;
    var tate1;
    var tate2;
    var yoko1;
    var yoko2;
    var yoko3;
    var yoko4;
    var yoko5;
    var height=new Array(4);
    var width;
    var stage;

    //画像ロード
    function loadImage (imageData_a,imageData_b,imageData_c,imageData_d){


        //画像が選択されている時のみ合成
        if(imageData_a !== null) {
            var baseImg = new Image();
            baseImg.src = imageData_a;
            height[0]=baseImg.height;
            width=baseImg.width;
            img = new createjs.Bitmap(baseImg);


            
        }
        // var baseImg = new Image();
        // baseImg.src = 'box.png';
        // box1 = new createjs.Bitmap(baseImg);

        var baseImg = new Image();
        baseImg.src = 'tate.png';
        tate1 = new createjs.Bitmap(baseImg);

        var baseImg = new Image();
        baseImg.src = 'tate.png';
        tate2 = new createjs.Bitmap(baseImg);

        
        var baseImg = new Image();
        baseImg.src = 'yoko.png';
        yoko1 = new createjs.Bitmap(baseImg);

        var baseImg = new Image();
        baseImg.src = 'yoko.png';
        yoko2 = new createjs.Bitmap(baseImg);

        var baseImg = new Image();
        baseImg.src = 'yoko.png';
        yoko3 = new createjs.Bitmap(baseImg);

        var baseImg = new Image();
        baseImg.src = 'yoko.png';
        yoko4 = new createjs.Bitmap(baseImg);

        var baseImg = new Image();
        baseImg.src = 'yoko.png';
        yoko5 = new createjs.Bitmap(baseImg);

        var baseImg = new Image();
        baseImg.src = 'back.png';
        back = new createjs.Bitmap(baseImg);



            var baseImg = new Image();
            baseImg.src = imageData_b;
            height[1]=baseImg.height;
            img2 = new createjs.Bitmap(baseImg);


        


            var baseImg = new Image();
            baseImg.src = imageData_c;
            height[2]=baseImg.height;
            img3 = new createjs.Bitmap(baseImg);
        

            var baseImg = new Image();
            baseImg.src = imageData_d;
            height[3]=baseImg.height;
            img4 = new createjs.Bitmap(baseImg);
        
        stage = new createjs.Stage('result');
    }
    

    //画像と文字を合成する処理
    function genImage (imageIni, txt){
        //合成画像の設定

        // box1.x=600;
        img2.y=height[0];
        img3.y=img2.y+height[1];
        img4.y=img3.y+height[2];
        yoko1.y=0;
        yoko1.x=width;
        yoko2.x=width;
        yoko2.y=img2.y-9;
        yoko3.y=img3.y-9;
        yoko4.y=img4.y-9;
        yoko5.y=img4.y+height[3]-9;
        tate1.x=width;
        tate2.x=width+345-9;


        //ステージ生成
        stage.addChild(back);
        stage.addChild(yoko1);
        stage.addChild(yoko2);
        stage.addChild(yoko3);
        stage.addChild(yoko4);
        stage.addChild(yoko5);
        stage.addChild(tate1);
        stage.addChild(tate2);
        // stage.addChild(box1);
        stage.addChild(img);
        stage.addChild(img2);
        stage.addChild(img3);
        stage.addChild(img4);


        //文字オブジェクトを生成してステージに追加
        $.each(txt,function(key,value){
            //keyにはtxt0nという形の文字列が入っている
            //本文は入力された内容をそのまま取る
            var content = $('#' + key).val();
            var tmp_content
            var n_content
            // 16文字ごとに改行をするようにする
            tmp_content=content.replace("\n","");
            n_content=chunk(tmp_content, 16).join('\n');

            //文字生成
            var obj = new createjs.Text(n_content);

            //文字設定
            obj.textAlign = value.align;
            obj.font = value.font;
            obj.color = value.color;

            if(key==="txt01"){
                obj.x = width+10;
                obj.y = img.y+20;
            }
            if(key==="txt02"){
                obj.x = value.x;
                obj.y = img2.y+20;
            }
            if(key==="txt03"){
                obj.x = value.x;
                obj.y = img3.y+20;
            }
            if(key==="txt04")
            {
                obj.x = value.x;
                obj.y = img4.y+20;
            }



            stage.addChild(obj);
        });

        //ステージ反映
        $('#result').attr('height',height.reduce(function(sum, element){return sum + element;}, 0));
        $('#result').attr('width',width+345);
        stage.update();
    }
    //特定文字数ごとに特定の文字を入れる奴
function chunk(str, n) {
        var ret = [];
        var i;
        var len;
    
        for(i = 0, len = str.length; i < len; i += n) {
           ret.push(str.substr(i, n))
        }
    
        return ret
    };
    

// canvas上のイメージを保存
function saveCanvas(){
    var imageType = "image.png";
    var fileName = "sample.png";
    
    var canvas = document.getElementById("result");
    // base64エンコードされたデータを取得 「data:image/png;base64,iVBORw0k～」
    var base64 = canvas.toDataURL(imageType);
    // base64データをblobに変換
    var blob = Base64toBlob(base64);
    // blobデータをa要素を使ってダウンロード
    saveBlob(blob, fileName);
}

// Base64データをBlobデータに変換
function Base64toBlob(base64)
{
    // カンマで分割して以下のようにデータを分ける
    // tmp[0] : データ形式（data:image/png;base64）
    // tmp[1] : base64データ（iVBORw0k～）
    var tmp = base64.split(',');
    // base64データの文字列をデコード
    var data = atob(tmp[1]);
    // tmp[0]の文字列（data:image/png;base64）からコンテンツタイプ（image/png）部分を取得
	var mime = tmp[0].split(':')[1].split(';')[0];
    //  1文字ごとにUTF-16コードを表す 0から65535 の整数を取得
	var buf = new Uint8Array(data.length);
	for (var i = 0; i < data.length; i++) {
        buf[i] = data.charCodeAt(i);
    }
    // blobデータを作成
	var blob = new Blob([buf], { type: mime });
    return blob;
}

// 画像のダウンロード
function saveBlob(blob, fileName)
{
    var url = (window.URL || window.webkitURL);
    // ダウンロード用のURL作成
    var dataUrl = url.createObjectURL(blob);
    // イベント作成
    var event = document.createEvent("MouseEvents");
    event.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    // a要素を作成
    var a = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
    // ダウンロード用のURLセット
    a.href = dataUrl;
    // ファイル名セット
    a.download = fileName;
    // イベントの発火
    a.dispatchEvent(event);
}

    $(function(){
        //読込画像のオブジェクト
        var imageIni = {

            imageData_a : null,
            imageData_b : null,
            imageData_c : null,
            imageData_d : null,

            makeImage : function(){
                if(this.imageData_a !== null) {
                    loadImage(this.imageData_a,this.imageData_b,this.imageData_c,this.imageData_d);
                    genImage(this, txt);
                }
            }
        };



        //合成する文字の位置情報などを定義
        var txt = {

            'txt01' : {
                'x' : 610,
                'y': 20,
                'font': '20px/1.5 Meiryo,sans-serif',
                'align': 'left',
                'color': 'black'
            },
            'txt02' : {
                'x' : 610,
                'y': 315+20,
                'font': '20px/1.5 Meiryo,sans-serif',
                'align': 'left',
                'color': 'black'
            },
            'txt03' : {
                'x' : 610,
                'y': 315*2+20,
                'font': '20px/1.5 Meiryo,sans-serif',
                'align': 'left',
                'color': 'black'
            },
            'txt04' : {
                'x' : 610,
                'y': 315*3+20,
                'font': '20px/1.5 Meiryo,sans-serif',
                'align': 'left',
                'color': 'black'
            }
        };

        //イベント関連処理
        //初回のみCanvasを作成しておく
        $(window).on('load',function(){
            loadImage(null,null,null,null);
        });

        //画像読込
        $('#getfile1').change(function (){
            //読み込み
            var fileList =$('#getfile1').prop('files');
            var reader = new FileReader();
            reader.readAsDataURL(fileList[0]);


            //読み込み後
            $(reader).on('load',function(){
                $('#preview1').prop('src',reader.result);
                imageIni.imageData_a = reader.result;
            });
        });

        $('#getfile2').change(function (){
            //読み込み
            var fileList =$('#getfile2').prop('files');
            var reader = new FileReader();
            reader.readAsDataURL(fileList[0]);

            //読み込み後
            $(reader).on('load',function(){
                $('#preview2').prop('src',reader.result);
                imageIni.imageData_b = reader.result;
            });
        });
        $('#getfile3').change(function (){
            //読み込み
            var fileList =$('#getfile3').prop('files');
            var reader = new FileReader();
            reader.readAsDataURL(fileList[0]);

            //読み込み後
            $(reader).on('load',function(){
                $('#preview3').prop('src',reader.result);
                imageIni.imageData_c = reader.result;
            });
        });
        $('#getfile4').change(function (){
            //読み込み
            var fileList =$('#getfile4').prop('files');
            var reader = new FileReader();
            reader.readAsDataURL(fileList[0]);

            //読み込み後
            $(reader).on('load',function(){
                $('#preview4').prop('src',reader.result);
                imageIni.imageData_d = reader.result;
            });
        });


        //ボタンイベントまとめ
        $('.btn').on('click',function(e){
            //画像操作時は再描画を行う
            if(imageIni.imageData_a !== null){
                imageIni.makeImage();
                $("#alert").text("");

        if (e.target.id === "dl"){
                saveCanvas();
            }
        }else{
            $("#alert").text("画像を選択してから画像生成を行ってください");
        }


        });
        
    });
})($);
