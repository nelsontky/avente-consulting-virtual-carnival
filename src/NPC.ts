import "phaser";

export default class NPC {
  sprite: Phaser.Physics.Arcade.Sprite;
  player: Phaser.Physics.Arcade.Sprite;
  scene: Phaser.Scene;
  touchPlayerObj: { isTouching: boolean; prevX?: number; prevY?: number };
  spaceKey: Phaser.Input.Keyboard.Key;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    player: Phaser.Physics.Arcade.Sprite
  ) {
    this.scene = scene;
    this.player = player;

    this.sprite = this.scene.physics.add
      .staticSprite(x, y, "chloe", 1)
      .setSize(30, 40);

    this.scene.physics.add.collider(
      this.sprite,
      this.player,
      () =>
        (this.touchPlayerObj = {
          isTouching: true,
          prevX: this.player.x,
          prevY: this.player.y,
        })
    );

    this.scene.anims.create({
      key: "chloe_face_up",
      frames: [{ key: "chloe", frame: 0 }],
      frameRate: 20,
    });
    this.scene.anims.create({
      key: "chloe_face_down",
      frames: [{ key: "chloe", frame: 1 }],
      frameRate: 20,
    });
    this.scene.anims.create({
      key: "chloe_face_left",
      frames: [{ key: "chloe", frame: 2 }],
      frameRate: 20,
    });
    this.scene.anims.create({
      key: "chloe_face_right",
      frames: [{ key: "chloe", frame: 3 }],
      frameRate: 20,
    });

    this.touchPlayerObj = { isTouching: false };

    this.spaceKey = this.scene.input.keyboard.addKey("SPACE");
  }

  checkDirectionToFace():
    | "chloe_face_left"
    | "chloe_face_right"
    | "chloe_face_up"
    | "chloe_face_down" {
    const playerX = this.player.x;
    const playerY = this.player.y;
    const { x, y } = this.sprite;

    const angleFromNpc = Math.atan2(y - playerY, x - playerX);
    const degrees = angleFromNpc * (180 / Math.PI) + 45;
    const actualDegrees = degrees < 0 ? degrees + 360 : degrees;

    if (actualDegrees >= 0 && actualDegrees < 90) {
      return "chloe_face_left";
    } else if (actualDegrees >= 90 && actualDegrees < 180) {
      return "chloe_face_up";
    } else if (actualDegrees >= 180 && actualDegrees < 270) {
      return "chloe_face_right";
    } else {
      return "chloe_face_down";
    }
  }

  update() {
    if (this.touchPlayerObj.isTouching && this.spaceKey.isDown) {
      this.sprite.anims.play(this.checkDirectionToFace());
    }

    // Check if still colliding with player
    if (
      this.touchPlayerObj.prevX !== this.player.x ||
      this.touchPlayerObj.prevY !== this.player.y
    ) {
      this.touchPlayerObj = { isTouching: false };
    }
  }
}
