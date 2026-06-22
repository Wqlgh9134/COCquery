import { useState, useEffect } from 'react'

const BASE_URL = '/api/v1'

const NAME_MAP = {
  // 英雄
  'Barbarian King': '野蛮人之王', 'Archer Queen': '弓箭女皇', 'Grand Warden': '大守护者', 'Royal Champion': '飞盾战神', 
  'Minion Prince': '亡灵王子','Dragon Duke': '飞龙公爵',
  // 圣水兵
  'Barbarian': '野蛮人', 'Archer': '弓箭手', 'Giant': '巨人', 'Goblin': '哥布林', 'Wall Breaker': '炸弹人',
  'Balloon': '气球兵', 'Wizard': '法师', 'Healer': '天使', 'Dragon': '飞龙', 'P.E.K.K.A': '皮卡超人',
  'Baby Dragon': '飞龙宝宝', 'Miner': '掘地矿工', 'Electro Dragon': '雷电飞龙', 'Yeti': '大雪怪',
  'Dragon Rider': '龙骑士', 'Electro Titan': '雷霆泰坦', 'Root Rider': '根蔓骑士', 'Thrower': '巨矛投手',
  'Boulder': '陨石戈仑',
  // 黑油兵
  'Minion': '亡灵', 'Hog Rider': '野猪骑士', 'Valkyrie': '瓦基丽武神', 'Golem': '戈仑石人',
  'Witch': '女巫', 'Lava Hound': '熔岩猎犬', 'Bowler': '巨石投手', 'Ice Golem': '戈仑冰人',
  'Headhunter': '英雄猎手', 'Apprentice Warden': '守护者学徒', 'Druid': '德鲁伊', 'Furnace': '烈焰熔炉',
  // 超级兵
  'Super Barbarian': '超级野蛮人', 'Super Archer': '超级弓箭手', 'Super Giant': '超级巨人',
  'Sneaky Goblin': '隐秘哥布林', 'Super Wall Breaker': '超级炸弹人', 'Rocket Balloon Troop': '火箭气球兵',
  'Super Wizard': '超级法师', 'Super Dragon': '超级飞龙', 'Inferno Dragon': '地狱飞龙',
  'Super Miner': '超级矿工', 'Super Yeti': '超级大雪怪', 'Super Minion': '超级亡灵',
  'Super Hog Rider': '超级野猪骑士', 'Super Valkyrie': '超级瓦基丽武神', 'Super Witch': '超级女巫',
  'Ice Hound': '寒冰猎犬', 'Super Bowler': '超级巨石投手',
  // 法术
  'Lightning Spell': '雷电法术', 'Healing Spell': '疗伤法术', 'Rage Spell': '狂暴法术',
  'Jump Spell': '弹跳法术', 'Freeze Spell': '冰冻法术', 'Clone Spell': '镜像法术',
  'Invisibility Spell': '隐形法术', 'Recall Spell': '回溯法术', 'Revive Spell': '复苏法术',
  'Totem Spell': '图腾法术', 'Poison Spell': '毒药法术', 'Earthquake Spell': '地震法术',
  'Haste Spell': '急速法术', 'Skeleton Spell': '骷髅法术', 'Bat Spell': '蝙蝠法术',
  'Overgrowth Spell': '蔓生法术', 'Ice Block Spell': '冰障法术',
  // 野蛮人之王装备
  'Barbarian Puppet': '野蛮人木偶', 'Rage Vial': '狂暴药水瓶', 'Earthquake Boots': '地震金靴',
  'Vampstache': '嗜血胡须', 'Giant Gauntlet': '巨型手套', 'Spiky Ball': '尖刺足球',
  'Snake Bracelet': '灵蛇手镯', 'Stick Horse': '木棍马驹',
  // 弓箭女皇装备
  'Archer Puppet': '弓箭手木偶', 'Invisibility Vial': '隐形药水瓶', 'Giant Arrow': '巨型箭矢',
  'Healer Puppet': '天使木偶', 'Frozen Arrow': '冰封箭矢', 'Magic Mirror': '克隆魔镜',
  'Action Figure': '动作人偶', 'Sky Piercing Arrow': '擎天箭矢',
  // 亡灵王子装备
  'Henchmen Puppet': '护卫玩偶', 'Dark Orb': '暗黑魔球', 'Metal Pants': '铁甲短裤',
  'Noble Iron': '贵族哑铃', 'Dark Crown': '暗黑皇冠', 'Meteor Staff': '陨星法杖',
  // 大守护者装备
  'Eternal Tome': '永恒书卷', 'Life Gem': '生命宝石', 'Rage Gem': '狂暴宝石',
  'Healing Tome': '治疗书卷', 'Fireball': '巨大火球', 'Lavaloon Puppet': '熔岩气球玩偶',
  'Heroic Torch': '英雄火炬',
  // 飞盾战神装备
  'Seeking Shield': '寻踪飞盾', 'Royal Gem': '皇家宝石', 'Hog Rider Puppet': '野猪骑士木偶',
  'Haste Vial': '急速药水瓶', 'Rocket Spear': '火箭飞矛', 'Electro Boots': '雷电战靴',
  'Frost Flake': '冷冽冰晶',
  // 飞龙公爵装备
  'Fire Heart': '烈焰之心', 'Flame Blower': '助燃器', 'Stun Blaster': '爆震器',
  'Electro Fangs': '雷电獠牙', 'Rocket Backpack': '火箭背包',
  // 战宠
  'L.A.S.S.I': '莱希', 'Mighty Yak': '大牦', 'Phoenix': '凤凰', 'Electro Owl': '闪枭',
  'Poison Lizard': '猛蜥', 'Spirit Fox': '灵狐', 'Frosty': '冰牙', 'Sneezy': '阿啾',
  'Diggy': '地兽', 'Unicorn': '独角', 'Greedy Raven': '贪婪渡鸦',
  'Angry Jelly': '愤怒水母',
  // 攻城机器
  'Wall Wrecker': '攻城战车', 'Battle Blimp': '攻城飞艇', 'Stone Slammer': '攻城气球',
  'Siege Barracks': '攻城训练营', 'Log Launcher': '攻城滚木车', 'Flame Flinger': '攻城烈焰车',
  'Battle Drill': '攻城钻机', 'Troop Launcher': '部队发射器', 'Sky Wagon': '空中战车',
  // 夜世界兵种
  'Raged Barbarian': '狂暴野蛮人', 'Sneaky Archer': '隐秘弓箭手', 'Boxer Giant': '巨人拳击手',
  'Beta Minion': '异变亡灵', 'Bomber': '炸弹兵', 'Cannon Cart': '加农炮战车',
  'Night Witch': '暗夜女巫', 'Power P.E.K.K.A': '雷霆皮卡', 'Hog Glider': '野猪飞骑',
  'Electrofire Wizard': '电火法师', 'Drop Ship': '骷髅气球',
  // 夜世界英雄
  'Battle Copter': '战斗直升机','Battle Machine': '战争机器',
}

const CATEGORY_ICONS = {
  heroes: '👑', troops: '⚔️', spells: '✨', equipment: '🛡️',
  elixirTroops: '💧', darkTroops: '🖤', siegeMachines: '🏰', pets: '🐾',
  builderBase: '🏗️',
}

const translateName = (en) => NAME_MAP[en] || en

const LOCAL_IMAGE_MAP = {
  // Heroes
  'Barbarian King': 'Barbarian_King_thumb.webp',
  'Archer Queen': 'Archer_Queen_thumb.webp',
  'Grand Warden': 'Grand_Warden_thumb.webp',
  'Royal Champion': 'Royal_Champion_thumb.webp',
  // Troops
  'Barbarian': 'Barbarian_thumb.webp',
  'Archer': 'Archer_thumb.webp',
  'Giant': 'Giant_thumb.webp',
  'Goblin': 'Goblin_thumb.webp',
  'Wall Breaker': 'Wall_Breaker_thumb.webp',
  'Balloon': 'Balloon_thumb.webp',
  'Wizard': 'Wizard_thumb.webp',
  'Healer': 'Healer_thumb.webp',
  'Dragon': 'Dragon_thumb.webp',
  'P.E.K.K.A': 'P.E.K.K.A_thumb.webp',
  'Baby Dragon': 'Baby_Dragon_thumb.webp',
  'Miner': 'Miner_thumb.webp',
  'Electro Dragon': 'Electro_Dragon_thumb.webp',
  'Yeti': 'Yeti_thumb.webp',
  'Dragon Rider': 'Dragon_Rider_thumb.webp',
  'Electro Titan': 'Electro_Titan_thumb.webp',
  'Root Rider': 'Root_Rider_thumb.webp',
  'Thrower': 'Thrower_thumb.webp',
  'Minion': 'Minion_thumb.webp',
  'Hog Rider': 'Hog_Rider_thumb.webp',
  'Valkyrie': 'Valkyrie_thumb.webp',
  'Golem': 'Golem_thumb.webp',
  'Witch': 'Witch_thumb.webp',
  'Lava Hound': 'Lava_Hound_thumb.webp',
  'Bowler': 'Bowler_thumb.webp',
  'Ice Golem': 'Ice_Golem_thumb.webp',
  'Headhunter': 'Headhunter_thumb.webp',
  'Druid': 'Druid_thumb.webp',
  'Inferno Dragon': 'Inferno_Dragon_thumb.webp',
  'Ice Hound': 'Ice_Hound_thumb.webp',
  'Sneaky Goblin': 'Sneaky_Goblin_thumb.webp',
  // Super Troops
  'Super Barbarian': 'Super_Barbarian_thumb.webp',
  'Super Archer': 'Super_Archer_thumb.webp',
  'Super Giant': 'Super_Giant_thumb.webp',
  'Super Wall Breaker': 'Super_Wall_Breaker_thumb.webp',
  'Super Wizard': 'Super_Wizard_thumb.webp',
  'Super Dragon': 'Super_Dragon_thumb.webp',
  'Super Miner': 'Super_Miner_thumb.webp',
  'Super Minion': 'Super_Minion_thumb.webp',
  'Super Valkyrie': 'Super_Valkyrie_thumb.webp',
  'Super Witch': 'Super_Witch_thumb.webp',
  'Super Bowler': 'Super_Bowler_thumb.webp',
  'Super Hog Rider': 'Super_Hog_Rider_thumb.webp',
  'Super Yeti': 'Super_Yeti_thumb.webp',
  // Spells
  'Lightning Spell': 'Lightning_Spell.webp',
  'Healing Spell': 'Healing_Spell.webp',
  'Rage Spell': 'Rage_Spell.webp',
  'Jump Spell': 'Jump_Spell.webp',
  'Freeze Spell': 'Freeze_Spell.webp',
  'Clone Spell': 'Clone_Spell.webp',
  'Invisibility Spell': 'Invisibility_Spell.webp',
  'Recall Spell': 'Recall_Spell.webp',
  'Poison Spell': 'Poison_Spell.webp',
  'Earthquake Spell': 'Earthquake_Spell.webp',
  'Haste Spell': 'Haste_Spell.webp',
  'Skeleton Spell': 'Skeleton_Spell.webp',
  'Bat Spell': 'Bat_Spell.webp',
  'Overgrowth Spell': 'Overgrowth_Spell.webp',
  'Ice Block Spell': 'Ice_Block_Spell_thumb.webp',
  'Revive Spell': 'Revive_Spell_thumb.webp',
  'Totem Spell': 'Totem_Spell_thumb.webp',
  // Equipment
  'Earthquake Boots': 'Earthquake_Boots_thumb.webp',
  'Giant Gauntlet': 'Giant_Gauntlet_thumb.webp',
  'Rage Vial': 'Rage_Vial_thumb.webp',
  'Vampstache': 'Vampstache_thumb.webp',
  'Spiky Ball': 'Spiky_Ball_thumb.webp',
  'Archer Puppet': 'Archer_Puppet_thumb.webp',
  'Invisibility Vial': 'Invisibility_Vial_thumb.webp',
  'Giant Arrow': 'Giant_Arrow_thumb.webp',
  'Sky Piercing Arrow': '641.webp',
  'Healer Puppet': 'Healer_Puppet_thumb.webp',
  'Frozen Arrow': 'Frozen_Arrow_thumb.webp',
  'Magic Mirror': 'Magic_Mirror_thumb.webp',
  'Eternal Tome': 'Eternal_Tome_thumb.webp',
  'Life Gem': 'Life_Gem_thumb.webp',
  'Rage Gem': 'Rage_Gem_thumb.webp',
  'Healing Tome': 'Healing_Tome_thumb.webp',
  'Fireball': 'Fireball_thumb.webp',
  'Royal Gem': 'Royal_Gem_thumb.webp',
  'Seeking Shield': 'Seeking_Shield_thumb.webp',
  'Hog Rider Puppet': 'Hog_Rider_Puppet_thumb.webp',
  'Haste Vial': 'Haste_Vial_thumb.webp',
  'Rocket Spear': 'Rocket_Spear_thumb.webp',
  'Electro Boots': 'Electro_Boots_thumb.webp',
  'Lavaloon Puppet': 'Lavaloon_Puppet_thumb.webp',
  'Barbarian Puppet': 'Barbarian_Puppet_thumb.webp',
  'Rocket Backpack': 'Rocket_Backpack_thumb.webp',
  'Frosty': 'Frosty_thumb.webp',
  'Furnace': 'Furnace_thumb.webp',
  'Flame Blower': 'Flame_Blower_thumb.webp',
  'Metal Pants': 'Metal_Pants_thumb.webp',
  'Fire Heart': 'Fire_Heart_thumb.webp',
  'Mighty Yak': 'Mighty_Yak_thumb.webp',
  'L.A.S.S.I': 'L.A.S.S.I_thumb.webp',
  'Electro Fangs': 'Electro_Fangs_thumb.webp',
  'Phoenix': 'Phoenix_thumb.webp',
  'Poison Lizard': 'Poison_Lizard_thumb.webp',
  'Noble Iron': 'Noble_Iron_thumb.webp',
  'Spirit Fox': 'Spirit_Fox_thumb.webp',
  'Stick Horse': 'Stick_Horse_thumb.webp',
  'Stun Blaster': 'Stun_Blaster_thumb.webp',
  'Snake Bracelet': 'Snake_Bracelet_thumb.webp',
  'Heroic Torch': 'Heroic_Torch_thumb.webp',
  'Diggy': 'Diggy_thumb.webp',
  'Unicorn': 'Unicorn_thumb.webp',
  'Frost Flake': 'Frost_Flake_thumb.webp',
  'Sneezy': 'Sneezy_thumb.webp',
  'Minion Prince': 'Minion_Prince_thumb.webp',
  'Henchmen Puppet': 'Henchmen_Puppet_thumb.webp',
  'Greedy Raven': 'Greedy_Raven_thumb.webp',
  'Electro Owl': 'Electro_Owl_thumb.webp',
  'Dark Orb': 'Dark_Orb_thumb.webp',
  'Dragon Duke': 'Dragon_Duke_thumb.webp',
  'Boulder': 'Meteor_Golem_thumb.webp',
  'Meteor Staff': 'Meteor_Staff_thumb.webp',
  'Apprentice Warden': 'Apprentice_Warden_thumb.webp',
  'Dark Crown': 'Dark_Crown.webp',
  'Log Launcher': 'Log_Launcher_thumb.webp',
  'Battle Blimp': 'Battle_Blimp_thumb.webp',
  'Battle Drill': 'Battle_Drill_thumb.webp',
  'Wall Wrecker': 'Wall_Wrecker_thumb.webp',
  'Stone Slammer': 'Stone_Slammer_thumb.webp',
  'Siege Barracks': 'Siege_Barracks_thumb.webp',
  'Flame Flinger': 'Flame_Flinger_thumb.webp',
  'Troop Launcher': 'Troop_Launcher_thumb.webp',
  'Rocket Balloon': 'Rocket_Balloon_thumb.webp',
  'Sky Wagon': 'Sky_Wagon_thumb.webp',
  'Action Figure': 'Action_Figure_thumb.webp',
  'Angry Jelly': 'Angry_Jelly_thumb.webp',
  'Battle Machine': 'Battle_Machine_thumb.webp',
  'Super Battle Ram': 'Super_Battle_Ram_thumb.webp',
  // 夜世界兵种
  'Raged Barbarian': 'Raged_Barbarian_thumb.webp',
  'Sneaky Archer': 'Sneaky_Archer_thumb.webp',
  'Boxer Giant': 'Boxer_Giant_thumb.webp',
  'Beta Minion': 'Beta_Minion_thumb.webp',
  'Bomber': 'Bomber_thumb.webp',
  'Cannon Cart': 'Cannon_Cart_thumb.webp',
  'Night Witch': 'Night_Witch_thumb.webp',
  'Power P.E.K.K.A': 'Power_P.E.K.K.A_thumb.webp',
  'Hog Glider': 'Hog_Glider_thumb.webp',
  'Electrofire Wizard': 'Electrofire_Wizard_Fire_thumb.webp',
  'Drop Ship': 'Drop_Ship_thumb.webp',
  // 夜世界英雄
  'Battle Copter': 'Battle_Copter_thumb.webp',
}

const getImageUrl = (name) => {
  const filename = LOCAL_IMAGE_MAP[name]
  if (filename) {
    return `/picture/${filename}`
  }
  return null
}

const HERO_EQUIPMENT_MAP = {
  // 野蛮人之王装备
  'Barbarian King': ['Barbarian Puppet', 'Rage Vial', 'Earthquake Boots', 'Vampstache', 'Giant Gauntlet', 'Spiky Ball', 'Snake Bracelet', 'Stick Horse'],
  // 弓箭女皇装备
  'Archer Queen': ['Archer Puppet', 'Invisibility Vial', 'Giant Arrow', 'Healer Puppet', 'Frozen Arrow', 'Magic Mirror', 'Action Figure', 'Sky Piercing Arrow'],
  // 亡灵王子装备
  'Minion Prince': ['Henchmen Puppet', 'Dark Orb', 'Metal Pants', 'Noble Iron', 'Dark Crown', 'Meteor Staff'],
  // 大守护者装备
  'Grand Warden': ['Eternal Tome', 'Life Gem', 'Rage Gem', 'Healing Tome', 'Fireball', 'Lavaloon Puppet', 'Heroic Torch'],
  // 飞盾战神装备
  'Royal Champion': ['Seeking Shield', 'Royal Gem', 'Hog Rider Puppet', 'Haste Vial', 'Rocket Spear', 'Electro Boots', 'Frost Flake'],
  // 飞龙公爵装备
  'Dragon Duke': ['Fire Heart', 'Flame Blower', 'Stun Blaster', 'Electro Fangs', 'Rocket Backpack'],
}

const Icons = {
  Shield: () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
  </svg>),
  Settings: () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
  </svg>),
  Plus: () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
  </svg>),
  Search: () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
  </svg>),
  Users: () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
  </svg>),
  Swords: () => (<span className="text-lg">⚔️</span>),
  Trophy: () => (<span className="text-lg">👑</span>),
  Star: () => (<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
  </svg>),
  StarEmpty: () => (<svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
  </svg>),
  ArrowLeft: () => (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
  </svg>),
  Trash: () => (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
  </svg>),
  Crown: () => (<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
  </svg>),
  TrendingUp: () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
  </svg>),
  Download: () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
  </svg>),
  Image: () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
  </svg>),
}

const StarDisplay = ({ stars, maxStars = 3 }) => (<div className="flex items-center gap-0.5">
  {Array.from({ length: maxStars }).map((_, i) => i < stars
      ? <span key={i} className="text-secondary"><Icons.Star /></span>
      : <span key={i}><Icons.StarEmpty /></span>)}
</div>)

const LoadingSpinner = ({ message = '加载中...' }) => (<div className="flex flex-col items-center justify-center py-12">
  <div className="relative w-16 h-16">
    <div className="absolute top-0 left-0 w-full h-full border-4 border-primary/20 rounded-full"></div>
    <div className="absolute top-0 left-0 w-full h-full border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
  <p className="mt-4 text-gray-400">{message}</p>
</div>)

const SettingsModal = ({ onSave, apiKey }) => {
  const [inputKey, setInputKey] = useState(apiKey)

  const handleSave = () => {
    if (inputKey.trim()) {
      localStorage.setItem('coc_api_key', inputKey.trim())
      onSave(inputKey.trim())
    }
  }

  return (<div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="card max-w-md w-full mx-4 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-primary/20 rounded-lg text-primary">
          <Icons.Settings />
        </div>
        <div>
          <h2 className="text-2xl font-bold">配置 API Key</h2>
          <p className="text-gray-400 text-sm mt-1">输入你的 Supercell API Key</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">API Key</label>
          <input type="password" value={inputKey} onChange={(e) => setInputKey(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSave()} placeholder="在此粘贴你的 API Key" className="input-field w-full"/>
        </div>

        <div className="bg-dark/50 rounded-lg p-4 text-sm">
          <p className="text-gray-400 mb-2">如何获取 API Key？</p>
          <ol className="list-decimal list-inside text-gray-400 space-y-1">
            <li>访问 <a href="https://developer.clashofclans.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">developer.clashofclans.com</a></li>
            <li>登录你的 Supercell 账号</li>
            <li>创建新的 API Key</li>
            <li>确保你的 IP 地址已添加到白名单</li>
          </ol>
        </div>

        <button onClick={handleSave} disabled={!inputKey.trim()} className="btn-primary w-full disabled:opacity-50">
          保存并开始使用
        </button>
      </div>
    </div>
  </div>)
}

const Header = ({ onSettingsClick }) => (<header className="bg-card border-b border-white/10 sticky top-0 z-40">
  <div className="container mx-auto px-4 py-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.hash = ''}>
        <div className="p-1.5 bg-secondary/20 rounded-lg text-secondary">
          <Icons.Shield />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-wide">COC 查询工具</h1>
          <p className="text-xs text-gray-400">部落冲突信息管理</p>
        </div>
      </div>

      <button onClick={onSettingsClick} className="p-1.5 hover:bg-white/10 rounded-lg transition-all" title="设置">
        <Icons.Settings />
      </button>
    </div>
  </div>
</header>)

const ClanCard = ({ clan, onRemove, onView }) => (<div className="card group hover:border-primary/50 transition-all cursor-pointer" onClick={onView}>
  <div className="flex items-start justify-between mb-4">
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-700 rounded-lg flex items-center justify-center">
        <span className="text-white"><Icons.Users /></span>
      </div>
      <div>
        <h3 className="font-bold text-lg">{clan.name}</h3>
        <p className="text-gray-400 text-sm font-mono">{clan.tag}</p>
      </div>
    </div>

    <button onClick={(e) => { e.stopPropagation(); onRemove(); }} className="p-2 text-gray-400 hover:text-danger hover:bg-danger/10 rounded-lg transition-all opacity-0 group-hover:opacity-100" title="删除">
      <Icons.Trash />
    </button>
  </div>
</div>)

const PlayerCard = ({ player, onRemove, onView }) => (<div className="card group hover:border-primary/50 transition-all cursor-pointer" onClick={onView}>
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-700 rounded-lg flex items-center justify-center">
        <span className="text-white"><Icons.Users /></span>
      </div>
      <div>
        <h3 className="font-bold text-lg">{player.name}</h3>
        <p className="text-gray-400 text-sm font-mono">{player.tag}</p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <button onClick={(e) => { e.stopPropagation(); onRemove(); }} className="p-2 text-gray-400 hover:text-danger hover:bg-danger/10 rounded-lg transition-all" title="删除">
        <Icons.Trash />
      </button>
    </div>
  </div>
</div>)

const PlayerDetailModal = ({ player, onClose }) => {
  const heroes = player.heroes || []
  const allTroops = player.troops || []
  const allSpells = player.spells || []
  const heroEquipment = player.heroEquipment || []

  // 过滤村庄类型
  const troops = allTroops.filter(t => t.village === 'home')
  const spells = allSpells.filter(s => s.village === 'home')
  const builderBaseTroops = allTroops.filter(t => t.village === 'builderBase' && !['Battle Machine', 'Battle Copter'].includes(t.name))

  // 圣水兵种列表
  const ELIXIR_TROOPS = ['Barbarian', 'Archer', 'Giant', 'Goblin', 'Wall Breaker', 'Balloon', 'Wizard', 'Healer', 'Dragon', 'P.E.K.K.A', 'Baby Dragon', 'Miner', 'Electro Dragon', 'Yeti', 'Dragon Rider', 'Electro Titan', 'Root Rider', 'Thrower', 'Boulder']
  // 暗黑重油兵种列表
  const DARK_TROOPS = ['Minion', 'Hog Rider', 'Valkyrie', 'Golem', 'Witch', 'Lava Hound', 'Bowler', 'Ice Golem', 'Headhunter', 'Apprentice Warden', 'Druid', 'Furnace']
  // 攻城器械列表
  const SIEGE_MACHINES = ['Wall Wrecker', 'Battle Blimp', 'Stone Slammer', 'Siege Barracks', 'Log Launcher', 'Flame Flinger', 'Battle Drill', 'Troop Launcher', 'Sky Wagon']

  // 分类兵种
  const elixirTroops = troops.filter(t => ELIXIR_TROOPS.includes(t.name) && !t.name.startsWith('Super '))
  const darkTroops = troops.filter(t => DARK_TROOPS.includes(t.name) && !t.name.startsWith('Super '))
  const superTroops = troops.filter(t => t.name.startsWith('Super ') || ['Sneaky Goblin', 'Rocket Balloon Troop', 'Inferno Dragon', 'Ice Hound'].includes(t.name))
  const siegeMachines = troops.filter(t => SIEGE_MACHINES.includes(t.name))
  // 战宠
  const pets = troops.filter(t => ['L.A.S.S.I', 'Mighty Yak', 'Phoenix', 'Electro Owl', 'Poison Lizard', 'Spirit Fox', 'Frosty', 'Sneezy', 'Diggy', 'Unicorn', 'Greedy Raven', 'Minion Prince', 'Dragon Duke', 'Angry Jelly'].includes(t.name))

  // 分类夜世界英雄（从 heroes 中提取）
  const homeHeroes = heroes.filter(h => !['Battle Machine', 'Battle Copter'].includes(h.name))
  const builderBaseHeroes = heroes.filter(h => ['Battle Machine', 'Battle Copter'].includes(h.name))

  const renderItem = (item, icon) => {
    const imgUrl = getImageUrl(item.name)
    return (
      <div key={item.name} className="group relative flex flex-col items-center">
        <div className="bg-dark/50 rounded-xl p-0.5 flex items-center justify-center relative">
          {imgUrl ? (
            <img src={imgUrl} alt={translateName(item.name)} className="w-12 h-12 object-contain" loading="lazy"
              onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex' }} />
          ) : null}
          <span className={`${imgUrl ? 'hidden' : 'flex'} text-2xl`}>{icon}</span>
        </div>
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
          {translateName(item.name)}
        </div>
        <span className="font-bold text-xs mt-1">{item.level}/{item.maxLevel}</span>
      </div>
    )
  }

  const renderBuilderBaseSection = () => {
    if (builderBaseHeroes.length === 0 && builderBaseTroops.length === 0) return null
    return (<div className="mb-6">
      <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
        <span>{CATEGORY_ICONS.builderBase}</span> 夜世界
      </h3>
      {builderBaseHeroes.length > 0 && (<div className="mb-4">
        <h4 className="text-sm font-medium text-gray-400 mb-2">英雄</h4>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {builderBaseHeroes.map(hero => renderItem(hero, CATEGORY_ICONS.heroes))}
        </div>
      </div>)}
      {builderBaseTroops.length > 0 && (<div>
        <h4 className="text-sm font-medium text-gray-400 mb-2">兵种</h4>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {builderBaseTroops.map(troop => renderItem(troop, CATEGORY_ICONS.builderBase))}
        </div>
      </div>)}
    </div>)
  }

  const renderCategory = (title, icon, items, colorClass) => {
    if (items.length === 0) return null
    return (<div className="mb-6">
      <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
        <span>{icon}</span> {title}
      </h3>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {items.map(item => renderItem(item, icon))}
      </div>
    </div>)
  }

  const renderHeroWithEquipment = (hero) => {
    const allEquipNames = HERO_EQUIPMENT_MAP[hero.name] || []

    return (<div key={hero.name} className="mb-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="group relative">
          <div className="bg-dark/50 rounded-xl p-2 flex items-center justify-center">
            {(() => {
              const imgUrl = getImageUrl(hero.name)
              if (imgUrl) {
                return (<img src={imgUrl} alt={translateName(hero.name)} className="w-10 h-10 object-contain" />)
              }
              return <span className="text-xl">{CATEGORY_ICONS.heroes}</span>
            })()}
          </div>
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
            {translateName(hero.name)}
          </div>
        </div>
        <div>
          <span className="font-medium">{translateName(hero.name)}</span>
          <span className="text-secondary font-bold ml-2">{hero.level}/{hero.maxLevel}</span>
        </div>
      </div>
      {allEquipNames.length > 0 && (
        <div className="ml-12 grid grid-cols-3 md:grid-cols-4 gap-2">
          {allEquipNames.map(eqName => {
            const owned = heroEquipment.find(e => e.name === eqName)
            const imgUrl = getImageUrl(eqName)
            if (owned) {
              return (
                <div key={eqName} className="group relative flex flex-col items-center">
                  <div className="bg-dark/50 rounded-xl p-0.5 flex items-center justify-center relative">
                    {imgUrl ? (
                      <img src={imgUrl} alt={translateName(eqName)} className="w-12 h-12 object-contain" loading="lazy"
                        onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex' }} />
                    ) : null}
                    <span className={`${imgUrl ? 'hidden' : 'flex'} text-2xl`}>{CATEGORY_ICONS.equipment}</span>
                  </div>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    {translateName(eqName)}
                  </div>
                  <span className="font-bold text-xs mt-1">{owned.level}/{owned.maxLevel}</span>
                </div>
              )
            }
            return (
              <div key={eqName} className="group relative flex flex-col items-center opacity-30">
                <div className="bg-dark/50 rounded-xl p-0.5 flex items-center justify-center relative grayscale">
                  {imgUrl ? (
                    <img src={imgUrl} alt={translateName(eqName)} className="w-12 h-12 object-contain" loading="lazy"
                      onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex' }} />
                  ) : null}
                  <span className={`${imgUrl ? 'hidden' : 'flex'} text-2xl`}>{CATEGORY_ICONS.equipment}</span>
                </div>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  {translateName(eqName)}
                </div>
                <span className="font-bold text-xs mt-1 text-gray-500">未获得</span>
              </div>
            )
          })}
        </div>
      )}
    </div>)
  }

  return (<div className="fixed inset-0 bg-black/80 flex items-start justify-center z-50 overflow-y-auto py-8" onClick={onClose}>
    <div className="card max-w-3xl w-full mx-4" onClick={e => e.stopPropagation()}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/20 rounded-xl text-primary">
            <Icons.Users />
          </div>
          <div>
            <h2 className="text-xl font-bold">{player.name}</h2>
            <p className="text-gray-400 text-sm font-mono">{player.tag}</p>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-dark/50 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-primary">{player.expLevel}</p>
          <p className="text-gray-400 text-xs">等级</p>
        </div>
        <div className="bg-dark/50 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-secondary">{player.townHallLevel}</p>
          <p className="text-gray-400 text-xs">大本等级</p>
        </div>
        <div className="bg-dark/50 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-primary">{player.trophies}</p>
          <p className="text-gray-400 text-xs">🏆 杯数</p>
        </div>
        <div className="bg-dark/50 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-success">{player.warPreference === 'in' ? '参战' : '不参战'}</p>
          <p className="text-gray-400 text-xs">战争偏好</p>
        </div>
      </div>

      {homeHeroes.length > 0 && (<div className="mb-6">
        <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
          <span>{CATEGORY_ICONS.heroes}</span> 英雄与装备
        </h3>
        {homeHeroes.map(hero => renderHeroWithEquipment(hero))}
      </div>)}

      {renderCategory('圣水兵', CATEGORY_ICONS.elixirTroops, elixirTroops, 'text-primary')}
      {renderCategory('黑油兵', CATEGORY_ICONS.darkTroops, darkTroops, 'text-purple-400')}
      {renderCategory('超级兵', '⭐', superTroops, 'text-yellow-400')}
      {renderCategory('战宠', CATEGORY_ICONS.pets, pets, 'text-pink-400')}
      {renderCategory('法术', CATEGORY_ICONS.spells, spells, 'text-blue-400')}
      {renderCategory('攻城器械', CATEGORY_ICONS.siegeMachines, siegeMachines, 'text-orange-400')}
      {renderBuilderBaseSection()}
    </div>
  </div>)
}

function App() {
  const [apiKey, setApiKey] = useState(localStorage.getItem('coc_api_key') || '')
  const [savedClans, setSavedClans] = useState(JSON.parse(localStorage.getItem('coc_saved_clans') || '[]'))
  const [savedPlayers, setSavedPlayers] = useState(JSON.parse(localStorage.getItem('coc_saved_players') || '[]'))
  const [currentView, setCurrentView] = useState('home')
  const [selectedClan, setSelectedClan] = useState(null)
  const [inputTag, setInputTag] = useState('')
  const [playerInputTag, setPlayerInputTag] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showSettings, setShowSettings] = useState(!apiKey)
  const [clanData, setClanData] = useState(null)
  const [warData, setWarData] = useState(null)
  const [leagueData, setLeagueData] = useState(null)
  const [memberSort, setMemberSort] = useState({ field: 'role', order: 'desc' })
  const [leagueSort, setLeagueSort] = useState({ field: 'totalStars', order: 'desc' })
  const [clanActivities, setClanActivities] = useState({})
  const [playerData, setPlayerData] = useState(null)
  const [showPlayerModal, setShowPlayerModal] = useState(false)

  // 页面加载时自动检查所有已保存部落的战争/联赛状态
  useEffect(() => {
    if (!apiKey || savedClans.length === 0) return
    const clans = [...savedClans]

    const checkAllClans = async () => {
      const results = {}
      await Promise.allSettled(clans.map(async (clan) => {
        const [warData, leagueData] = await Promise.all([
          fetchClanWar(clan.tag),
          fetchLeagueGroup(clan.tag)
        ])
        results[clan.tag] = {
          warActive: warData && warData.state !== 'notInWar' && warData.state !== 'warEnded',
          leagueActive: !!leagueData,
        }
      }))
      setClanActivities(prev => ({ ...prev, ...results }))
    }

    checkAllClans()
  }, [apiKey, savedClans])

  const roleOrder = { 'leader': 4, 'coLeader': 3, 'admin': 2, 'member': 1 }

  const sortMembers = (members) => {
    if (!members) return []
    return [...members].sort((a, b) => {
      let diff = 0
      if (memberSort.field === 'role') {
        diff = (roleOrder[a.role] || 0) - (roleOrder[b.role] || 0)
      } else if (memberSort.field === 'level') {
        diff = a.expLevel - b.expLevel
      } else if (memberSort.field === 'trophies') {
        diff = a.trophies - b.trophies
      } else if (memberSort.field === 'donations') {
        diff = a.donations - b.donations
      }
      return memberSort.order === 'desc' ? -diff : diff
    })
  }

  const parseJSONResponse = async (response) => {
    const text = await response.text()
    try {
      return JSON.parse(text)
    } catch {
      if (text.startsWith('<!DOCTYPE') || text.startsWith('<html')) {
        throw new Error('服务器返回异常，请检查后端代理服务是否正常运行')
      }
      throw new Error(`响应数据格式错误，无法解析：${text.slice(0, 100)}`)
    }
  }

  const fetchClanInfo = async (tag) => {
    const cacheKey = `coc_cache_clan_${tag}`
    const cached = localStorage.getItem(cacheKey)

    if (cached) {
      const { data, timestamp } = JSON.parse(cached)
      if (Date.now() - timestamp < 10 * 60 * 1000) {
        return data
      }
    }

    const response = await fetch(`${BASE_URL}/clans/${encodeURIComponent(tag)}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json'
      }
    })

    if (response.status === 429) throw new Error('请求过于频繁，请稍后再试')
    if (response.status === 403) throw new Error('API Key 无效或 IP 未授权')
    if (response.status === 404) throw new Error('未找到该部落')
    if (!response.ok) throw new Error(`请求失败: ${response.status}`)

    const data = await parseJSONResponse(response)
    localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: Date.now() }))

    return data
  }

  const fetchClanWar = async (tag) => {
    const response = await fetch(`${BASE_URL}/clans/${encodeURIComponent(tag)}/currentwar`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json'
      }
    })

    if (!response.ok) {
      if (response.status === 404) return null
      throw new Error(`请求失败: ${response.status}`)
    }

    return parseJSONResponse(response)
  }

  const fetchLeagueGroup = async (tag) => {
    const response = await fetch(`${BASE_URL}/clans/${encodeURIComponent(tag)}/currentwar/leaguegroup`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json'
      }
    })

    if (!response.ok) {
      if (response.status === 404) return null
      throw new Error(`请求失败: ${response.status}`)
    }

    return parseJSONResponse(response)
  }

  const fetchWarRound = async (warTag, signal) => {
    const response = await fetch(`${BASE_URL}/clanwarleagues/wars/${encodeURIComponent(warTag)}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json'
      },
      signal
    })

    if (!response.ok) {
      if (response.status === 404) return null
      throw new Error(`请求失败: ${response.status}`)
    }

    return parseJSONResponse(response)
  }

  const fetchPlayerInfo = async (tag) => {
    const response = await fetch(`${BASE_URL}/players/${encodeURIComponent(tag)}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json'
      }
    })

    if (!response.ok) throw new Error(`请求失败: ${response.status}`)
    return parseJSONResponse(response)
  }

  const handleAddClan = async () => {
    if (!inputTag.trim()) return

    const tag = inputTag.trim().startsWith('#') ? inputTag.trim() : `#${inputTag.trim()}`
    setLoading(true)
    setError(null)

    try {
      const clanInfo = await fetchClanInfo(tag)
      const newClan = {
        tag: clanInfo.tag,
        name: clanInfo.name,
        addedAt: Date.now()
      }

      if (!savedClans.find(c => c.tag === newClan.tag)) {
        const newClans = [...savedClans, newClan]
        localStorage.setItem('coc_saved_clans', JSON.stringify(newClans))
        setSavedClans(newClans)
      }

      setInputTag('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveClan = (tag) => {
    const newClans = savedClans.filter(c => c.tag !== tag)
    localStorage.setItem('coc_saved_clans', JSON.stringify(newClans))
    setSavedClans(newClans)
  }

  const handleViewClan = async (clan) => {
    setLoading(true)
    setError(null)
    try {
      const [data, warData, leagueData] = await Promise.all([
        fetchClanInfo(clan.tag),
        fetchClanWar(clan.tag).catch(() => null),
        fetchLeagueGroup(clan.tag).catch(() => null),
      ])
      setClanData(data)
      setSelectedClan(clan)
      setCurrentView('clan-detail')
      setClanActivities(prev => ({
        ...prev,
        [clan.tag]: {
          warActive: warData && warData.state !== 'notInWar' && warData.state !== 'warEnded',
          leagueActive: !!leagueData,
        }
      }))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleViewWar = async (clan) => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchClanWar(clan.tag)
      setWarData(data)
      setSelectedClan(clan)
      setCurrentView('war')
      setClanActivities(prev => ({
        ...prev,
        [clan.tag]: { ...prev[clan.tag], warActive: data && data.state !== 'notInWar' }
      }))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleViewLeague = async (clan) => {
    setLoading(true)
    setError(null)
    const controller = new AbortController()
    try {
      const data = await fetchLeagueGroup(clan.tag)
      if (data && data.rounds) {
        const roundsData = await Promise.all(data.rounds.map(round =>
          Promise.all(round.warTags
            .filter(warTag => warTag && warTag !== '#0')
            .map(warTag => fetchWarRound(warTag, controller.signal))
          )
        ))
        setLeagueData({ ...data, roundsData })
      } else {
        setLeagueData(data)
      }
      setSelectedClan(clan)
      setCurrentView('league')
      setClanActivities(prev => ({
        ...prev,
        [clan.tag]: { ...prev[clan.tag], leagueActive: !!data }
      }))
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleViewPlayer = async (tag) => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchPlayerInfo(tag)
      setPlayerData(data)
      setShowPlayerModal(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSearchPlayer = async () => {
    if (!playerInputTag.trim()) return
    const tag = playerInputTag.trim().startsWith('#') ? playerInputTag.trim() : `#${playerInputTag.trim()}`
    setLoading(true)
    setError(null)
    try {
      const data = await fetchPlayerInfo(tag)
      const newPlayer = { tag: data.tag, name: data.name, addedAt: Date.now() }
      if (!savedPlayers.find(p => p.tag === newPlayer.tag)) {
        const newPlayers = [...savedPlayers, newPlayer]
        localStorage.setItem('coc_saved_players', JSON.stringify(newPlayers))
        setSavedPlayers(newPlayers)
      }
      setPlayerData(data)
      setShowPlayerModal(true)
      setPlayerInputTag('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleRemovePlayer = (tag) => {
    const newPlayers = savedPlayers.filter(p => p.tag !== tag)
    localStorage.setItem('coc_saved_players', JSON.stringify(newPlayers))
    setSavedPlayers(newPlayers)
  }

  const getRoleName = (role) => {
    const roles = { 'leader': '首领', 'coLeader': '副首领', 'admin': '长老', 'member': '成员' }
    return roles[role] || role
  }

  const getWarStatus = (status) => {
    const statuses = { 'notInWar': '未在战争中', 'inWar': '战争中', 'collectionDay': '准备日', 'warEnded': '战争已结束' }
    return statuses[status] || status
  }

  const renderHome = () => (<main className="container mx-auto px-4 py-8">
    {!apiKey ? (<div className="card max-w-md mx-auto text-center py-12">
      <div className="p-4 bg-primary/20 rounded-full w-fit mx-auto mb-4 text-primary">
        <Icons.Settings />
      </div>
      <h2 className="text-2xl font-bold mb-2">欢迎使用 COC 查询工具</h2>
      <p className="text-gray-400 mb-6">请先配置你的 API Key 以开始使用</p>
      <button onClick={() => setShowSettings(true)} className="btn-primary">
        配置 API Key
      </button>
    </div>) : (<>
      <div className="card mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-secondary"><Icons.Plus /></span>
          添加部落
        </h2>

        <div className="flex gap-3">
          <div className="flex-1 relative">
            <input type="text" value={inputTag} onChange={(e) => setInputTag(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleAddClan()} placeholder="输入部落标签 (如 #ABCD1234)" className="input-field w-full"/>
          </div>
          <button onClick={handleAddClan} disabled={loading || !inputTag.trim()} className="btn-primary flex items-center gap-2">
            <Icons.Plus /> 添加
          </button>
        </div>

        {error && (<div className="mt-4 p-3 bg-danger/20 border border-danger/30 rounded-lg text-danger text-sm">
          {error}
        </div>)}
      </div>

      <div className="card mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-primary"><Icons.Search /></span>
          查询玩家
        </h2>

        <div className="flex gap-3">
          <div className="flex-1 relative">
            <input type="text" value={playerInputTag} onChange={(e) => setPlayerInputTag(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSearchPlayer()} placeholder="输入玩家标签 (如 #ABCDEFGHI)" className="input-field w-full"/>
          </div>
          <button onClick={handleSearchPlayer} disabled={loading || !playerInputTag.trim()} className="btn-primary flex items-center gap-2">
            <Icons.Search /> 查询
          </button>
        </div>
      </div>

      {savedClans.length > 0 ? (<div>
        <h2 className="text-xl font-bold mb-4">已保存的部落</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedClans.map((clan) => (<ClanCard key={clan.tag} clan={clan} onRemove={() => handleRemoveClan(clan.tag)} onView={() => handleViewClan(clan)}/>))}
        </div>
      </div>) : (<div className="card text-center py-12">
        <p className="text-gray-400">
          还没有保存任何部落。<br />
          在上方输入部落标签开始添加吧！
        </p>
      </div>)}

      {savedPlayers.length > 0 ? (<div className="mt-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-primary"><Icons.Users /></span>
          已保存的玩家
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedPlayers.map((player) => (<PlayerCard key={player.tag} player={player} onRemove={() => handleRemovePlayer(player.tag)} onView={() => handleViewPlayer(player.tag)}/>))}
        </div>
      </div>) : null}
    </>)}
  </main>)

  const renderClanDetail = () => {
    if (loading) return <LoadingSpinner message="加载部落信息..." />
    if (error) {
      return (<main className="container mx-auto px-4 py-8">
        <div className="card text-center py-12">
          <p className="text-danger mb-4">{error}</p>
          <button onClick={() => setCurrentView('home')} className="btn-primary">返回首页</button>
        </div>
      </main>)
    }
    if (!clanData) return null

    return (<main className="container mx-auto px-4 py-8">
      <button onClick={() => setCurrentView('home')} className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-all">
        <Icons.ArrowLeft /> 返回首页
      </button>

      <div className="card mb-6">
        <div className="flex items-start gap-6 flex-wrap">
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-blue-700 rounded-2xl flex items-center justify-center flex-shrink-0">
            <span className="text-white"><Icons.Users /></span>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{clanData.name}</h1>
            <p className="text-gray-400 font-mono mb-4">{clanData.tag}</p>

            {clanData.description && (<p className="text-gray-300 mb-4">{clanData.description}</p>)}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-dark/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-secondary"><Icons.Trophy /></span>
                  <span className="text-gray-400 text-sm">部落等级</span>
                </div>
                <p className="text-2xl font-bold">{clanData.clanLevel}</p>
              </div>
              <div className="bg-dark/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-secondary"><Icons.Star /></span>
                  <span className="text-gray-400 text-sm">战争胜利</span>
                </div>
                <p className="text-2xl font-bold">{clanData.warWins}</p>
              </div>
              <div className="bg-dark/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-success"><Icons.TrendingUp /></span>
                  <span className="text-gray-400 text-sm">连胜</span>
                </div>
                <p className="text-2xl font-bold">{clanData.warWinStreak}</p>
              </div>
              <div className="bg-dark/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-primary"><Icons.Users /></span>
                  <span className="text-gray-400 text-sm">成员</span>
                </div>
                <p className="text-2xl font-bold">{clanData.members}/50</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {(() => {
          const activities = clanActivities[selectedClan?.tag] || {}
          const warDisabled = !activities.warActive || activities.leagueActive
          const leagueDisabled = !activities.leagueActive || activities.warActive
          const noActivity = !activities.warActive && !activities.leagueActive
          return (<>
            <button onClick={() => handleViewWar(selectedClan)} disabled={warDisabled} className={`card text-left transition-all ${warDisabled ? 'opacity-40 cursor-not-allowed border-white/5' : 'hover:border-secondary/50'}`}>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-secondary/20 rounded-xl text-secondary">
                  <Icons.Swords />
                </div>
                <div>
                  <h3 className="font-bold text-lg">部落战</h3>
                  <p className="text-gray-400 text-sm">{noActivity ? '当前无进行中的部落战' : activities.leagueActive ? '联赛进行中，不可用' : '查看当前部落战详情和对位分析'}</p>
                </div>
              </div>
            </button>

            <button onClick={() => handleViewLeague(selectedClan)} disabled={leagueDisabled} className={`card text-left transition-all ${leagueDisabled ? 'opacity-40 cursor-not-allowed border-white/5' : 'hover:border-success/50'}`}>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-success/20 rounded-xl text-success">
                  <Icons.Trophy />
                </div>
                <div>
                  <h3 className="font-bold text-lg">联赛</h3>
                  <p className="text-gray-400 text-sm">{noActivity ? '当前无进行中的联赛' : activities.warActive ? '部落战进行中，不可用' : '查看联赛对阵和进攻对位差'}</p>
                </div>
              </div>
            </button>
          </>)
        })()}
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-primary"><Icons.Users /></span>
          成员列表
        </h2>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">玩家</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium cursor-pointer hover:text-white transition-all" onClick={() => setMemberSort({ field: 'role', order: memberSort.field === 'role' && memberSort.order === 'desc' ? 'asc' : 'desc' })}>
                    职位 {memberSort.field === 'role' ? (memberSort.order === 'desc' ? '↓' : '↑') : ''}
                  </th>
                  <th className="text-center py-3 px-4 text-gray-400 font-medium cursor-pointer hover:text-white transition-all" onClick={() => setMemberSort({ field: 'level', order: memberSort.field === 'level' && memberSort.order === 'desc' ? 'asc' : 'desc' })}>
                    等级 {memberSort.field === 'level' ? (memberSort.order === 'desc' ? '↓' : '↑') : ''}
                  </th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium cursor-pointer hover:text-white transition-all" onClick={() => setMemberSort({ field: 'trophies', order: memberSort.field === 'trophies' && memberSort.order === 'desc' ? 'asc' : 'desc' })}>
                    杯数 {memberSort.field === 'trophies' ? (memberSort.order === 'desc' ? '↓' : '↑') : ''}
                  </th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium cursor-pointer hover:text-white transition-all" onClick={() => setMemberSort({ field: 'donations', order: memberSort.field === 'donations' && memberSort.order === 'desc' ? 'asc' : 'desc' })}>
                    捐兵/收兵 {memberSort.field === 'donations' ? (memberSort.order === 'desc' ? '↓' : '↑') : ''}
                  </th>
                </tr>
            </thead>
            <tbody>
              {sortMembers(clanData.memberList).map((member, index) => (<tr key={member.tag} onClick={() => handleViewPlayer(member.tag)} className="border-b border-white/5 hover:bg-white/5 transition-all cursor-pointer">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 w-6">{index + 1}</span>
                    <div>
                      <p className="font-medium hover:text-primary transition-colors">{member.name}</p>
                      <p className="text-gray-400 text-sm font-mono">{member.tag}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${member.role === 'leader' ? 'bg-secondary/20 text-secondary' :
                    member.role === 'coLeader' ? 'bg-danger/20 text-danger' :
                    member.role === 'admin' ? 'bg-primary/20 text-primary' :
                    'bg-gray-600/20 text-gray-400'}`}>
                    {member.role === 'leader' && <Icons.Crown />}
                    {getRoleName(member.role)}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="inline-flex items-center gap-1">
                    <span className="text-primary"><Icons.Star /></span>
                    {member.expLevel}
                  </span>
                </td>
                <td className="py-3 px-4 text-right font-mono">
                  <span className="mr-1">🏆</span>
                  {member.trophies}
                </td>
                <td className="py-3 px-4 text-right">
                  <span className="text-primary">{member.donations}</span>
                  <span className="text-gray-500 mx-1">/</span>
                  <span className="text-success">{member.donationsReceived}</span>
                </td>
              </tr>))}
            </tbody>
          </table>
        </div>
      </div>
    </main>)
  }

  const renderWar = () => {
    if (loading) return <LoadingSpinner message="加载部落战数据..." />
    if (error) {
      return (<main className="container mx-auto px-4 py-8">
        <div className="card text-center py-12">
          <p className="text-danger mb-4">{error}</p>
          <button onClick={() => setCurrentView('home')} className="btn-primary">返回首页</button>
        </div>
      </main>)
    }

    if (!warData || warData.status === 'notInWar') {
      return (<main className="container mx-auto px-4 py-8">
        <button onClick={() => setCurrentView('home')} className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-all">
          <Icons.ArrowLeft /> 返回首页
        </button>
        <div className="card text-center py-12">
          <span className="text-gray-600 w-16 h-16 mx-auto mb-4 block"><Icons.Swords /></span>
          <h2 className="text-2xl font-bold mb-2">当前未在战争中</h2>
          <p className="text-gray-400">该部落目前没有进行中的部落战</p>
        </div>
      </main>)
    }

    const isOurClan = warData.clan.tag === selectedClan?.tag
    const ourClan = isOurClan ? warData.clan : warData.opponent
    const opponent = isOurClan ? warData.opponent : warData.clan

    return (<main className="container mx-auto px-4 py-8">
      <button onClick={() => setCurrentView(clanData ? 'clan-detail' : 'home')} className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-all">
        <Icons.ArrowLeft /> {clanData ? '返回部落详情' : '返回首页'}
      </button>

      <div className="card mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-secondary/20 rounded-xl text-secondary">
            <Icons.Swords />
          </div>
          <div>
            <h1 className="text-2xl font-bold">部落战详情</h1>
            <p className="text-gray-400 text-sm">{getWarStatus(warData.status)} · {warData.teamSize}人战</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-primary/20 to-blue-900/20 rounded-xl p-6 border border-primary/30">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-primary"><Icons.Users /></span>
              <span className="text-gray-300">{ourClan.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span className="text-secondary"><Icons.Star /></span>
                <span className="text-3xl font-bold">{ourClan.stars}</span>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-sm">摧毁率</p>
                <p className="text-xl font-bold">{ourClan.destructionPercentage.toFixed(2)}%</p>
              </div>
            </div>
          </div>

          <div className="bg-dark/50 rounded-xl p-6 flex flex-col items-center justify-center">
            <p className="text-gray-400 text-sm mb-2">VS</p>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">{ourClan.stars}</p>
                <p className="text-gray-400 text-sm">我方星级</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-danger">{opponent.stars}</p>
                <p className="text-gray-400 text-sm">对方星级</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-danger/20 to-red-900/20 rounded-xl p-6 border border-danger/30">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-danger"><Icons.Users /></span>
              <span className="text-gray-300">{opponent.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span className="text-secondary"><Icons.Star /></span>
                <span className="text-3xl font-bold">{opponent.stars}</span>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-sm">摧毁率</p>
                <p className="text-xl font-bold">{opponent.destructionPercentage.toFixed(2)}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>)
  }

  const renderLeague = () => {
    if (loading) return <LoadingSpinner message="加载联赛数据..." />
    if (error) {
      return (<main className="container mx-auto px-4 py-8">
        <div className="card text-center py-12">
          <p className="text-danger mb-4">{error}</p>
          <button onClick={() => setCurrentView('home')} className="btn-primary">返回首页</button>
        </div>
      </main>)
    }

    if (!leagueData) {
      return (<main className="container mx-auto px-4 py-8">
        <button onClick={() => setCurrentView('home')} className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-all">
          <Icons.ArrowLeft /> 返回首页
        </button>
        <div className="card text-center py-12">
          <span className="text-gray-600 w-16 h-16 mx-auto mb-4 block"><Icons.Trophy /></span>
          <h2 className="text-2xl font-bold mb-2">当前未在联赛中</h2>
          <p className="text-gray-400 mb-6">该部落目前没有进行中的联赛</p>
          <button onClick={() => setCurrentView(clanData ? 'clan-detail' : 'home')} className="btn-primary">
            {clanData ? '返回部落详情' : '返回首页'}
          </button>
        </div>
      </main>)
    }

    const ourClanTag = selectedClan?.tag
    const allWars = (leagueData.roundsData || []).flat().filter(war => war && (war.clan?.tag === ourClanTag || war.opponent?.tag === ourClanTag))

    const ourWars = allWars.map(war => {
      const isOurClan = war.clan?.tag === ourClanTag
      return {
        ourClan: isOurClan ? war.clan : war.opponent,
        opponent: isOurClan ? war.opponent : war.clan,
        state: war.state
      }
    })

    const totalStars = ourWars.reduce((sum, w) => sum + (w.ourClan?.stars || 0), 0)
    const totalAttacks = ourWars.reduce((sum, w) => sum + (w.ourClan?.attacks || 0), 0)
    const totalDestruction = ourWars.length > 0
      ? ourWars.reduce((sum, w) => sum + (w.ourClan?.destructionPercentage || 0), 0) / ourWars.length
      : 0
    const finishedWars = ourWars.filter(w => w.state !== 'preparation')
    const wins = finishedWars.filter(w => (w.ourClan?.stars || 0) > (w.opponent?.stars || 0)).length
    const losses = finishedWars.filter(w => (w.ourClan?.stars || 0) < (w.opponent?.stars || 0)).length
    const draws = finishedWars.filter(w => (w.ourClan?.stars || 0) === (w.opponent?.stars || 0)).length

    const playerStats = {}
    const totalRounds = ourWars.length
    allWars.forEach((war, warIndex) => {
      const isOurClan = war.clan?.tag === ourClanTag
      const ourClanData = isOurClan ? war.clan : war.opponent
      const members = ourClanData?.members || []
      const isActiveOrEnded = war.state !== 'preparation'
      members.forEach(member => {
        if (!playerStats[member.tag]) {
          playerStats[member.tag] = {
            name: member.name,
            tag: member.tag,
            mapPosition: member.mapPosition,
            totalStars: 0,
            totalAttacks: 0,
            totalDestruction: 0,
            warsParticipated: 0,
            totalAppearances: 0,
            perRound: new Array(totalRounds).fill(undefined),
          }
        }
        if (isActiveOrEnded) {
          playerStats[member.tag].totalAppearances += 1
        }
        const attacks = member.attacks || []
        if (attacks.length > 0) {
          playerStats[member.tag].warsParticipated += 1
          if (isActiveOrEnded) {
            playerStats[member.tag].perRound[warIndex] = attacks[0].destructionPercentage || 0
          }
        } else if (isActiveOrEnded) {
          playerStats[member.tag].perRound[warIndex] = -1
        } else {
          // 准备中轮次，标记上场玩家
          playerStats[member.tag].perRound[warIndex] = -2
        }
        attacks.forEach(atk => {
          playerStats[member.tag].totalStars += atk.stars || 0
          playerStats[member.tag].totalAttacks += 1
          playerStats[member.tag].totalDestruction += atk.destructionPercentage || 0
        })
      })
    })
    const playerList = Object.values(playerStats).sort((a, b) => {
      let diff = 0
      if (leagueSort.field === 'totalStars') {
        diff = a.totalStars - b.totalStars
      } else if (leagueSort.field === 'attackRate') {
        const rateA = a.totalAppearances > 0 ? a.warsParticipated / a.totalAppearances : 0
        const rateB = b.totalAppearances > 0 ? b.warsParticipated / b.totalAppearances : 0
        diff = rateA - rateB
      } else if (leagueSort.field === 'avgDestruction') {
        const avgA = a.totalAttacks > 0 ? a.totalDestruction / a.totalAttacks : 0
        const avgB = b.totalAttacks > 0 ? b.totalDestruction / b.totalAttacks : 0
        diff = avgA - avgB
      }
      return leagueSort.order === 'desc' ? -diff : diff
    })

    return (<main className="container mx-auto px-4 py-8">
      <button onClick={() => setCurrentView(clanData ? 'clan-detail' : 'home')} className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-all">
        <Icons.ArrowLeft /> {clanData ? '返回部落详情' : '返回首页'}
      </button>

      <div className="card mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-success/20 rounded-xl text-success">
            <Icons.Trophy />
          </div>
          <div>
            <h1 className="text-2xl font-bold">联赛总览</h1>
            <p className="text-gray-400 text-sm">
              {leagueData.clan?.name} · {leagueData.state === 'inWar' ? '进行中' : leagueData.state === 'preparation' ? '准备中' : leagueData.state === 'ended' ? '已结束' : leagueData.state}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-dark/50 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-primary">{totalStars}</p>
            <p className="text-gray-400 text-sm">总星级</p>
          </div>
          <div className="bg-dark/50 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-secondary">{totalAttacks}</p>
            <p className="text-gray-400 text-sm">总进攻次数</p>
          </div>
          <div className="bg-dark/50 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-success">{totalDestruction.toFixed(1)}%</p>
            <p className="text-gray-400 text-sm">平均摧毁率</p>
          </div>
          <div className="bg-dark/50 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold">
              <span className="text-success">{wins}</span>
              <span className="text-gray-500 mx-1">-</span>
              <span className="text-gray-400">{draws}</span>
              <span className="text-gray-500 mx-1">-</span>
              <span className="text-danger">{losses}</span>
            </p>
            <p className="text-gray-400 text-sm">胜-平-负</p>
          </div>
        </div>

        {playerList.length > 0 && (<div className="mb-6">
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
            <span className="text-primary"><Icons.Users /></span>
            玩家个人数据
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">#</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">玩家</th>
                  {ourWars.map((_, ri) => (
                    <th key={ri} className="text-center py-3 px-4 text-gray-400 font-medium text-[10px] w-7">
                      {ri + 1}
                    </th>
                  ))}
                  <th className="text-center py-3 px-4 text-gray-400 font-medium cursor-pointer hover:text-white transition-all" onClick={() => setLeagueSort({ field: 'totalStars', order: leagueSort.field === 'totalStars' && leagueSort.order === 'desc' ? 'asc' : 'desc' })}>
                    总星级 {leagueSort.field === 'totalStars' ? (leagueSort.order === 'desc' ? '↓' : '↑') : ''}
                  </th>
                  <th className="text-center py-3 px-4 text-gray-400 font-medium cursor-pointer hover:text-white transition-all" onClick={() => setLeagueSort({ field: 'attackRate', order: leagueSort.field === 'attackRate' && leagueSort.order === 'desc' ? 'asc' : 'desc' })}>
                    进攻/上场 {leagueSort.field === 'attackRate' ? (leagueSort.order === 'desc' ? '↓' : '↑') : ''}
                  </th>
                  <th className="text-center py-3 px-4 text-gray-400 font-medium cursor-pointer hover:text-white transition-all" onClick={() => setLeagueSort({ field: 'avgDestruction', order: leagueSort.field === 'avgDestruction' && leagueSort.order === 'desc' ? 'asc' : 'desc' })}>
                    平均摧毁率 {leagueSort.field === 'avgDestruction' ? (leagueSort.order === 'desc' ? '↓' : '↑') : ''}
                  </th>
                </tr>
              </thead>
              <tbody>
                {playerList.map((p, i) => (
                  <tr key={p.tag} onClick={() => handleViewPlayer(p.tag)} className="border-b border-white/5 hover:bg-white/5 transition-all cursor-pointer">
                    <td className="py-3 px-4 text-gray-500">{i + 1}</td>
                    <td className="py-3 px-4">
                      <p className="font-medium hover:text-primary transition-colors">{p.name}</p>
                      <p className="text-gray-400 text-xs font-mono">{p.tag}</p>
                    </td>
                    {ourWars.map((_, ri) => {
                      const val = p.perRound?.[ri]
                      // 未上场 → 留空单元格
                      if (val === undefined) {
                        return <td key={ri} className="py-3 px-4 text-center" />
                      }
                      let borderColor, bgStyle, title
                      if (val === -2) {
                        // 准备中（上场但未开打）
                        borderColor = '#6b7280'
                        bgStyle = '#374151'
                        title = `第${ri+1}场: 准备中`
                      } else if (val <= 0) {
                        borderColor = '#ef4444'
                        bgStyle = 'transparent'
                        title = val === -1 ? `第${ri+1}场: 未进攻` : `第${ri+1}场: 0%`
                      } else {
                        // 100% → 绿, <100% → 黄→橙→红
                        const hue = val >= 100 ? 120 : (val / 100) * 60
                        const color = `hsl(${hue}, 100%, 50%)`
                        borderColor = color
                        bgStyle = `linear-gradient(to top, ${color} ${val}%, transparent ${val}%)`
                        title = `第${ri+1}场: ${val.toFixed(0)}%`
                      }
                      return <td key={ri} className="py-3 px-4 text-center">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded border-2 text-xs font-bold text-white"
                          style={{
                            borderColor,
                            background: bgStyle,
                            textShadow: '0 0 4px rgba(0,0,0,0.9), 0 0 3px rgba(0,0,0,0.7), 0 0 1px #000'
                          }}
                          title={title}
                        >
                          {ri + 1}
                        </span>
                      </td>
                    })}
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center gap-1 font-bold text-primary">
                        <span className="text-secondary"><Icons.Star /></span>
                        {p.totalStars}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`font-bold ${p.warsParticipated === p.totalAppearances ? 'text-success' : 'text-danger'}`}>
                        {p.warsParticipated}/{p.totalAppearances}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-success">
                      {p.totalAttacks > 0 ? (p.totalDestruction / p.totalAttacks).toFixed(1) : '0.0'}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>)}

        {ourWars.length > 0 && (<div>
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
            <span className="text-success"><Icons.Swords /></span>
            各场对战详情
          </h2>
          <div className="space-y-3">
            {ourWars.map((war, index) => (
              <div key={index} className="bg-dark/50 rounded-xl p-4 border border-white/10">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 text-sm">第 {index + 1} 场</span>
                    <span className="font-medium">{war.ourClan?.name}</span>
                    <span className="text-gray-500">vs</span>
                    <span className="font-medium">{war.opponent?.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <span className="text-secondary"><Icons.Star /></span>
                      <span className="font-bold text-primary">{war.ourClan?.stars || 0}</span>
                      <span className="text-gray-500 mx-1">:</span>
                      <span className="font-bold text-danger">{war.opponent?.stars || 0}</span>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${war.state === 'war' ? 'bg-success/20 text-success' : war.state === 'preparation' ? 'bg-primary/20 text-primary' : 'bg-gray-600/20 text-gray-400'}`}>
                      {war.state === 'war' ? '进行中' : war.state === 'preparation' ? '准备中' : '已结束'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>)}

        {ourWars.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            暂无对战记录
          </div>
        )}
      </div>
    </main>)
  }

  return (<div className="min-h-screen">
    <Header onSettingsClick={() => setShowSettings(true)}/>

    {showSettings && (<SettingsModal onSave={(key) => {
        setApiKey(key)
        setShowSettings(false)
      }} apiKey={apiKey}/>)}

    {currentView === 'home' && renderHome()}
    {currentView === 'clan-detail' && renderClanDetail()}
    {currentView === 'war' && renderWar()}
    {currentView === 'league' && renderLeague()}

    {showPlayerModal && playerData && (<PlayerDetailModal player={playerData} onClose={() => { setShowPlayerModal(false); setPlayerData(null) }}/>)}
  </div>)
}

export default App
