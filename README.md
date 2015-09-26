# webSiteCreatePack

## 必須
1. Node
2. Gulp

		npm install -g gulp

3. Ruby
4. Bundler

## 準備
1. package.jsonのnode_modulesをinstall

		sudo npm install

2. Gemfileに従い、sass,compassをinstall

		bundle install

## 作業
	gulp watch

### スプライトファイルの制作
	// "img/sprite/**/*.png"内のファイルをスプライト化
	gulp sprites

## 公開前
* CSS,JSの圧縮

		gulp min

