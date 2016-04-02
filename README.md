# github_statistic

* 模块化管理：npm
* 前端自动化构建工具：gulp

  gulp具体做什么事，需要看gulpfile.js文件的配置，常见的功能包括：
  文件合并、文件压缩、语法检查、监听文件变化、将sass中的文件编译成css，同时gulp内部调用babel将jsx文件编译成js等等~
* UI以及逻辑部分：react，这里用的是AntDesign的react组件库
* css部分：sass，sass的编译用到了compass
* 环境配置：

  step1:安装npm 
  * npm is the package manager for many software
  * The npm command-line tool is bundled with Node.js. If you have it installed, then you already have npm too. If not, go download Node.js. 
  https://nodejs.org/en/download/
  
  step2: 利用npm安装gulp
  * 坑：运行npm install -g gulp之后提示：-bash: gulp: command not found
  * google stack overflow fix: 敲入命令sudo npm install -g gulp，原因是说gulp install in the wrong directory, so can’t find it~

  step3：利用gem安装compass
  * gem是rubyGem的包管理工具
  * gem install -g compass
  
  step4: 进到项目目录下，运行npm install，安装需要的第三方包
  
  step5：输入gulp命令，运行整个代码
