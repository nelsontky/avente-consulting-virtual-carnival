import "phaser";

export default function loadFiles(scene: Phaser.Scene) {
  scene.load.image("tiles", "assets/tiles/test/tuxmon-sample-32px.png");
  scene.load.tilemapTiledJSON("map", "assets/tiles/Nelson Half Map 2.json");

  scene.load.spritesheet("girl", "assets/girl.png", {
    frameWidth: 28,
    frameHeight: 49,
  });
  scene.load.spritesheet("boy", "assets/boy.png", {
    frameWidth: 30,
    frameHeight: 53,
  });
  scene.load.image("boy-preview", "assets/boy-preview.png");
  scene.load.image("girl-preview", "assets/girl-preview.png");
  scene.load.image("tick", "assets/tick.png");
  scene.load.spritesheet("exit", "assets/exit.png", {
    frameWidth: 32,
    frameHeight: 16,
  });

  // Spot the diff
  scene.load.image("changed", "assets/spot_the_difference/changed.png");
  scene.load.image("original", "assets/spot_the_difference/original.png");

  // Tilesets
  scene.load.image(
    "Pandamaru Circus 2",
    "assets/tiles/Image/Pandamaru Circus 2.png"
  );
  scene.load.image(
    "Pandamaru Circus 1",
    "assets/tiles/Image/Pandamaru Circus 1.png"
  );
  scene.load.image(
    "Pandamaru Merry-Go-Round",
    "assets/tiles/Image/Pandamaru Merry-Go-Round.png"
  );
  scene.load.image(
    "Pandamaru Market 1",
    "assets/tiles/Image/Pandamaru Market 1.png"
  );
  scene.load.image(
    "Pandamaru Magic Tent",
    "assets/tiles/Image/Pandamaru Magic Tent.png"
  );
  scene.load.image(
    "Emerald (Tommy)",
    "assets/tiles/Editted Image/Emerald (Tommy).png"
  );
  scene.load.image(
    "Outside (Hoenn) (Tommy)",
    "assets/tiles/Editted Image/Outside (Hoenn) (Tommy).png"
  );
  scene.load.image("Pandamaru Egypt", "assets/tiles/Image/Pandamaru Egypt.png");
  scene.load.image(
    "carmin sur mer",
    "assets/tiles/Image/Zeak Pokemon Map Pack/Graphics/Tilesets/carmin sur mer.png"
  );
  scene.load.image(
    "Pandamaru Port Props",
    "assets/tiles/Image/Pandamaru Port Props.png"
  );
  scene.load.image(
    "Pandamaru Goods 1",
    "assets/tiles/Image/Pandamaru Goods 1.png"
  );
  scene.load.image(
    "Brown cave sand",
    "assets/tiles/Image/Zeak Pokemon Map Pack/Graphics/Autotiles/Brown cave sand.png"
  );
  scene.load.image(
    "Dirt cave highlight",
    "assets/tiles/Image/Zeak Pokemon Map Pack/Graphics/Autotiles/Dirt cave highlight.png"
  );
  scene.load.image(
    "celianna_templetiles_torches",
    "assets/tiles/Image/celianna_templetiles_torches.png"
  );
  scene.load.image("TileC Celianna", "assets/tiles/Image/TileC Celianna.png");
  scene.load.image(
    "pandamaru tree 1",
    "assets/tiles/Image/pandamaru tree 1.png"
  );
  scene.load.image(
    "pandamaru tree 2",
    "assets/tiles/Image/pandamaru tree 2.png"
  );
  scene.load.image(
    "pokemon_tileset_from_public_tiles_by_chaoticcherrycake_d5xdb0y-pre",
    "assets/tiles/Image/pokemon_tileset_from_public_tiles_by_chaoticcherrycake_d5xdb0y-pre.png"
  );
  scene.load.image(
    "pandamaru tree 3",
    "assets/tiles/Image/pandamaru tree 3.png"
  );
  scene.load.image(
    "pandamaru tree 4",
    "assets/tiles/Image/pandamaru tree 4.png"
  );
  scene.load.image(
    "pandamaru tree 5",
    "assets/tiles/Image/pandamaru tree 5.png"
  );
  scene.load.image(
    "pandamaru tree goods",
    "assets/tiles/Image/pandamaru tree goods.png"
  );
  scene.load.image(
    "Pandamaru Playground",
    "assets/tiles/Image/Pandamaru Playground.png"
  );
  scene.load.image(
    "Pandamaru Enclosure 2",
    "assets/tiles/Image/Pandamaru Enclosure 2.png"
  );
  scene.load.image("Pandamaru Train", "assets/tiles/Image/Pandamaru Train.png");
  scene.load.image(
    "Pandamaru Train Wagon",
    "assets/tiles/Image/Pandamaru Train Wagon.png"
  );
  scene.load.image("Hoenn Shipp", "assets/tiles/Image/Hoenn Shipp.png");
  scene.load.image(
    "Hoeen (1) (Tommy)",
    "assets/tiles/Editted Image/Hoeen (1) (Tommy).png"
  );
  scene.load.image(
    "Boats (Tommy)",
    "assets/tiles/Editted Image/Boats (Tommy).png"
  );
  scene.load.image(
    "062-CF_Lava01",
    "assets/tiles/Image/Zeak Pokemon Map Pack/Graphics/Autotiles/062-CF_Lava01.png"
  );
  scene.load.image(
    "Brown Oval Tracks (Tommy)",
    "assets/tiles/Editted Image/Brown Oval Tracks (Tommy).png"
  );
  scene.load.image(
    "Tentages (Tommy)",
    "assets/tiles/Editted Image/Tentages (Tommy).png"
  );

  // NPCs
  scene.load.spritesheet("Adrian", "assets/NPCs/Adrian.png", {
    frameWidth: 33,
    frameHeight: 61,
  });
  scene.load.spritesheet("Benedict", "assets/NPCs/Benedict.png", {
    frameWidth: 30,
    frameHeight: 55,
  });
  scene.load.spritesheet("Chloe", "assets/NPCs/Chloe.png", {
    frameWidth: 28,
    frameHeight: 56,
  });
  scene.load.spritesheet("Donald", "assets/NPCs/Donald.png", {
    frameWidth: 30,
    frameHeight: 61,
  });
  scene.load.spritesheet("Gregory", "assets/NPCs/Gregory.png", {
    frameWidth: 30,
    frameHeight: 56,
  });
  scene.load.spritesheet("Kingston", "assets/NPCs/Kingston.png", {
    frameWidth: 30,
    frameHeight: 53,
  });
  scene.load.spritesheet("Min Hein", "assets/NPCs/Min Hein.png", {
    frameWidth: 30,
    frameHeight: 62,
  });
  scene.load.spritesheet("Samantha", "assets/NPCs/Samantha.png", {
    frameWidth: 28,
    frameHeight: 52,
  });
  scene.load.spritesheet("Svarnim", "assets/NPCs/Svarnim.png", {
    frameWidth: 28,
    frameHeight: 52,
  });
  scene.load.spritesheet("Wai Siang", "assets/NPCs/Wai Siang.png", {
    frameWidth: 30,
    frameHeight: 53,
  });
  scene.load.spritesheet("Punnag", "assets/NPCs/Punnag.png", {
    frameWidth: 30,
    frameHeight: 54,
  });
  scene.load.spritesheet("Haris", "assets/NPCs/Haris.png", {
    frameWidth: 30,
    frameHeight: 54,
  });
  scene.load.spritesheet("Maneesha", "assets/NPCs/Maneesha.png", {
    frameWidth: 28,
    frameHeight: 55,
  });
}
