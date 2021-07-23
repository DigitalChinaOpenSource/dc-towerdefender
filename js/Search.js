class Search {
    constructor() {}

    //根据地图数来设定塔的坑位
    searchTower(map_index) {
        switch (map_index) {
            case 0:
                return TowerHome.towerHomeOne;
                break;
            case 1:
                return TowerHome.towerHomeTwo;
                break;
            case 2:
                return TowerHome.towerHomeThree;
                break;
            default:
                return TowerHome.towerHomeOne;
                break;
        }
    }

    //根据关卡数来设定敌人的路线
    searchEnemyRoute(map_index) {
        switch (map_index) {
            case 0:
                return moveRoute.routeOne;
                break;
            case 1:
                return moveRoute.routeTwo;
                break;
            case 2:
                return moveRoute.routeThree;
                break;
            default:
                return moveRoute.MOVEARROne;
                break;
        }
    }

    //根据关卡数来画小兵行进路线
    DrawEnemyRoad(map_index) {
            var cv = document.querySelector('#canvasMap_backgroud');
            var ctx = cv.getContext('2d');
            switch (map_index) {
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
    DrawTowerPlace(map_index) {
        var cv = document.querySelector('#canvasMap_backgroud');
        var ctx = cv.getContext('2d');
        switch (map_index) {
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
    // DrawBackground(map_index) {
    //     var cv = document.querySelector('#canvasMap_backgroud');
    //     var ctx = cv.getContext('2d');
    //     var img = new Image;
    //     img.onload = function()  {
    //         ctx.drawImage(img, 0, 0, 1020, 660, 0, 0, 1020, 660); 
    //     };
    //     switch (map_index) {
    //         case 0:
    //            img.src="img/map1.png";
    //             START_X=0,START_Y=540,END_X=1140,END_Y=540;
    //             document.getElementById("container").style.backgroundImage="url('../img/map1_0.png')";
    //             document.getElementById("all_enemy_num").innerHTML=all_ghost_num;
    //             break;
    //         case 1:
    //             img.src="img/map2.png";               
    //             START_X=0,START_Y=600,END_X=1140,END_Y=0;
    //             document.getElementById("container").style.backgroundImage="url('../img/map2_0.png')";
    //             document.getElementById("all_enemy_num").innerHTML=all_ghost_num;
    //             // $("#ready").show();
    //             $("#customs2").show();
    //             var at = setInterval(() => {
    //                 console.log("level=",level);
    //                 $("#customs2").hide();
    //                 clearInterval(at);
    //             }, 4000);
    //             break;
    //         case 2:
    //             img.src="img/map3.png";
    //             START_X=0,START_Y=480,END_X=1140,END_Y=60;
    //             document.getElementById("container").style.backgroundImage="url('../img/map3_0.png')";                
    //             document.getElementById("all_enemy_num").innerHTML=all_ghost_num;
    //             document.getElementById("lifeshow").style.color="black";
    //             document.getElementById("moneyshow").style.color="black";
    //             document.getElementById("enemysshow").style.color="black";
    //             document.getElementById("all_enemy_num").style.color="black";
    //             // $("#ready").show();
    //             $("#customs3").show();
    //             var at = setInterval(() => {
    //                 console.log("level=",level);
    //                 $("#customs3").hide();
    //                 clearInterval(at);
    //             }, 4000);
    //             break;
    //         default:
    //             // img.src="img/first_background.png";
    //     }
    // }
}     