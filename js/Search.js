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
                Ca.drawWall(ctx, TowerHome.towerHomeOne, "goldenrod");
                break;
            case 1:
                Ca.drawWall(ctx, TowerHome.towerHomeTwo, "orange");
                break;
            case 2:
                Ca.drawWall(ctx, TowerHome.towerHomeThree, "orange");
                break;
            case 3:
                Ca.drawWall(ctx, TowerHome.towerHomeFour, "orange");
                break;
            default:
                Ca.drawWall(ctx, TowerHome.towerHomeOne, "goldenrod");
        }
    }


    //根据关卡来画背景
    DrawBackground(level) {
        var cv = document.querySelector('#canvasMap_backgroud');
        var ctx = cv.getContext('2d');
        var  img  =  new  Image;
        img.onload = function()  {
            ctx.drawImage(img, 0, 0, 1500, 650, 0, 0, 1500, 650); 
        };
        switch (level) {
            case 0:
                img.src="img/first_background.png";
                break;
            case 1:
                img.src="img/second_background.png";
                break;
            case 2:
                img.src="img/third_background.png";
                break;
            case 3:
                img.src="img/fourth_background.png";
                break;
            default:
                img.src="img/first_background.png";
        }
    }
}     