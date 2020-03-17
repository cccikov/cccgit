# cccgit

里面包含一些前端知识的测试页面 , 以下内容是学习markdown语法的与cccgit内容无关

******************************************************************************

* 无序列表
* 无序列表
* 无序列表

1. 有序列表
2. 有序列表
3. 有序列表

- 或者无序列表
- 或者无序列表
- 或者无序列表

1. 或者有序列表
1. 或者有序列表
1. 或者有序列表

>引用，北冥有鱼，其名为昆

[链接](https://github.com/cccikov/)

![图片](https://avatars2.githubusercontent.com/u/16117570?v=3&s=460)

**strong粗体**

*italic斜体*

~~删除~~

| 表格          | Are           | Cool  | haha |
| ------------- |:-------------:| -----:| -----|
| col 3 is      | right-aligned | $1600 |     猪|
| col 2 is      | centered      |   $12 |   臭茄|
| zebra stripes | are neat      |    $1 |  哈哈 |

`var hehe = null;//代码`

    // 4个空格,代码段
    var wrap = document.getElementById("wrap");

```javascript
// 3个` 可加代码语法 不用缩进
var wrap = document.getElementById("wrap");
```

``` javascript
// 3个` 可加代码语法 不用缩进
var wrap = document.getElementById("wrap");
```

``` js
// 3个` 可加代码语法 不用缩进
var wrap = document.getElementById("wrap");
```

```
// 3个` 可加代码语法 不用缩进
var wrap = document.getElementById("wrap");
```

``` diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
|- /src
- |- inde.js
+ |- another-module.js
|- /node_modules
```

``` bash
# {extry file}出填写入口文件的路径，本文中就是上述main.js的路径，
# {destination for bundled file}处填写打包文件的存放路径
# 填写路径的时候不用添加{}
webpack {entry file} {destination for bundled file}
```

``` shell
# {extry file}出填写入口文件的路径，本文中就是上述main.js的路径，
# {destination for bundled file}处填写打包文件的存放路径
# 填写路径的时候不用添加{}
webpack {entry file} {destination for bundled file}
```

``` html
<p>hi</p>
```

``` css
div{
    color:#fff;
}
```



<kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>T</kbd>


# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

大标题，在一级，二级之间
----

分割线

* * *

***

*****

- - -

---------------------------------------

----




## markdown使用技巧

### 列表

1. 我是一

    这里是一的内容：

    1. 通过缩进去表示属于哪一个列表
    2. 通过缩进去表示属于哪一个列表
    3. 通过缩进去表示属于哪一个列表

2. 我是二

    这里是一的内容：

	    var a = “啊啊啊啊”

    * 通过缩进去表示属于哪一个列表

    		var a = “啊啊啊啊”

    * 通过缩进去表示属于哪一个列表

*在github的markdown解释中，我这段用于分割两个列表的代码好重要*

1. 我是一

	这里是一的内容：

		var a = “啊啊啊啊”

这里是新的内容：

    var a = “啊啊啊啊”

我是相当于p标签
通常来说，通过相隔一行(有时需要两行，有时如果语法明显也可以不换行，但是为了markdown文件看起来舒服，建议还是换语法就隔一行)来表示新的语法

我是另外一个p

有些不间隔一行需要通过空格+空格+回车换行  
就是这样换行


1. 我是列表
    我没有相隔一行,代表同一个语法

2. 我也是列表,虽然相隔一行,但是还是属于同一个列表

3. 相隔一行可以区分是否同一个语法,但是像列表这一种,虽然是代表不是同一个语法,但是还是同一组语法

*在github的markdown解释中，我这段用于分割两个列表的代码好重要*

1. 这时就需要相隔两行了，但是在github的markdown解释器下，最好还是在两个列表之间插入别的语法

**注意：不同markdown解释器，呈现出来的效果会有所不同，特别是列表嵌套**

-----------------------------

markdown的目的是为了让普通文本内容具有一定的格式 , 就是让源文件都有一定的格式，以下是全是相同数字

1. 虽然列表中
1. 全部数字都是1
1. 都没有什么问题

以下是按照顺序写的

1. 但是为了让看原文件就懂得结构
2. 还是乖乖地按照顺序写下去
3. 对大家都好


虽然以下这样也是可以呈现出表格 , 但是看源文件还是好难看出来是表格

|表头1|表头2|表头3|
|-|-|-|
|内容1|内容2|内容3|
|内容1|内容2|内容3|

为了美观 , 还是乖乖控制好缩进 , 让源文件也像一份表格

| 表头1 | 表头2 | 表头3 |
|-------|------|------|
| 内容1 | 内容2 | 内容3 |
| 内容1 | 内容2 | 内容3 |

虽然还是有些空格对不齐 , 但是还是要尽可能地直观
