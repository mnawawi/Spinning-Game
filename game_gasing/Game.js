

    var clamp = function (x, min, max) {
        return x < min ? min : (x > max ? max : x);
    };
    var clamp = function (y, min, max) {
        return y < min ? min : (y > max ? max : y);

    };


    var score = 0;
    var v;
    var jumlah;
    ///////////////////////////////////////////////////////////////////////////////////////////////////

    /*function countDown(secs, elem) {
        var element = document.getElementById(elem);
    
        Q.stageScene("scoreBoard", 1, { label: "Masa:"+" " + secs });
        if (secs < 1) {
            
           
            Q.stageScene("Masa", 1, { label: "Masa Tamat" });
            clearTimeout(timer);
            
        }
        secs--;
        var timer = setTimeout('countDown(' + secs + ',"' + elem + '")', 1000);
    }*/




    ///////////////////////////////////////////////////////////////////////////////////////////////////





    //var Q = Quintus({ audioSupported: ['wav', 'mp3'] });
    var Q = Quintus()
        .include("Sprites, Anim, Input, Touch, Scenes, UI,Audio,Input,2D")
        .setup({ Add: "scaleToFit: true" })
        .touch()
        .enableSound();
    Q.input.joypadControls();

  Q.input.touchControls({
        controls:
        [
            ['left', 'lft'],
                ['right', 'rgt'],
                [],
                [],
                [],
                [],
                ['up', 'up'],
                ['down', 'dw'],
        ]
    });

    Q.controls();


    ///////////////////////////////////////////////////////////////////////////////////////////////////


    Q.Sprite.extend("Player", {
        init: function (p) {
            this._super(p, {
                sprite: "player",
                sheet: "player",
                x: Q.el.width - 80,
                y: Q.el.height / 2,
                type: Q.SPRITE_FRIENDLY,
                speed: 1
            });

            this.add("animation");
            this.play("default");
            this.add("2d");

            this.on("hit", function (col) {
                if (col.obj.isA("Shot") && ((col.obj.p.type & Q.SPRITE_ENEMY) == Q.SPRITE_ENEMY)) {
                    this.destroy();
                    col.obj.destroy();
                    Q.stageScene("endGame", 1, { label: "Markah:" + "" + score });
                    Q.stageScene("mati", 2, { label: "Mati  dah! cap ayam" });
                    jumlah = score + v;
                    Q.stageScene("jumlah", 3, { label: "Jumlah Skor :" + jumlah });

                }
            });
            this.on("hit", function (col) {



                if (col.obj.isA("Duit")) {
                    //Q.state.inc("score", 1);
                    score++;

                    Q.stageScene("scoreBoard", 1, { label: "Markah:" + " " + score });


                }
            });
            this.on("hit", function (col) {
                if (col.obj.isA("Halangan")) {
                    /////////////////////////////////////kanan/////////
                    var k = Q.el.width - 260;
                    var k1 = Q.el.width / 2 - 100;
                    /////////////////////////////////////bawah/////////
                    var b = (Q.el.height / 2) + 70;
                    var b1 = Q.el.height / 2 + 80;
                    /////////////////////////////////////atas/////////
                    var a = (Q.el.height / 2) - 70;
                    var a1 = Q.el.height / 2 + 80;
                    /////////////////////////////////////kanan/////////
                    var kn = Q.el.width - 300;
                    var kn1 = Q.el.width / 2 - 100;
                    ////////////////////////////////////////////////////
                    x = this.p.x;
                    y = this.p.y;


                    //Q.state.set("score", 50);

                    if (k || k1 == x) {

                        if (Q.inputs['left'])
                            this.p.x += this.p.speed;
                        // document.write("nilai b adalah:" + k1);
                    }

                    if (b || b1 == y) {
                        if (Q.inputs['up'])
                            this.p.y += this.p.speed;

                    }
                    if (a || a1 == y) {
                        if (Q.inputs['down'])
                            this.p.y -= this.p.speed;

                    }
                    if (kn || kn1 == x) {

                        if (Q.inputs['right'])
                            this.p.x -= this.p.speed;
                        //document.write("nilai b adalah:" + kn1);

                    }
                }
            });
            this.on("hit", function (col) {
                if (col.obj.isA("Halangan1")) {

                    /////////////////////////////////////kanan/////////
                    var k = Q.el.width + 350;
                    var k1 = Q.el.width / 2 - 100;
                    /////////////////////////////////////bawah/////////
                    var b = Q.el.height / 2 + 130;
                    var b1 = Q.el.height / 2 + 200;
                    /////////////////////////////////////atas/////////
                    var a = Q.el.height / 2 + 130;
                    var a1 = Q.el.height / 2 + 200;
                    /////////////////////////////////////kanan/////////
                    var kn = Q.el.height / 2 + 120;
                    var kn1 = Q.el.height / 2 + 200;
                    //////////////////////////////////////////////////
                    x = this.p.x;
                    y = this.p.y;

                    if (k || k1 == x) {

                        if (Q.inputs['left'])
                            this.p.x += this.p.speed;
                        // document.write("nilai b adalah:" + k1);
                    }

                    if (b || b1 == y) {
                        if (Q.inputs['up'])
                            this.p.y += this.p.speed;

                    }
                    if (a || a1 == y) {
                        if (Q.inputs['down'])
                            this.p.y -= this.p.speed;

                    }
                    if (kn || kn1 == x) {

                        if (Q.inputs['right'])
                            this.p.x -= this.p.speed;
                        //document.write("nilai b adalah:" + kn1);

                    }
                }
            });
        },
        step: function (dt) {

            if (Q.inputs['left']) {
                this.p.x -= this.p.speed;

            }
            if (Q.inputs['right']) {
                this.p.x += this.p.speed;

            }
            if (Q.inputs['up']) {
                this.p.y -= this.p.speed;

            }
            if (Q.inputs['down']) {
                this.p.y += this.p.speed;

            }


            var x = Q.el.width / 2;
            var y = ((Q.el.height / 2) + 10);

            var a;
            var b;
            var r;
            var c;
            var k;
            a = this.p.x;
            b = this.p.y;

            r = Math.sqrt((Math.pow((x - a), 2)) + (Math.pow((y - b), 2)));
            c = 2 * (Math.PI * r);
            k = 0.0002636 * c;

            if (k > 0.6006181765332266) {
                this.destroy();

                Q.stageScene("endGame", 1, { label: "Terkeluar" });

                return 0;
            }

            if (0.6006181765332266 > k > 0.480494541) {
                v = 5;


                Q.stageScene("scoreBoard1", 2, { label: "Skor Jarak :" + v });

                //return 0;
            }

            if (0.480494541 > k > 0.360370906) {
                v = 10;


                Q.stageScene("scoreBoard1", 2, { label: "Skor Jarak :" + v });

                //return 0;
            }
            if (0.360370906 > k > 0.240247271) {
                v = 15;


                Q.stageScene("scoreBoard1", 2, { label: "Skor Jarak :" + v });

                //return 0;
            }


            this.p.x = clamp(this.p.x, 0 + (this.p.w / 2), Q.el.width - (this.p.w / 2));
            this.p.y = clamp(this.p.y, 0 + (this.p.w / 2), Q.el.width - (this.p.w / 2));
            this.stage.collide(this);
        }
    });


    ///////////////////////////////////////////////////////////////////////////////////////////////////


    Q.Sprite.extend("Alien", {
        init: function (p) {
            this._super(p, {
                sprite: "alien",
                sheet: "alien",
                x: Q.el.width,
                speed: 300
            });

            this.p.y = this.p.h;
            this.add("animation");
            this.play("default");
            this.add("BasicAI");
            this.on("hit", function (col) {
                if (col.obj.isA("Shot") && ((col.obj.p.type & Q.SPRITE_FRIENDLY) == Q.SPRITE_FRIENDLY)) {
                    this.destroy();
                    col.obj.destroy();
                    Q.stageScene("endGame", 1, { label: "You Won!" });
                }
            });
        },
        step: function (dt) {
            this.p.x = clamp(this.p.x, 0 + (this.p.w / 2), Q.el.width - (this.p.w / 2));
            this.p.y = clamp(this.p.y, 0 + (this.p.w / 2), Q.el.width - (this.p.w / 2));
            this.stage.collide(this);
        }
    });


    ///////////////////////////////////////////////////////////////////////////////////////////////////

    Q.Sprite.extend("Alien1", {
        init: function (p) {
            this._super(p, {
                sprite: "alien1",
                sheet: "alien1",
                x: Q.el.width / 2,
                y: Q.el.height - 10,
                speed: 350
            });

            this.p.y = this.p.h;
            this.add("animation");
            this.play("default");
            this.add("BasicAI2");
            this.on("hit", function (col) {
                if (col.obj.isA("Shot") && ((col.obj.p.type & Q.SPRITE_FRIENDLY) == Q.SPRITE_FRIENDLY)) {
                    this.destroy();
                    col.obj.destroy();
                    Q.stageScene("endGame", 1, { label: "You Won!" });
                }
            });
        },
        step: function (dt) {
            this.p.x = clamp(this.p.x, 0 + (this.p.w / 2), Q.el.width - (this.p.w / 2));
            this.p.y = clamp(this.p.y, 0 + (this.p.w / 2), Q.el.width - (this.p.w / 2));
            this.stage.collide(this);
        }
    });


    ///////////////////////////////////////////////////////////////////////////////////////////////////

    Q.Sprite.extend("Shot", {
        init: function (p) {
            this._super(p, {
                sprite: "shot",
                sheet: "shot",
                speed: 500
            });

            this.add("animation");
            this.play("default");
        },
        step: function (dt) {
            this.p.y -= this.p.speed * dt;

            if (this.p.y > Q.el.height || this.p.y < 0) {
                this.destroy();
            }
        }
    });


    ///////////////////////////////////////////////////////////////////////////////////////////////////

    Q.component("BasicAI", {
        added: function () {
            this.entity.changeDirections();
            this.entity.on("step", "move");
            this.entity.on("step", "tryToFire");
            this.entity.add("Gun");
        },
        extend: {
            changeDirections: function () {
                var entity = this;
                var numberOfSeconds = Math.floor((Math.random() * 3) + 1);
                setTimeout(function () {
                    entity.p.speed = -entity.p.speed;
                    entity.changeDirections();
                }, numberOfSeconds * 1000);
            },
            move: function (dt) {
                var entity = this;
                entity.p.x -= entity.p.speed * dt;
                if (entity.p.x > Q.el.width - (entity.p.w / 2) || entity.p.x < 0 + (entity.p.w / 2)) {
                    entity.p.speed = -entity.p.speed;
                }
            },

            tryToFire: function () {
                var entity = this;
                var player = Q("Player").first();
                if (!player)
                    return;
                if (player.p.x + player.p.w > entity.p.x && player.p.x - player.p.w < entity.p.x) {
                    this.fire(Q.SPRITE_ENEMY);
                }
            }
        }
    });


    ///////////////////////////////////////////////////////////////////////////////////////////////////


    Q.component("BasicAI2", {
        added: function () {
            this.entity.changeDirections();
            this.entity.on("step", "move");
            this.entity.on("step", "tryToFire");
            this.entity.add("Gun");
        },
        extend: {
            changeDirections: function () {
                var entity = this;
                var numberOfSeconds = Math.floor((Math.random() * 5) + 1);
                setTimeout(function () {
                    entity.p.speed = -entity.p.speed;
                    entity.changeDirections();
                }, numberOfSeconds * 500);
            },
            move: function (dt) {
                var entity = this;
                entity.p.x -= entity.p.speed * dt;
                if (entity.p.x > Q.el.width - (entity.p.w / 2) || entity.p.x < 0 + (entity.p.w / 2)) {
                    entity.p.speed = -entity.p.speed;
                }
            },

            tryToFire: function () {
                var entity = this;
                var player = Q("Player").first();
                if (!player)
                    return;
                if (player.p.x + player.p.w > entity.p.x && player.p.x - player.p.w < entity.p.x) {
                    this.fire(Q.SPRITE_ENEMY);
                }
            }
        }
    });



    Q.component("Gun", {
        added: function () {
            this.entity.p.shots = [];
            this.entity.p.canFire = true;
            this.entity.on("step", "handleFiring");
        },

        extend: {
            handleFiring: function (dt) {
                var entity = this;

                for (var i = entity.p.shots.length - 1; i >= 0; i--) {
                    if (entity.p.shots[i].isDestroyed) {
                        entity.p.shots.splice(i, 1);
                    }
                }

                if (Q.inputs['fire'] && entity.p.type == Q.SPRITE_FRIENDLY) {
                    entity.fire(Q.SPRITE_FRIENDLY);
                }
            },

            fire: function (type) {
                var entity = this;

                if (!entity.p.canFire)
                    return;

                var shot;
                if (type == Q.SPRITE_FRIENDLY) {
                    shot = Q.stage().insert(new Q.Shot({ x: entity.p.x, y: entity.p.y - 50, speed: 200, type: Q.SPRITE_DEFAULT | Q.SPRITE_FRIENDLY }));
                } else {
                    shot = Q.stage().insert(new Q.Shot({ x: entity.p.x, y: entity.p.y + entity.p.h - 20, speed: -200, type: Q.SPRITE_DEFAULT | Q.SPRITE_ENEMY }));
                }
                entity.p.shots.push(shot);
                entity.p.canFire = false;
                setTimeout(function () {
                    entity.p.canFire = true;
                }, 500);

            }
        }
    });


    ///////////////////////////////////////////////////////////////////////////////////////////////////
    Q.Sprite.extend("Duit", {
        init: function (p) {
            this._super(p, {
                sprite: "duit",
                sheet: "duit",
                // x: Math.round(Math.random() * (Q.el.width/10)),
                // y: Math.round(Math.random() * (Q.el.height/10)),

                x: Q.el.width - 300,
                y: Q.el.height / 2 - 200,
                type: Q.SPRITE_FRIENDLY,

            });
            this.add("animation");
            this.play("default");
            this.on("hit", function (col) {
                if (col.obj.isA("Player") && ((col.obj.p.type & Q.SPRITE_FRIENDLY) == Q.SPRITE_FRIENDLY)) {
                    this.destroy();
                    // Q.state.inc("score", 1);

                }
            });


        },
        step: function (dt) {


            this.stage.collide(this);

        }
    });

    ///////////////////////////////////////////////////////////////////////////////////////////////////


    Q.Sprite.extend("Center", {
        init: function (p) {
            this._super(p, {
                sprite: "center",
                sheet: "center",
                x: Q.el.width / 2,
                y: ((Q.el.height / 2) + 10),
                type: Q.SPRITE_FRIENDLY,
                speed: 10
            });

            this.add("animation");
            this.play("default");

            this.on("hit", function (col) {
                if (col.obj.isA("Player") && ((col.obj.p.type & Q.SPRITE_FRIENDLY) == Q.SPRITE_FRIENDLY)) {
                    this.destroy();
                    col.obj.destroy();

                    Q.stageScene("endGame", 1, { label: "Markah:" + "" + score });
                    Q.stageScene("mati", 2, { label: "Menang! power la jugak" });
                    jumlah = score + v;
                    Q.stageScene("jumlah", 3, { label: "Jumlah Skor :" + jumlah });


                }

            });
        },
        step: function (dt) {

            this.stage.collide(this);
        }
    });


    ///////////////////////////////////////////////////////////////////////////////////////////////////

    Q.Sprite.extend("Halangan", {
        init: function (p) {
            this._super(p, {
                sprite: "halangan",
                sheet: "halangan",

                //type: Q.SPRITE_FRIENDLY,

            });
            //this.add('2d, aiBounce');

        },
        step: function (dt) {

            this.stage.collide(this);
        }
    });


    Q.Sprite.extend("Halangan1", {

        init: function (p) {
            this._super(p, {
                sprite: "halangan1",
                sheet: "halangan1",


                type: Q.SPRITE_FRIENDLY,

            });
            // Listen for hit event and call the collision method
            this.add("animation");
            this.play("default");
            this.on("hit", this, "collision");



        },

        collision: function (col) {

            // .. do anything custom you need to do ..
            // normal of the collision, x direction

            // Move the sprite away from the collision
            //this.p.x += col.normalX;
            //this.p.y +=  col.normalY;
        },

        step: function (dt) {
            // Tell the stage to run collisions on this sprite
            this.stage.collide(this);
        }
    });



    ///////////////////////////////////////////////////////////////////////////////////////////////////

    Q.scene("mainLevel", function (stage) {

        stage.insert(new Q.Sprite({ asset: "backgroundgasing.png", x: Q.el.width / 2, y: Q.el.height / 2, type: Q.SPRITE_NONE }));
        stage.insert(new Q.Sprite({ asset: "gasingkeluar.png", x: Q.el.width / 2, y: Q.el.height / 2, type: Q.SPRITE_NONE }));
        stage.insert(new Q.Sprite({ asset: "gasingmasa.png", x: Q.el.width - 95, y: Q.el.height / 2, type: Q.SPRITE_NONE }));
        stage.insert(new Q.Player());
        stage.insert(new Q.Alien());
        stage.insert(new Q.Alien1());
        stage.insert(new Q.Center());
        stage.insert(new Q.Halangan({ x: Q.el.width - 300, y: Q.el.height / 2, }));
        stage.insert(new Q.Halangan({ x: Q.el.width / 2 - 100, y: Q.el.height / 2 + 80 }));
        stage.insert(new Q.Halangan({ x: Q.el.width / 2 - 100, y: Q.el.height / 2 - 140 }));
        stage.insert(new Q.Halangan1({ x: Q.el.width - 300, y: Q.el.height / 2 + 130 }));
        stage.insert(new Q.Halangan1({ x: Q.el.width / 2 - 15, y: Q.el.height / 2 + 200 }));
        stage.insert(new Q.Halangan1({ x: Q.el.width / 2 - 15, y: Q.el.height / 2 - 200 }));
        stage.insert(new Q.Halangan1({ x: Q.el.width / 2 + 150, y: Q.el.height / 2 - 150 }));
        // stage.insert(new Q.Score());
        stage.insert(new Q.Duit({ x: Q.el.width / 2 - 50, y: Q.el.height / 2 - 150 }));
        stage.insert(new Q.Duit({ x: Q.el.width / 2 + 300, y: Q.el.height / 2 - 100 }));
        stage.insert(new Q.Duit({ x: Q.el.width / 2 - 100, y: Q.el.height / 2 + 150 }));
        stage.insert(new Q.Duit({ x: Q.el.width / 2 - 150, y: Q.el.height / 2 + 100 }));
        stage.insert(new Q.Duit({ x: Q.el.width / 2 + 150, y: Q.el.height / 2 + 200 }));
        stage.insert(new Q.Duit({ x: Q.el.width / 2 + 250, y: Q.el.height / 2 + 100 }));
        stage.insert(new Q.Duit({ x: Q.el.width / 2 + 200, y: Q.el.height / 2 + 55 }));
        stage.insert(new Q.Duit({ x: Q.el.width / 2 - 200, y: Q.el.height / 2 + 250 }));
        stage.insert(new Q.Duit({ x: Q.el.width / 2 - 200, y: Q.el.height / 2 - 250 }));
        stage.insert(new Q.Duit({ x: Q.el.width / 2 - 200, y: Q.el.height / 2 + 250 }));
        stage.insert(new Q.Duit({ x: Q.el.width / 2 - 200, y: Q.el.height / 2 - 150 }));
        stage.insert(new Q.Duit({ x: Q.el.width / 2, y: Q.el.height / 2 + 250 }));
        stage.insert(new Q.Duit({ x: Q.el.width / 2 - 300, y: Q.el.height / 2 }));
        stage.insert(new Q.Duit({ x: Q.el.width / 2, y: Q.el.height / 2 - 250 }));
        //countDown(10);



    });

  

    Q.scene("scoreBoard", function (stage) {

        stage.insert(new Q.UI.Text({
            x: Q.el.width / 2 - 250, y: Q.el.height - 750, label: stage.options.label, color: "#FFFFFF", size: 40
        }));

    });
    Q.scene("scoreBoard1", function (stage) {

        stage.insert(new Q.UI.Text({
            x: Q.el.width / 2 + 250, y: Q.el.height - 750, label: stage.options.label, color: "#FFFFFF", size: 40
        }));

    });
    Q.scene("mati", function (stage) {

        stage.insert(new Q.UI.Text({
            x: Q.el.width / 2, y: Q.el.height / 2 + 100, label: stage.options.label, color: "#FFFFFF", size: 40
        }));

    });
    Q.scene("jumlah", function (stage) {

        stage.insert(new Q.UI.Text({
            x: Q.el.width / 2, y: Q.el.height / 2 + 150, label: stage.options.label, color: "#FFFFFF", size: 40
        }));

    });




    ///////////////////////////////////////////////////////////////////////////////////////////////////

    Q.scene("startGame", function (stage) {

        stage.insert(new Q.Sprite({ asset: "gasingmula.png", x: Q.el.width / 2, y: Q.el.height / 2, type: Q.SPRITE_NONE }));
        var container = stage.insert(new Q.UI.Container({
            x: Q.width / 2, y: ((Q.height / 2)), fill: "#E1533C"
        }));

        var button = container.insert(new Q.UI.Button({
            x: 0, y: 0, fill: "#CCCCCC", label: "Mula main"
        }));


        button.on("click", function () {
            Q.clearStages();

            Q.stageScene("mainLevel");

        });
        container.fit(20);
    });


    Q.scene("endGame", function (stage) {

        var container = stage.insert(new Q.UI.Container({
            x: Q.width / 2, y: ((Q.height / 2) - 100), fill: "#E1533C"
        }));

        var button = container.insert(new Q.UI.Button({
            x: 0, y: 0, fill: "#CCCCCC", label: "Main Semula"
        }));

        container.insert(new Q.UI.Text({
            x: 10, y: -10 - button.p.h, label: stage.options.label
        }));
        button.on("click", function () {

            Q.clearStages();
            score = 0;
            Q.stageScene("mainLevel");
        });
        container.fit(20);
    });

    /*Q.UI.Text.extend("Score", {
        init: function (p) {
            this._super({
                label: "score: 0",
                x: Q.el.width / 2 + 300, y: Q.el.height - 750,
                size:40
            });
            //Q.state.inc("score", 1);
            Q.state.on("change.score", this, "score");
        },
    
        score: function (score) {
            this.p.label = "score: " + score;
        }
    });*/

    ///////////////////////////////////////////////////////////////////////////////////////////////////



    Q.load([ "gasingmula.png", "backgroundgasing.png", "gasingkeluar.png", "gasinganimasi.png", "gasingtembak.png", "gasingmusuh.png", "gasingmusuh1.png", "gasingtengah.png", "gasinghalangan.png", "gasingmasa.png", "gasingduit.png", "gasinghalangan1.png",
        "gasingkeluar.json", "gasinganimasi.json", "gasingtembak.json", "gasingmusuh.json", "gasingmusuh1.json", "gasingtengah.json", "gasinghalangan.json", "gasingduit.json", "gasinghalangan1.json"], function () {


            Q.compileSheets("gasinganimasi.png", "gasinganimasi.json");
            Q.compileSheets("gasingtembak.png", "gasingtembak.json");
            Q.compileSheets("gasingtengah.png", "gasingtengah.json");
            Q.compileSheets("gasingmusuh.png", "gasingmusuh.json");
            Q.compileSheets("gasingmusuh1.png", "gasingmusuh1.json");
            Q.compileSheets("gasinghalangan.png", "gasinghalangan.json");
            Q.compileSheets("gasingduit.png", "gasingduit.json");
            Q.compileSheets("gasinghalangan1.png", "gasinghalangan1.json");
            Q.animations("player", { default: { frames: [0, 1], rate: 1 / 10 } });
            Q.animations("shot", { default: { frames: [0, 1], rate: 1 / 5 } });
            Q.animations("center", { default: { frames: [0, 3], rate: 1 / 5 } });
            Q.animations("alien", { default: { frames: [0, 1, 2, 3], rate: 1 / 4 } });
            Q.animations("alien1", { default: { frames: [3, 2, 1, 0], rate: 1 } });
            Q.animations("halangan", { default: { frames: [0], rate: 2 } });
            Q.animations("duit", { default: { frames: [0, 1], rate: 1 / 5 } });
            Q.animations("halangan1", { default: { frames: [0, 3], rate: 1 / 4 } });
 
            Q.stageScene("mainLevel");



        });

