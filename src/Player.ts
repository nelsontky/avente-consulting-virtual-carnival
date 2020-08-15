import "phaser";

export default class Player {
  sprite: Phaser.Physics.Arcade.Sprite;
  scene: Phaser.Scene;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  stationaryDirection: "face_up" | "face_left" | "face_down" | "face_right";
  isFrozen: boolean;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    gender: "girl" | "boy"
  ) {
    this.scene = scene;
    this.sprite = this.scene.physics.add
      .sprite(x, y, gender, 9)
      .setSize(30, 40);
    this.isFrozen = false;

    this.scene.anims.create({
      key: "left",
      frames: this.scene.anims.generateFrameNumbers(gender, {
        start: 18,
        end: 26,
      }),
      frameRate: 15,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "right",
      frames: this.scene.anims.generateFrameNumbers(gender, {
        start: 27,
        end: 35,
      }),
      frameRate: 15,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "up",
      frames: this.scene.anims.generateFrameNumbers(gender, {
        start: 0,
        end: 8,
      }),
      frameRate: 20,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "down",
      frames: this.scene.anims.generateFrameNumbers(gender, {
        start: 9,
        end: 17,
      }),
      frameRate: 20,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "face_down",
      frames: [{ key: gender, frame: 9 }],
      frameRate: 20,
    });

    this.scene.anims.create({
      key: "face_right",
      frames: [{ key: gender, frame: 27 }],
      frameRate: 20,
    });

    this.scene.anims.create({
      key: "face_left",
      frames: [{ key: gender, frame: 18 }],
      frameRate: 20,
    });

    this.scene.anims.create({
      key: "face_up",
      frames: [{ key: gender, frame: 0 }],
      frameRate: 20,
    });

    this.stationaryDirection = "face_down";
    this.cursors = this.scene.input.keyboard.createCursorKeys();
  }

  update() {
    const speed = 175;

    if (this.isFrozen) {
      this.sprite.setVelocity(0);
      this.sprite.anims.play(this.stationaryDirection);
      // Vertical movement
    } else if (this.cursors.left.isDown && this.cursors.up.isDown) {
      this.sprite.anims.play("left", true);
      this.stationaryDirection = "face_left";
      this.sprite.setVelocityY(-speed);
      this.sprite.setVelocityX(-speed);
    } else if (this.cursors.right.isDown && this.cursors.up.isDown) {
      this.sprite.anims.play("right", true);
      this.stationaryDirection = "face_right";
      this.sprite.setVelocityY(-speed);
      this.sprite.setVelocityX(speed);
    } else if (this.cursors.left.isDown && this.cursors.down.isDown) {
      this.sprite.anims.play("left", true);
      this.stationaryDirection = "face_left";
      this.sprite.setVelocityY(speed);
      this.sprite.setVelocityX(-speed);
    } else if (this.cursors.right.isDown && this.cursors.down.isDown) {
      this.sprite.setVelocityY(speed);
      this.sprite.setVelocityX(speed);
      this.sprite.anims.play("right", true);
      this.stationaryDirection = "face_right";
    } else if (this.cursors.up.isDown) {
      this.sprite.setVelocityX(0);
      this.sprite.setVelocityY(-speed);
      this.sprite.anims.play("up", true);
      this.stationaryDirection = "face_up";
    } else if (this.cursors.down.isDown) {
      this.sprite.setVelocityX(0);
      this.sprite.setVelocityY(speed);
      this.sprite.anims.play("down", true);
      this.stationaryDirection = "face_down";
    } else if (this.cursors.left.isDown) {
      this.sprite.setVelocityY(0);
      this.sprite.setVelocityX(-speed);
      this.sprite.anims.play("left", true);
      this.stationaryDirection = "face_left";
    } else if (this.cursors.right.isDown) {
      this.sprite.setVelocityY(0);
      this.sprite.setVelocityX(speed);
      this.sprite.anims.play("right", true);
      this.stationaryDirection = "face_right";
    } else {
      this.sprite.setVelocity(0);
      this.sprite.anims.play(this.stationaryDirection);
    }

    this.sprite.body.velocity.normalize().scale(speed);
  }
}
