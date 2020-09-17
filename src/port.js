const fs = require("fs")
const yml = require("js-yaml")
const { zip } = require("zip-a-folder")

async function convert(obj) {
  let rand = ~~(Math.random() * 10000000);
  fs.mkdirSync(`./Subclasses${rand}`);
  let newObj = {}
  for(let cls in obj.Subclass.classes) {
    newObj[cls] = {
      name: cls,
      affects_roles: obj.Subclass.classes[cls],
      string_options: obj.Subclass["classes_options_strings"][cls] || {},
      boolean_options: obj.Subclass["classes_options_bool"][cls] || {},
      integer_options: obj.Subclass["classes_options_int"][cls] || {},
      float_options: obj.Subclass["classes_options_float"][cls] || {},
      spawn_locations: obj.Subclass["classes_options_spawns"][cls] || [],
      spawn_items: obj.Subclass["classes_options_spawn_items"][cls] || {},
      spawn_ammo: obj.Subclass["classes_options_ammo_on_spawn"][cls] || {},
      abilities: obj.Subclass["classes_options_abilities"][cls] || [],
      ability_cooldowns: obj.Subclass["classes_options_ability_cooldowns"][cls] || {},
      advanced_ff_rules: obj.Subclass["advanced_ff_rules"][cls] || [],
      on_hit_effects: obj.Subclass["on_hit_effects"][cls] || [],
      on_spawn_effects: obj.Subclass["on_spawn_effects"][cls] || [],
      roles_that_cant_damage: obj.Subclass["roles_that_cant_damage"][cls] || [],
      ends_round_with: obj.Subclass["ends_round_with"][cls] || "RIP"
    }
  }
  for(let cls in newObj) {
    fs.writeFileSync(`./Subclasses${rand}/${newObj[cls].name}.yml`, yml.safeDump(newObj[cls], {lineWidth: Infinity}))
  }
  await zip(`./Subclasses${rand}`, `./Subclasses${rand}.zip`)
  return `./Subclasses${rand}.zip`
}

function open(path) {
  return convert(yml.safeLoad(fs.readFileSync(path, {encoding: "utf8"})))
}

module.exports = open