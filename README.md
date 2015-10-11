# webSiteCreatePack

## 必須
1. Node (最新版推奨)
2. Gulp

		npm install -g gulp
3. bower
4. Ruby
5. Bundler

### フォルダ構成

	├ root (公開用)
	└ src (作業用)
		├ css
		├ js
		└ img

src（作業用）フォルダで作業した内容をgulpでwatchしてroot（公開用）

#### フォルダ構成の名前を変えたい場合
`gulpfile_settings.js`の内容を書き換えてください。

## 準備

### jsの準備
jQueryなど必要なjsがあればpackage.jsonに記述するか。
もしくはbower.jsonに記述してください。

個人的にはnpmで管理できる範囲であればpackage.jsonに書き、
npmにないものであればbower側に記述するように使い方を分けています。
フロント側で必要なファイルはbowerで一括管理も良いかなと思っています。

package.json

	"dependencies": {
		"jquery": "",
		"react": "",
		"react-router": ""
	}

bower.json

	"dependencies": {
		"google-code-prettify": "",
	}
	
それぞれプロジェクトを始める際にバージョン指定をしてください。
空の状態だと最新がダウンロードされますが、
時間がたち最新バージョンが変わった場合には正常に動作しなくなってしまう可能性があるためです。

### scssの準備
自分で使っているscssファイルを`src/css`内に入れてください。
自分の場合bowerでinstallしてcpで移動しています。

	bower install https://github.com/kamem/compass.default.git
	cp bower_components/compass.default/sass/* src/css

postcssを使いたい場合は`gulpfile_settings.js`を修正してscssではなくcssをwatchするようにします。

	settings.watch.css.files = settings.watch.css.dir + '**/*.css';


### ファイルを生成

1. package.jsonのnode_modulesをinstall

		sudo npm install

2. Gemfileに従い、sass,compassをinstall

		bundle install

3. bower.jsonを使ってjsをダウンロードしたい場合

		bower install

## 作業
### 開始
	gulp

### スプライトファイルの制作
	// "src/img/sprite/**/*.png"内のファイルをスプライト化
	gulp sprites
	
`src/img/sprite/`内に`sprite-**.png`というファイルがフォルダの数分生成されます。
`src/css`内に`src/img/sprite/`以下のフォルダの数分のscssの設定ファイルが生成されます。

ex) `num`フォルダの場合

	sprite-num.png
	_num.scss

### 実作業

#### html

[usemin](https://www.npmjs.com/package/gulp-usemin)を使っています。

	<!-- build:js js/common.js -->
	<script src="../node_modules/jquery/dist/jquery.js"></script>
	<script src="../bower_components/google-code-prettify/src/prettify.js"></script>
	<!-- endbuild -->
	
`root/js/common.js`として`jquery.js` `prettify.js`をまとめたファイルが生成されます。
htmlは`root/`に下記ように変換され出力されます。

	<script src="js/common.js"></script>
	

#### js
`jsx`と拡張子をつけることによって、webpackとbabelを使えるようにしています。
webpackとbabelを使わない場合は拡張子を`js`にしてください。


### 確認方法
localhost:8888 で確認できます。

## 公開
* CSS,JSの圧縮

		gulp build --minify true