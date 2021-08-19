class search {
    constructor() {}

    //根据关卡数来设定塔的坑位
    searchTower(level) {
        switch (level) {
            case 0:
                return TowerHome.towerHomeOne;
                break;
            case 1:
                return TowerHome.towerHomeTwo;
                break;
            case 2:
                return TowerHome.towerHomeThree;
                break;
            case 3:
                return TowerHome.towerHomeFour;
                break;
            default:
                return TowerHome.towerHomeOne;
                break;
        }
    }

    //根据关卡数来设定敌人的路线
    searchEnemyRoute(level) {
        switch (level) {
            case 0:
                return moveRoute.MOVEARROne;
                break;
            case 1:
                return moveRoute.MOVEARRTwo;
                break;
            case 2:
                return moveRoute.MOVEARRThree;
                break;
            case 3:
                return moveRoute.MOVEARRFour;
                break;
            default:
                return moveRoute.MOVEARROne;
                break;
        }
    }

    //根据关卡数来画小兵行进路线
    DrawEnemyRoad(level) {
            var cv = document.querySelector('#canvasMap_backgroud');
            var ctx = cv.getContext('2d');
            switch (level) {
                case 0:
                    Ca.drawWall(ctx, route.routeOne, "DarkGray");
                    break;
                case 1:
                    Ca.drawWall(ctx, route.routeTwo, "DarkGray");
                    break;
                case 2:
                    Ca.drawWall(ctx, route.routeThree, "DarkGray");
                    break;
                case 3:
                    Ca.drawWall(ctx, route.routeFour, "DarkGray");
                    break;
                default:
                    Ca.drawWall(ctx, route.routeOne, "DarkGray");
            }
        }
        //根据关卡数来线画塔位
    DrawTowerPlace(level) {
        var cv = document.querySelector('#canvasMap_backgroud');
        var ctx = cv.getContext('2d');
        switch (level) {
            case 0:
                Ca.drawWall(ctx, TowerHome.towerHomeOne, "rgba(0, 0, 0, 0)");
                break;
            case 1:
                Ca.drawWall(ctx, TowerHome.towerHomeTwo, "rgba(0, 0, 0, 0)");
                break;
            case 2:
                Ca.drawWall(ctx, TowerHome.towerHomeThree, "rgba(0, 0, 0, 0)");
                break;
            case 3:
                Ca.drawWall(ctx, TowerHome.towerHomeFour, "rgba(0, 0, 0, 0)");
                break;
            default:
                Ca.drawWall(ctx, TowerHome.towerHomeOne, "rgba(0, 0, 0, 0)");
        }
    }


    //根据关卡来画背景
    DrawBackground(level) {
        var cv = document.querySelector('#canvasMap_backgroud');
        var ctx = cv.getContext('2d');
        var img = new Image;
        img.onload = function()  {
            ctx.drawImage(img, 0, 0, 1200, 660, 0, 0, 1200, 660); 
        };
        switch (level) {
            case 0:
               img.src="img/map1.png";
                START_X=0,START_Y=540,END_X=1140,END_Y=540;
                document.getElementById("container").style.backgroundImage="url('./img/map1_0.png')";
                document.getElementById("all_enemy_num").innerHTML=all_ghost_num;
                break;
            case 1:
                img.src="img/map2.png";               
                START_X=0,START_Y=600,END_X=1140,END_Y=0;
                document.getElementById("container").style.backgroundImage="url('./img/map2_0.png')";
                document.getElementById("all_enemy_num").innerHTML=all_ghost_num;
                // $("#ready").show();
                $("#customs2").show();
                var at = setInterval(() => {
                    console.log("level=",level);
                    $("#customs2").hide();
                    clearInterval(at);
                }, 4000);
                break;
            case 2:
                img.src="img/map3.png";
                START_X=0,START_Y=480,END_X=1140,END_Y=60;
                document.getElementById("container").style.backgroundImage="url('./img/map3_0.png')";                
                document.getElementById("all_enemy_num").innerHTML=all_ghost_num;
                document.getElementById("lifeshow").style.color="black";
                document.getElementById("moneyshow").style.color="black";
                document.getElementById("enemysshow").style.color="black";
                document.getElementById("all_enemy_num").style.color="black";
                // $("#ready").show();
                $("#customs3").show();
                var at = setInterval(() => {
                    console.log("level=",level);
                    $("#customs3").hide();
                    clearInterval(at);
                }, 4000);
                break;
            case 3:
                img.src="img/map4.png";
                START_X=0,START_Y=240,END_X=1140,END_Y=480;
                document.getElementById("container").style.backgroundImage="url('./img/map4_0.png')";
                document.getElementById("all_enemy_num").innerHTML=all_ghost_num;
               
                // $("#ready").show();
                $("#customs4").show();
                var at =  setInterval(() => {
                    console.log("level=",level);
                    $("#customs4").hide();
                    clearInterval(at);
                }, 4000);
            default:
                // img.src="img/first_background.png";
        }
    }
}     