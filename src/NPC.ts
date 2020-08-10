import "phaser";
import Player from "./Player";

export default class NPC {
  sprite: Phaser.Physics.Arcade.Sprite;
  player: Phaser.Physics.Arcade.Sprite;
  scene: Phaser.Scene;

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

    this.scene.physics.add.collider(this.sprite, this.player);

    this.scene.anims.create({
      key: "face_up",
      frames: [{ key: "chloe", frame: 0 }],
      frameRate: 20,
    });
    this.scene.anims.create({
      key: "face_down",
      frames: [{ key: "chloe", frame: 1 }],
      frameRate: 20,
    });
    this.scene.anims.create({
      key: "face_left",
      frames: [{ key: "chloe", frame: 2 }],
      frameRate: 20,
    });
    this.scene.anims.create({
      key: "face_right",
      frames: [{ key: "chloe", frame: 3 }],
      frameRate: 20,
    });
  }
}
