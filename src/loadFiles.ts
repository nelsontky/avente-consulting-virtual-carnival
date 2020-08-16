import "phaser";

export default function loadFiles(scene: Phaser.Scene) {
  scene.load.tilemapTiledJSON(
    "overworld",
    "assets/tiles/overworld/overworld.json"
  );
  scene.load.tilemapTiledJSON("0", "assets/tiles/rooms/0.json");
  scene.load.tilemapTiledJSON("1", "assets/tiles/rooms/1.json");
  scene.load.tilemapTiledJSON("2", "assets/tiles/rooms/2.json");
  scene.load.tilemapTiledJSON("3", "assets/tiles/rooms/3.json");
  scene.load.tilemapTiledJSON("4", "assets/tiles/rooms/4.json");

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
    "assets/tiles/overworld/Image/Pandamaru Circus 2.png"
  );
  scene.load.image(
    "Pandamaru Circus 1",
    "assets/tiles/overworld/Image/Pandamaru Circus 1.png"
  );
  scene.load.image(
    "Pandamaru Merry-Go-Round",
    "assets/tiles/overworld/Image/Pandamaru Merry-Go-Round.png"
  );
  scene.load.image(
    "Pandamaru Market 1",
    "assets/tiles/overworld/Image/Pandamaru Market 1.png"
  );
  scene.load.image(
    "Pandamaru Magic Tent",
    "assets/tiles/overworld/Image/Pandamaru Magic Tent.png"
  );
  scene.load.image(
    "Emerald (Tommy)",
    "assets/tiles/overworld/Editted Image/Emerald (Tommy).png"
  );
  scene.load.image(
    "Outside (Hoenn) (Tommy)",
    "assets/tiles/overworld/Editted Image/Outside (Hoenn) (Tommy).png"
  );
  scene.load.image(
    "Pandamaru Egypt",
    "assets/tiles/overworld/Image/Pandamaru Egypt.png"
  );
  scene.load.image(
    "carmin sur mer",
    "assets/tiles/overworld/Image/Zeak Pokemon Map Pack/Graphics/Tilesets/carmin sur mer.png"
  );
  scene.load.image(
    "Pandamaru Port Props",
    "assets/tiles/overworld/Image/Pandamaru Port Props.png"
  );
  scene.load.image(
    "Pandamaru Goods 1",
    "assets/tiles/overworld/Image/Pandamaru Goods 1.png"
  );
  scene.load.image(
    "Brown cave sand",
    "assets/tiles/overworld/Image/Zeak Pokemon Map Pack/Graphics/Autotiles/Brown cave sand.png"
  );
  scene.load.image(
    "Dirt cave highlight",
    "assets/tiles/overworld/Image/Zeak Pokemon Map Pack/Graphics/Autotiles/Dirt cave highlight.png"
  );
  scene.load.image(
    "celianna_templetiles_torches",
    "assets/tiles/overworld/Image/celianna_templetiles_torches.png"
  );
  scene.load.image(
    "TileC Celianna",
    "assets/tiles/overworld/Image/TileC Celianna.png"
  );
  scene.load.image(
    "pandamaru tree 1",
    "assets/tiles/overworld/Image/pandamaru tree 1.png"
  );
  scene.load.image(
    "pandamaru tree 2",
    "assets/tiles/overworld/Image/pandamaru tree 2.png"
  );
  scene.load.image(
    "pokemon_tileset_from_public_tiles_by_chaoticcherrycake_d5xdb0y-pre",
    "assets/tiles/overworld/Image/pokemon_tileset_from_public_tiles_by_chaoticcherrycake_d5xdb0y-pre.png"
  );
  scene.load.image(
    "pandamaru tree 3",
    "assets/tiles/overworld/Image/pandamaru tree 3.png"
  );
  scene.load.image(
    "pandamaru tree 4",
    "assets/tiles/overworld/Image/pandamaru tree 4.png"
  );
  scene.load.image(
    "pandamaru tree 5",
    "assets/tiles/overworld/Image/pandamaru tree 5.png"
  );
  scene.load.image(
    "pandamaru tree goods",
    "assets/tiles/overworld/Image/pandamaru tree goods.png"
  );
  scene.load.image(
    "Pandamaru Playground",
    "assets/tiles/overworld/Image/Pandamaru Playground.png"
  );
  scene.load.image(
    "Pandamaru Enclosure 2",
    "assets/tiles/overworld/Image/Pandamaru Enclosure 2.png"
  );
  scene.load.image(
    "Pandamaru Train",
    "assets/tiles/overworld/Image/Pandamaru Train.png"
  );
  scene.load.image(
    "Pandamaru Train Wagon",
    "assets/tiles/overworld/Image/Pandamaru Train Wagon.png"
  );
  scene.load.image(
    "Hoenn Shipp",
    "assets/tiles/overworld/Image/Hoenn Shipp.png"
  );
  scene.load.image(
    "Hoeen (1) (Tommy)",
    "assets/tiles/overworld/Editted Image/Hoeen (1) (Tommy).png"
  );
  scene.load.image(
    "Boats (Tommy)",
    "assets/tiles/overworld/Editted Image/Boats (Tommy).png"
  );
  scene.load.image(
    "062-CF_Lava01",
    "assets/tiles/overworld/Image/Zeak Pokemon Map Pack/Graphics/Autotiles/062-CF_Lava01.png"
  );
  scene.load.image(
    "Tentages (Tommy)",
    "assets/tiles/overworld/Editted Image/Tentages (Tommy).png"
  );
  scene.load.image(
    "Flooring",
    "assets/tiles/overworld/Editted Image/Flooring.png"
  );
  scene.load.image(
    "Grey Oval Tracks (Tommy)",
    "assets/tiles/overworld/Editted Image/Grey Oval Tracks (Tommy).png"
  );
  scene.load.image("aiseh1", "assets/tiles/overworld/Editted Image/aiseh1.png");
  scene.load.image(
    "Pandamaru Retro floor",
    "assets/tiles/overworld/Image/Pandamaru Retro floor.png"
  );
  scene.load.image(
    "fairytale hero",
    "assets/tiles/overworld/Editted Image/fairytale hero.png"
  );
  scene.load.image(
    "cherry_blossom_trees_1",
    "assets/tiles/overworld/Editted Image/cherry_blossom_trees_1.png"
  );
  scene.load.image("amap", "assets/tiles/overworld/Editted Image/amap.png");
  scene.load.image(
    "Cherrytree",
    "assets/tiles/overworld/Editted Image/Cherrytree.png"
  );
  scene.load.image(
    "boxy_bold_font",
    "assets/tiles/overworld/Editted Image/boxy_bold_font.png"
  );
  scene.load.image(
    "Scifi 2",
    "assets/tiles/overworld/Editted Image/Scifi 2.png"
  );
  scene.load.image(
    "Scifi 1",
    "assets/tiles/overworld/Editted Image/Scifi 1.png"
  );
  scene.load.image(
    "Scifi 3",
    "assets/tiles/overworld/Editted Image/Scifi 3.png"
  );
  scene.load.image(
    "modern_cyberpunk_cyanide",
    "assets/tiles/overworld/Editted Image/modern_cyberpunk_cyanide.png"
  );
  scene.load.image("Space", "assets/tiles/overworld/Editted Image/Space.png");
  scene.load.image(
    "Space 2",
    "assets/tiles/overworld/Editted Image/Space 2.png"
  );
  scene.load.image(
    "Pandamaru Fruits",
    "assets/tiles/overworld/Image/Pandamaru Fruits.png"
  );
  scene.load.image(
    "YouTrip",
    "assets/tiles/overworld/Editted Image/Logo/YouTrip.png"
  );
  scene.load.image(
    "ezbuy",
    "assets/tiles/overworld/Editted Image/Logo/ezbuy.png"
  );
  scene.load.image(
    "avalon",
    "assets/tiles/overworld/Editted Image/Logo/avalon.png"
  );
  scene.load.image(
    "lim kee pau",
    "assets/tiles/overworld/Editted Image/Logo/lim kee pau.png"
  );

  // Rooms
  scene.load.image(
    "Scifi 2",
    "assets/tiles/rooms/../overworld/Editted Image/Scifi 2.png"
  );
  scene.load.image(
    "Scifi 1",
    "assets/tiles/rooms/../overworld/Editted Image/Scifi 1.png"
  );
  scene.load.image(
    "Space 2",
    "assets/tiles/rooms/../overworld/Editted Image/Space 2.png"
  );
  scene.load.image("futuristic", "assets/tiles/rooms/futuristic.png");
  scene.load.image(
    "Emerald (Tommy)",
    "assets/tiles/rooms/../overworld/Editted Image/Emerald (Tommy).png"
  );
  scene.load.image(
    "Pandamaru Enclosure 2",
    "assets/tiles/rooms/../overworld/Image/Pandamaru Enclosure 2.png"
  );
  scene.load.image("egypt", "assets/tiles/rooms/egypt.png");
  scene.load.image(
    "Pandamaru Egypt",
    "assets/tiles/rooms/../overworld/Image/Pandamaru Egypt.png"
  );
  scene.load.image(
    "celianna_templetiles_torches",
    "assets/tiles/rooms/../overworld/Image/celianna_templetiles_torches.png"
  );
  scene.load.image(
    "Emerald (Tommy)",
    "assets/tiles/rooms/../overworld/Editted Image/Emerald (Tommy).png"
  );
  scene.load.image(
    "Pandamaru Fruits",
    "assets/tiles/rooms/../overworld/Image/Pandamaru Fruits.png"
  );
  scene.load.image("treetop", "assets/tiles/rooms/treetop.png");
  scene.load.image(
    "Space",
    "assets/tiles/rooms/../overworld/Editted Image/Space.png"
  );
  scene.load.image("treetop sofa", "assets/tiles/rooms/treetop sofa.png");
  scene.load.image(
    "Emerald (Tommy)",
    "assets/tiles/rooms/../overworld/Editted Image/Emerald (Tommy).png"
  );
  scene.load.image(
    "Pandamaru Goods 1",
    "assets/tiles/rooms/../overworld/Image/Pandamaru Goods 1.png"
  );
  scene.load.image("Carnival Room", "assets/tiles/rooms/castle.png");
  scene.load.image(
    "Pandamaru Enclosure 2",
    "assets/tiles/rooms/Pandamaru Enclosure 2.png"
  );
  scene.load.image("Emerald (Tommy)", "assets/tiles/rooms/Emerald (Tommy).png");
  scene.load.image(
    "Pandamaru Magic Tent",
    "assets/tiles/rooms/../overworld/Image/Pandamaru Magic Tent.png"
  );
  scene.load.image("Boss Room", "assets/tiles/rooms/Boss Room.png");
  scene.load.image("Emerald (Tommy)", "assets/tiles/rooms/Emerald (Tommy).png");
  scene.load.image(
    "Pandamaru Merry-Go-Round",
    "assets/tiles/rooms/Pandamaru Merry-Go-Round.png"
  );
  scene.load.image(
    "Pandamaru Circus 2",
    "assets/tiles/rooms/../overworld/Image/Pandamaru Circus 2.png"
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
