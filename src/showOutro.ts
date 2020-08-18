import "phaser";
import { Scene } from "phaser";

export default function showOutro(originScene: Scene) {
  originScene.scene.pause();
  originScene.scene.run("ad", {
    videoId: "outro",
    originScene: originScene.scene.key,
  });
}
