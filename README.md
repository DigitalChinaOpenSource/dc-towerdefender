#游戏地址
- https://towerdefense-towerdefense.dev.wh.digitalchina.com/


#Fork 项目
```
点击项目右上角的 fork 选项 选择一个命名空间。（如果已经fork过项目，则会直接跳转到fork后的项目）

点击确定后即可将项目fork指定命名空间下

想要在自己项目中保持与源文件相同，将源项目作为远程仓库添加
git remote add source [path]

每次同步时拉取并合并即可
git fetch source master
git merge source/master

同样如果想要将自己的项目合并到源项目，则需要先获取权限后，push分支即可
git push source branchName
```


#源文件于压缩文件
```
文件中 后缀添加了 min 的为压缩文件（用于发布）
每次对项目进行更新时，先修改未压缩的文件，然后进行压缩，最后再将压缩后的内容覆盖相应的min文件即可
```

#文件结构
```
--CSS
  --main.css   // 页面样式
  --main.min.css   // 页面样式压缩后的文件
--IMG
  --TowerDefense.png   // 将页面所有图片进行合成后的图片
--JS
  --Astar.js   // Astar算法，用于敌人自动寻路
  --Bullet.js   // 子弹类
  --Enemy.js   // 敌人类
  --Game.js   // 游戏引擎， 全局对象控制 和 绘图控制
  --jQuery-3.5.1.js   // jquery 3.5.1 版本
  --jquery-3.5.1.min.js   // juqery 3.5.1 压缩版本
  --script.js   // 页面加载时 启动Game 引擎
  --Tower.js   // 防御塔类
  --TowerDefense.js   // 将除了jquery以外其他的js的整合
  --TowerDefense.min.js   // 整合后的js的压缩文件
  --variable.js   // 游戏常量设置类
index.html   // 用于发布 已压缩的首页面
index.max.html    // 未压缩的源页面
```

#项目更新
```
进行项目更新，二次开发，以面对对象的思路进行。
所有的对象都将状态进行上报到Game引擎，由Game引擎进行判断和计算，最后在画布上进行展示。
画布用了四层画布， 包括 地图， 敌人， 防御塔 和 子弹 四层，用于动画的优化。
根据场景复杂度 可以对画布进行进一步优化。
```

#游戏难度控制 
```
所有游戏设置相关的常量都放在variable 中，用来控制游戏难度
```