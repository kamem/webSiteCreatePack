# webSiteCreatePack

## 必須
1. Node (最新版推奨)
2. Gulp

		npm install -g gulp

### フォルダ構成

	├ root (公開用)
	└ src (作業用)
		├ css
		├ js
		├ font
		└ img

src（作業用）フォルダで作業した内容をroot（公開用）にはきだす。

#### フォルダ構成の名前を変更したい場合
`config.js`の内容を書き換えてください。

## 準備

### jsの準備
jQueryなど必要なjsがあればpackage.jsonに指定してください。

package.json

	"dependencies": {
		"jquery": ""
	}

それぞれプロジェクトを始める際にバージョン指定をしてください。
空の状態だと最新がダウンロードされますが、
時間がたち最新バージョンが変わった場合には正常に動作しなくなってしまう可能性があるためです。

#### バージョンをひとつひとつ設定するのがめんどくさい場合。
下記を使ってnode_modulesをインストールするとpackage.jsonに現在の最新のバージョンが自動で指定できます。

* [package.jsonのdependenciesを自動更新するスクリプトを書く](http://qiita.com/okunishinishi@github/items/7629b58d1c3d464738dc)

### ファイルを生成

1. package.jsonのnode_modulesをinstall

		sudo npm install

## 作業
### 開始
	npm run watch

### スプライト画像の制作
#### "src/img/sprite/**/*.png"内のファイルをスプライト化

	npm run sprites

`src/img/sprite/`内に`sprite-**.png`というファイルがフォルダの数分生成されます。
`src/css`内に`src/img/sprite/`以下のフォルダの数分のcssの設定ファイルが生成されます。

#### ex) `num`フォルダの場合

	sprite-num.png
	_num.css

### svgからfontの制作
#### "src/font/**/*.svg"内のファイルをfont化

	npm run svgfonts

`src/font/`内にfontがフォルダの数分生成されます。
`src/css`内に`src/font/`以下のフォルダの数分のcssの設定ファイルが生成されます。
fontの内容を確認したい場合は`src/css/font/sns_fontlist.html`を見るとfont一覧を確認できます。

#### fontの使い方

	@import "font/_name";

	.test {
		content: var(name-test); //変数で文字コードを取ってくることができます。
		//var(フォルダ名-ファイル名)
	}

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

#### css
cssはpostcssを使えるようにしています。

* precss
* postcss-assets

#### js
webpackとbabelを使えるようにしています。


### 確認方法
localhost:8888 で確認できます。

## 公開
* CSS,JSの圧縮

		npm run build